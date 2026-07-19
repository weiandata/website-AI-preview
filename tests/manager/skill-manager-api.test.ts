import { mkdtemp, readFile, rm } from "node:fs/promises";
import type { Server } from "node:http";
import os from "node:os";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { parseSkillMarkdown } from "@/lib/skills/markdown";
import type { SkillDocument } from "@/lib/skills/schema";
import { SkillStore } from "../../tools/skill-manager/lib/skill-store";
import { createSkillManagerApp } from "../../tools/skill-manager/server";

describe("local Skill manager API", () => {
  let root: string;
  let server: Server;
  let baseUrl: string;
  let source: string;
  let document: SkillDocument;

  beforeEach(async () => {
    root = await mkdtemp(path.join(os.tmpdir(), "weian-skill-api-"));
    const templatePath = path.join(process.cwd(), "content/skill-template.md");
    source = await readFile(templatePath, "utf8");
    document = parseSkillMarkdown(source, "example-skill.md");
    const store = new SkillStore(
      path.join(root, "content/skills"),
      path.join(root, ".skill-manager-trash"),
    );
    const app = createSkillManagerApp({ store, templatePath });
    await new Promise<void>((resolve, reject) => {
      server = app.listen(0, "127.0.0.1", (error?: Error) => {
        if (error) reject(error);
        else resolve();
      });
    });
    const address = server.address();
    if (!address || typeof address === "string") throw new Error("missing port");
    baseUrl = `http://127.0.0.1:${address.port}`;
  });

  afterEach(async () => {
    if (server) await new Promise<void>((resolve) => server.close(() => resolve()));
    await rm(root, { recursive: true, force: true });
  });

  it("retrieves the template and validates Markdown", async () => {
    const templateResponse = await fetch(`${baseUrl}/api/template`);
    expect(templateResponse.status).toBe(200);
    expect(await templateResponse.text()).toContain("slug: example-skill");

    const response = await fetch(`${baseUrl}/api/validate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ source, fileName: "example-skill.md" }),
    });
    expect(response.status).toBe(200);
    expect((await response.json()).document.slug).toBe("example-skill");
  });

  it("serializes, saves, lists, rejects conflicts, and deletes", async () => {
    const serializeResponse = await fetch(`${baseUrl}/api/serialize`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ document }),
    });
    expect((await serializeResponse.json()).source).toContain("# Description");

    const save = () =>
      fetch(`${baseUrl}/api/skills/example-skill`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ document }),
      });
    expect((await save()).status).toBe(200);
    expect((await save()).status).toBe(409);

    const listResponse = await fetch(`${baseUrl}/api/skills`);
    expect((await listResponse.json()).items).toHaveLength(1);

    const deleteResponse = await fetch(`${baseUrl}/api/skills/example-skill`, {
      method: "DELETE",
    });
    expect(deleteResponse.status).toBe(200);
    expect((await deleteResponse.json()).deletedPath).toContain("example-skill.md");
  });

  it("returns structured validation errors", async () => {
    const response = await fetch(`${baseUrl}/api/validate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ source: "invalid", fileName: "broken.md" }),
    });

    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({
      error: { code: "VALIDATION_ERROR", fileName: "broken.md" },
    });
  });

  it("returns every validation issue in one response", async () => {
    const response = await fetch(`${baseUrl}/api/validate`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        source: "---\nschemaVersion: 1\nstatus: draft\n---\n\n# Description\n",
        fileName: "broken.md",
      }),
    });

    const payload = await response.json();
    expect(payload.error.issues.length).toBeGreaterThan(1);
    expect(payload.error.issues[0]).toMatchObject({
      message: expect.any(String),
      hint: expect.any(String),
    });
  });
});
