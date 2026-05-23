"""Generate endpoint for mock fashion images."""

import asyncio
from fastapi import APIRouter, File, Form, UploadFile

from app.schemas.generate import GenerateResponse
from app.services.mock_generation import build_mock_response
from app.services.job_store import create_job, update_job
from app.services.storage import save_uploads

router = APIRouter()


@router.post("/generate", response_model=GenerateResponse)
async def generate_image(
    person_image: UploadFile = File(...),
    clothing_image: UploadFile = File(...),
    prompt: str = Form(...),
    style: str = Form(...),
) -> GenerateResponse:
    # Track each request by a job id and persist uploads to disk.
    record = create_job(job_type="generate", status="processing")
    await save_uploads(record.job_id, person_image, clothing_image)

    # Simulate model latency for UI loading states.
    await asyncio.sleep(1.2)
    update_job(record.job_id, status="completed", image_url="/static/mock-output.svg")
    return build_mock_response(job_id=record.job_id)
