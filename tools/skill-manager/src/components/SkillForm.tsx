import type { SkillDocument } from "../../../../src/lib/skills/schema";
import type { CategoryId, SkillIconKey, LocalizedTextList } from "../../../../src/types/content";
import type { ReactNode } from "react";
import { ChangelogEditor } from "./ChangelogEditor";
import { FaqEditor } from "./FaqEditor";
import { LocalizedTextEditor } from "./LocalizedTextEditor";
import { StringListEditor } from "./StringListEditor";

const categories: Array<[CategoryId, string]> = [
  ["development", "编程开发"],
  ["data-analytics", "数据分析"],
  ["research-writing", "研究写作"],
  ["content-creation", "内容创作"],
  ["automation", "自动化"],
  ["image-design", "图像设计"],
  ["files-pdf", "文件与 PDF"],
  ["productivity", "效率工具"],
];

const iconKeys: SkillIconKey[] = [
  "analysis",
  "automation",
  "code",
  "document",
  "image",
  "productivity",
  "research",
  "writing",
];

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <label className="manager-field">
      <span>{label}</span>
      {children}
      {error ? <small className="manager-field-error">{error}</small> : null}
    </label>
  );
}

function LocalizedListGroup({
  label,
  value,
  onChange,
}: {
  label: string;
  value: LocalizedTextList;
  onChange(value: LocalizedTextList): void;
}) {
  return (
    <fieldset className="manager-fieldset manager-bilingual-list">
      <legend>{label}</legend>
      <StringListEditor
        label="中文"
        items={value.zh}
        onChange={(zh) => onChange({ ...value, zh })}
        multiline
      />
      <StringListEditor
        label="English"
        items={value.en}
        onChange={(en) => onChange({ ...value, en })}
        multiline
      />
    </fieldset>
  );
}

export type SkillFormProps = {
  value: SkillDocument;
  onChange(next: SkillDocument): void;
  errors: Record<string, string>;
};

