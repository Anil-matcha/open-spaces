from __future__ import annotations

import asyncio
import json
import os
import re
import shutil
import subprocess
import tempfile
import uuid
from pathlib import Path
from typing import Any
from urllib.parse import urlparse

import httpx
from fastapi import FastAPI, File, Form, Header, HTTPException, UploadFile
from fastapi.responses import FileResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel, Field


ROOT = Path(__file__).resolve().parent
RUNTIME = ROOT / "runtime"
ASSET_DIR = RUNTIME / "assets"
EXPORT_DIR = RUNTIME / "exports"
PREP_DIR = RUNTIME / "preparations"
STATIC_DIR = ROOT / "static"
API_BASE = "https://api.muapi.ai/api/v1"
MAX_VIDEO_BYTES = 50 * 1024 * 1024
MAX_IMAGE_BYTES = 10 * 1024 * 1024
MIN_VIDEO_SECONDS = 4
MAX_VIDEO_SECONDS = 30
ASSETS: dict[str, dict[str, Any]] = {}
EXPORTS: dict[str, Path] = {}
PREPARATIONS: dict[str, dict[str, Any]] = {}
ID_PATTERN = re.compile(r"^[A-Za-z0-9_-]{1,128}$")

for directory in (ASSET_DIR, EXPORT_DIR, PREP_DIR):
    directory.mkdir(parents=True, exist_ok=True)

app = FastAPI(title="Open Genjutsu", docs_url=None, redoc_url=None)
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")


class DraftRequest(BaseModel):
    api_key: str = Field(min_length=8, max_length=500)
    source_asset_id: str
    preparation_id: str
    preparation_approved: bool = False
    reference_url: str
    prompt: str = Field(min_length=8, max_length=4000)


class PrepareRequest(BaseModel):
    api_key: str = Field(min_length=8, max_length=500)
    source_asset_id: str


class FinalizeRequest(BaseModel):
    api_key: str = Field(min_length=8, max_length=500)
    draft_request_id: str


class ExportRequest(BaseModel):
    source_asset_id: str
    video_url: str


class ClearRequest(BaseModel):
    source_asset_id: str | None = None


def _safe_id(value: str, label: str) -> str:
    if not ID_PATTERN.fullmatch(value or ""):
        raise HTTPException(status_code=400, detail=f"Invalid {label}.")
    return value


def _api_key(value: str) -> str:
    key = value.strip()
    if not key or "\n" in key or "\r" in key:
        raise HTTPException(status_code=400, detail="Enter a valid API key.")
    return key


def _message_from_response(response: httpx.Response) -> str:
    try:
        payload = response.json()
    except ValueError:
        payload = {}
    detail = payload.get("detail") if isinstance(payload, dict) else None
    if isinstance(detail, dict):
        error = detail.get("error")
        if isinstance(error, dict) and isinstance(error.get("message"), str):
            return error["message"]
        if isinstance(detail.get("message"), str):
            return detail["message"]
    if isinstance(payload, dict):
        error = payload.get("error")
        if isinstance(error, dict) and isinstance(error.get("message"), str):
            return error["message"]
        if isinstance(payload.get("message"), str):
            return payload["message"]
    return f"The generation API returned HTTP {response.status_code}. Check the API key, credits, and request fields."


async def _api_request(method: str, path: str, key: str, **kwargs: Any) -> httpx.Response:
    headers = dict(kwargs.pop("headers", {}))
    headers["x-api-key"] = _api_key(key)
    try:
        async with httpx.AsyncClient(timeout=httpx.Timeout(90, connect=20), follow_redirects=False) as client:
            response = await client.request(method, f"{API_BASE}/{path.lstrip('/')}", headers=headers, **kwargs)
    except httpx.TimeoutException as exc:
        raise HTTPException(status_code=504, detail="The generation API did not respond in time. Check request status before retrying to avoid a duplicate generation.") from exc
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail="Could not reach the generation API. Check your connection and try again.") from exc
    if response.is_error:
        raise HTTPException(status_code=response.status_code, detail=_message_from_response(response))
    return response


