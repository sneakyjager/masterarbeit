"""In-memory job tracking for the local MVP."""

from dataclasses import dataclass
from typing import Optional
import uuid


@dataclass
class JobRecord:
    job_id: str
    status: str
    job_type: str
    image_url: Optional[str] = None


_JOBS: dict[str, JobRecord] = {}


def create_job(job_type: str, status: str, image_url: Optional[str] = None) -> JobRecord:
    """Create and store a new job record."""
    job_id = str(uuid.uuid4())
    record = JobRecord(job_id=job_id, status=status, job_type=job_type, image_url=image_url)
    _JOBS[job_id] = record
    return record


def update_job(job_id: str, status: str, image_url: Optional[str] = None) -> Optional[JobRecord]:
    """Update an existing job record if it exists."""
    record = _JOBS.get(job_id)
    if record is None:
        return None

    record.status = status
    if image_url is not None:
        record.image_url = image_url
    return record


def get_job(job_id: str) -> Optional[JobRecord]:
    """Fetch a job record by id."""
    return _JOBS.get(job_id)
