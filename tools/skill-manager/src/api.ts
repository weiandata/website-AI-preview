import type { SkillContentIssue } from "../../../src/lib/skills/markdown";
import type { SkillDocument } from "../../../src/lib/skills/schema";

export type { SkillContentIssue };

export type StoredSkill = {
  document: SkillDocument;
  source: string;
  path: string;
};

export class ManagerApiError extends Error {
  code: string;
  field?: string;
  fileName?: string;
  /** Every problem the server found, not just the first one. */
  issues: SkillContentIssue[];

  constructor(payload: {
    code: string;
    message: string;
    field?: string;
    fileName?: string;
    section?: string;
    line?: number;
    issues?: SkillContentIssue[];
  }) {
    super(payload.message);
    this.name = "ManagerApiError";
    this.code = payload.code;
    this.field = payload.field;
    this.fileName = payload.fileName;
    this.issues = payload.issues?.length
      ? payload.issues
      : [
          {
            message: payload.message,
            hint: "",
            field: payload.field,
            section: payload.section,
            line: payload.line,
          },
        ];
  }
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, init);
  if (!response.ok) {
    // A crashed or proxied server can answer with something that is not JSON.
    const payload = await response.json().catch(() => undefined);
    throw new ManagerApiError(
      payload?.error ?? {
        code: "UNEXPECTED_RESPONSE",
        message: `服务器返回 ${response.status}，未给出详细原因`,
      },
    );
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

export type PublishInspection = {
  branch: string;
  remoteUrl: string;
  remoteAhead: number;
  dirtyCodePaths: string[];
  conflictedPaths: string[];
};

export type LinkProblem = {
  path: string;
  url: string;
  reason: string;
  /** Dead links block publishing; unreachable ones only warn. */
  blocking: boolean;
};

export type PublishPreview = {
  paths: string[];
  inspection: PublishInspection;
  linkProblems: LinkProblem[];
};

export type PublishResult = {
  commit: string;
  pushed: boolean;
  message: string;
  pushError?: string;
};

export async function previewPublish(): Promise<PublishPreview> {
  return request<PublishPreview>("/api/publish/preview");
}

/** The server publishes this session's saved paths; the browser cannot choose them. */
export async function publishSkills(message: string): Promise<PublishResult> {
  return request<PublishResult>("/api/publish", {
    method: "POST",
    headers: jsonHeaders,
    body: JSON.stringify({ message }),
  });
}

export async function retryPublishPush(): Promise<PublishResult> {
  return request<PublishResult>("/api/publish/retry", { method: "POST" });
}

export type ExitPreview = {
  unpublishedPaths: string[];
  pendingPush: boolean;
};

export async function previewExit(): Promise<ExitPreview> {
  return request<ExitPreview>("/api/exit/preview");
}

export async function exitManager(): Promise<void> {
  await request("/api/exit", { method: "POST" });
}

export async function getTemplate(): Promise<string> {
  const response = await fetch("/api/template");
  if (!response.ok) throw new Error("无法读取 Skill 模板");
  return response.text();
}
