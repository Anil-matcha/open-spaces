# Muapi Video Recast

Muapi Video Recast is a local-first studio for replacing a subject in a short video while keeping the original scene and performance. It uses Muapi's Seedance 2.5 Omni Reference API for a low-resolution draft, gives you a review step, and only submits a separate 1080p render after you approve the draft.

The original video is uploaded to Muapi for generation and also kept in a local runtime folder so the finished render can use the source soundtrack. The app does not save your Muapi API key. Keep the app bound to localhost and do not expose it to a public network.

## Muapi request flow

- Media uploads use `POST /api/v1/upload_file`.
- Drafts use `POST /api/v1/seedance-2.5-omni-reference` with edit mode and `draft: true`.
- Status checks use `GET /api/v1/predictions/{request_id}/result`.
- Approved drafts are finalized by calling the Omni Reference endpoint again with `draft_request_id` and `resolution: "1080p"`.

## What it does

1. Upload a source video and a replacement-character image to Muapi.
2. Submit an Omni Reference edit draft at 480p.
3. Review the completed draft with the source soundtrack restored and approve it before finalization.
4. Finalize the accepted draft at 1080p using its original request ID.
5. Download the final video and mux the source video's complete audio track into it with FFmpeg.

The edit request uses adaptive framing and source timing. The final audio mux is done locally; uploaded source media and returned model media remain subject to Muapi's API terms and retention behavior. Draft and final render are separate paid Muapi requests.

## Requirements

- Python 3.10 or newer
- FFmpeg with `ffprobe` available on `PATH`
- A Muapi API key with available credits

## Run locally

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app:app --host 127.0.0.1 --port 8770
```

Open <http://127.0.0.1:8770>. On Windows, activate the environment with `.venv\Scripts\activate`.

## API key and privacy

- Enter your API key in the app when you open it. It stays in page memory and is forwarded by the local server to Muapi with each request.
- The local server forwards API requests to `https://api.muapi.ai/api/v1` and never writes the API key to disk or logs.
- Uploaded source videos are temporarily stored in `runtime/` for audio restoration. Generated exports are stored in `runtime/exports/`.
- Use **Clear local files** when you are finished. You can also remove `runtime/` after stopping the app.
- The app binds to `127.0.0.1`. Keep this setting if you run it on a shared machine.
- Keep the server process and browser tab open while a job is running. This lightweight local app keeps request state in memory for the current session.

## Notes

- Source videos must be MP4 or MOV, 4–30 seconds long, and no larger than 50 MB. Character images must be JPEG, PNG, or WebP and no larger than 10 MB, matching Muapi's upload limits.
- The reference image is sent as `@image1`; the source clip is sent as `@video1`.
- The 1080p step reuses the completed draft through Muapi's `draft_request_id` flow. It is not a second independent prompt submission.
- If the source contains no audio track, the app exports the generated video without attempting an audio replacement.
- API requests and generation may incur Muapi charges. Review your request and account balance before submitting.
