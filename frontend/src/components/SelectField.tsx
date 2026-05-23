type SelectOption = {
  value: string;
  label: string;
};

type SelectFieldProps = {
  label: string;
  value: string;
  options: SelectOption[];
  onChange: (value: string) => void;
};

export default function SelectField({ label, value, options, onChange }: SelectFieldProps) {
  return (
    <div className="grid gap-2">
      <label className="text-sm font-medium text-white">{label}</label>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-white/10 bg-ink/70 px-4 py-3 text-sm text-white outline-none"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-ink">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
