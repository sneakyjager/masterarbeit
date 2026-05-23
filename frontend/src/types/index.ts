// Shared API response types used across the UI.
export type GenerateResponse = {
  job_id: string;
  status: string;
  image_url: string;
};

export type JobStatusResponse = {
  job_id: string;
  status: string;
  job_type?: string | null;
  image_url?: string | null;
};
