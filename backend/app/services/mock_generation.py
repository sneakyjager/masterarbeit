from app.schemas.generate import GenerateResponse


def build_mock_response(job_id: str) -> GenerateResponse:
    return GenerateResponse(
        job_id=job_id,
        status="completed",
        image_url="/static/mock-output.svg",
    )
