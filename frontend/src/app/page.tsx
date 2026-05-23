"use client";

// Main UI for uploading assets and calling the mock generation endpoint.
import { useEffect, useMemo, useState } from "react";
import UploadField from "../components/UploadField";
import SelectField from "../components/SelectField";
import GeneratedPreview from "../components/GeneratedPreview";
import { generateImage, getJobStatus } from "../services/api";
import type { GenerateResponse, JobStatusResponse } from "../types";

const STYLE_OPTIONS = [
  { value: "editorial", label: "Editorial Minimal" },
  { value: "street", label: "Street Luxe" },
  { value: "atelier", label: "Atelier Couture" },
  { value: "sport", label: "Performance Tech" },
];

export default function HomePage() {
  const [personImage, setPersonImage] = useState<File | null>(null);
  const [clothingImage, setClothingImage] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState(STYLE_OPTIONS[0]?.value ?? "editorial");
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [jobStatus, setJobStatus] = useState<JobStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canGenerate = useMemo(() => {
    return Boolean(personImage && clothingImage && prompt.trim());
  }, [personImage, clothingImage, prompt]);

  const handleGenerate = async () => {
    // Guard against missing files before hitting the API.
    if (!personImage || !clothingImage) {
      setError("Please upload both images.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Send multipart payload to the FastAPI backend.
      const response = await generateImage({
        personImage,
        clothingImage,
        prompt,
        style,
      });
      setResult(response);
      setJobStatus({
        job_id: response.job_id,
        status: response.status,
        job_type: "generate",
        image_url: response.image_url,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!result?.job_id) {
      return;
    }

    let isActive = true;

    const pollStatus = async () => {
      try {
        const status = await getJobStatus(result.job_id);
        if (!isActive) {
          return;
        }
        setJobStatus(status);
        if (status.status === "completed" || status.status === "failed" || status.status === "not_found") {
          isActive = false;
        }
      } catch {
        if (isActive) {
          setJobStatus((prev) => prev ?? null);
        }
      }
    };

    const intervalId = setInterval(pollStatus, 2000);
    pollStatus();

    return () => {
      isActive = false;
      clearInterval(intervalId);
    };
  }, [result?.job_id]);

  return (
    <main className="min-h-screen px-6 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <header className="flex flex-col gap-3">
          <p className="text-sm uppercase tracking-[0.35em] text-accent">Fashion AI Studio</p>
          <h1 className="text-3xl font-semibold text-white md:text-4xl">
            Local-first AI fashion generation pipeline
          </h1>
          <p className="max-w-2xl text-base text-mist/80">
            Upload a person and a garment, describe the look, and preview a realistic mock output while the
            real pipelines are wired in.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-white/10 bg-smoke/70 p-6 shadow-glow backdrop-blur">
            <div className="grid gap-5">
              <UploadField
                label="Person image"
                description="Front-facing shot works best."
                onChange={setPersonImage}
              />
              <UploadField
                label="Clothing image"
                description="Clear product photo or flat lay."
                onChange={setClothingImage}
              />

              <div className="grid gap-2">
                <label className="text-sm font-medium text-white">Prompt</label>
                <textarea
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Describe the desired styling, lighting, and mood."
                  className="h-24 w-full rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 text-sm text-white outline-none transition focus:border-accent/70"
                />
              </div>

              <SelectField
                label="Style"
                value={style}
                options={STYLE_OPTIONS}
                onChange={setStyle}
              />

              {error && <p className="text-sm text-ember">{error}</p>}

              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canGenerate || isLoading}
                className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-ink transition hover:bg-neon disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isLoading ? "Generating..." : "Generate look"}
              </button>
            </div>
          </div>

          <GeneratedPreview
            imageUrl={result ? `http://localhost:8000${result.image_url}` : undefined}
            isLoading={isLoading}
            jobId={result?.job_id}
            status={jobStatus?.status ?? result?.status}
          />
        </section>
      </div>
    </main>
  );
}
