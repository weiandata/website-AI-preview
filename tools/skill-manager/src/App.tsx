import {
  Archive,
  Download,
  FileDown,
  Save,
  Send,
  Upload,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { strToU8, zipSync } from "fflate";
import type { SkillDocument } from "../../../src/lib/skills/schema";
import {
  deleteSkill,
  getTemplate,
  listSkills,
  saveSkill,
  serializeSkill,
  validateMarkdown,
  type StoredSkill,
} from "./api";
import { ImportReview, type ImportRecord } from "./components/ImportReview";
import { SaveResult, SaveReview } from "./components/SaveReview";
import { SkillForm } from "./components/SkillForm";
import { SkillList } from "./components/SkillList";
import { SkillPreview } from "./components/SkillPreview";
import {
  buildSavePlan,
  changedPaths,
  type SavePlan,
  type SaveResultEntry,
} from "./save-plan";

function downloadBlob(blob: Blob, fileName: string): void {
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(url);
}

function nextCopySlug(base: string, used: Set<string>): string {
  let candidate = `${base}-copy`;
  let index = 2;
  while (used.has(candidate)) {
    candidate = `${base}-copy-${index}`;
    index += 1;
  }
  return candidate;
}

export function App() {
  const [items, setItems] = useState<StoredSkill[]>([]);
  const [drafts, setDrafts] = useState<Map<string, SkillDocument>>(new Map());
  const [dirtyKeys, setDirtyKeys] = useState<Set<string>>(new Set());
  const [pendingDeletions, setPendingDeletions] = useState<Set<string>>(new Set());
  const [selectedKey, setSelectedKey] = useState<string>();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState("正在读取本地仓库");
  const [importRecords, setImportRecords] = useState<ImportRecord[]>();
  const [pendingPlan, setPendingPlan] = useState<{ plan: SavePlan; forPublish: boolean }>();
  const [saveResult, setSaveResult] = useState<{ summary: string; entries: SaveResultEntry[] }>();
  const [savedPaths, setSavedPaths] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let active = true;
    listSkills()
      .then((nextItems) => {
        if (!active) return;
        setItems(nextItems);
        setSelectedKey(nextItems[0]?.document.slug);
        setStatus(`${nextItems.length} 个 Skill 已载入`);
      })
      .catch((error) => {
        if (active) setStatus(error instanceof Error ? error.message : "读取失败");
      });
    return () => {
      active = false;
    };
  }, []);

  const documents = useMemo(() => {
    const next: SkillDocument[] = [];
    const itemKeys = new Set(items.map((item) => item.document.slug));
    for (const item of items) {
      if (pendingDeletions.has(item.document.slug)) continue;
      next.push(drafts.get(item.document.slug) ?? item.document);
    }
    for (const [key, document] of drafts) {
      if (!itemKeys.has(key) && !pendingDeletions.has(key)) next.push(document);
    }
    return next;
  }, [drafts, items, pendingDeletions]);

  const activeDocument = selectedKey
    ? drafts.get(selectedKey) ?? items.find((item) => item.document.slug === selectedKey)?.document
    : undefined;

  function keyForSlug(slug: string): string {
    for (const [key, document] of drafts) if (document.slug === slug) return key;
    return slug;
  }

  function updateActive(next: SkillDocument): void {
    if (!selectedKey) return;
    setDrafts((current) => new Map(current).set(selectedKey, next));
    setDirtyKeys((current) => new Set(current).add(selectedKey));
    setErrors({});
  }

  async function createNew(): Promise<void> {
    const source = await getTemplate();
    const used = new Set(documents.map((document) => document.slug));
    const slug = nextCopySlug("new-skill", used).replace("-copy", "");
    const document = await validateMarkdown(
      source.replaceAll("example-skill", slug).replace("status: published", "status: draft"),
      `${slug}.md`,
    );
    setDrafts((current) => new Map(current).set(slug, document));
    setDirtyKeys((current) => new Set(current).add(slug));
    setSelectedKey(slug);
    setStatus("新草稿尚未保存");
  }

  function copyActive(): void {
    if (!activeDocument) return;
    const slug = nextCopySlug(
      activeDocument.slug,
      new Set(documents.map((document) => document.slug)),
    );
    const copy: SkillDocument = {
      ...structuredClone(activeDocument),
      id: slug,
      slug,
      status: "draft",
      featured: false,
      featuredRank: 0,
      name: `${activeDocument.name} Copy`,
      nameZh: `${activeDocument.nameZh ?? activeDocument.name} 副本`,
    };
    setDrafts((current) => new Map(current).set(slug, copy));
    setDirtyKeys((current) => new Set(current).add(slug));
    setSelectedKey(slug);
    setStatus("副本已加入草稿，尚未保存");
  }

  function queueDelete(): void {
    if (!selectedKey || !activeDocument) return;
    if (!window.confirm(`确认删除「${activeDocument.nameZh ?? activeDocument.name}」？保存后会移入回收站。`)) return;
    const key = selectedKey;
    if (items.some((item) => item.document.slug === key)) {
      setPendingDeletions((current) => new Set(current).add(key));
    } else {
      setDrafts((current) => {
        const next = new Map(current);
        next.delete(key);
        return next;
      });
      setDirtyKeys((current) => {
        const next = new Set(current);
        next.delete(key);
        return next;
      });
    }
    setSelectedKey(documents.find((document) => document.slug !== activeDocument.slug)?.slug);
    setStatus("删除已加入待保存修改");
  }

  function reorderFeatured(fromIndex: number, toIndex: number): void {
    const ordered = documents
      .filter((document) => document.featured)
      .sort((left, right) => left.featuredRank - right.featuredRank);
    if (
      fromIndex === toIndex ||
      fromIndex < 0 ||
      toIndex < 0 ||
      fromIndex >= ordered.length ||
      toIndex >= ordered.length
    ) return;
    const featured = [...ordered];
    const [dragged] = featured.splice(fromIndex, 1);
    featured.splice(toIndex, 0, dragged);
    // Only the Skills whose rank actually moved become unsaved changes.
    const moved = featured.filter((document, index) => document.featuredRank !== index + 1);
    setDrafts((current) => {
      const next = new Map(current);
      featured.forEach((document, rankIndex) => {
        if (document.featuredRank === rankIndex + 1) return;
        next.set(keyForSlug(document.slug), { ...document, featuredRank: rankIndex + 1 });
      });
      return next;
    });
    setDirtyKeys((current) => {
      const next = new Set(current);
      moved.forEach((document) => next.add(keyForSlug(document.slug)));
      return next;
    });
  }

  async function handleFiles(files: FileList | null): Promise<void> {
    if (!files?.length) return;
    const known = new Set(documents.map((document) => document.slug));
    const records = await Promise.all(
      [...files].map(async (file): Promise<ImportRecord> => {
        try {
          const source = await file.text();
          const document = await validateMarkdown(source, file.name);
          return {
            fileName: file.name,
            document,
            kind: known.has(document.slug) ? "conflict" : "new",
          };
        } catch (error) {
          return {
            fileName: file.name,
            kind: "invalid",
            error: error instanceof Error ? error.message : "无法解析",
          };
        }
      }),
    );
    setImportRecords(records);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function applyImport(): void {
    if (!importRecords) return;
    const accepted = importRecords.filter(
      (record) => record.document && (record.kind === "new" || record.replace),
    );
    setDrafts((current) => {
      const next = new Map(current);
      for (const record of accepted) {
        const key = record.kind === "conflict" ? record.document!.slug : record.document!.slug;
        next.set(key, record.document!);
      }
      return next;
    });
    setDirtyKeys((current) => {
      const next = new Set(current);
      accepted.forEach((record) => next.add(record.document!.slug));
      return next;
    });
    setSelectedKey(accepted[0]?.document?.slug ?? selectedKey);
    setImportRecords(undefined);
    setStatus(`${accepted.length} 个导入项已加入编辑队列，尚未保存`);
  }

  function reviewChanges(forPublish: boolean): void {
    if (!dirtyKeys.size && !pendingDeletions.size) {
      setStatus("没有待保存修改");
      return;
    }
    setPendingPlan({
      plan: buildSavePlan({ items, drafts, dirtyKeys, pendingDeletions }),
      forPublish,
    });
  }

  async function applyPlan(): Promise<void> {
    if (!pendingPlan) return;
    const { plan, forPublish } = pendingPlan;
    setPendingPlan(undefined);
    setBusy(true);
    setErrors({});

    const entries: SaveResultEntry[] = [];
    const completedKeys = new Set<string>();
    const writtenPaths: string[] = [];
    let lastSavedSlug: string | undefined;

    for (const change of plan.changes) {
      try {
        if (change.kind === "delete") {
          await deleteSkill(change.slug);
        } else if (change.document) {
          await saveSkill(change.document, change.originalSlug);
          lastSavedSlug = change.slug;
        }
        entries.push({ kind: change.kind, path: change.path, ok: true });
        completedKeys.add(change.key);
        writtenPaths.push(...changedPaths(change));
      } catch (error) {
        entries.push({
          kind: change.kind,
          path: change.path,
          ok: false,
          message: error instanceof Error ? error.message : "保存失败",
        });
      }
    }

    const failed = entries.filter((entry) => !entry.ok);
    const summary = failed.length
      ? `${entries.length - failed.length} 个已保存，${failed.length} 个失败`
      : `${entries.length} 个文件已保存到本机`;

    // Keep everything that failed in the pending queue so no edit is silently lost.
    try {
      const nextItems = await listSkills();
      setItems(nextItems);
      setDrafts((current) => {
        const next = new Map(current);
        for (const key of completedKeys) next.delete(key);
        return next;
      });
      setDirtyKeys((current) => new Set([...current].filter((key) => !completedKeys.has(key))));
      setPendingDeletions(
        (current) => new Set([...current].filter((slug) => !completedKeys.has(slug))),
      );
      setSavedPaths((current) => [...new Set([...current, ...writtenPaths])]);
      if (lastSavedSlug && nextItems.some((item) => item.document.slug === lastSavedSlug)) {
        setSelectedKey(lastSavedSlug);
      }
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : "重新读取仓库失败" });
    }

    setSaveResult({ summary, entries });
    setStatus(
      failed.length
        ? summary
        : forPublish
          ? "已保存到本机；发布到 GitHub 的功能尚未接通"
          : "已保存到本机",
    );
    setBusy(false);
  }

  async function exportCurrent(): Promise<void> {
    if (!activeDocument) return;
    const source = await serializeSkill(activeDocument);
    downloadBlob(new Blob([source], { type: "text/markdown;charset=utf-8" }), `${activeDocument.slug}.md`);
  }

  async function exportAll(): Promise<void> {
    const sources = await Promise.all(
      documents.map(async (document) => [document.slug, await serializeSkill(document)] as const),
    );
    const template = await getTemplate();
    const zip = zipSync(Object.fromEntries([
      ...sources.map(([slug, markdown]) => [`skills/${slug}.md`, strToU8(markdown)] as const),
      ["skill-template.md", strToU8(template)] as const,
    ]));
    downloadBlob(new Blob([zip], { type: "application/zip" }), "weian-skills.zip");
  }

  return (
    <div className="manager-app">
      <header className="manager-header">
        <div className="manager-brand">
          <span className="manager-brand-mark">W</span>
          <span><strong>WEIAN Skill 管理器</strong><small>本地 Markdown 仓库</small></span>
        </div>
        <div className="manager-header-actions">
          <label className="manager-file-button">
            <Upload aria-hidden="true" size={16} />
            导入 Markdown
            <input
              ref={fileInputRef}
              type="file"
              accept=".md,text/markdown"
              multiple
              aria-label="导入 Markdown"
              onChange={(event) => void handleFiles(event.target.files)}
            />
          </label>
          <button type="button" onClick={() => void exportCurrent()} disabled={!activeDocument}>
            <FileDown aria-hidden="true" size={16} />
            导出当前
          </button>
          <button type="button" onClick={() => void exportAll()} disabled={!documents.length}>
            <Archive aria-hidden="true" size={16} />
            导出全部
          </button>
        </div>
      </header>

      <div className="manager-workspace">
        <SkillList
          documents={documents}
          selectedSlug={activeDocument?.slug}
          onSelect={(slug) => setSelectedKey(keyForSlug(slug))}
          onNew={() => void createNew()}
          onCopy={copyActive}
          onDelete={queueDelete}
          onReorderFeatured={reorderFeatured}
        />
        <main className="manager-editor">
          {activeDocument ? (
            <SkillForm value={activeDocument} onChange={updateActive} errors={errors} />
          ) : (
            <div className="manager-editor-empty">
              <Download aria-hidden="true" size={28} />
              <h2>选择或新建一个 Skill</h2>
              <p>所有修改只会保存在这台电脑中，直到你主动发布。</p>
            </div>
          )}
        </main>
        <SkillPreview document={activeDocument} />
      </div>

      <footer className="manager-savebar">
        <p aria-live="polite">{status}</p>
        <span>{dirtyKeys.size + pendingDeletions.size ? `${dirtyKeys.size + pendingDeletions.size} 项待保存` : "仓库已同步"}</span>
        {savedPaths.length ? (
          <span className="manager-savebar-pending-publish">
            本次已保存 {savedPaths.length} 个文件，尚未发布到 GitHub
          </span>
        ) : null}
        <button type="button" onClick={() => reviewChanges(false)} disabled={busy}>
          <Save aria-hidden="true" size={17} />
          仅保存
        </button>
        <button className="manager-primary-button" type="button" onClick={() => reviewChanges(true)} disabled={busy}>
          <Send aria-hidden="true" size={17} />
          保存并发布
        </button>
      </footer>

      {importRecords ? (
        <ImportReview
          records={importRecords}
          onChange={setImportRecords}
          onApply={applyImport}
          onClose={() => setImportRecords(undefined)}
        />
      ) : null}

      {pendingPlan ? (
        <SaveReview
          plan={pendingPlan.plan}
          onConfirm={() => void applyPlan()}
          onClose={() => setPendingPlan(undefined)}
        />
      ) : null}

      {saveResult ? (
        <SaveResult
          summary={saveResult.summary}
          entries={saveResult.entries}
          onClose={() => setSaveResult(undefined)}
        />
      ) : null}
    </div>
  );
}
