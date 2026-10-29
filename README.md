# Open Genjutsu

**Recast a subject in a short video, inspect the depth and mask preparation, review a draft, then approve the final render.** The exported MP4 restores the source video's soundtrack.

Open Genjutsu is a local-first video workspace. It keeps a source copy on your device and gives you a full-clip review gate before generation and again before the HD render.

![MIT License](https://img.shields.io/github/license/Anil-matcha/open-genjutsu) ![Python](https://img.shields.io/badge/Python-3.10%2B-3776AB) ![Local-first](https://img.shields.io/badge/runtime-local--first-5865F2)

## Contents

- [How it works](#how-it-works)
- [Requirements](#requirements)
- [Run locally](#run-locally)
- [Media limits](#media-limits)
- [Privacy and local files](#privacy-and-local-files)
- [API adapter](#api-adapter)
- [Troubleshooting](#troubleshooting)
- [Project layout](#project-layout)
- [License](#license)

## How it works

1. **Choose inputs.** Add a 4–30 second source video and a character reference image.
2. **Prepare depth and matte.** The app submits the source clip to a depth-map task and a transparent video background-removal task in parallel.
3. **Build a depth composite locally.** FFmpeg applies the grayscale depth values inside the subject matte and keeps the original RGB scene elsewhere. The preview is normalized to 24 fps and at most 960 pixels on its longest side; source audio stays attached.
4. **Review the preparation.** Play the source, depth map, matte, and composite across the full clip. Draft creation stays disabled until you confirm the depth and mask coverage.
5. **Generate a draft.** The reviewed composite and character image are sent as edit references for a 480p preview.
6. **Review and approve.** Check the full draft. A separate 1080p render is only submitted after you approve it.
7. **Export locally.** FFmpeg combines the final video with the complete source soundtrack and saves a downloadable MP4.

Preparation, draft, and final requests each use account credits. The final render reuses the completed draft ID, prompt, and references.

The draft is a review checkpoint: it lets you catch mask, identity, or motion issues before choosing whether to submit the separate full-resolution render.

## Requirements

- Python 3.10+
- FFmpeg and <code>ffprobe</code> on your <code>PATH</code>
- An API key and available credits for the configured generation API

Install FFmpeg with your system's package manager, then confirm both executables are available from a new terminal.

<details>
<summary>Install FFmpeg</summary>

<pre><code># macOS with Homebrew
brew install ffmpeg

# Debian or Ubuntu
sudo apt install ffmpeg</code></pre>
</details>

## Run locally

<pre><code>git clone https://github.com/Anil-matcha/open-genjutsu.git
cd open-genjutsu
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python -m uvicorn app:app --host 127.0.0.1 --port 8770</code></pre>

On Windows PowerShell, activate the environment with:

<pre><code>.venv\Scripts\Activate.ps1</code></pre>

Open <http://127.0.0.1:8770>, enter your API key, choose the source video and reference image, then upload them. The key stays in page memory and is forwarded by the local app with each API request.

## Media limits

| Input | Supported formats | Limit |
| --- | --- | --- |
| Source video | MP4, MOV | 4–30 seconds; 50 MB |
| Character reference | JPEG, PNG, WebP | 10 MB |

The source video must be readable by FFmpeg. Use one replacement image per recast. The app checks duration before upload. The depth and matte services must return full-length video outputs, and the transparent matte output must retain an alpha channel.

## Privacy and local files

- The API key is held in page memory and is not written to disk or application logs.
- The source video is uploaded to the preparation services; the reference image is uploaded for the edit. The source is also kept locally in <code>runtime/assets/</code> for previews and audio restoration.
- Downloaded depth maps, mattes, and composites are stored under <code>runtime/preparations/</code>. The reviewed composite is uploaded for draft generation only after you approve the preparation.
- Draft and final review exports are written to <code>runtime/exports/</code>.
- Use **Clear local files** in the app when finished, or remove <code>runtime/</code> after stopping the server.
- The server binds to <code>127.0.0.1</code>. Keep it there; this app has no authentication for public hosting.
- Uploaded media is subject to the API's storage and retention terms.

Keep the server process and browser tab open while a job is running. Request state is held in memory and does not survive a server restart.

Use only source footage and likeness references you have permission to process and share. Review the result before publishing it.

## API adapter

The shipped adapter uses these API endpoints:

| Purpose | Request |
| --- | --- |
| Upload source and reference | <code>POST /api/v1/upload_file</code> |
| Create per-frame depth video | <code>POST /api/v1/depth-anything</code> |
| Create transparent subject matte | <code>POST /api/v1/video-background-remover</code> |
| Check preparation or generation status | <code>GET /api/v1/predictions/{request_id}/result</code> |
| Upload the reviewed composite and create a 480p edit draft | <code>POST /api/v1/upload_file</code>, then <code>POST /api/v1/seedance-2.5-omni-reference</code> with <code>draft: true</code> |
| Finalize the approved draft | <code>POST /api/v1/seedance-2.5-omni-reference</code> with <code>draft_request_id</code> and <code>resolution: "1080p"</code> |

The browser calls the local FastAPI adapter; it does not call the model API directly. Replace the adapter calls in <code>app.py</code> to switch services.

The draft uses the prepared composite as <code>@video1</code> and the character reference as <code>@image1</code>:

<pre><code>{
  "prompt": "Replace the primary subject in @video1 with the character in @image1. Preserve motion, framing, lighting, timing, and the original scene.",
  "videos_list": ["REVIEWED_COMPOSITE_URL"],
  "images_list": ["CHARACTER_IMAGE_URL"],
  "omni_reference_task_type": "edit",
  "resolution": "480p",
  "draft": true
}</code></pre>

Finalization sends the completed draft ID with <code>resolution: "1080p"</code>; the service reuses the draft's prompt and references.

## Troubleshooting

| Issue | What to check |
| --- | --- |
| FFmpeg is not ready | Install FFmpeg, open a new terminal, and confirm <code>ffmpeg -version</code> and <code>ffprobe -version</code> work. |
| Upload is rejected | Check format, size, duration, API key, and account balance. |
| Depth or matte task fails | Check task history before retrying. A timed-out submission may have been accepted. |
| Transparent matte has a black background | Confirm the matte task returned WebM VP9 with alpha. |
| Prepared composite is too large | Try a shorter or lower-resolution source clip. |
| A request times out | Check task history before retrying to avoid a duplicate submission. |
| Final audio export fails | Confirm the source file still exists under <code>runtime/assets/</code> and FFmpeg can read its codecs. |
| Job state is missing | The app process may have restarted. Start a new session and upload the media again. |

## Project layout

<pre><code>app.py                 Local FastAPI server and API adapter
static/index.html      Workflow interface
static/app.js          Upload, preparation, polling, review, and approval flow
static/styles.css      Responsive studio interface
runtime/assets/        Temporary local source copies (ignored by Git)
runtime/preparations/  Depth, matte, and composite files (ignored by Git)
runtime/exports/       Local review and final exports (ignored by Git)</code></pre>

## License

Open Genjutsu is licensed under the MIT License. See [LICENSE](LICENSE).
