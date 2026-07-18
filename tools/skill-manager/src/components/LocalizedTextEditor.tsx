import type { LocalizedText } from "../../../../src/types/content";

export function LocalizedTextEditor({
  label,
  value,
  onChange,
  rows = 3,
}: {
  label: string;
  value: LocalizedText;
  onChange(value: LocalizedText): void;
  rows?: number;
}) {
  return (
    <fieldset className="manager-fieldset">
      <legend>{label}</legend>
      <div className="manager-localized-grid">
        <label>
          <span>中文</span>
          <textarea
            aria-label={`${label} 中文`}
            rows={rows}
            value={value.zh}
            onChange={(event) => onChange({ ...value, zh: event.target.value })}
          />
        </label>
        <label>
          <span>English</span>
          <textarea
            aria-label={`${label} English`}
            rows={rows}
            value={value.en}
            onChange={(event) => onChange({ ...value, en: event.target.value })}
          />
        </label>
      </div>
    </fieldset>
  );
}
