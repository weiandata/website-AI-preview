import { beforeEach, describe, expect, it } from "vitest";
import {
  GitPublishError,
  GitPublisher,
  type GitResult,
  type GitRunner,
} from "../../tools/skill-manager/lib/git-publisher";

const ROOT = "/repo";
const CONTENT_PATH = "content/skills/example-skill.md";

type Overrides = Partial<{
  branch: string;
  remoteUrl: string;
  remoteAhead: string;
  status: string;
  conflicts: string;
  stagedEmpty: boolean;
  pushFails: boolean;
}>;

let calls: string[][];

function makeRunner(overrides: Overrides = {}): GitRunner {
  const ok = (stdout = ""): GitResult => ({ stdout, stderr: "", exitCode: 0 });
  return async (args) => {
    calls.push(args);
    const key = args.join(" ");
    if (key === "rev-parse --abbrev-ref HEAD") return ok(overrides.branch ?? "main");
    if (key === "remote get-url origin") {
      return ok(overrides.remoteUrl ?? "git@github.com:weian/website.git");
    }
    if (key === "fetch origin main") return ok();
    if (key === "rev-list --count HEAD..origin/main") return ok(overrides.remoteAhead ?? "0");
    if (key === "status --porcelain") return ok(overrides.status ?? ` M ${CONTENT_PATH}\n`);
    if (key === "diff --name-only --diff-filter=U") return ok(overrides.conflicts ?? "");
    if (key === "diff --cached --quiet") {
      return overrides.stagedEmpty
        ? ok()
        : { stdout: "", stderr: "", exitCode: 1 };
    }
    if (key === "rev-parse HEAD") return ok("abc1234");
    if (args[0] === "push") {
      return overrides.pushFails
        ? { stdout: "", stderr: "Could not resolve host: github.com", exitCode: 128 }
        : ok();
    }
    return ok();
  };
}

function makePublisher(overrides: Overrides = {}): GitPublisher {
  return new GitPublisher(ROOT, makeRunner(overrides));
}

describe("pending content paths", () => {
  it("adopts uncommitted Skill files and never application code", async () => {
    const publisher = new GitPublisher("/repo", async () => ({
      stdout: [
        "?? content/skills/ui-skills.md",
        " M content/skills/pdf-toolkit.md",
        " M src/app/page.tsx",
        " M README.md",
        "",
      ].join("\n"),
      stderr: "",
      exitCode: 0,
    }));

    expect(await publisher.pendingContentPaths()).toEqual([
      "content/skills/pdf-toolkit.md",
      "content/skills/ui-skills.md",
    ]);
  });
});

