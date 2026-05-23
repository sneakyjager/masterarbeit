"""Pydantic schemas for job lifecycle endpoints."""

from typing import Optional
from pydantic import BaseModel


class JobStatusResponse(BaseModel):
    job_id: str
    status: str
    job_type: Optional[str] = None
    image_url: Optional[str] = None
