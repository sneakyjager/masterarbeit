type GeneratedPreviewProps = {
  imageUrl?: string;
  isLoading: boolean;
  jobId?: string;
  status?: string;
};

// Output panel that shows loading, mock image, and job metadata.
export default function GeneratedPreview({
  imageUrl,
  isLoading,
  jobId,
  status,
}: GeneratedPreviewProps) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-white/10 bg-smoke/70 p-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Preview</h2>
        {status && <span className="text-xs text-mist/70">{status}</span>}
      </div>

      <div className="mt-6 flex flex-1 items-center justify-center rounded-2xl border border-dashed border-white/15 bg-ink/40">
        {isLoading && (
          <div className="flex flex-col items-center gap-2 text-sm text-mist/70">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-accent border-t-transparent" />
            <p>Generating preview...</p>
          </div>
        )}

        {!isLoading && imageUrl && (
          <img src={imageUrl} alt="Generated fashion" className="h-full w-full rounded-2xl object-cover" />
        )}

        {!isLoading && !imageUrl && (
          <p className="text-sm text-mist/70">Your generated output will appear here.</p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-mist/70">
        <span>Job ID</span>
        <span>{jobId ?? "-"}</span>
      </div>
    </div>
  );
}
