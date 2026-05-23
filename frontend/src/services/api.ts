// API helpers for the local backend.
import type { GenerateResponse, JobStatusResponse } from "../types";

type GeneratePayload = {
  personImage: File;
  clothingImage: File;
  prompt: string;
  style: string;
};

const API_BASE_URL = "http://localhost:8000";

export async function generateImage(payload: GeneratePayload): Promise<GenerateResponse> {
  // Use multipart form-data to match the FastAPI endpoint.
  const formData = new FormData();
  formData.append("person_image", payload.personImage);
  formData.append("clothing_image", payload.clothingImage);
  formData.append("prompt", payload.prompt);
  formData.append("style", payload.style);

  const response = await fetch(`${API_BASE_URL}/generate`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Generation failed. Please try again.");
  }

  return response.json();
}

export async function getJobStatus(jobId: string): Promise<JobStatusResponse> {
  const response = await fetch(`${API_BASE_URL}/job/${jobId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch job status.");
  }

  return response.json();
}
