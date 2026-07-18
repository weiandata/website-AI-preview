import { ArrowDown, ArrowUp, Plus, Trash2 } from "lucide-react";

export function StringListEditor({
  label,
  items,
  onChange,
  multiline = false,
}: {
  label: string;
  items: string[];
  onChange(items: string[]): void;
  multiline?: boolean;
}) {
  function update(index: number, value: string): void {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  function move(index: number, direction: -1 | 1): void {
    const target = index + direction;
    if (target < 0 || target >= items.length) return;
    const next = [...items];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <fieldset className="manager-fieldset manager-list-editor">
      <legend>{label}</legend>
      <div className="manager-list-stack">
        {items.map((item, index) => (
          <div className="manager-list-row" key={`${index}-${item.slice(0, 16)}`}>
            <span className="manager-list-index">{index + 1}</span>
            {multiline ? (
              <textarea
                aria-label={`${label} ${index + 1}`}
                rows={2}
                value={item}
                onChange={(event) => update(index, event.target.value)}
              />
            ) : (
              <input
                aria-label={`${label} ${index + 1}`}
                value={item}
                onChange={(event) => update(index, event.target.value)}
              />
            )}
            <div className="manager-row-actions">
              <button
                type="button"
                aria-label={`${label} ${index + 1} 上移`}
                onClick={() => move(index, -1)}
                disabled={index === 0}
              >
                <ArrowUp aria-hidden="true" size={15} />
              </button>
              <button
                type="button"
                aria-label={`${label} ${index + 1} 下移`}
                onClick={() => move(index, 1)}
                disabled={index === items.length - 1}
              >
                <ArrowDown aria-hidden="true" size={15} />
              </button>
              <button
                type="button"
                aria-label={`删除${label} ${index + 1}`}
                onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
              >
                <Trash2 aria-hidden="true" size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <button
        className="manager-add-row"
        type="button"
        onClick={() => onChange([...items, ""])}
      >
        <Plus aria-hidden="true" size={15} />
        添加{label}
      </button>
    </fieldset>
  );
}
