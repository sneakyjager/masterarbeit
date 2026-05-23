"""Pydantic schemas for generation responses."""

from pydantic import BaseModel


class GenerateResponse(BaseModel):
    # Matches the frontend's expected shape for mock and real runs.
    job_id: str
    status: str
    image_url: str
