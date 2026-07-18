import type { SkillDocument } from "../../../src/lib/skills/schema";
import type { StoredSkill } from "./api";

export type SaveChangeKind = "create" | "update" | "rename" | "delete";

export type SaveChange = {
  kind: SaveChangeKind;
  /** Draft map key, so a completed change can be cleared from the dirty set. */
  key: string;
  slug: string;
  path: string;
  document?: SkillDocument;
  /**
   * The slug the file currently has on disk. The store needs it to tell an
   * in-place update from a create, and to retire the old file on a rename.
   */
  originalSlug?: string;
  /** Only set for renames: the slug/path the file is moving away from. */
  fromSlug?: string;
  fromPath?: string;
  /** A rename of an already published Skill retires its public URL. */
  breaksPublicUrl?: boolean;
};

export type SavePlan = {
  changes: SaveChange[];
};

export type SaveResultEntry = {
  kind: SaveChangeKind;
  path: string;
  ok: boolean;
  message?: string;
};

export function skillPath(slug: string): string {
  return `content/skills/${slug}.md`;
}

export function buildSavePlan({
  items,
  drafts,
  dirtyKeys,
  pendingDeletions,
}: {
  items: StoredSkill[];
  drafts: Map<string, SkillDocument>;
  dirtyKeys: Set<string>;
  pendingDeletions: Set<string>;
}): SavePlan {
  const changes: SaveChange[] = [];

  for (const key of dirtyKeys) {
    const document = drafts.get(key);
    if (!document) continue;
    if (pendingDeletions.has(key)) continue;
    const stored = items.find((item) => item.document.slug === key);

    if (!stored) {
      changes.push({
        kind: "create",
        key,
        slug: document.slug,
        path: skillPath(document.slug),
        document,
      });
      continue;
    }

    if (stored.document.slug !== document.slug) {
      changes.push({
        kind: "rename",
        key,
        slug: document.slug,
        path: skillPath(document.slug),
        document,
        originalSlug: stored.document.slug,
        fromSlug: stored.document.slug,
        fromPath: skillPath(stored.document.slug),
        breaksPublicUrl: stored.document.status === "published",
      });
      continue;
    }

    changes.push({
      kind: "update",
      key,
      slug: document.slug,
      path: skillPath(document.slug),
      document,
      originalSlug: stored.document.slug,
    });
  }

  for (const slug of pendingDeletions) {
    changes.push({
      kind: "delete",
      key: slug,
      slug,
      path: skillPath(slug),
    });
  }

  return { changes };
}

/** Every repository-relative path a completed change touched, for later publishing. */
export function changedPaths(change: SaveChange): string[] {
  return change.kind === "rename" && change.fromPath
    ? [change.fromPath, change.path]
    : [change.path];
}
