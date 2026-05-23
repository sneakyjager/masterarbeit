"""FastAPI application entrypoint and wiring."""

from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.routes.generate import router as generate_router
from app.routes.health import router as health_router
from app.routes.jobs import router as jobs_router
from app.utils.logging import configure_logging

configure_logging()

# Resolve paths so static assets work regardless of the working directory.
BASE_DIR = Path(__file__).resolve().parent.parent
STATIC_DIR = BASE_DIR / "static"

app = FastAPI(title="Fashion AI Backend", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Health, generation, and job lifecycle endpoints.
app.include_router(health_router)
app.include_router(generate_router)
app.include_router(jobs_router)

# Serve mock output assets in local mode.
app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")
