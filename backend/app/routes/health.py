"""Health probe endpoint."""

from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
async def health_check() -> dict:
    # Lightweight status check for local readiness.
    return {"status": "ok"}
