type UploadFieldProps = {
  label: string;
  description?: string;
  onChange: (file: File | null) => void;
};

// Reusable file input with label and helper text.
export default function UploadField({ label, description, onChange }: UploadFieldProps) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-white">{label}</label>
      {description && <p className="text-xs text-mist/70">{description}</p>}
      <input
        type="file"
        accept="image/*"
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
        className="w-full rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 text-sm text-white file:text-xs file:font-semibold"
      />
    </div>
  );
}
