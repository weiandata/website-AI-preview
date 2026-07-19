import { AlertTriangle, Send, X } from "lucide-react";
import { useState } from "react";
import type { PublishPreview } from "../api";

/** Conditions that must be clear before the manager may commit anything. */
export function publishBlockers({
  paths,
  inspection,
  linkProblems = [],
}: PublishPreview): string[] {
  const reasons: string[] = [];
  if (!paths.length) reasons.push("这一次没有保存任何 Skill 内容文件，没有可发布的修改。");
  for (const problem of linkProblems) {
    if (problem.blocking) reasons.push(`链接${problem.reason}：${problem.url}`);
  }
  if (inspection.branch !== "main") {
    reasons.push(`只能从 main 分支发布，当前分支是 ${inspection.branch}。`);
  }
  if (!/github\.com/.test(inspection.remoteUrl)) {
    reasons.push(`origin 不是 GitHub 仓库：${inspection.remoteUrl}`);
  }
  if (inspection.remoteAhead > 0) {
    reasons.push(
      `GitHub 上的 main 比本机新 ${inspection.remoteAhead} 个提交，请先同步后再发布。`,
    );
  }
  if (inspection.conflictedPaths.length) {
    reasons.push(`仓库有未解决的冲突文件：${inspection.conflictedPaths.join("、")}`);
  }
  return reasons;
}

export function PublishReview({
  preview,
  defaultMessage,
  busy,
  onConfirm,
  onClose,
}: {
  preview: PublishPreview;
  defaultMessage: string;
  busy: boolean;
  onConfirm(message: string): void;
  onClose(): void;
}) {
  const [message, setMessage] = useState(defaultMessage);
  const { inspection } = preview;
  const blockers = publishBlockers(preview);

  return (
    <div className="manager-modal-layer" role="presentation">
      <section
        className="manager-modal"
        role="dialog"
        aria-modal="true"
        aria-label="确认发布到 GitHub"
      >
        <header>
          <div>
            <span>发布检查</span>
            <h2>确认发布到 GitHub</h2>
            <p className="manager-modal-note">
              只有下面这些 Markdown 文件会提交到 main 分支并推送到 GitHub。
            </p>
          </div>
          <button type="button" aria-label="关闭发布检查" onClick={onClose}>
            <X aria-hidden="true" size={18} />
          </button>
        </header>

        <div className="manager-save-groups">
          {blockers.length ? (
            <section className="manager-save-group manager-publish-blocked">
              <h3>现在还不能发布</h3>
              <ul>
                {blockers.map((reason) => (
                  <li key={reason}>
                    <AlertTriangle aria-hidden="true" size={15} />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <section className="manager-save-group">
            <h3>{`将发布 ${preview.paths.length} 个文件`}</h3>
            <ul>
              {preview.paths.map((item) => (
                <li key={item}>
                  <code>{item}</code>
                </li>
              ))}
            </ul>
          </section>

          {preview.linkProblems?.some((problem) => !problem.blocking) ? (
            <section className="manager-save-group">
              <h3>这些链接没能确认</h3>
              <p className="manager-publish-untouched">
                <AlertTriangle aria-hidden="true" size={14} />
                多半是网络问题，不影响发布；如果 GitHub 上报错，回来看这里。
              </p>
              <ul>
                {preview.linkProblems
                  .filter((problem) => !problem.blocking)
                  .map((problem) => (
                    <li key={problem.url}>
                      <code>{problem.url}</code>
                      <small>{problem.reason}</small>
                    </li>
                  ))}
              </ul>
            </section>
          ) : null}

          {inspection.dirtyCodePaths.length ? (
            <section className="manager-save-group">
              <h3>以下修改不会被发布</h3>
              <p className="manager-publish-untouched">
                <AlertTriangle aria-hidden="true" size={14} />
                这些文件不是 Skill 内容，发布时会原样留在这台电脑上。
              </p>
              <ul>
                {inspection.dirtyCodePaths.map((item) => (
                  <li key={item}>
                    <code>{item}</code>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          <label className="manager-field manager-publish-message">
            <span>发布说明</span>
            <input
              aria-label="发布说明"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>
        </div>

        <footer>
          <button type="button" onClick={onClose}>取消</button>
          <button
            type="button"
            className="manager-primary-button"
            disabled={busy || !message.trim() || blockers.length > 0}
            onClick={() => onConfirm(message)}
          >
            <Send aria-hidden="true" size={16} />
            确认发布
          </button>
        </footer>
      </section>
    </div>
  );
}
