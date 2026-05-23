"""Job lifecycle endpoints for training and status checks."""

from fastapi import APIRouter

from app.schemas.jobs import JobStatusResponse
from app.services.job_store import create_job, get_job

router = APIRouter()


@router.post("/train-lora", response_model=JobStatusResponse)
async def train_lora() -> JobStatusResponse:
    # Placeholder: enqueue a training job for future GPU workers.
    record = create_job(job_type="train-lora", status="queued")
    return JobStatusResponse(
        job_id=record.job_id,
        status=record.status,
        job_type=record.job_type,
        image_url=record.image_url,
    )


@router.get("/job/{job_id}", response_model=JobStatusResponse)
async def get_job_status(job_id: str) -> JobStatusResponse:
    record = get_job(job_id)
    if record is None:
        return JobStatusResponse(job_id=job_id, status="not_found")

    return JobStatusResponse(
        job_id=record.job_id,
        status=record.status,
        job_type=record.job_type,
        image_url=record.image_url,
    )
