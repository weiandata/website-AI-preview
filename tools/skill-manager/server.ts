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
  SkillConflictError,
  SkillNotFoundError,
  SkillStore,
} from "./lib/skill-store";

type SkillManagerAppOptions = {
  store: SkillStore;
  templatePath: string;
  savedPaths?: Set<string>;
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
  savedPaths = new Set<string>(),
}: SkillManagerAppOptions): Express {
  const app = express();
  app.use(express.json({ limit: "4mb" }));

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
      savedPaths.add(saved.path);
      response.json(saved);
    }),
  );
  app.delete(
    "/api/skills/:slug",
    asyncRoute(async (request, response) => {
      const result = await store.remove(routeSlug(request));
      savedPaths.add(result.deletedPath);
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
  const app = createSkillManagerApp({
    store: new SkillStore(
      path.join(root, "content/skills"),
      path.join(root, ".skill-manager-trash"),
    ),
    templatePath: path.join(root, "content/skill-template.md"),
  });
  const vite = await createViteServer({
    root: path.join(root, "tools/skill-manager"),
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
  app.listen(4174, "127.0.0.1", () => {
    console.log("Skill manager: http://127.0.0.1:4174");
  });
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) void startSkillManager();
