import {
  mkdir,
  open,
  readFile,
  readdir,
  rename,
  unlink,
} from "node:fs/promises";
import path from "node:path";
import {
  parseSkillMarkdown,
  serializeSkillMarkdown,
} from "../../../src/lib/skills/markdown";
import type { SkillDocument } from "../../../src/lib/skills/schema";

export type StoredSkill = {
  document: SkillDocument;
  source: string;
  path: string;
};

export type SaveSkillInput = {
  document: SkillDocument;
  originalSlug?: string;
};

export class SkillConflictError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "SkillConflictError";
  }
}

export class SkillNotFoundError extends Error {
  constructor(slug: string) {
    super(`Skill "${slug}" was not found`);
    this.name = "SkillNotFoundError";
  }
}

function isMissing(error: unknown): boolean {
  return (
    error instanceof Error &&
    "code" in error &&
    (error as NodeJS.ErrnoException).code === "ENOENT"
  );
}

export class SkillStore {
  constructor(
    private contentDir: string,
    private trashDir: string,
    /** Applies repository Markdown style before the file reaches disk. */
    private fixStyle: (source: string) => Promise<string> = async (source) => source,
  ) {}

  async list(): Promise<StoredSkill[]> {
    let fileNames: string[];
    try {
      fileNames = (await readdir(this.contentDir))
        .filter((fileName) => fileName.endsWith(".md"))
        .sort((left, right) => left.localeCompare(right));
    } catch (error) {
      if (isMissing(error)) return [];
      throw error;
    }
    return Promise.all(
      fileNames.map(async (fileName) => {
        const target = path.join(this.contentDir, fileName);
        const source = await readFile(target, "utf8");
        return {
          document: parseSkillMarkdown(source, fileName),
          source,
          path: target,
        };
      }),
    );
  }

  async get(slug: string): Promise<StoredSkill> {
    const target = path.join(this.contentDir, `${slug}.md`);
    try {
      const source = await readFile(target, "utf8");
      return {
        document: parseSkillMarkdown(source, `${slug}.md`),
        source,
        path: target,
      };
    } catch (error) {
      if (isMissing(error)) throw new SkillNotFoundError(slug);
      throw error;
    }
  }

  validate(source: string, fileName: string): SkillDocument {
    return parseSkillMarkdown(source, fileName);
  }

  private async pathExists(target: string): Promise<boolean> {
    try {
      const handle = await open(target, "r");
      await handle.close();
      return true;
    } catch (error) {
      if (isMissing(error)) return false;
      throw error;
    }
  }

  private async moveToTrash(source: string, slug: string): Promise<string> {
    await mkdir(this.trashDir, { recursive: true });
    const suffix = `${new Date().toISOString().replaceAll(":", "-")}-${crypto.randomUUID()}`;
    const trashPath = path.join(this.trashDir, `${slug}-${suffix}.md`);
    await rename(source, trashPath);
    return trashPath;
  }

  async save(input: SaveSkillInput): Promise<StoredSkill> {
    const fileName = `${input.document.slug}.md`;
    // Style is repaired before validation so a fix can never write a file the
    // site would fail to parse.
    const source = await this.fixStyle(serializeSkillMarkdown(input.document));
    const document = this.validate(source, fileName);
    const target = path.join(this.contentDir, fileName);
    const originalTarget = input.originalSlug
      ? path.join(this.contentDir, `${input.originalSlug}.md`)
      : undefined;
    const targetExists = await this.pathExists(target);
    const editsSameFile = input.originalSlug === input.document.slug;
    if (targetExists && !editsSameFile) {
      throw new SkillConflictError(`Skill "${input.document.slug}" already exists`);
    }

    await mkdir(this.contentDir, { recursive: true });
    const tempPath = `${target}.tmp-${crypto.randomUUID()}`;
    let handle;
    try {
      handle = await open(tempPath, "wx");
      await handle.writeFile(source, "utf8");
      await handle.sync();
      await handle.close();
      handle = undefined;
      await rename(tempPath, target);
    } catch (error) {
      await handle?.close().catch(() => undefined);
      await unlink(tempPath).catch(() => undefined);
      throw error;
    }

    if (
      originalTarget &&
      input.originalSlug !== document.slug &&
      (await this.pathExists(originalTarget))
    ) {
      await this.moveToTrash(originalTarget, input.originalSlug!);
    }
    return { document, source, path: target };
  }

  async remove(
    slug: string,
  ): Promise<{ deletedPath: string; trashPath: string }> {
    const deletedPath = path.join(this.contentDir, `${slug}.md`);
    if (!(await this.pathExists(deletedPath))) throw new SkillNotFoundError(slug);
    const trashPath = await this.moveToTrash(deletedPath, slug);
    return { deletedPath, trashPath };
  }
}
