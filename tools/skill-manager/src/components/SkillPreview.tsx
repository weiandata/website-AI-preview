import { BadgeCheck, Sparkles, Star } from "lucide-react";
import type { SkillDocument } from "../../../../src/lib/skills/schema";

export function SkillPreview({ document }: { document?: SkillDocument }) {
  if (!document) {
    return (
      <aside className="manager-preview manager-preview-empty">
        <p>选择一个 Skill 后，这里会显示实时预览。</p>
      </aside>
    );
  }
  return (
    <aside className="manager-preview" aria-label="实时预览">
      <div className="manager-preview-heading">
        <span>实时预览</span>
        <small>{document.status === "published" ? "公开" : "草稿"}</small>
      </div>
      <article className="manager-preview-card">
        <div className="manager-preview-meta">
          <span>{document.category}</span>
          {document.featured ? (
            <span className="manager-preview-featured">
              <Sparkles aria-hidden="true" size={14} />
              精选 · 第 {document.featuredRank} 位
            </span>
          ) : (
            <span className="manager-preview-unfeatured">未精选</span>
          )}
          {document.verified ? <BadgeCheck aria-label="已核验" size={16} /> : null}
        </div>
        <h2>{document.nameZh ?? document.name}</h2>
        <p>{document.description.zh}</p>
        <div className="manager-preview-pills">
          {document.platforms.map((platform) => <span key={platform}>{platform}</span>)}
        </div>
        <dl>
          <div><dt>许可证</dt><dd>{document.license}</dd></div>
          <div><dt>版本</dt><dd>{document.version}</dd></div>
          <div><dt>Stars</dt><dd><Star aria-hidden="true" size={14} /> {document.stars}</dd></div>
        </dl>
      </article>
      <section className="manager-preview-section">
        <h3>安装方式</h3>
        {document.installation.map((command) => <code key={command}>{command}</code>)}
      </section>
      <section className="manager-preview-section">
        <h3>示例工作流</h3>
        <ol>{document.workflow.zh.map((step) => <li key={step}>{step}</li>)}</ol>
      </section>
      <section className="manager-preview-section">
        <h3>最近更新</h3>
        <p>{document.changelog[0]?.notes.zh}</p>
      </section>
    </aside>
  );
}
