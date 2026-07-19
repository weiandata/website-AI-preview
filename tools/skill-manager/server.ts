import { spawn } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express, { type Express, type NextFunction, type Request, type Response } from "express";
import { createServer as createViteServer } from "vite";
import {
  serializeSkillMarkdown,
  SkillContentError,
} from "../../src/lib/skills/markdown";
import type { SkillDocument } from "../../src/lib/skills/schema";
import {
  GitPublishError,
  GitPublisher,
} from "./lib/git-publisher";
import { checkLinks, type LinkProblem } from "./lib/link-check";
import { createMarkdownStyleFixer } from "./lib/markdown-style";
import {
  SkillConflictError,
  SkillNotFoundError,
  SkillStore,
} from "./lib/skill-store";

type SkillManagerAppOptions = {
  store: SkillStore;
  templatePath: string;
  /** Repository root; saved paths are recorded relative to it. */
  root?: string;
  publisher?: GitPublisher;
  savedPaths?: Set<string>;
  linkChecker?: typeof checkLinks;
};

type ApiError = {
  error: {
    code: string;
    message: string;
    field?: string;
    fileName?: string;
    section?: string;
    line?: number;
  };
};

function sendError(error: unknown, response: Response): void {
  if (error instanceof SkillContentError) {
    response.status(400).json({
      error: {
        code: "VALIDATION_ERROR",
        message: error.message,
        field: error.field,
        fileName: error.fileName,
        section: error.section,
        line: error.line,
      },
    } satisfies ApiError);
    return;
  }
  if (error instanceof SkillConflictError) {
    response.status(409).json({
      error: { code: "SLUG_CONFLICT", message: error.message },
    } satisfies ApiError);
    return;
  }
  if (error instanceof GitPublishError) {
    // Git or network unavailability is a service problem, not a bad request.
    const unavailable = error.code === "GIT_FAILED" || error.code === "PUSH_FAILED";
    response.status(unavailable ? 503 : 400).json({
      error: { code: error.code, message: error.message },
    } satisfies ApiError);
    return;
  }
  if (error instanceof SkillNotFoundError) {
    response.status(404).json({
      error: { code: "NOT_FOUND", message: error.message },
    } satisfies ApiError);
    return;
  }
  const message = error instanceof Error ? error.message : "Unexpected error";
  response.status(500).json({
    error: { code: "INTERNAL_ERROR", message },
  } satisfies ApiError);
}

function asyncRoute(
  handler: (request: Request, response: Response) => Promise<void>,
): (request: Request, response: Response, next: NextFunction) => void {
  return (request, response, next) => {
    handler(request, response).catch(next);
  };
}

function routeSlug(request: Request): string {
  const value = request.params.slug;
  return Array.isArray(value) ? value[0] : value;
}

