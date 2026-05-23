import asyncio
import uuid
from fastapi import APIRouter, File, Form, UploadFile

from app.schemas.generate import GenerateResponse
from app.services.mock_generation import build_mock_response
from app.services.storage import save_uploads

router = APIRouter()


@router.post("/generate", response_model=GenerateResponse)
async def generate_image(
    person_image: UploadFile = File(...),
    clothing_image: UploadFile = File(...),
    prompt: str = Form(...),
    style: str = Form(...),
) -> GenerateResponse:
    job_id = str(uuid.uuid4())
    await save_uploads(job_id, person_image, clothing_image)

    await asyncio.sleep(1.2)
    return build_mock_response(job_id=job_id)
