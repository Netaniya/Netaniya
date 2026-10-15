# AI Quality Lab · React / TypeScript + FastAPI

[Deutsch](README.md) · [Русский](README.ru.md) · [Public Worker demo](https://ai-quality-lab-neta26.wellolm4.chatgpt.site)

A separately runnable full-stack implementation of the same learning project: React UI, typed HTTP requests, a Python/FastAPI backend and the shared evaluator. This folder contains the local React/Python version; the public Worker demo remains unchanged.

## Run

Node.js 22.12+ or 24+, Python 3.12. From the cloned repository:

~~~sh
cd portfolio/ai-quality-lab/fullstack
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements-dev.txt
cd frontend
npm ci
npm run build
npm test
cd ..
.venv/bin/python -m pytest tests -q
.venv/bin/uvicorn backend.app:app --host 127.0.0.1 --port 8000
~~~

Open **http://127.0.0.1:8000**. Edit examples, compare answers and download reports without an API key. Interactive API docs: **http://127.0.0.1:8000/docs**.

On Windows use `python` to create the environment, `.venv\Scripts\python.exe` and `.venv\Scripts\uvicorn.exe` instead of the corresponding `bin/` paths. For development, run `npm run dev` from `frontend` in another terminal; Vite proxies `/api` to the local backend.

## Features

Eight fixed German cases, case selection, editable A/B answers, weighted rule checks, four UI languages (German first), report export and an optional server-side Responses API adapter. Editing a generated answer clears its model attribution. The provider key never goes to the browser; a separate access token stays in client memory only.

## Optional live generation

Disabled by default. All four environment variables are required: `QUALITY_LAB_ENABLE_LIVE=true`, `OPENAI_API_KEY`, `OPENAI_MODEL` and `QUALITY_LAB_GENERATION_TOKEN` (a separate random token of at least 32 characters). Set these in the server shell or secret manager and restart; `.env` is not loaded automatically. See `.env.example`. Never enter the provider API key in the UI.

Only fixed fixture prompts are sent to `https://api.openai.com/v1/responses`. A/B use the same configured model with different instructions. No tools or arbitrary proxy prompts; no automatic retries. Requests use `store: false` and `max_output_tokens: 512`. This storage setting is not a promise of zero provider retention.

The default cap is 20 attempts per hour per process, including failures. Restarted or multiple processes have separate counters. Configure account spending limits separately. Live calls may incur API charges; no estimated price is presented as a measured cost.

## API

- `GET /api/config`: availability without secrets.
- `GET /api/cases`: transparent test catalog.
- `POST /api/evaluate`: shared Python evaluation.
- `POST /api/generate`: configured live provider call, requiring `X-Generation-Token`.

The report exports model receipts only when they match the evaluated text. The evaluator itself makes no model calls. Inputs are not persisted server-side. This is a local reference implementation; public hosting would require managed authentication and a durable distributed budget.

## Validation

**17 backend tests, 8 client tests, TypeScript checking and production build passed.** Tests use a simulated HTTP provider to check contract, errors, timeout, access control, budget and output provenance. **A real model call has not yet been verified.** Docker build and visual browser/mobile QA have not been performed.

Dockerfile included; from the parent `portfolio/ai-quality-lab` directory:

~~~sh
docker build -f fullstack/Dockerfile -t quality-lab-fullstack .
docker run --rm -p 127.0.0.1:8000:8000 quality-lab-fullstack
~~~

## Credits

Portfolio by Natalie Ragulina (Netaniya), developed collaboratively with AI assistance. The owner supplied the portfolio goal and requirements; the AI assistant implemented the code, tests and technical extension.

API contract: [OpenAI Responses](https://developers.openai.com/api/docs/guides/migrate-to-responses).