export function SkillForm({ value, onChange, errors }: SkillFormProps) {
  const patch = <K extends keyof SkillDocument>(key: K, next: SkillDocument[K]) =>
    onChange({ ...value, [key]: next });

  return (
    <form className="manager-form" onSubmit={(event) => event.preventDefault()}>
      <section className="manager-form-section">
        <div className="manager-form-section-heading">
          <h2>发布信息</h2>
          <p>控制公开状态、网址身份和首页精选顺序。</p>
        </div>
        <div className="manager-form-grid">
          <Field label="状态" error={errors.status}>
            <select
              aria-label="状态"
              value={value.status}
              onChange={(event) => patch("status", event.target.value as SkillDocument["status"])}
            >
              <option value="draft">草稿</option>
              <option value="published">已发布</option>
            </select>
          </Field>
          <Field label="Slug" error={errors.slug}>
            <input
              aria-label="Slug"
              value={value.slug}
              onChange={(event) => patch("slug", event.target.value)}
            />
          </Field>
          <Field label="精选顺序" error={errors.featuredRank}>
            <input
              aria-label="精选顺序"
              type="number"
              min={0}
              value={value.featuredRank}
              onChange={(event) => patch("featuredRank", Number(event.target.value))}
            />
          </Field>
          <label className="manager-check-field">
            <input
              type="checkbox"
              checked={value.featured}
              onChange={(event) => patch("featured", event.target.checked)}
            />
            <span>精选</span>
          </label>
          <label className="manager-check-field">
            <input
              type="checkbox"
              checked={value.verified}
              onChange={(event) => patch("verified", event.target.checked)}
            />
            <span>已核验</span>
          </label>
        </div>
      </section>

      <section className="manager-form-section">
        <div className="manager-form-section-heading">
          <h2>基础资料</h2>
          <p>名称、分类与来源会出现在卡片、详情页和搜索结果中。</p>
        </div>
        <div className="manager-form-grid">
          <Field label="英文名称" error={errors.name}>
            <input value={value.name} onChange={(event) => patch("name", event.target.value)} />
          </Field>
          <Field label="中文名称" error={errors.nameZh}>
            <input value={value.nameZh ?? ""} onChange={(event) => patch("nameZh", event.target.value)} />
          </Field>
          <Field label="分类" error={errors.category}>
            <select
              value={value.category}
              onChange={(event) => patch("category", event.target.value as CategoryId)}
            >
              {categories.map(([id, label]) => <option value={id} key={id}>{label}</option>)}
            </select>
          </Field>
          <Field label="图标" error={errors.icon}>
            <select
              value={value.icon}
              onChange={(event) => patch("icon", event.target.value as SkillIconKey)}
            >
              {iconKeys.map((icon) => <option value={icon} key={icon}>{icon}</option>)}
            </select>
          </Field>
          <Field label="作者" error={errors.author}>
            <input value={value.author} onChange={(event) => patch("author", event.target.value)} />
          </Field>
          <Field label="版本" error={errors.version}>
            <input value={value.version} onChange={(event) => patch("version", event.target.value)} />
          </Field>
          <Field label="许可证" error={errors.license}>
            <input value={value.license} onChange={(event) => patch("license", event.target.value)} />
          </Field>
          <Field label="加入日期" error={errors.addedAt}>
            <input type="date" value={value.addedAt} onChange={(event) => patch("addedAt", event.target.value)} />
          </Field>
          <Field label="更新日期" error={errors.updatedAt}>
            <input type="date" value={value.updatedAt} onChange={(event) => patch("updatedAt", event.target.value)} />
          </Field>
          <Field label="GitHub" error={errors.githubUrl}>
            <input type="url" value={value.githubUrl ?? ""} onChange={(event) => patch("githubUrl", event.target.value || undefined)} />
          </Field>
          <Field label="官方网站" error={errors.officialUrl}>
            <input type="url" value={value.officialUrl ?? ""} onChange={(event) => patch("officialUrl", event.target.value || undefined)} />
          </Field>
          <Field label="下载地址" error={errors.downloadUrl}>
            <input type="url" value={value.downloadUrl ?? ""} onChange={(event) => patch("downloadUrl", event.target.value || undefined)} />
          </Field>
          <Field label="Stars" error={errors.stars}>
            <input type="number" min={0} value={value.stars} onChange={(event) => patch("stars", Number(event.target.value))} />
          </Field>
          <Field label="Downloads" error={errors.downloads}>
            <input type="number" min={0} value={value.downloads} onChange={(event) => patch("downloads", Number(event.target.value))} />
          </Field>
        </div>
        <StringListEditor label="标签" items={value.tags} onChange={(items) => patch("tags", items)} />
        <StringListEditor label="平台" items={value.platforms} onChange={(items) => patch("platforms", items)} />
      </section>

      <section className="manager-form-section">
        <div className="manager-form-section-heading">
          <h2>双语内容</h2>
          <p>中文与英文并排编辑，减少遗漏。</p>
        </div>
        <LocalizedTextEditor label="简短描述" value={value.description} onChange={(next) => patch("description", next)} />
        <LocalizedTextEditor label="详细介绍" value={value.longDescription} onChange={(next) => patch("longDescription", next)} rows={6} />
        <LocalizedListGroup label="核心功能" value={value.features} onChange={(next) => patch("features", next)} />
        <LocalizedListGroup label="适用场景" value={value.useCases} onChange={(next) => patch("useCases", next)} />
        <StringListEditor label="安装方式" items={value.installation} onChange={(items) => patch("installation", items)} multiline />
        <LocalizedTextEditor label="使用说明" value={value.usage} onChange={(next) => patch("usage", next)} rows={5} />
        <LocalizedListGroup label="示例工作流" value={value.workflow} onChange={(next) => patch("workflow", next)} />
        <ChangelogEditor value={value.changelog} onChange={(next) => patch("changelog", next)} />
        <FaqEditor value={value.faq} onChange={(next) => patch("faq", next)} />
      </section>
    </form>
  );
}