describe("GitPublisher", () => {
  beforeEach(() => {
    calls = [];
  });

  it("stages only the explicit content paths it was given", async () => {
    const result = await makePublisher().publish([CONTENT_PATH], "content: update example");

    expect(calls).toContainEqual(["add", "--", CONTENT_PATH]);
    expect(calls).not.toContainEqual(expect.arrayContaining(["add", "."]));
    expect(calls).not.toContainEqual(expect.arrayContaining(["-A"]));
    expect(calls).toContainEqual(["commit", "-m", "content: update example"]);
    expect(calls).toContainEqual(["push", "origin", "main"]);
    expect(result).toMatchObject({ commit: "abc1234", pushed: true });
  });

  it("never force-pushes or resets", async () => {
    await makePublisher().publish([CONTENT_PATH], "content: update example");

    const flags = calls.flat();
    expect(flags).not.toContain("--force");
    expect(flags).not.toContain("-f");
    expect(flags).not.toContain("--force-with-lease");
    expect(flags).not.toContain("reset");
    expect(flags).not.toContain("--hard");
  });

  it("refuses paths outside content/skills", async () => {
    for (const bad of [
      "src/app/page.tsx",
      "content/skills/../../src/app/page.tsx",
      "/etc/passwd",
      "content/skills/Example.md",
      "content/skills/nested/example.md",
      "content/skill-template.md",
    ]) {
      await expect(makePublisher().publish([bad], "bad")).rejects.toThrow(/content\/skills/);
    }
    expect(calls).not.toContainEqual(expect.arrayContaining(["commit"]));
  });

  it("refuses to publish nothing", async () => {
    await expect(makePublisher().publish([], "content: nothing")).rejects.toThrow(
      GitPublishError,
    );
  });

  it("refuses an empty commit message", async () => {
    await expect(makePublisher().publish([CONTENT_PATH], "   ")).rejects.toThrow(/说明|message/i);
  });

  it("keeps ordinary punctuation but strips control characters from the message", async () => {
    // \u0007 stands in for any stray control character pasted into the box.
    await makePublisher().publish([CONTENT_PATH], "content: update pdf-toolkit\u0007v2");

    expect(calls).toContainEqual(["commit", "-m", "content: update pdf-toolkit v2"]);
  });

  it("stops when the branch is not main", async () => {
    await expect(
      makePublisher({ branch: "codex/feature" }).publish([CONTENT_PATH], "content: update"),
    ).rejects.toThrow(/main/);
    expect(calls).not.toContainEqual(expect.arrayContaining(["push"]));
  });

  it("stops when origin is not a GitHub remote", async () => {
    await expect(
      makePublisher({ remoteUrl: "git@gitlab.com:weian/website.git" }).publish(
        [CONTENT_PATH],
        "content: update",
      ),
    ).rejects.toThrow(/GitHub/i);
  });

  it("stops when the remote is ahead", async () => {
    await expect(
      makePublisher({ remoteAhead: "3" }).publish([CONTENT_PATH], "content: update"),
    ).rejects.toThrow(/remote.*ahead|GitHub.*更新/i);
    expect(calls).not.toContainEqual(expect.arrayContaining(["commit"]));
  });

  it("stops when the working tree has conflicts", async () => {
    await expect(
      makePublisher({ conflicts: `${CONTENT_PATH}\n` }).publish([CONTENT_PATH], "content: update"),
    ).rejects.toThrow(/冲突|conflict/i);
  });

  it("stops when nothing was actually staged", async () => {
    await expect(
      makePublisher({ stagedEmpty: true }).publish([CONTENT_PATH], "content: update"),
    ).rejects.toThrow(/没有|no staged/i);
    expect(calls).not.toContainEqual(expect.arrayContaining(["push"]));
  });

  it("reports non-content changes that publishing leaves untouched", async () => {
    const publisher = makePublisher({
      status: ` M ${CONTENT_PATH}\n M src/app/page.tsx\n?? notes.txt\n`,
    });

    const inspection = await publisher.inspect([CONTENT_PATH]);

    expect(inspection.branch).toBe("main");
    expect(inspection.remoteAhead).toBe(0);
    expect(inspection.dirtyCodePaths).toEqual(["src/app/page.tsx", "notes.txt"]);
  });

  it("keeps the commit and allows a retry when push fails", async () => {
    const publisher = makePublisher({ pushFails: true });

    const result = await publisher.publish([CONTENT_PATH], "content: update example");

    expect(result).toMatchObject({ commit: "abc1234", pushed: false });
    expect(result.pushError).toMatch(/github\.com/i);
    expect(calls).not.toContainEqual(expect.arrayContaining(["reset"]));
  });

  it("retries only the push, without re-staging or re-committing", async () => {
    const publisher = makePublisher({ pushFails: true });
    await publisher.publish([CONTENT_PATH], "content: update example");
    calls = [];

    const retried = await publisher.retryPush();

    expect(calls).toEqual([["push", "origin", "main"]]);
    expect(retried.pushed).toBe(false);
  });

  it("refuses a retry when nothing is pending", async () => {
    await expect(makePublisher().retryPush()).rejects.toThrow(GitPublishError);
  });
});
