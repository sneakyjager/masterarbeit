# Fashion AI Studio (Local MVP)

A local-first AI fashion generation MVP with a clean monorepo structure. This phase focuses on a working frontend + backend flow with mock generation results.

## Structure

```
frontend/   Next.js app (TypeScript, Tailwind)
backend/    FastAPI app (Python)
```

## Local Setup

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at http://localhost:3000

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at http://localhost:8000

## API

- `GET /health` -> `{ "status": "ok" }`
- `POST /generate`
  - form-data: `person_image`, `clothing_image`, `prompt`, `style`
  - response: `{ "job_id": "...", "status": "completed", "image_url": "/static/mock-output.svg" }`

## Notes

- Mock generation only. Files upload to `backend/storage/uploads/{job_id}`.
- Future AI pipelines will integrate via modular services and workers.
