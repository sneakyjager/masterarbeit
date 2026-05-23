from pydantic import BaseModel


class GenerateResponse(BaseModel):
    job_id: str
    status: str
    image_url: str
