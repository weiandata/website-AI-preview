import { useState } from "react";
import { AlertCircle, ClipboardCheck, ClipboardCopy, FileCheck2, X } from "lucide-react";
import type { SkillDocument } from "../../../../src/lib/skills/schema";
import type { SkillContentIssue } from "../api";

export type ImportRecord = {
  fileName: string;
  kind: "new" | "conflict" | "invalid";
  document?: SkillDocument;
  /** Every problem found in the file; empty for importable files. */
  issues?: SkillContentIssue[];
  replace?: boolean;
};

/** Names the place in the file an issue points at, in the order one reads it. */
function issueLocation(issue: SkillContentIssue): string {
  return [
    issue.line ? `第 ${issue.line} 行` : undefined,
    issue.section ? `区块「${issue.section}」` : undefined,
    issue.field ? `字段 ${issue.field}` : undefined,
  ]
    .filter(Boolean)
    .join(" · ");
}

/** The plain-text report, shaped for pasting into an editor or a message. */
function reportText(records: ImportRecord[]): string {
  return records
    .filter((record) => record.issues?.length)
    .map((record) => {
      const lines = record.issues!.map((issue, index) => {
        const location = issueLocation(issue);
        return `  ${index + 1}. ${location ? `${location}：` : ""}${issue.message}${
          issue.hint ? `\n     修改方法：${issue.hint}` : ""
        }`;
      });
      return `${record.fileName}（${record.issues!.length} 个问题）\n${lines.join("\n")}`;
    })
    .join("\n\n");
}

function IssueList({ issues }: { issues: SkillContentIssue[] }) {
  return (
    <ol className="manager-import-issues">
      {issues.map((issue, index) => {
        const location = issueLocation(issue);
        return (
          <li key={`${issue.message}-${index}`}>
            {location ? <em>{location}</em> : null}
            <span>{issue.message}</span>
            {issue.hint ? <strong>修改方法：{issue.hint}</strong> : null}
          </li>
        );
      })}
    </ol>
  );
}

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
  const [copied, setCopied] = useState(false);
  const newCount = records.filter((record) => record.kind === "new").length;
  const conflictCount = records.filter((record) => record.kind === "conflict").length;
  const invalid = records.filter((record) => record.kind === "invalid");
  const issueCount = invalid.reduce(
    (total, record) => total + (record.issues?.length ?? 0),
    0,
  );

  async function copyReport(): Promise<void> {
    await navigator.clipboard.writeText(reportText(records));
    setCopied(true);
  }

  return (
    <div className="manager-modal-layer" role="presentation">
      <section className="manager-modal" role="dialog" aria-modal="true" aria-labelledby="import-title">
        <header>
          <div>
            <span>导入检查</span>
            <h2 id="import-title">{newCount} 个新增，{conflictCount} 个冲突</h2>
            {invalid.length ? (
              <p>
                {invalid.length} 个文件无法导入，共 {issueCount} 个问题；下面已列出全部问题，一次改完再导入即可
              </p>
            ) : null}
          </div>
          <button type="button" aria-label="关闭导入检查" onClick={onClose}>
            <X aria-hidden="true" size={18} />
          </button>
        </header>
        <div className="manager-import-records">
          {records.map((record, index) => (
            <article
              key={`${record.fileName}-${index}`}
              role="group"
              aria-label={record.fileName}
              className={record.kind === "invalid" ? "manager-import-invalid" : undefined}
            >
              <div>
                {record.kind === "invalid" ? (
                  <AlertCircle aria-hidden="true" size={18} />
                ) : (
                  <FileCheck2 aria-hidden="true" size={18} />
                )}
                <span>
                  <strong>{record.fileName}</strong>
                  <small>
                    {record.kind === "invalid"
                      ? `${record.issues?.length ?? 0} 个问题待修改`
                      : record.kind === "new"
                        ? "将加入草稿"
                        : "仓库中已有相同 slug"}
                  </small>
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
              </div>
              {record.issues?.length ? <IssueList issues={record.issues} /> : null}
            </article>
          ))}
        </div>
        <footer>
          {invalid.length ? (
            <button type="button" className="manager-import-copy" onClick={copyReport}>
              {copied ? (
                <ClipboardCheck aria-hidden="true" size={15} />
              ) : (
                <ClipboardCopy aria-hidden="true" size={15} />
              )}
              {copied ? "已复制" : "复制报错详情"}
            </button>
          ) : null}
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
