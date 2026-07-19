import { spawn } from "node:child_process";

export type GitResult = { stdout: string; stderr: string; exitCode: number };
export type GitRunner = (args: string[], cwd: string) => Promise<GitResult>;

export type PublishInspection = {
  branch: string;
  remoteUrl: string;
  remoteAhead: number;
  /** Dirty files outside content/skills; publishing never stages these. */
  dirtyCodePaths: string[];
  conflictedPaths: string[];
};

export type PublishResult = {
  commit: string;
  pushed: boolean;
  message: string;
  pushError?: string;
};

export class GitPublishError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = "GitPublishError";
    this.code = code;
  }
}

/** The only files the manager is ever allowed to stage. */
const CONTENT_PATH_PATTERN = /^content\/skills\/[a-z0-9-]+\.md$/;
const GITHUB_REMOTE_PATTERN = /^(git@github\.com:|https:\/\/github\.com\/|ssh:\/\/git@github\.com\/)/;
const PUBLISH_BRANCH = "main";

export function runGitProcess(args: string[], cwd: string): Promise<GitResult> {
  return new Promise((resolve, reject) => {
    const child = spawn("git", args, { cwd, shell: false });
    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (chunk) => {
      stdout += String(chunk);
    });
    child.stderr.on("data", (chunk) => {
      stderr += String(chunk);
    });
    child.on("error", reject);
    child.on("close", (code) => {
      resolve({ stdout, stderr, exitCode: code ?? 1 });
    });
  });
}

/** Rejects anything that is not a plain content/skills/<slug>.md path. */
export function assertContentPath(candidate: string): string {
  const value = String(candidate ?? "").trim();
  if (
    !value ||
    value.includes("\\") ||
    value.includes("..") ||
    value.startsWith("/") ||
    !CONTENT_PATH_PATTERN.test(value)
  ) {
    throw new GitPublishError(
      "INVALID_PATH",
      `只能发布 content/skills/<slug>.md 形式的内容文件，收到：${candidate}`,
    );
  }
  return value;
}

export class GitPublisher {
  private pending?: { commit: string; message: string };

  constructor(
    private readonly root: string,
    private readonly runGit: GitRunner = runGitProcess,
  ) {}

  private async git(...args: string[]): Promise<GitResult> {
    return this.runGit(args, this.root);
  }

  private async gitOrThrow(...args: string[]): Promise<GitResult> {
    const result = await this.git(...args);
    if (result.exitCode !== 0) {
      throw new GitPublishError(
        "GIT_FAILED",
        `git ${args[0]} 失败：${result.stderr.trim() || result.stdout.trim()}`,
      );
    }
    return result;
  }

  async inspect(paths: string[]): Promise<PublishInspection> {
    paths.forEach(assertContentPath);

    const branch = (await this.gitOrThrow("rev-parse", "--abbrev-ref", "HEAD")).stdout.trim();
    const remoteUrl = (await this.gitOrThrow("remote", "get-url", "origin")).stdout.trim();
    await this.gitOrThrow("fetch", "origin", PUBLISH_BRANCH);
    const remoteAhead = Number.parseInt(
      (await this.gitOrThrow("rev-list", "--count", `HEAD..origin/${PUBLISH_BRANCH}`)).stdout.trim(),
      10,
    );
    const status = (await this.gitOrThrow("status", "--porcelain")).stdout;
    const conflicts = (await this.gitOrThrow("diff", "--name-only", "--diff-filter=U")).stdout;

    const dirtyCodePaths = status
      .split("\n")
      .map((line) => line.slice(3).trim())
      .filter((entry) => entry && !CONTENT_PATH_PATTERN.test(entry));

    return {
      branch,
      remoteUrl,
      remoteAhead: Number.isNaN(remoteAhead) ? 0 : remoteAhead,
      dirtyCodePaths,
      conflictedPaths: conflicts.split("\n").map((line) => line.trim()).filter(Boolean),
    };
  }

  /**
   * Skill files that differ from the last commit, so restarting the manager
   * does not strand work the administrator already saved. Still only ever
   * content paths: application code can no more be published this way than
   * through a save.
   */
  async pendingContentPaths(): Promise<string[]> {
    const status = (await this.gitOrThrow("status", "--porcelain")).stdout;
    return status
      .split("\n")
      .map((line) => line.slice(3).trim())
      .filter((entry) => CONTENT_PATH_PATTERN.test(entry))
      .sort();
  }

  async publish(paths: string[], message: string): Promise<PublishResult> {
    const contentPaths = [...new Set(paths.map(assertContentPath))];
    if (!contentPaths.length) {
      throw new GitPublishError("NOTHING_TO_PUBLISH", "没有需要发布的 Skill 内容文件。");
    }

    const commitMessage = message.replace(/[\x00-\x1f\x7f]/g, " ").trim();
    if (!commitMessage) {
      throw new GitPublishError("EMPTY_MESSAGE", "发布说明不能为空，请填写本次修改的 message。");
    }

    const inspection = await this.inspect(contentPaths);
    if (inspection.branch !== PUBLISH_BRANCH) {
      throw new GitPublishError(
        "WRONG_BRANCH",
        `只能从 ${PUBLISH_BRANCH} 分支发布，当前分支是 ${inspection.branch}。`,
      );
    }
    if (!GITHUB_REMOTE_PATTERN.test(inspection.remoteUrl)) {
      throw new GitPublishError(
        "NOT_GITHUB",
        `origin 不是 GitHub 仓库，无法发布：${inspection.remoteUrl}`,
      );
    }
    if (inspection.conflictedPaths.length) {
      throw new GitPublishError(
        "CONFLICTED",
        `仓库有未解决的冲突文件，请先处理：${inspection.conflictedPaths.join("、")}`,
      );
    }
    if (inspection.remoteAhead > 0) {
      throw new GitPublishError(
        "REMOTE_AHEAD",
        `GitHub 上的 ${PUBLISH_BRANCH} 比本机新 ${inspection.remoteAhead} 个提交（remote is ahead），请先同步后再发布。`,
      );
    }

    for (const contentPath of contentPaths) {
      await this.gitOrThrow("add", "--", contentPath);
    }

    // `diff --cached --quiet` exits 0 when the index matches HEAD.
    const staged = await this.git("diff", "--cached", "--quiet");
    if (staged.exitCode === 0) {
      throw new GitPublishError(
        "NOTHING_STAGED",
        "这些文件和 GitHub 上的内容一致，没有需要发布的修改（no staged changes）。",
      );
    }

    await this.gitOrThrow("commit", "-m", commitMessage);
    const commit = (await this.gitOrThrow("rev-parse", "HEAD")).stdout.trim();
    this.pending = { commit, message: commitMessage };

    return this.push();
  }

  /** A commit that reached the local repository but never reached GitHub. */
  hasPendingPush(): boolean {
    return Boolean(this.pending);
  }

  async retryPush(): Promise<PublishResult> {
    if (!this.pending) {
      throw new GitPublishError("NOTHING_PENDING", "没有等待 push 的本地提交。");
    }
    return this.push();
  }

  /** Push failures keep the local commit so the administrator can retry. */
  private async push(): Promise<PublishResult> {
    const pending = this.pending!;
    const result = await this.git("push", "origin", PUBLISH_BRANCH);
    if (result.exitCode !== 0) {
      return {
        commit: pending.commit,
        message: pending.message,
        pushed: false,
        pushError: result.stderr.trim() || result.stdout.trim() || "push 失败",
      };
    }
    this.pending = undefined;
    return { commit: pending.commit, message: pending.message, pushed: true };
  }
}
