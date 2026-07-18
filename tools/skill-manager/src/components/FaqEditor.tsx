import { Plus, Trash2 } from "lucide-react";
import type { SkillFaq } from "../../../../src/types/content";

export function FaqEditor({
  value,
  onChange,
}: {
  value: SkillFaq[];
  onChange(value: SkillFaq[]): void;
}) {
  function update(index: number, next: SkillFaq): void {
    onChange(value.map((entry, entryIndex) => (entryIndex === index ? next : entry)));
  }

  return (
    <fieldset className="manager-fieldset">
      <legend>常见问题</legend>
      <div className="manager-complex-stack">
        {value.map((entry, index) => (
          <article className="manager-complex-card" key={`${entry.question.en}-${index}`}>
            <div className="manager-card-heading">
              <strong>问题 {index + 1}</strong>
              <button
                type="button"
                aria-label={`删除常见问题 ${index + 1}`}
                onClick={() => onChange(value.filter((_, entryIndex) => entryIndex !== index))}
              >
                <Trash2 aria-hidden="true" size={16} />
              </button>
            </div>
            {(["question", "answer"] as const).map((field) => (
              <div className="manager-localized-grid" key={field}>
                <label>
                  <span>{field === "question" ? "中文问题" : "中文回答"}</span>
                  <textarea
                    rows={2}
                    value={entry[field].zh}
                    onChange={(event) =>
                      update(index, {
                        ...entry,
                        [field]: { ...entry[field], zh: event.target.value },
                      })
                    }
                  />
                </label>
                <label>
                  <span>{field === "question" ? "English question" : "English answer"}</span>
                  <textarea
                    rows={2}
                    value={entry[field].en}
                    onChange={(event) =>
                      update(index, {
                        ...entry,
                        [field]: { ...entry[field], en: event.target.value },
                      })
                    }
                  />
                </label>
              </div>
            ))}
          </article>
        ))}
      </div>
      <button
        className="manager-add-row"
        type="button"
        onClick={() =>
          onChange([
            ...value,
            { question: { zh: "", en: "" }, answer: { zh: "", en: "" } },
          ])
        }
      >
        <Plus aria-hidden="true" size={15} />
        添加常见问题
      </button>
    </fieldset>
  );
}
