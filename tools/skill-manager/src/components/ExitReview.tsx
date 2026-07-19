import { AlertTriangle, Check, LogOut, X } from "lucide-react";
import type { ExitPreview } from "../api";

export type ExitConcern = { title: string; items: string[] };

/**
 * Everything the administrator would lose track of by walking away. Nothing is
 * lost from disk, so these inform the decision rather than forbid it.
 */
export function exitConcerns(preview: ExitPreview, unsavedCount: number): ExitConcern[] {
  const concerns: ExitConcern[] = [];
  if (unsavedCount) {
    concerns.push({
      title: `${unsavedCount} 项修改还没保存到本机`,
      items: ["退出后这些修改会丢失，回到上次保存的样子。"],
    });
  }
  if (preview.unpublishedPaths.length) {
    concerns.push({
      title: `${preview.unpublishedPaths.length} 个 Skill 已保存但没发布到 GitHub`,
      items: preview.unpublishedPaths,
    });
  }
  if (preview.pendingPush) {
    concerns.push({
      title: "有一个提交还没推送到 GitHub",
      items: ["上次 push 失败了，可以先点「重试发布」。"],
    });
  }
  return concerns;
}

export function ExitReview({
  preview,
  unsavedCount,
  busy,
  onConfirm,
  onClose,
}: {
  preview: ExitPreview;
  unsavedCount: number;
  busy: boolean;
  onConfirm(): void;
  onClose(): void;
}) {
  const concerns = exitConcerns(preview, unsavedCount);

  return (
    <div className="manager-modal-layer" role="presentation">
      <section className="manager-modal" role="dialog" aria-modal="true" aria-label="确认退出管理器">
        <header>
          <div>
            <span>退出前检查</span>
            <h2>确认退出管理器</h2>
            <p className="manager-modal-note">
              退出会停止这台电脑上的管理器服务，网站本身不受影响。
            </p>
          </div>
          <button type="button" aria-label="关闭退出检查" onClick={onClose}>
            <X aria-hidden="true" size={18} />
          </button>
        </header>

        <div className="manager-save-groups">
          {concerns.length ? (
            concerns.map((concern) => (
              <section className="manager-save-group manager-publish-blocked" key={concern.title}>
                <h3>{concern.title}</h3>
                <ul>
                  {concern.items.map((item) => (
                    <li key={item}>
                      <AlertTriangle aria-hidden="true" size={15} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))
          ) : (
            <section className="manager-save-group">
              <h3>一切都已发布</h3>
              <ul>
                <li>
                  <Check aria-hidden="true" size={15} />
                  <span>没有未保存的修改，也没有等待发布的 Skill。</span>
                </li>
              </ul>
            </section>
          )}
        </div>

        <footer>
          <button type="button" className="manager-primary-button" onClick={onClose}>
            返回处理
          </button>
          <button type="button" disabled={busy} onClick={onConfirm}>
            <LogOut aria-hidden="true" size={16} />
            仍然退出
          </button>
        </footer>
      </section>
    </div>
  );
}

export function ExitFarewell() {
  return (
    <div className="manager-farewell" role="status">
      <LogOut aria-hidden="true" size={30} />
      <h1>Skill 管理器已退出</h1>
      <p>可以关闭这个页面了。</p>
      <p className="manager-farewell-hint">
        下次双击「启动Skill管理器.command」就能重新打开。
      </p>
    </div>
  );
}
