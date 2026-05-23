"""Local file storage for uploaded assets."""

from pathlib import Path
from fastapi import UploadFile

UPLOAD_ROOT = Path("storage/uploads")


async def save_uploads(job_id: str, person_image: UploadFile, clothing_image: UploadFile) -> None:
    # Each job gets its own folder for easy inspection.
    job_dir = UPLOAD_ROOT / job_id
    job_dir.mkdir(parents=True, exist_ok=True)

    await _save_file(job_dir / "person" / person_image.filename, person_image)
    await _save_file(job_dir / "clothing" / clothing_image.filename, clothing_image)


async def _save_file(path: Path, upload: UploadFile) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    # Read once and write to disk for the MVP.
    contents = await upload.read()
    path.write_bytes(contents)
