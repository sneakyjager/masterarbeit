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


## General plan 
You are building a local-first AI fashion generation MVP with a clean scalable architecture.

PROJECT GOAL:
Create a web application where a user can:

* upload a person image
* upload a clothing image
* select a style/prompt
* generate realistic AI fashion images

The project should focus mainly on:

1. clean AI pipeline integration
2. scalable architecture
3. local development
4. future compatibility with cloud GPU deployment

TECH STACK:
Frontend:

* Next.js (latest stable version)
* TypeScript
* TailwindCSS
* modern minimal UI

Backend:

* Python
* FastAPI
* Uvicorn

Database/Auth/Storage:

* Supabase (prepare structure only for now)

AI Infrastructure:

* PyTorch
* Hugging Face Diffusers
* CUDA-ready architecture
* GPU execution abstraction layer

Cloud GPU Target:

* RunPod RTX 4090

IMPORTANT:
The project must run locally first.
AI generation may initially use placeholder/mock generation endpoints until real pipelines are connected.

MAIN AI PIPELINES TO SUPPORT:

1. CatVTON / IDM-VTON
2. LoRA loading/training
3. ControlNet
4. SDXL
5. FLUX
6. Upscaling/refinement pipeline

ARCHITECTURE REQUIREMENTS:

Create a clean monorepo-like structure:

/frontend
Next.js app

/backend
FastAPI app

/backend/ai
pipelines/
preprocessing/
training/
refinement/
models/
workers/

/backend/ai/pipelines
vton_pipeline.py
identity_pipeline.py
controlnet_pipeline.py
generation_pipeline.py
refinement_pipeline.py

/backend/ai/training
lora_training.py

/backend/ai/preprocessing
segmentation.py
pose_extraction.py
image_resize.py
masking.py

/backend/ai/models
loaders.py
model_registry.py

/backend/ai/workers
gpu_worker.py
queue_manager.py

REQUIREMENTS:

* keep AI pipeline modular
* each AI pipeline should be independently callable
* use dependency injection where appropriate
* keep future GPU scaling in mind
* avoid tight coupling
* prepare architecture for future async job queue
* create placeholder interfaces for:

  * CatVTON
  * LoRA
  * ControlNet
  * FLUX
* include logging and config system
* use environment variables
* use Pydantic models
* separate routes/services/schemas cleanly

FRONTEND REQUIREMENTS:
Create a minimal but clean UI with:

* upload person image
* upload clothing image
* prompt input
* style selector
* generate button
* generated image preview
* generation status/loading state

UI STYLE:

* modern AI SaaS aesthetic
* dark mode
* clean spacing
* minimal but premium look

BACKEND API REQUIREMENTS:
Create endpoints:

POST /generate
POST /train-lora
GET /job/{id}
GET /health

The generate endpoint should initially:

* accept uploaded images
* save files locally
* return mocked generation output
* prepare hooks for real AI pipeline integration

AI PIPELINE DESIGN:
The code should clearly separate:

1. preprocessing
2. identity preservation
3. VTON
4. generation
5. refinement

Create abstract base classes/interfaces for future model swapping.

IMPORTANT DEVELOPMENT PHILOSOPHY:
Focus on:

* architecture quality
* maintainability
* AI pipeline extensibility
* production-ready structure

Do NOT overfocus initially on:

* authentication
* payments
* deployment
* Kubernetes
* advanced DevOps

FIRST GOAL:
Get the project running locally with:

* Next.js frontend
* FastAPI backend
* mock AI pipeline flow
* clean folder structure
* upload flow working
* generation request lifecycle working

SECOND GOAL:
Prepare integration points for:

* CatVTON
* SDXL
* LoRA
* ControlNet
* FLUX

All code should be clean, documented, and scalable.