export function createSkillManagerApp({
  store,
  templatePath,
  root = process.cwd(),
  publisher = new GitPublisher(root),
  savedPaths = new Set<string>(),
  linkChecker = checkLinks,
}: SkillManagerAppOptions): Express {
  const app = express();
  app.use(express.json({ limit: "4mb" }));

  /** Reads the files about to be published; a deleted path contributes nothing. */
  const publishableSources = async (paths: string[]) =>
    Promise.all(
      paths.map(async (relativePath) => ({
        path: relativePath,
        source: await readFile(path.join(root, relativePath), "utf8").catch(() => ""),
      })),
    );
  const linkProblemsFor = async (paths: string[]): Promise<LinkProblem[]> =>
    linkChecker(await publishableSources(paths));

  /** Records a written file as a repository-relative path for publishing. */
  const recordSavedPath = (absolutePath: string): void => {
    savedPaths.add(path.relative(root, absolutePath).split(path.sep).join("/"));
  };
  const sessionPaths = (): string[] => [...savedPaths].sort();

  app.get(
    "/api/skills",
    asyncRoute(async (_request, response) => {
      response.json({ items: await store.list() });
    }),
  );
  app.get(
    "/api/skills/:slug",
    asyncRoute(async (request, response) => {
      response.json(await store.get(routeSlug(request)));
    }),
  );
  app.get(
    "/api/template",
    asyncRoute(async (_request, response) => {
      response.type("text/markdown").send(await readFile(templatePath, "utf8"));
    }),
  );
  app.post("/api/validate", (request, response) => {
    try {
      const { source, fileName } = request.body as {
        source?: unknown;
        fileName?: unknown;
      };
      if (typeof source !== "string" || typeof fileName !== "string") {
        throw new SkillContentError("source and fileName are required", {
          fileName: typeof fileName === "string" ? fileName : "request",
        });
      }
      response.json({ document: store.validate(source, fileName) });
    } catch (error) {
      sendError(error, response);
    }
  });
  app.post("/api/serialize", (request, response) => {
    try {
      const document = request.body.document as SkillDocument;
      const source = serializeSkillMarkdown(document);
      store.validate(source, `${document.slug}.md`);
      response.json({ source });
    } catch (error) {
      sendError(error, response);
    }
  });
  app.put(
    "/api/skills/:slug",
    asyncRoute(async (request, response) => {
      const document = request.body.document as SkillDocument;
      const slug = routeSlug(request);
      if (!document || slug !== document.slug) {
        throw new SkillContentError("route slug must match document slug", {
          fileName: `${slug}.md`,
          field: "slug",
        });
      }
      const saved = await store.save({
        document,
        originalSlug: request.body.originalSlug,
      });
      recordSavedPath(saved.path);
      response.json(saved);
    }),
  );
  app.delete(
    "/api/skills/:slug",
    asyncRoute(async (request, response) => {
      const result = await store.remove(routeSlug(request));
      recordSavedPath(result.deletedPath);
      response.json(result);
    }),
  );

  app.get(
    "/api/publish/preview",
    asyncRoute(async (_request, response) => {
      const paths = sessionPaths();
      response.json({
        paths,
        inspection: await publisher.inspect(paths),
        linkProblems: await linkProblemsFor(paths),
      });
    }),
  );
  app.post(
    "/api/publish",
    asyncRoute(async (request, response) => {
      // Paths always come from this session's writes, never from the browser.
      const paths = sessionPaths();
      const message = String(request.body?.message ?? "");
      // Re-checked here so a dead link cannot reach GitHub even if the browser
      // asks for it directly.
      const broken = (await linkProblemsFor(paths)).filter((problem) => problem.blocking);
      if (broken.length) {
        throw new GitPublishError(
          "LINK_BROKEN",
          `以下链接打不开，修好后再发布：${broken.map((item) => item.url).join("、")}`,
        );
      }
      const result = await publisher.publish(paths, message);
      if (result.pushed) savedPaths.clear();
      response.json(result);
    }),
  );
  app.post(
    "/api/publish/retry",
    asyncRoute(async (_request, response) => {
      const result = await publisher.retryPush();
      if (result.pushed) savedPaths.clear();
      response.json(result);
    }),
  );

  app.use((error: unknown, _request: Request, response: Response, next: NextFunction) => {
    void next;
    sendError(error, response);
  });
  return app;
}

async function startSkillManager(): Promise<void> {
  const root = process.cwd();
  // Skills saved before a restart are still unpublished; adopt them so the
  // administrator never has to hunt for work the manager forgot.
  const savedPaths = new Set(await new GitPublisher(root).pendingContentPaths());
  const app = createSkillManagerApp({
    root,
    savedPaths,
    store: new SkillStore(
      path.join(root, "content/skills"),
      path.join(root, ".skill-manager-trash"),
      createMarkdownStyleFixer(root),
    ),
    templatePath: path.join(root, "content/skill-template.md"),
  });

  const vite = await createViteServer({
    root: path.join(root, "tools/skill-manager"),
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
  const url = "http://127.0.0.1:4174";
  app.listen(4174, "127.0.0.1", () => {
    console.log(`Skill manager: ${url}`);
    if (process.platform === "darwin" && process.env.SKILL_MANAGER_NO_OPEN !== "1") {
      spawn("open", [url], { shell: false, stdio: "ignore" }).unref();
    }
  });
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) void startSkillManager();
