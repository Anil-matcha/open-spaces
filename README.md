# Open Genjutsu

**Recast the main subject in a short video, review a draft, then approve the final render.** The finished MP4 uses the source video's original soundtrack.

Open Genjutsu is a local-first, single-user video workflow. It keeps the source clip on your device for audio restoration and sends the media you choose to the generation service. The current adapter uses Muapi's Seedance 2.5 Omni Reference API.

![License](https://img.shields.io/github/license/Anil-matcha/open-genjutsu) ![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB) ![Local-first](https://img.shields.io/badge/runtime-local--first-5865F2)

## Contents

- [How it works](#how-it-works)
- [Requirements](#requirements)
- [Run locally](#run-locally)
- [Media limits](#media-limits)
- [Privacy and local files](#privacy-and-local-files)
- [API flow](#api-flow)
- [Troubleshooting](#troubleshooting)
- [Project layout](#project-layout)
- [License](#license)

## How it works

1. **Choose media.** Add a 4–30 second source clip and a character reference image.
2. **Set the direction.** The prompt refers to the source as `@video1` and the new subject as `@image1`.
3. **Generate a draft.** The app submits a 480p edit preview and checks its status.
4. **Review the full clip.** A local review copy has the original soundtrack restored.
5. **Approve the final.** Only after you check the approval box does the app submit that draft for a separate 1080p render.
6. **Export locally.** FFmpeg combines the final video with the source audio and saves a downloadable MP4.

Draft and final generation are separate paid requests. The final render reuses the completed draft ID, prompt, and reference media; it is not a fresh prompt submission.

## Requirements

- Python 3.10+
- FFmpeg and `ffprobe` on your `PATH`
- An API key and available credits for the configured generation service

Install FFmpeg with your system's package manager, then confirm both `ffmpeg` and `ffprobe` are available from a new terminal. On Windows, install an FFmpeg build and add its `bin` directory to `PATH`.

Common package-manager commands:

```bash
# macOS with Homebrew
brew install ffmpeg

# Debian or Ubuntu
sudo apt install ffmpeg
```

## Run locally

```bash
git clone https://github.com/Anil-matcha/open-genjutsu.git
cd open-genjutsu
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app:app --host 127.0.0.1 --port 8770
```

On Windows PowerShell, activate the environment with:

```powershell
.venv\Scripts\Activate.ps1
```

Open <http://127.0.0.1:8770>, enter your API key, choose the source video and reference image, then upload them. The key stays in page memory and is forwarded by the local app with each API request.

## Media limits

| Input | Supported formats | Limit |
| --- | --- | --- |
| Source video | MP4, MOV | 4–30 seconds; 50 MB |
| Character reference | JPEG, PNG, WebP | 10 MB |

The source video must be readable by FFmpeg. Use one replacement image per recast. The app checks the video duration before upload so the edit and restored soundtrack use a compatible timeline.

## Privacy and local files

- The API key is held in page memory and is not written to disk or application logs.
- The selected source video and reference image are uploaded for generation. A local source copy is kept in `runtime/assets/` so the original audio can be restored.
- Review and final exports are written to `runtime/exports/`.
- Use **Clear local files** in the app when finished, or remove `runtime/` after stopping the server.
- The server binds to `127.0.0.1`. Keep it there; this app has no authentication for public hosting.
- Uploaded media is subject to the generation service's own storage and retention terms.

Keep the server process and browser tab open while a job is running. Request state is held in memory and does not survive a server restart.

Use only source footage and likeness references you have permission to process and share. Review the result before publishing it.

## API flow

The current adapter calls these endpoints:

| Purpose | Request |
| --- | --- |
| Upload media | `POST /api/v1/upload_file` |
| Create 480p edit draft | `POST /api/v1/seedance-2.5-omni-reference` with `draft: true` and edit mode |
| Check job status | `GET /api/v1/predictions/{request_id}/result` |
| Finalize the approved draft | `POST /api/v1/seedance-2.5-omni-reference` with `draft_request_id` and `resolution: "1080p"` |

The local server proxies these requests so the browser does not call the model API directly. To switch providers, replace the adapter calls in `app.py` and update the request fields for that provider.

The draft request sends the source and image as references, selects edit mode, and chooses the low-resolution preview tier:

```json
{
  "prompt": "Replace the primary subject in @video1 with the character in @image1. Preserve timing, motion, framing, and background.",
  "videos_list": ["SOURCE_VIDEO_URL"],
  "images_list": ["CHARACTER_IMAGE_URL"],
  "omni_reference_task_type": "edit",
  "resolution": "480p",
  "draft": true
}
```

After review, finalization sends the completed draft's ID with `resolution: "1080p"`; the service reuses the draft's prompt and references.

## Troubleshooting

| Issue | What to check |
| --- | --- |
| FFmpeg is not ready | Install FFmpeg, open a new terminal, and confirm `ffmpeg -version` and `ffprobe -version` work. Restart the app. |
| Upload is rejected | Check the file format, size, duration, API key, and account balance. |
| A request times out | Check the service's request history before retrying. A timed-out submission may have been accepted. |
| Final audio export fails | Confirm the source file still exists in `runtime/assets/` and that FFmpeg can read its codecs. |
| Job state is missing | The app process may have restarted. Start a new session and upload the media again. |

## Project layout

```text
app.py                 Local FastAPI server and API adapter
static/index.html      Workflow UI
static/app.js          Upload, polling, review, and approval flow
static/styles.css      Responsive dark studio interface
runtime/assets/        Temporary local source copies (ignored by Git)
runtime/exports/       Local MP4 exports (ignored by Git)
```

## License

Open Genjutsu is licensed under the MIT License. See [LICENSE](LICENSE).
