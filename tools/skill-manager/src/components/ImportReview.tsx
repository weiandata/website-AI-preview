import { AlertCircle, FileCheck2, X } from "lucide-react";
import type { SkillDocument } from "../../../../src/lib/skills/schema";

export type ImportRecord = {
  fileName: string;
  kind: "new" | "conflict" | "invalid";
  document?: SkillDocument;
  error?: string;
  replace?: boolean;
};

export function ImportReview({
  records,
  onChange,
  onApply,
  onClose,
}: {
  records: ImportRecord[];
  onChange(records: ImportRecord[]): void;
  onApply(): void;
  onClose(): void;
}) {
  const newCount = records.filter((record) => record.kind === "new").length;
  const conflictCount = records.filter((record) => record.kind === "conflict").length;
  const invalidCount = records.filter((record) => record.kind === "invalid").length;

  return (
    <div className="manager-modal-layer" role="presentation">
      <section className="manager-modal" role="dialog" aria-modal="true" aria-labelledby="import-title">
        <header>
          <div>
            <span>导入检查</span>
            <h2 id="import-title">{newCount} 个新增，{conflictCount} 个冲突</h2>
            {invalidCount ? <p>{invalidCount} 个文件无法导入</p> : null}
          </div>
          <button type="button" aria-label="关闭导入检查" onClick={onClose}>
            <X aria-hidden="true" size={18} />
          </button>
        </header>
        <div className="manager-import-records">
          {records.map((record, index) => (
            <article key={`${record.fileName}-${index}`}>
              {record.kind === "invalid" ? (
                <AlertCircle aria-hidden="true" size={18} />
              ) : (
                <FileCheck2 aria-hidden="true" size={18} />
              )}
              <span>
                <strong>{record.fileName}</strong>
                <small>{record.error ?? (record.kind === "new" ? "将加入草稿" : "仓库中已有相同 slug")}</small>
              </span>
              {record.kind === "conflict" ? (
                <label>
                  <input
                    type="checkbox"
                    checked={Boolean(record.replace)}
                    onChange={(event) =>
                      onChange(records.map((item, itemIndex) =>
                        itemIndex === index ? { ...item, replace: event.target.checked } : item,
                      ))
                    }
                  />
                  允许覆盖
                </label>
              ) : null}
            </article>
          ))}
        </div>
        <footer>
          <button type="button" onClick={onClose}>取消</button>
          <button
            type="button"
            className="manager-primary-button"
            onClick={onApply}
            disabled={!records.some((record) => record.kind === "new" || record.replace)}
          >
            加入编辑队列
          </button>
        </footer>
      </section>
    </div>
  );
}
