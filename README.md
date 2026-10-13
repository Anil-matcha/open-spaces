# OpenSpaces — The Free, Open-Source Alternative to ChatGPT Spaces

**A free, open-source, self-hostable AI workspace for shared pages, conversations, and AI tools.**

OpenSpaces brings shared workspaces, editable pages, conversations, and AI tools into one place. Run it on infrastructure you control, inspect and change the code, and connect it to supported AI services such as MuAPI.

OpenSpaces is an independent community project. It is not affiliated with or endorsed by OpenAI. ChatGPT and ChatGPT Spaces are trademarks of OpenAI.

## Why OpenSpaces?

- **Open source and self-hostable:** use the MIT-licensed software and choose where to run it.
- **Workspace-centered:** organize work in Spaces with pages and conversations.
- **AI in the workflow:** chat with configured models and use writing and image generation tools in the page editor.
- **Built to adapt:** extend the application and its integrations for your own needs.

The software is free to use. Hosting, database, and third-party AI provider usage may have separate costs; OpenSpaces does not include free model inference.

## What works today

- Create and manage Spaces, pages, and messages.
- Edit pages with a TipTap rich-text editor, Markdown mode, slash commands, autosave, and inline AI actions.
- Use the configured MuAPI integration for chat and image generation.
- Upload media through the configured provider integration.
- Explore early meeting notes and Dot agent interfaces.

**Project status:** OpenSpaces is under active development. Some interface flows are prototypes or simulated, and several README claims from earlier versions described planned behavior. In particular, the current WebSocket is not a collaborative editing system; agent execution and meeting transcription are not complete production workflows. Check the code and issues before relying on a feature.

## Security and deployment status

The current codebase does not yet enforce authentication and per-Space authorization consistently across API routes. Do not expose it as a multi-user service or use it with sensitive data until that boundary has been implemented and reviewed. Configure secrets and database access privately; never commit `.env` files or credentials.

## Tech stack

- **Web app:** Next.js, React, Tailwind CSS, TipTap
- **API:** FastAPI, SQLAlchemy
- **Database:** PostgreSQL-compatible configuration (including Supabase)
- **AI provider integration:** MuAPI

## Run locally

### Requirements

- Node.js and npm
- Python 3.10 or newer
- A PostgreSQL database for persistent storage (the app also has an in-memory development fallback)
- A MuAPI API key for provider-backed chat, image generation, and uploads

### 1. Configure and start the API

```bash
cd server
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `server/.env` and set `MUAPI_API_KEY`. For persistence, set `DATABASE_URL` (and `DIRECT_URL` if needed) to your PostgreSQL connection string. Keep this file private.

```bash
python run.py
```

The API runs at `http://localhost:8000`; its interactive docs are at `http://localhost:8000/docs`.

### 2. Start the web app

In another terminal:

```bash
cd client
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Configuration

The API reads these settings from `server/.env`:

| Variable | Purpose |
| --- | --- |
| `PORT` | API port; defaults to `8000` |
| `HOST` | API bind address; defaults to `0.0.0.0` |
| `CORS_ORIGINS` | Comma-separated allowed browser origins |
| `DATABASE_URL` | PostgreSQL connection string |
| `DIRECT_URL` | Optional direct database connection string; takes precedence when set |
| `DEFAULT_MODEL` | Default configured chat model |
| `MUAPI_API_KEY` | Provider key for MuAPI-backed features |

## Contributing

Issues, bug reports, and pull requests are welcome. Please include steps to reproduce bugs and describe the behavior you expect. For larger changes, open an issue first so the approach can be discussed.

## License

OpenSpaces is distributed under the [MIT License](LICENSE).