def _validate_source_video(data: bytes, suffix: str) -> None:
    ffprobe = shutil.which("ffprobe")
    if not ffprobe:
        raise HTTPException(status_code=503, detail="ffprobe is required to check source-video timing. Install FFmpeg and restart the app.")
    with tempfile.TemporaryDirectory(prefix="recast-probe-", dir=RUNTIME) as temporary_dir:
        sample = Path(temporary_dir) / f"source{suffix}"
        sample.write_bytes(data)
        result = subprocess.run(
            [ffprobe, "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(sample)],
            capture_output=True,
            text=True,
            timeout=30,
            check=False,
        )
    if result.returncode != 0:
        raise HTTPException(status_code=422, detail="This source video could not be read. Export it as a valid MP4 or MOV and try again.")
    try:
        duration = float(result.stdout.strip())
    except (TypeError, ValueError) as exc:
        raise HTTPException(status_code=422, detail="The source video duration could not be read.") from exc
    if duration < MIN_VIDEO_SECONDS or duration > MAX_VIDEO_SECONDS:
        raise HTTPException(status_code=422, detail=f"Source videos must be between {MIN_VIDEO_SECONDS} and {MAX_VIDEO_SECONDS} seconds so the edit can preserve the full performance and soundtrack.")


@app.get("/", response_class=HTMLResponse)
async def home() -> str:
    return (STATIC_DIR / "index.html").read_text(encoding="utf-8")


@app.get("/api/health")
async def health() -> dict[str, Any]:
    return {
        "ok": True,
        "ffmpeg": shutil.which("ffmpeg") is not None,
        "ffprobe": shutil.which("ffprobe") is not None,
    }


@app.post("/api/upload")
async def upload_media(
    api_key: str = Form(...),
    kind: str = Form(...),
    file: UploadFile = File(...),
) -> dict[str, str]:
    if kind not in {"source", "reference"}:
        raise HTTPException(status_code=400, detail="Upload must be a source video or a reference image.")
    content_type = (file.content_type or "").lower()
    filename = Path(file.filename or "upload").name
    suffix = Path(filename).suffix.lower()
    allowed = {"source": {"video/mp4", "video/quicktime", "application/octet-stream"}, "reference": {"image/jpeg", "image/png", "image/webp"}}
    max_bytes = MAX_VIDEO_BYTES if kind == "source" else MAX_IMAGE_BYTES
    if content_type not in allowed[kind]:
        raise HTTPException(status_code=415, detail="Use an MP4 or MOV source video and a JPEG, PNG, or WebP character image.")
    data = await file.read(max_bytes + 1)
    if not data:
        raise HTTPException(status_code=400, detail="The selected file is empty.")
    if len(data) > max_bytes:
        limit_mb = max_bytes // (1024 * 1024)
        raise HTTPException(status_code=413, detail=f"This file is over the {limit_mb} MB upload limit.")

    if kind == "source" and suffix not in {".mp4", ".mov"}:
        suffix = ".mp4" if content_type == "video/mp4" else ".mov"
    if kind == "reference" and suffix not in {".jpg", ".jpeg", ".png", ".webp"}:
        suffix = {"image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp"}[content_type]

    if kind == "source":
        _validate_source_video(data, suffix)

    asset_id = uuid.uuid4().hex
    local_path = None
    if kind == "source":
        local_path = ASSET_DIR / f"{asset_id}{suffix}"
        local_path.write_bytes(data)
    try:
        response = await _api_request(
            "POST",
            "upload_file",
            api_key,
            files={"file": (filename or f"upload{suffix}", data, content_type)},
        )
    except Exception:
        if local_path:
            local_path.unlink(missing_ok=True)
        raise
    try:
        uploaded_url = response.json().get("url")
    except ValueError:
        uploaded_url = None
    if not isinstance(uploaded_url, str) or not uploaded_url.startswith("https://"):
        if local_path:
            local_path.unlink(missing_ok=True)
        raise HTTPException(status_code=502, detail="The service accepted the upload but did not return a usable media URL.")

    ASSETS[asset_id] = {"kind": kind, "path": local_path, "name": filename, "url": uploaded_url}
    return {"asset_id": asset_id, "url": uploaded_url, "filename": filename}


def _task_status(payload: Any) -> str:
    if not isinstance(payload, dict):
        return "processing"
    for key in ("status", "task_status"):
        if isinstance(payload.get(key), str):
            return payload[key].lower()
    for key in ("prediction", "data"):
        nested = payload.get(key)
        if isinstance(nested, dict):
            status = _task_status(nested)
            if status != "processing":
                return status
    return "processing"


def _find_media_url(payload: Any) -> str | None:
    video_extensions = (".mp4", ".webm", ".mov", ".mkv", ".gif")
    seen: set[int] = set()

    def visit(value: Any) -> str | None:
        if isinstance(value, str):
            candidate = value.strip()
            parsed = urlparse(candidate)
            path = parsed.path.lower()
            if parsed.scheme == "https" and parsed.hostname and path.endswith(video_extensions):
                return candidate
            return None
        if not isinstance(value, (dict, list)) or id(value) in seen:
            return None
        seen.add(id(value))
        if isinstance(value, dict):
            for key in ("video_url", "video", "output_url", "url", "outputs"):
                if key in value:
                    found = visit(value[key])
                    if found:
                        return found
            for child in value.values():
                found = visit(child)
                if found:
                    return found
        else:
            for child in value:
                found = visit(child)
                if found:
                    return found
        return None

    return visit(payload)


def _public_preparation(preparation_id: str, preparation: dict[str, Any]) -> dict[str, Any]:
    def stage(name: str) -> dict[str, Any]:
        item = preparation[name]
        return {key: item.get(key) for key in ("status", "request_id", "error") if item.get(key) is not None}

    return {
        "preparation_id": preparation_id,
        "depth": stage("depth"),
        "matte": stage("matte"),
        "ready": all(preparation[name].get("status") == "completed" and preparation[name].get("url") for name in ("depth", "matte")),
        "composed": bool(preparation.get("prepared_path") and Path(preparation["prepared_path"]).exists()),
    }


@app.post("/api/prepare")
async def prepare_source(request: PrepareRequest) -> dict[str, Any]:
    asset_id = _safe_id(request.source_asset_id, "asset id")
    source = ASSETS.get(asset_id)
    if not source or source.get("kind") != "source" or not source.get("path") or not source.get("url"):
        raise HTTPException(status_code=404, detail="The source video is no longer available. Upload it again.")

    preparation_id = uuid.uuid4().hex
    preparation: dict[str, Any] = {
        "source_asset_id": asset_id,
        "source_url": source["url"],
        "depth": {"status": "submitting"},
        "matte": {"status": "submitting"},
    }
    PREPARATIONS[preparation_id] = preparation

    async def submit(name: str, endpoint: str, payload: dict[str, Any]) -> None:
        stage = preparation[name]
        try:
            response = await _api_request("POST", endpoint, request.api_key, json=payload)
            result = response.json()
            request_id = result.get("request_id") if isinstance(result, dict) else None
            if not isinstance(request_id, str) or not request_id:
                stage.update(status="unknown", error="The service did not confirm a request ID. Check request history before retrying.")
                return
            stage.update(status="processing", request_id=request_id)
        except HTTPException as exc:
            stage.update(
                status="unknown" if exc.status_code >= 500 else "failed",
                error=str(exc.detail),
            )
        except (ValueError, httpx.HTTPError) as exc:
            stage.update(status="unknown", error=f"The service response was unclear: {exc}")

    await asyncio.gather(
        submit("depth", "depth-anything", {"video_url": source["url"]}),
        submit(
            "matte",
            "video-background-remover",
            {
                "video_url": source["url"],
                "background_color": "Transparent",
                "output_container_and_codec": "webm_vp9",
                "preserve_audio": False,
            },
        ),
    )
    return _public_preparation(preparation_id, preparation)


@app.get("/api/preparations/{preparation_id}/status")
async def preparation_status(preparation_id: str, x_api_key: str = Header(..., alias="x-api-key")) -> dict[str, Any]:
    safe_id = _safe_id(preparation_id, "preparation id")
    preparation = PREPARATIONS.get(safe_id)
    if not preparation:
        raise HTTPException(status_code=404, detail="This preparation is no longer available. Upload the media again.")

    completed = {"completed", "succeeded", "success", "done"}
    failed = {"failed", "error", "cancelled", "canceled"}
    for name in ("depth", "matte"):
        stage = preparation[name]
        request_id = stage.get("request_id")
        if not request_id or stage.get("status") in completed | failed | {"unknown", "failed"}:
            continue
        try:
            response = await _api_request("GET", f"predictions/{_safe_id(request_id, 'request ID')}/result", x_api_key)
            result = response.json()
            status = _task_status(result)
            if status in completed:
                url = _find_media_url(result)
                if not url:
                    stage.update(status="failed", error="The task completed without a usable video URL.")
                else:
                    stage.update(status="completed", url=url)
            elif status in failed:
                error_data = result.get("error") if isinstance(result, dict) else None
                detail = result.get("error_message") if isinstance(result, dict) else None
                if not detail and isinstance(error_data, dict):
                    detail = error_data.get("message")
                stage.update(status="failed", error=str(detail or "The preparation task failed."))
            else:
                stage["status"] = "processing"
        except (HTTPException, ValueError) as exc:
            stage["poll_error"] = str(getattr(exc, "detail", exc))

    return _public_preparation(safe_id, preparation)


async def _ensure_preparation_file(preparation_id: str, kind: str) -> Path:
    preparation = PREPARATIONS.get(preparation_id)
    if not preparation:
        raise HTTPException(status_code=404, detail="This preparation is no longer available.")
    source = ASSETS.get(preparation["source_asset_id"])
    if kind == "source":
        path = source.get("path") if source else None
        if not path or not Path(path).exists():
            raise HTTPException(status_code=404, detail="The local source video is no longer available.")
        return Path(path)
    if kind == "prepared":
        path = preparation.get("prepared_path")
        if not path or not Path(path).exists():
            raise HTTPException(status_code=404, detail="Create the prepared composite before previewing it.")
        return Path(path)
    if kind not in {"depth", "matte"}:
        raise HTTPException(status_code=404, detail="Unknown preparation preview.")
    stage = preparation[kind]
    if stage.get("status") != "completed" or not stage.get("url"):
        raise HTTPException(status_code=409, detail="This preparation output is not ready yet.")
    suffix = ".webm" if kind == "matte" else ".mp4"
    path = PREP_DIR / preparation_id / f"{kind}{suffix}"
    if not path.exists():
        path.parent.mkdir(parents=True, exist_ok=True)
        await _download_result(stage["url"], path)
    return path


@app.get("/api/preparations/{preparation_id}/media/{kind}")
async def preparation_media(preparation_id: str, kind: str) -> FileResponse:
    safe_id = _safe_id(preparation_id, "preparation id")
    path = await _ensure_preparation_file(safe_id, kind)
    media_type = "video/webm" if path.suffix.lower() == ".webm" else "video/mp4"
    return FileResponse(path, media_type=media_type)


def _compose_depth_subject(source_path: Path, depth_path: Path, matte_path: Path, output_path: Path) -> None:
    ffprobe = shutil.which("ffprobe")
    ffmpeg = shutil.which("ffmpeg")
    if not ffprobe or not ffmpeg:
        raise HTTPException(status_code=503, detail="FFmpeg and ffprobe are required to compose the depth preview.")
    probe = subprocess.run(
        [ffprobe, "-v", "error", "-show_entries", "stream=width,height:format=duration", "-of", "json", str(source_path)],
        capture_output=True,
        text=True,
        timeout=30,
        check=False,
    )
    if probe.returncode != 0:
        raise HTTPException(status_code=422, detail="The source video could not be inspected for depth compositing.")
    try:
        details = json.loads(probe.stdout)
        video_stream = next(stream for stream in details["streams"] if stream.get("width") and stream.get("height"))
        width, height = int(video_stream["width"]), int(video_stream["height"])
        duration = float(details["format"]["duration"])
    except (KeyError, StopIteration, TypeError, ValueError, json.JSONDecodeError) as exc:
        raise HTTPException(status_code=422, detail="The source video dimensions or duration could not be read.") from exc
    scale = min(1.0, 960 / max(width, height))
    width = max(2, int(width * scale) // 2 * 2)
    height = max(2, int(height * scale) // 2 * 2)
    filters = (
        f"[0:v:0]setpts=PTS-STARTPTS,fps=24,scale={width}:{height},setsar=1,format=rgb24[bg];"
        f"[1:v:0]setpts=PTS-STARTPTS,fps=24,scale={width}:{height},setsar=1,format=gray[depth];"
        f"[2:v:0]setpts=PTS-STARTPTS,fps=24,scale={width}:{height},setsar=1,format=rgba,alphaextract[matte];"
        "[depth][matte]alphamerge[depth_subject];"
        "[bg][depth_subject]overlay=eof_action=pass:shortest=0:format=auto,format=yuv420p[outv]"
    )
    command = [
        ffmpeg, "-y", "-i", str(source_path), "-i", str(depth_path), "-i", str(matte_path),
        "-filter_complex", filters, "-map", "[outv]", "-map", "0:a?", "-t", str(duration),
        "-r", "24", "-c:v", "libx264", "-preset", "veryfast", "-crf", "19", "-maxrate", "12M",
        "-bufsize", "24M", "-c:a", "aac", "-b:a", "192k", "-movflags", "+faststart", str(output_path),
    ]
    result = subprocess.run(command, capture_output=True, text=True, timeout=300, check=False)
    if result.returncode != 0 or not output_path.exists() or output_path.stat().st_size == 0:
        output_path.unlink(missing_ok=True)
        raise HTTPException(status_code=500, detail="FFmpeg could not combine the depth map and subject matte. Check that the transparent cutout is a VP9 WebM with alpha.")
    if output_path.stat().st_size > MAX_VIDEO_BYTES:
        output_path.unlink(missing_ok=True)
        raise HTTPException(status_code=413, detail="The prepared video exceeds the 50 MB model upload limit. Try a shorter or smaller source clip.")


@app.post("/api/preparations/{preparation_id}/compose")
async def compose_preparation(preparation_id: str) -> dict[str, Any]:
    safe_id = _safe_id(preparation_id, "preparation id")
    preparation = PREPARATIONS.get(safe_id)
    if not preparation:
        raise HTTPException(status_code=404, detail="This preparation is no longer available.")
    if not _public_preparation(safe_id, preparation)["ready"]:
        raise HTTPException(status_code=409, detail="Wait for both depth and subject matte tasks to complete.")
    if preparation.get("prepared_path") and Path(preparation["prepared_path"]).exists():
        return {"preparation_id": safe_id, "prepared": True, "media_url": f"/api/preparations/{safe_id}/media/prepared"}

    source_path = await _ensure_preparation_file(safe_id, "source")
    depth_path = await _ensure_preparation_file(safe_id, "depth")
    matte_path = await _ensure_preparation_file(safe_id, "matte")
    output_path = PREP_DIR / safe_id / "prepared.mp4"
    output_path.parent.mkdir(parents=True, exist_ok=True)
    await asyncio.to_thread(_compose_depth_subject, source_path, depth_path, matte_path, output_path)
    preparation["prepared_path"] = output_path
    return {"preparation_id": safe_id, "prepared": True, "media_url": f"/api/preparations/{safe_id}/media/prepared"}


@app.post("/api/draft")
async def create_draft(request: DraftRequest) -> dict[str, Any]:
    source = ASSETS.get(_safe_id(request.source_asset_id, "asset id"))
    if not source or source.get("kind") != "source" or not source.get("path"):
        raise HTTPException(status_code=404, detail="The source video is no longer available locally. Upload it again.")
    preparation_id = _safe_id(request.preparation_id, "preparation id")
    preparation = PREPARATIONS.get(preparation_id)
    if not preparation or preparation.get("source_asset_id") != request.source_asset_id:
        raise HTTPException(status_code=404, detail="The depth and matte review is no longer available. Prepare the source again.")
    if not request.preparation_approved:
        raise HTTPException(status_code=400, detail="Review the depth map, subject matte, and composite before creating a draft.")
    if not request.reference_url.startswith("https://") or not preparation.get("prepared_path"):
        raise HTTPException(status_code=400, detail="Media URLs must use HTTPS.")
    prepared_path = Path(preparation["prepared_path"])
    if not prepared_path.exists():
        raise HTTPException(status_code=404, detail="The prepared depth composite is missing. Review and compose it again.")
    prepared_data = prepared_path.read_bytes()
    if len(prepared_data) > MAX_VIDEO_BYTES:
        raise HTTPException(status_code=413, detail="The prepared video exceeds the 50 MB upload limit.")
    uploaded = await _api_request(
        "POST",
        "upload_file",
        request.api_key,
        files={"file": ("open-genjutsu-depth-composite.mp4", prepared_data, "video/mp4")},
    )
    try:
        prepared_url = uploaded.json().get("url")
    except ValueError:
        prepared_url = None
    if not isinstance(prepared_url, str) or not prepared_url.startswith("https://"):
        raise HTTPException(status_code=502, detail="The service did not return a usable URL for the reviewed composite.")
    payload = {
        "prompt": request.prompt.strip(),
        "images_list": [request.reference_url],
        "videos_list": [prepared_url],
        "omni_reference_task_type": "edit",
        "resolution": "480p",
        "draft": True,
    }
    response = await _api_request("POST", "seedance-2.5-omni-reference", request.api_key, json=payload)
    try:
        result = response.json()
    except ValueError as exc:
        raise HTTPException(status_code=502, detail="The service returned an unreadable draft response.") from exc
    if not result.get("request_id"):
        raise HTTPException(status_code=502, detail="The service did not return a draft request ID.")
    return result


@app.get("/api/predictions/{request_id}")
async def prediction(request_id: str, x_api_key: str = Header(..., alias="x-api-key")) -> dict[str, Any]:
    safe_request_id = _safe_id(request_id, "request ID")
    response = await _api_request("GET", f"predictions/{safe_request_id}/result", x_api_key)
    try:
        return response.json()
    except ValueError as exc:
        raise HTTPException(status_code=502, detail="The service returned an unreadable prediction response.") from exc


@app.post("/api/finalize")
async def finalize_draft(request: FinalizeRequest) -> dict[str, Any]:
    draft_id = _safe_id(request.draft_request_id, "draft request ID")
    response = await _api_request(
        "POST",
        "seedance-2.5-omni-reference",
        request.api_key,
        json={"draft_request_id": draft_id, "resolution": "1080p"},
    )
    try:
        result = response.json()
    except ValueError as exc:
        raise HTTPException(status_code=502, detail="The service returned an unreadable finalization response.") from exc
    if not result.get("request_id"):
        raise HTTPException(status_code=502, detail="The service did not return a final render request ID.")
    return result


def _validate_result_url(value: str) -> str:
    parsed = urlparse(value)
    if parsed.scheme != "https" or not parsed.hostname or parsed.username or parsed.password:
        raise HTTPException(status_code=400, detail="The result URL must be a public HTTPS URL.")
    return value


def _has_audio_track(path: Path) -> bool:
    ffprobe = shutil.which("ffprobe")
    if not ffprobe:
        raise HTTPException(status_code=503, detail="ffprobe is required to inspect the source audio. Install FFmpeg and restart the app.")
    result = subprocess.run(
        [ffprobe, "-v", "error", "-select_streams", "a:0", "-show_entries", "stream=index", "-of", "csv=p=0", str(path)],
        capture_output=True,
        text=True,
        timeout=30,
        check=False,
    )
    if result.returncode != 0:
        raise HTTPException(status_code=422, detail="The source video could not be read by ffprobe.")
    return bool(result.stdout.strip())


async def _download_result(url: str, destination: Path) -> None:
    url = _validate_result_url(url)
    size = 0
    try:
        async with httpx.AsyncClient(timeout=httpx.Timeout(180, connect=30), follow_redirects=True) as client:
            async with client.stream("GET", url) as response:
                response.raise_for_status()
                with destination.open("wb") as file_handle:
                    async for chunk in response.aiter_bytes(1024 * 1024):
                        size += len(chunk)
                        if size > 1024 * 1024 * 1024:
                            raise HTTPException(status_code=413, detail="The generated video is larger than the 1 GB local export limit.")
                        file_handle.write(chunk)
    except HTTPException:
        raise
    except httpx.HTTPError as exc:
        raise HTTPException(status_code=502, detail="Could not download the generated video. The result URL remains available in the generation service.") from exc
    if size == 0:
        raise HTTPException(status_code=502, detail="The generated video download was empty.")


@app.post("/api/export")
async def export_with_source_audio(request: ExportRequest) -> dict[str, Any]:
    asset_id = _safe_id(request.source_asset_id, "asset id")
    source = ASSETS.get(asset_id)
    if not source or source.get("kind") != "source" or not source.get("path"):
        raise HTTPException(status_code=404, detail="The source video is no longer available locally. Upload it again.")
    ffmpeg = shutil.which("ffmpeg")
    if not ffmpeg:
        raise HTTPException(status_code=503, detail="FFmpeg is required to make the source-audio export. Install FFmpeg and restart the app.")

    export_id = uuid.uuid4().hex
    downloaded = EXPORT_DIR / f"{export_id}-generated.mp4"
    final_path = EXPORT_DIR / f"{export_id}-final.mp4"
    await _download_result(request.video_url, downloaded)
    source_path: Path = source["path"]

    if _has_audio_track(source_path):
        command = [
            ffmpeg, "-y", "-i", str(downloaded), "-i", str(source_path),
            "-map", "0:v:0", "-map", "1:a:0", "-c:v", "copy", "-c:a", "aac", "-b:a", "192k",
            "-movflags", "+faststart", str(final_path),
        ]
    else:
        command = [ffmpeg, "-y", "-i", str(downloaded), "-c", "copy", "-movflags", "+faststart", str(final_path)]
    result = await asyncio.to_thread(subprocess.run, command, capture_output=True, text=True, timeout=300, check=False)
    downloaded.unlink(missing_ok=True)
    if result.returncode != 0 or not final_path.exists() or final_path.stat().st_size == 0:
        final_path.unlink(missing_ok=True)
        raise HTTPException(status_code=500, detail="FFmpeg could not create the final MP4. Check the input codecs and FFmpeg installation.")
    EXPORTS[export_id] = final_path
    return {"export_id": export_id, "download_url": f"/api/download/{export_id}", "source_audio_restored": _has_audio_track(source_path)}


@app.get("/api/download/{export_id}")
async def download_export(export_id: str) -> FileResponse:
    export_id = _safe_id(export_id, "export id")
    path = EXPORTS.get(export_id)
    if not path or not path.exists():
        raise HTTPException(status_code=404, detail="This export is no longer available. Create it again.")
    return FileResponse(path, media_type="video/mp4", filename="open-genjutsu-final.mp4")


@app.post("/api/clear")
async def clear_local_files(request: ClearRequest) -> dict[str, bool]:
    if request.source_asset_id:
        asset_id = _safe_id(request.source_asset_id, "asset id")
        asset = ASSETS.pop(asset_id, None)
        path = asset.get("path") if asset else None
        if path:
            Path(path).unlink(missing_ok=True)
        for preparation_id, preparation in list(PREPARATIONS.items()):
            if preparation.get("source_asset_id") == asset_id:
                shutil.rmtree(PREP_DIR / preparation_id, ignore_errors=True)
                PREPARATIONS.pop(preparation_id, None)
    else:
        for asset in ASSETS.values():
            path = asset.get("path")
            if path:
                Path(path).unlink(missing_ok=True)
        ASSETS.clear()
        for path in ASSET_DIR.glob("*"):
            if path.is_file():
                path.unlink(missing_ok=True)
        PREPARATIONS.clear()
        shutil.rmtree(PREP_DIR, ignore_errors=True)
        PREP_DIR.mkdir(parents=True, exist_ok=True)
    for path in EXPORTS.values():
        Path(path).unlink(missing_ok=True)
    EXPORTS.clear()
    for path in EXPORT_DIR.glob("*"):
        if path.is_file():
            path.unlink(missing_ok=True)
    return {"ok": True}
