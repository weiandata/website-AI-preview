import {
  ArrowDown,
  ArrowUp,
  Copy,
  FilePlus2,
  GripVertical,
  Search,
  Trash2,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { SkillDocument } from "../../../../src/lib/skills/schema";

export function SkillList({
  documents,
  selectedSlug,
  onSelect,
  onNew,
  onCopy,
  onDelete,
  onReorderFeatured,
}: {
  documents: SkillDocument[];
  selectedSlug?: string;
  onSelect(slug: string): void;
  onNew(): void;
  onCopy(): void;
  onDelete(): void;
  onReorderFeatured(fromIndex: number, toIndex: number): void;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");
  const [dragIndex, setDragIndex] = useState<number>();
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    return documents.filter((document) => {
      const matchesQuery =
        !normalized ||
        [document.name, document.nameZh ?? "", document.slug]
          .join(" ")
          .toLocaleLowerCase()
          .includes(normalized);
      return (
        matchesQuery &&
        (category === "all" || document.category === category) &&
        (status === "all" || document.status === status)
      );
    });
  }, [category, documents, query, status]);
  const featured = useMemo(
    () =>
      documents
        .filter((document) => document.featured)
        .sort((left, right) => left.featuredRank - right.featuredRank),
    [documents],
  );
  const selected = documents.find((document) => document.slug === selectedSlug);

  function moveFeatured(fromIndex: number, toIndex: number): void {
    if (toIndex < 0 || toIndex >= featured.length || fromIndex === toIndex) return;
    onReorderFeatured(fromIndex, toIndex);
  }

  return (
    <aside className="manager-repository" aria-label="Skill 仓库">
      <div className="manager-repository-toolbar">
        <button type="button" className="manager-primary-button" onClick={onNew}>
          <FilePlus2 aria-hidden="true" size={16} />
          新建
        </button>
        <button type="button" onClick={onCopy} disabled={!selected}>
          <Copy aria-hidden="true" size={16} />
          复制
        </button>
        <button type="button" onClick={onDelete} disabled={!selected}>
          <Trash2 aria-hidden="true" size={16} />
          删除
        </button>
      </div>
      <label className="manager-list-search">
        <Search aria-hidden="true" size={16} />
        <input
          type="search"
          aria-label="搜索 Skill"
          placeholder="名称或 slug"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="manager-list-filters">
        <select aria-label="按分类筛选" value={category} onChange={(event) => setCategory(event.target.value)}>
          <option value="all">全部分类</option>
          {[...new Set(documents.map((document) => document.category))].map((value) => (
            <option value={value} key={value}>{value}</option>
          ))}
        </select>
        <select aria-label="按状态筛选" value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="all">全部状态</option>
          <option value="published">已发布</option>
          <option value="draft">草稿</option>
        </select>
      </div>
      <div className="manager-skill-list" role="group" aria-label="Skill 列表">
        {filtered.map((document) => (
          <button
            type="button"
            className={document.slug === selectedSlug ? "is-selected" : undefined}
            aria-pressed={document.slug === selectedSlug}
            onClick={() => onSelect(document.slug)}
            key={document.slug}
          >
            <span>
              <strong>{document.nameZh ?? document.name}</strong>
              <small>{document.slug}</small>
            </span>
            <span className={`manager-status manager-status-${document.status}`}>
              {document.status === "published" ? "发布" : "草稿"}
            </span>
          </button>
        ))}
        {!filtered.length ? <p className="manager-empty-list">没有匹配的 Skill</p> : null}
      </div>
      {featured.length ? (
        <div className="manager-featured-order">
          <h2>首页精选顺序</h2>
          <p>拖动卡片，或用上下按钮调整顺序。</p>
          <ol aria-label="精选排序">
            {featured.map((document, index) => {
              const title = document.nameZh ?? document.name;
              return (
                <li
                  key={document.slug}
                  className={[
                    document.slug === selectedSlug ? "is-selected" : "",
                    dragIndex === index ? "is-dragging" : "",
                  ]
                    .filter(Boolean)
                    .join(" ") || undefined}
                  draggable
                  onDragStart={() => setDragIndex(index)}
                  onDragOver={(event) => event.preventDefault()}
                  onDrop={(event) => {
                    event.preventDefault();
                    if (dragIndex !== undefined) moveFeatured(dragIndex, index);
                    setDragIndex(undefined);
                  }}
                  onDragEnd={() => setDragIndex(undefined)}
                >
                  <GripVertical aria-hidden="true" size={15} />
                  <span className="manager-featured-rank">{index + 1}</span>
                  <button
                    type="button"
                    className="manager-featured-name"
                    onClick={() => onSelect(document.slug)}
                  >
                    {title}
                  </button>
                  <button
                    type="button"
                    aria-label={`上移 ${title}`}
                    disabled={index === 0}
                    onClick={() => moveFeatured(index, index - 1)}
                  >
                    <ArrowUp aria-hidden="true" size={15} />
                  </button>
                  <button
                    type="button"
                    aria-label={`下移 ${title}`}
                    disabled={index === featured.length - 1}
                    onClick={() => moveFeatured(index, index + 1)}
                  >
                    <ArrowDown aria-hidden="true" size={15} />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}
    </aside>
  );
}
