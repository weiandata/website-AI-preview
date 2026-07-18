import { execFile } from "node:child_process";
import { mkdir, mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { GitPublisher, runGitProcess } from "../../tools/skill-manager/lib/git-publisher";

const run = promisify(execFile);

async function git(cwd: string, ...args: string[]): Promise<string> {
  const { stdout } = await run("git", args, { cwd });
  return stdout;
}

/**
 * Exercises the real git binary in a throwaway clone, so the "only stage
 * content/skills" guarantee is verified against git itself, not a stub.
 */
describe("GitPublisher against a real repository", () => {
  let workspace: string;
  let remote: string;
  let clone: string;
  let publisher: GitPublisher;

  beforeEach(async () => {
    workspace = await mkdtemp(path.join(os.tmpdir(), "weian-publish-git-"));
    remote = path.join(workspace, "remote.git");
    clone = path.join(workspace, "clone");

    await mkdir(remote, { recursive: true });
    await git(remote, "init", "--bare", "--initial-branch=main", ".");

    await mkdir(clone, { recursive: true });
    await git(clone, "init", "--initial-branch=main", ".");
    await git(clone, "config", "user.email", "test@example.com");
    await git(clone, "config", "user.name", "Test");
    // A GitHub-looking origin that actually points at the local bare repo.
    await git(clone, "remote", "add", "origin", remote);
    await git(clone, "config", "remote.origin.url", remote);

    await mkdir(path.join(clone, "content/skills"), { recursive: true });
    await writeFile(path.join(clone, "content/skills/example-skill.md"), "# one\n");
    await writeFile(path.join(clone, "README.md"), "# readme\n");
    await git(clone, "add", "-A");
    await git(clone, "commit", "-m", "initial");
    await git(clone, "push", "-u", "origin", "main");

    publisher = new GitPublisher(clone, async (args, cwd) => {
      // `remote get-url origin` must look like GitHub for the safety check,
      // while every other command runs against the real local remote.
      if (args.join(" ") === "remote get-url origin") {
        return { stdout: "git@github.com:weian/website.git\n", stderr: "", exitCode: 0 };
      }
      return runGitProcess(args, cwd);
    });
  });

  afterEach(async () => {
    await rm(workspace, { recursive: true, force: true });
  });

  it("commits the chosen Markdown and leaves other dirty files alone", async () => {
    await writeFile(path.join(clone, "content/skills/example-skill.md"), "# two\n");
    await writeFile(path.join(clone, "README.md"), "# touched\n");
    await writeFile(path.join(clone, "content/skills/other-skill.md"), "# other\n");

    const result = await publisher.publish(
      ["content/skills/example-skill.md"],
      "content: update example-skill",
    );

    expect(result.pushed).toBe(true);

    const committed = await git(clone, "show", "--name-only", "--pretty=format:", "HEAD");
    expect(committed.trim().split("\n")).toEqual(["content/skills/example-skill.md"]);

    const stillDirty = await git(clone, "status", "--porcelain");
    expect(stillDirty).toContain("README.md");
    expect(stillDirty).toContain("content/skills/other-skill.md");

    const pushed = await git(remote, "show", "--name-only", "--pretty=format:", "main");
    expect(pushed).toContain("content/skills/example-skill.md");
    expect(pushed).not.toContain("README.md");
  });

  it("refuses to publish when the remote has moved ahead", async () => {
    const other = path.join(workspace, "other");
    await mkdir(other, { recursive: true });
    await git(other, "clone", remote, ".");
    await git(other, "config", "user.email", "other@example.com");
    await git(other, "config", "user.name", "Other");
    await writeFile(path.join(other, "content/skills/example-skill.md"), "# remote change\n");
    await git(other, "commit", "-am", "remote change");
    await git(other, "push", "origin", "main");

    await writeFile(path.join(clone, "content/skills/example-skill.md"), "# local change\n");

    await expect(
      publisher.publish(["content/skills/example-skill.md"], "content: update"),
    ).rejects.toThrow(/ahead|更新/i);

    // Nothing was committed locally either.
    const log = await git(clone, "log", "--oneline");
    expect(log.trim().split("\n")).toHaveLength(1);
  });

  it("refuses a path outside content/skills without running git at all", async () => {
    await writeFile(path.join(clone, "README.md"), "# touched\n");

    await expect(publisher.publish(["README.md"], "content: bad")).rejects.toThrow(
      /content\/skills/,
    );

    const status = await git(clone, "status", "--porcelain");
    expect(status).toContain("README.md");
    const staged = await git(clone, "diff", "--cached", "--name-only");
    expect(staged.trim()).toBe("");
  });
});
