import { Plus, Trash2 } from "lucide-react";
import type { SkillChangelog } from "../../../../src/types/content";

export function ChangelogEditor({
  value,
  onChange,
}: {
  value: SkillChangelog[];
  onChange(value: SkillChangelog[]): void;
}) {
  function update(index: number, next: SkillChangelog): void {
    onChange(value.map((entry, entryIndex) => (entryIndex === index ? next : entry)));
  }

  return (
    <fieldset className="manager-fieldset">
      <legend>更新记录</legend>
      <div className="manager-complex-stack">
        {value.map((entry, index) => (
          <article className="manager-complex-card" key={`${entry.version}-${index}`}>
            <div className="manager-inline-fields">
              <label>
                <span>版本</span>
                <input
                  value={entry.version}
                  onChange={(event) => update(index, { ...entry, version: event.target.value })}
                />
              </label>
              <label>
                <span>日期</span>
                <input
                  type="date"
                  value={entry.date}
                  onChange={(event) => update(index, { ...entry, date: event.target.value })}
                />
              </label>
              <button
                type="button"
                aria-label={`删除更新记录 ${index + 1}`}
                onClick={() => onChange(value.filter((_, entryIndex) => entryIndex !== index))}
              >
                <Trash2 aria-hidden="true" size={16} />
              </button>
            </div>
            <div className="manager-localized-grid">
              <label>
                <span>中文说明</span>
                <textarea
                  rows={2}
                  value={entry.notes.zh}
                  onChange={(event) =>
                    update(index, { ...entry, notes: { ...entry.notes, zh: event.target.value } })
                  }
                />
              </label>
              <label>
                <span>English notes</span>
                <textarea
                  rows={2}
                  value={entry.notes.en}
                  onChange={(event) =>
                    update(index, { ...entry, notes: { ...entry.notes, en: event.target.value } })
                  }
                />
              </label>
            </div>
          </article>
        ))}
      </div>
      <button
        className="manager-add-row"
        type="button"
        onClick={() =>
          onChange([
            ...value,
            { version: "1.0.0", date: new Date().toISOString().slice(0, 10), notes: { zh: "", en: "" } },
          ])
        }
      >
        <Plus aria-hidden="true" size={15} />
        添加更新记录
      </button>
    </fieldset>
  );
}
