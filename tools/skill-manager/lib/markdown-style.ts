import { spawn } from "node:child_process";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

/**
 * Applies the repository's Markdown style fixes to a Skill file's content.
 *
 * The administrator types prose into the form, so the serialized file can break
 * style rules the CI check enforces (a list with no blank line above it is the
 * common one). This runs the very same tool CI runs, from the repository root
 * so it discovers the very same `.markdownlint-cli2.yaml`, which is what keeps
 * the local result and the GitHub result from drifting apart.
 *
 * It runs as a child process rather than an import: the manager is executed by
 * tsx, whose CommonJS resolver cannot load this tool's ESM-only dependencies.
 */
export type MarkdownStyleFixer = (source: string) => Promise<string>;

/** Scratch space inside the repository so config discovery walks up to the root. */
const SCRATCH_DIR = ".skill-manager-tmp";
const CLI = "node_modules/markdownlint-cli2/markdownlint-cli2-bin.mjs";

function runFixer(root: string, relativePath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [path.join(root, CLI), "--fix", relativePath], {
      cwd: root,
      shell: false,
      stdio: "ignore",
    });
    child.on("error", reject);
    // A non-zero exit only means unfixable issues remain; those are reported by
    // the publish check, never by silently refusing to save.
    child.on("close", () => resolve());
  });
}

export function createMarkdownStyleFixer(root: string): MarkdownStyleFixer {
  return async (source) => {
    const fileName = `${crypto.randomUUID()}.md`;
    const target = path.join(root, SCRATCH_DIR, fileName);
    try {
      await mkdir(path.join(root, SCRATCH_DIR), { recursive: true });
      await writeFile(target, source, "utf8");
      await runFixer(root, `${SCRATCH_DIR}/${fileName}`);
      return await readFile(target, "utf8");
    } finally {
      await rm(target, { force: true }).catch(() => undefined);
    }
  };
}
