import { mkdtemp, readFile, rm } from "node:fs/promises";
import type { Server } from "node:http";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { parseSkillMarkdown } from "@/lib/skills/markdown";
import type { SkillDocument } from "@/lib/skills/schema";
import { GitPublisher, type GitRunner } from "../../tools/skill-manager/lib/git-publisher";
import type { LinkProblem } from "../../tools/skill-manager/lib/link-check";
import { SkillStore } from "../../tools/skill-manager/lib/skill-store";
import { createSkillManagerApp } from "../../tools/skill-manager/server";

describe("local Skill manager publish API", () => {
  let root: string;
  let server: Server;
  let baseUrl: string;
  let document: SkillDocument;
  let calls: string[][];
  let linkProblems: LinkProblem[];

  beforeEach(async () => {
    root = await mkdtemp(path.join(os.tmpdir(), "weian-skill-publish-"));
    calls = [];
    linkProblems = [];
    const templatePath = path.join(process.cwd(), "content/skill-template.md");
    document = parseSkillMarkdown(await readFile(templatePath, "utf8"), "example-skill.md");

    const runner: GitRunner = async (args) => {
      calls.push(args);
      const key = args.join(" ");
      const ok = (stdout = "") => ({ stdout, stderr: "", exitCode: 0 });
      if (key === "rev-parse --abbrev-ref HEAD") return ok("main");
      if (key === "remote get-url origin") return ok("git@github.com:weian/website.git");
      if (key === "rev-list --count HEAD..origin/main") return ok("0");
      if (key === "status --porcelain") return ok(" M content/skills/example-skill.md\n M README.md\n");
      if (key === "diff --cached --quiet") return { stdout: "", stderr: "", exitCode: 1 };
      if (key === "rev-parse HEAD") return ok("abc1234");
      return ok();
    };

    const app = createSkillManagerApp({
      store: new SkillStore(
        path.join(root, "content/skills"),
        path.join(root, ".skill-manager-trash"),
      ),
      templatePath,
      root,
      publisher: new GitPublisher(root, runner),
      linkChecker: async () => linkProblems,
    });
    await new Promise<void>((resolve, reject) => {
      server = app.listen(0, "127.0.0.1", (error?: Error) => (error ? reject(error) : resolve()));
    });
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("missing port");
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterEach(async () => {
    if (server) await new Promise<void>((resolve) => server.close(() => resolve()));
    await rm(root, { recursive: true, force: true });
  });

  async function saveExample(): Promise<void> {
    const response = await fetch(`${baseUrl}/api/skills/example-skill`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ document }),
    });
    expect(response.status).toBe(200);
  }

  it("publishes only the paths saved in this session", async () => {
    await saveExample();

    const response = await fetch(`${baseUrl}/api/publish`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "content: update example" }),
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ commit: "abc1234", pushed: true });
    expect(calls).toContainEqual(["add", "--", "content/skills/example-skill.md"]);
    expect(calls).not.toContainEqual(expect.arrayContaining(["add", "."]));
  });

  it("refuses to publish a Skill whose link is dead", async () => {
    await saveExample();
    linkProblems = [
      {
        path: "content/skills/example-skill.md",
        url: "https://weian.test/gone",
        reason: "打不开（HTTP 404）",
        blocking: true,
      },
    ];

    const response = await fetch(`${baseUrl}/api/publish`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "content: update example" }),
    });

    expect(response.status).toBe(400);
    expect((await response.json()).error).toMatchObject({ code: "LINK_BROKEN" });
    expect(calls).not.toContainEqual(["add", "--", "content/skills/example-skill.md"]);
  });

  it("publishes when a link merely could not be confirmed", async () => {
    await saveExample();
    linkProblems = [
      {
        path: "content/skills/example-skill.md",
        url: "https://weian.test/slow",
        reason: "检查超时，没能确认",
        blocking: false,
      },
    ];

    const response = await fetch(`${baseUrl}/api/publish`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "content: update example" }),
    });

    expect(response.status).toBe(200);
    expect(calls).toContainEqual(["add", "--", "content/skills/example-skill.md"]);
  });

  it("ignores any paths the browser tries to supply", async () => {
    await saveExample();

    const response = await fetch(`${baseUrl}/api/publish`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        message: "content: update example",
        paths: ["src/app/page.tsx", "../../etc/passwd"],
      }),
    });

    expect(response.status).toBe(200);
    const staged = calls.filter((args) => args[0] === "add").map((args) => args[2]);
    expect(staged).toEqual(["content/skills/example-skill.md"]);
  });

  it("refuses to publish before anything has been saved", async () => {
    const response = await fetch(`${baseUrl}/api/publish`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ message: "content: nothing" }),
    });

    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({
      error: { code: "NOTHING_TO_PUBLISH" },
    });
    expect(calls).not.toContainEqual(expect.arrayContaining(["commit"]));
  });

  it("previews the session paths and the changes publishing leaves alone", async () => {
    await saveExample();

    const response = await fetch(`${baseUrl}/api/publish/preview`);

    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({
      paths: ["content/skills/example-skill.md"],
      inspection: { branch: "main", remoteAhead: 0, dirtyCodePaths: ["README.md"] },
    });
  });
});
