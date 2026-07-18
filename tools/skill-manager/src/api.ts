import type { SkillDocument } from "../../../src/lib/skills/schema";

export type StoredSkill = {
  document: SkillDocument;
  source: string;
  path: string;
};

export class ManagerApiError extends Error {
  code: string;
  field?: string;
  fileName?: string;

  constructor(payload: {
    code: string;
    message: string;
    field?: string;
    fileName?: string;
  }) {
    super(payload.message);
    this.name = "ManagerApiError";
    this.code = payload.code;
    this.field = payload.field;
    this.fileName = payload.fileName;
  }
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    const payload = await response.json();
    throw new ManagerApiError(payload.error);
  }
  return response.json() as Promise<T>;
}

const jsonHeaders = { "content-type": "application/json" };

export async function listSkills(): Promise<StoredSkill[]> {
  return (await request<{ items: StoredSkill[] }>("/api/skills")).items;
}

export async function validateMarkdown(
  source: string,
  fileName: string,
): Promise<SkillDocument> {
  return (
    await request<{ document: SkillDocument }>("/api/validate", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({ source, fileName }),
    })
  ).document;
}

export async function serializeSkill(document: SkillDocument): Promise<string> {
  return (
    await request<{ source: string }>("/api/serialize", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({ document }),
    })
  ).source;
}

export async function saveSkill(
  document: SkillDocument,
  originalSlug?: string,
): Promise<StoredSkill> {
  return request<StoredSkill>(`/api/skills/${encodeURIComponent(document.slug)}`, {
    method: "PUT",
    headers: jsonHeaders,
    body: JSON.stringify({ document, originalSlug }),
  });
}

export async function deleteSkill(slug: string): Promise<void> {
  await request(`/api/skills/${encodeURIComponent(slug)}`, { method: "DELETE" });
}

export async function getTemplate(): Promise<string> {
  const response = await fetch("/api/template");
  if (!response.ok) throw new Error("无法读取 Skill 模板");
  return response.text();
}
