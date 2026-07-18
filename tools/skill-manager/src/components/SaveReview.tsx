import { AlertTriangle, Check, X } from "lucide-react";
import { useState } from "react";
import type { SavePlan, SaveChangeKind, SaveResultEntry } from "../save-plan";

const kindLabels: Record<SaveChangeKind, string> = {
  create: "新增",
  update: "更新",
  rename: "改名",
  delete: "删除",
};

const kindOrder: SaveChangeKind[] = ["create", "update", "rename", "delete"];

export function SaveReview({
  plan,
  onConfirm,
  onClose,
}: {
  plan: SavePlan;
  onConfirm(): void;
  onClose(): void;
}) {
  const [acknowledged, setAcknowledged] = useState<Set<string>>(new Set());
  const breakingRenames = plan.changes.filter((change) => change.breaksPublicUrl);
  const ready = breakingRenames.every((change) => acknowledged.has(change.path));

  return (
    <div className="manager-modal-layer" role="presentation">
      <section className="manager-modal" role="dialog" aria-modal="true" aria-label="确认保存修改">
        <header>
          <div>
            <span>保存检查</span>
            <h2>确认保存修改</h2>
            <p className="manager-modal-note">以下 Markdown 文件会写入这台电脑的 content/skills 目录。</p>
          </div>
          <button type="button" aria-label="关闭保存检查" onClick={onClose}>
            <X aria-hidden="true" size={18} />
          </button>
        </header>

        <div className="manager-save-groups">
          {kindOrder.map((kind) => {
            const changes = plan.changes.filter((change) => change.kind === kind);
            if (!changes.length) return null;
            return (
              <section className="manager-save-group" key={kind}>
                <h3>{`${kindLabels[kind]} ${changes.length} 个`}</h3>
                <ul>
                  {changes.map((change) => (
                    <li key={`${kind}-${change.path}`}>
                      <code>
                        {change.kind === "rename"
                          ? `${change.fromPath} → ${change.path}`
                          : change.path}
                      </code>
                      {change.breaksPublicUrl ? (
                        <label className="manager-save-ack">
                          <input
                            type="checkbox"
                            checked={acknowledged.has(change.path)}
                            onChange={(event) =>
                              setAcknowledged((current) => {
                                const next = new Set(current);
                                if (event.target.checked) next.add(change.path);
                                else next.delete(change.path);
                                return next;
                              })
                            }
                          />
                          <span>
                            <AlertTriangle aria-hidden="true" size={14} />
                            我知道 /skills/{change.fromSlug}/ 这个旧网址会失效
                          </span>
                        </label>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>

        <footer>
          <button type="button" onClick={onClose}>取消</button>
          <button
            type="button"
            className="manager-primary-button"
            disabled={!ready}
            onClick={onConfirm}
          >
            <Check aria-hidden="true" size={16} />
            确认保存
          </button>
        </footer>
      </section>
    </div>
  );
}

export function SaveResult({
  summary,
  entries,
  onClose,
}: {
  summary: string;
  entries: SaveResultEntry[];
  onClose(): void;
}) {
  const failed = entries.filter((entry) => !entry.ok);

  return (
    <div className="manager-modal-layer" role="presentation">
      <section className="manager-modal" role="dialog" aria-modal="true" aria-label="保存结果">
        <header>
          <div>
            <span>保存结果</span>
            <h2>{summary}</h2>
            {failed.length ? <p>失败的文件仍留在待保存清单里，修正后可以再次保存。</p> : null}
          </div>
          <button type="button" aria-label="关闭保存结果" onClick={onClose}>
            <X aria-hidden="true" size={18} />
          </button>
        </header>

        <ul className="manager-save-results">
          {entries.map((entry) => (
            <li className={entry.ok ? "is-ok" : "is-failed"} key={`${entry.kind}-${entry.path}`}>
              <span className="manager-save-result-state">
                {entry.ok ? (
                  <Check aria-hidden="true" size={15} />
                ) : (
                  <AlertTriangle aria-hidden="true" size={15} />
                )}
                {kindLabels[entry.kind]}
              </span>
              <span>
                <code>{entry.path}</code>
                {entry.message ? <small>{entry.message}</small> : null}
              </span>
            </li>
          ))}
        </ul>

        <footer>
          <button type="button" className="manager-primary-button" onClick={onClose}>
            知道了
          </button>
        </footer>
      </section>
    </div>
  );
}
