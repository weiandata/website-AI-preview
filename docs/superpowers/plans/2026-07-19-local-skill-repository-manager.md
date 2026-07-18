# WEIAN DATA Local Skill Repository Manager Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hand-edited TypeScript Skill catalog with one Markdown file per Skill, add a Mac-local visual repository manager with safe save/publish actions, and deploy the resulting static site from GitHub through Cloudflare Pages.

**Architecture:** Build a shared Markdown parser, schema, serializer, and file repository that are the only path from `content/skills/*.md` to the existing `Skill` UI model. Server components read Markdown at build time and pass serializable Skill data into existing client components. A separate localhost-only Vite/Express manager reuses the same content modules for editing, import/export, atomic writes, and explicit-path Git publishing; it is never included in the production site.

**Tech Stack:** Next.js 16, React 19, TypeScript 6, Zod, gray-matter, unified/remark-parse, Express, Vite, fflate, Vitest, Testing Library, Playwright, Git, Cloudflare Pages static export.

## Global Constraints

- Markdown is the only maintained Skill data source; do not keep JSON or TypeScript content mirrors.
- Every Skill lives in `content/skills/<slug>.md` and follows schema version `1`.
- The manager binds only to `127.0.0.1` and is not shipped at `/admin` or any production route.
- The manager exposes every Skill field in one complete form.
- Support single/multi-file Markdown import, single Markdown export, and all-Skill ZIP export.
- Provide separate “仅保存” and “保存并发布” actions.
- Publishing may stage only explicit `content/skills/*.md` paths changed through the manager.
- Never force-push, hard-reset, or silently overwrite a conflicting slug.
- `draft` Skills must be absent from every public page, search corpus, structured-data block, and sitemap.
- Featured Skills are administrator-controlled by `featured` and ascending `featuredRank`.
- Remove the fixed popular-search UI and collect no search analytics.
- Production remains a static Cloudflare Pages deployment from GitHub `main` using build command `npm run build` and output directory `out`.
- Preserve current bilingual copy, visual design, routes, filtering, related-Skill logic, accessibility, and responsive behavior unless this plan explicitly changes them.

---

## File Map

### Shared content model

- Create `src/lib/skills/schema.ts`: Zod metadata/document schemas and `SkillDocument` type.
- Create `src/lib/skills/markdown.ts`: Markdown AST parsing and canonical serialization.
- Create `src/lib/skills/repository.ts`: build-time file discovery and published-Skill queries.
- Modify `src/types/content.ts`: add `featuredRank` to the public `Skill` model.
- Create `content/skill-template.md`: administrator-facing version-1 template.
- Create `content/skills/*.md`: eight migrated Skill records.
- Delete `src/data/skills.ts` after all consumers migrate.

### Public website consumers

- Modify `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/skills/page.tsx`, `src/app/skills/[slug]/page.tsx`, and `src/app/sitemap.ts` to load published Markdown data on the server.
- Modify `src/components/layout/site-shell.tsx` and `src/components/language/localized-document-title.tsx` to receive lightweight title records.
- Modify `src/components/home/discovery-search.tsx`, `featured-skills.tsx`, `recent-skills.tsx`, and `category-explorer.tsx` to receive `skills` props.
- Modify `src/components/skills/hero-search.tsx`, `skill-library.tsx`, and `skill-detail.tsx` to receive `skills` props and stop importing the legacy array.

### Local manager

- Create `tools/skill-manager/server.ts`: localhost Express/Vite host and API routes.
- Create `tools/skill-manager/lib/skill-store.ts`: validated atomic file operations and recoverable deletion.
- Create `tools/skill-manager/lib/git-publisher.ts`: explicit-path Git inspection, commit, and push.
- Create `tools/skill-manager/src/App.tsx`: manager state and workflows.
- Create `tools/skill-manager/src/components/SkillList.tsx`, `SkillForm.tsx`, `LocalizedTextEditor.tsx`, `StringListEditor.tsx`, `ChangelogEditor.tsx`, `FaqEditor.tsx`, `ImportReview.tsx`, and `SkillPreview.tsx`: focused UI units.
- Create `tools/skill-manager/src/api.ts`, `main.tsx`, and `styles.css`: API client, entry point, and visual system.
- Create `tools/skill-manager/index.html` and `tools/skill-manager/vite.config.ts`.
- Create `启动Skill管理器.command`: Mac launcher that always changes into the project directory first.

### Tests and deployment

- Create `tests/lib/skill-markdown.test.ts`, `tests/lib/skill-repository.test.ts`, `tests/manager/skill-store.test.ts`, `tests/manager/git-publisher.test.ts`, and `tests/manager/skill-manager-ui.test.tsx`.
- Create `scripts/migrate-skills-to-markdown.ts` and remove it after the checked-in migration is verified.
- Modify existing component, query, sitemap, launcher, and E2E tests to load Markdown fixtures and assert the removed popular-search UI.
- Modify `next.config.ts`, `package.json`, `.gitignore`, and `README.md` for static export, manager scripts, Cloudflare settings, and local maintenance instructions.

---

### Task 1: Shared Markdown schema, parser, serializer, and template

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `src/types/content.ts`
- Create: `src/lib/skills/schema.ts`
- Create: `src/lib/skills/markdown.ts`
- Create: `content/skill-template.md`
- Create: `tests/lib/skill-markdown.test.ts`

**Interfaces:**

- Produces: `SkillDocument`, `SkillContentError`, `parseSkillMarkdown(source, fileName)`, `serializeSkillMarkdown(document)`, `validateSkillDocuments(documents)`.
- Consumes: existing `Skill`, `CategoryId`, `SkillIconKey`, `SkillFaq`, and `SkillChangelog` types.

- [ ] **Step 1: Install the parsing and validation dependencies**

Run:

```bash
npm install gray-matter zod unified remark-parse
npm install --save-dev tsx
```

Expected: `package.json` and `package-lock.json` add the four runtime dependencies without changing the existing Next/React versions.

- [ ] **Step 2: Extend the public Skill type and define the document contract**

Add to `Skill` in `src/types/content.ts`:

```ts
featuredRank: number;
```

Create `src/lib/skills/schema.ts` with these exported contracts:

```ts
import { z } from "zod";
import type { Skill } from "@/types/content";

export const skillStatuses = ["draft", "published"] as const;
export type SkillStatus = (typeof skillStatuses)[number];

export type SkillDocument = Skill & {
  schemaVersion: 1;
  status: SkillStatus;
};

export const skillFrontmatterSchema = z.object({
  schemaVersion: z.literal(1),
  status: z.enum(skillStatuses),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  name: z.string().min(1),
  nameZh: z.string().min(1),
  category: z.enum([
    "development", "data-analytics", "research-writing", "content-creation",
    "automation", "image-design", "files-pdf", "productivity",
  ]),
  tags: z.array(z.string().min(1)),
  platforms: z.array(z.string().min(1)),
  author: z.string().min(1),
  version: z.string().min(1),
  license: z.string().min(1),
  addedAt: z.iso.date(),
  updatedAt: z.iso.date(),
  githubUrl: z.union([z.url(), z.literal("")]).optional(),
  officialUrl: z.union([z.url(), z.literal("")]).optional(),
  downloadUrl: z.union([z.url(), z.literal("")]).optional(),
  featured: z.boolean(),
  featuredRank: z.number().int().nonnegative(),
  verified: z.boolean(),
  icon: z.enum(["analysis", "automation", "code", "document", "image", "productivity", "research", "writing"]),
  stars: z.number().int().nonnegative(),
  downloads: z.number().int().nonnegative(),
});
```

Normalize empty optional URLs to `undefined`, and derive `id` from `slug` when constructing `SkillDocument`.

- [ ] **Step 3: Write the failing parser round-trip tests**

Create `tests/lib/skill-markdown.test.ts`:

```ts
import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { parseSkillMarkdown, serializeSkillMarkdown, validateSkillDocuments } from "@/lib/skills/markdown";

describe("Skill Markdown", () => {
  it("parses the official template and round-trips every field", async () => {
    const source = await readFile(path.join(process.cwd(), "content/skill-template.md"), "utf8");
    const parsed = parseSkillMarkdown(source, "example-skill.md");
    expect(parsed.slug).toBe("example-skill");
    expect(parsed.description.zh).toContain("Skill");
    expect(parsed.features.en).toHaveLength(3);
    expect(parsed.installation).toHaveLength(2);
    expect(parseSkillMarkdown(serializeSkillMarkdown(parsed), "example-skill.md")).toEqual(parsed);
  });

  it("reports a file-scoped error for invalid headings and duplicate slugs", async () => {
    expect(() => parseSkillMarkdown("---\nschemaVersion: 1\n---", "broken.md"))
      .toThrow(/broken\.md/);
    const source = await readFile(path.join(process.cwd(), "content/skill-template.md"), "utf8");
    const document = parseSkillMarkdown(source.replaceAll("example-skill", "same"), "same.md");
    expect(() => validateSkillDocuments([document, document])).toThrow(/duplicate slug/i);
  });
});
```

- [ ] **Step 4: Run the parser test and confirm the red state**

Run:

```bash
npm test -- tests/lib/skill-markdown.test.ts
```

Expected: FAIL because `@/lib/skills/markdown` does not exist.

- [ ] **Step 5: Implement deterministic AST parsing and canonical serialization**

In `src/lib/skills/markdown.ts`, parse frontmatter with `gray-matter`, parse the body with `unified().use(remarkParse)`, and split nodes using exact level-1 headings:

```ts
const requiredSections = [
  "Description", "Long Description", "Features", "Use Cases",
  "Installation", "Usage", "Workflow", "Changelog", "FAQ",
] as const;

export function parseSkillMarkdown(source: string, fileName: string): SkillDocument;
export function serializeSkillMarkdown(document: SkillDocument): string;
export function validateSkillDocuments(documents: SkillDocument[]): void;
```

Export `SkillContentError` with `fileName`, `field?`, `section?`, `line?`, and `message`. Convert YAML, Zod, and Markdown-structure failures into this one shape, using AST node positions for section/body errors and frontmatter line lookup for metadata errors. The manager API can then show the exact file, field/section, and line instead of a generic parse failure.

Implement helpers with exact responsibilities:

```ts
function splitLevelOneSections(root: Root, fileName: string): Map<string, RootContent[]>;
function readLocalizedText(nodes: RootContent[], fileName: string): { zh: string; en: string };
function readLocalizedList(nodes: RootContent[], ordered: boolean, fileName: string): { zh: string[]; en: string[] };
function readInstallation(nodes: RootContent[], fileName: string): string[];
function readChangelog(nodes: RootContent[], fileName: string): SkillChangelog[];
function readFaq(nodes: RootContent[], fileName: string): SkillFaq[];
```

Reject unknown/missing top-level headings, malformed `version | YYYY-MM-DD` changelog headings, incomplete FAQ language fields, filename/slug mismatches, and duplicate slugs. Serializer output must use the exact section order in `requiredSections`, two trailing newlines between sections, fenced `bash` blocks, and stable YAML field order.

- [ ] **Step 6: Add the approved full template and run the focused tests**

Copy the complete template from the approved design into `content/skill-template.md`, using `icon: analysis`. Then run:

```bash
npm test -- tests/lib/skill-markdown.test.ts
npm run typecheck
```

Expected: parser tests PASS and TypeScript reports no errors.

- [ ] **Step 7: Commit the shared content format**

```bash
git add package.json package-lock.json src/types/content.ts src/lib/skills/schema.ts src/lib/skills/markdown.ts content/skill-template.md tests/lib/skill-markdown.test.ts
git commit -m "feat: define Skill Markdown format"
```

---

### Task 2: Lossless migration of all eight Skills

**Files:**

- Create: `scripts/migrate-skills-to-markdown.ts`
- Create: `content/skills/data-analysis-assistant.md`
- Create: `content/skills/research-writing-assistant.md`
- Create: `content/skills/github-workflow-helper.md`
- Create: `content/skills/pdf-document-toolkit.md`
- Create: `content/skills/content-publishing-assistant.md`
- Create: `content/skills/workflow-automation-kit.md`
- Create: `content/skills/visual-design-reviewer.md`
- Create: `content/skills/focus-planning-companion.md`
- Create: `tests/lib/skill-migration.test.ts`
- Delete after migration verification: `scripts/migrate-skills-to-markdown.ts`

**Interfaces:**

- Consumes: `serializeSkillMarkdown`, legacy `skills`, and `SkillDocument`.
- Produces: eight validated version-1 Markdown source files.

- [ ] **Step 1: Write the migration equality test before generating files**

Create `tests/lib/skill-migration.test.ts`:

```ts
import { readFile } from "node:fs/promises";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { skills as legacySkills } from "@/data/skills";
import { parseSkillMarkdown } from "@/lib/skills/markdown";

it("migrates every legacy Skill without field loss", async () => {
  const migrated = await Promise.all(legacySkills.map(async (legacy) => {
    const source = await readFile(path.join(process.cwd(), "content/skills", `${legacy.slug}.md`), "utf8");
    return parseSkillMarkdown(source, `${legacy.slug}.md`);
  }));
  expect(migrated).toHaveLength(legacySkills.length);
  for (const legacy of legacySkills) {
    const document = migrated.find((item) => item.slug === legacy.slug)!;
    const { schemaVersion, status, ...publicSkill } = document;
    expect(schemaVersion).toBe(1);
    expect(status).toBe("published");
    expect(publicSkill).toEqual({ ...legacy, featuredRank: legacy.featured ? legacySkills.indexOf(legacy) + 1 : 0 });
  }
});
```

- [ ] **Step 2: Run the migration test and confirm missing-file failure**

Run:

```bash
npm test -- tests/lib/skill-migration.test.ts
```

Expected: FAIL with `ENOENT` for the first missing Markdown file.

- [ ] **Step 3: Implement and run a one-time deterministic migration script**

Create `scripts/migrate-skills-to-markdown.ts` that maps each legacy Skill to:

```ts
const document: SkillDocument = {
  ...skill,
  schemaVersion: 1,
  status: "published",
  featuredRank: skill.featured ? index + 1 : 0,
};
```

Write each serialized document with `mkdir(..., { recursive: true })` and `writeFile(path, source, { flag: "wx" })` so the migration cannot overwrite an existing content file. Run:

```bash
npm exec tsx -- scripts/migrate-skills-to-markdown.ts
```

Expected: exactly eight paths are printed and `content/skills` contains exactly eight `.md` files.

- [ ] **Step 4: Verify lossless migration and remove the one-time script**

Run:

```bash
npm test -- tests/lib/skill-migration.test.ts
```

Expected: PASS for all eight records. Then delete `scripts/migrate-skills-to-markdown.ts`; the checked-in Markdown is now the maintained source.

- [ ] **Step 5: Commit the migrated content**

```bash
git add content/skills tests/lib/skill-migration.test.ts scripts/migrate-skills-to-markdown.ts
git commit -m "content: migrate Skills to Markdown"
```

If Git reports the migration script path no longer exists, use `git add -A scripts content/skills tests/lib/skill-migration.test.ts` so its deliberate removal is recorded.

---

### Task 3: Build-time repository and public website migration

**Files:**

- Create: `src/lib/skills/repository.ts`
- Create: `tests/lib/skill-repository.test.ts`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/skills/page.tsx`
- Modify: `src/app/skills/[slug]/page.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `src/components/layout/site-shell.tsx`
- Modify: `src/components/language/localized-document-title.tsx`
- Modify: `src/components/home/discovery-search.tsx`
- Modify: `src/components/home/featured-skills.tsx`
- Modify: `src/components/home/recent-skills.tsx`
- Modify: `src/components/home/category-explorer.tsx`
- Modify: `src/components/skills/hero-search.tsx`
- Modify: `src/components/skills/skill-library.tsx`
- Modify: `src/components/skills/skill-detail.tsx`
- Modify: `src/lib/skill-query.ts`
- Modify: `src/app/editorial.css`
- Modify: tests importing `@/data/skills`
- Delete: `src/data/skills.ts`

**Interfaces:**

- Produces: `getSkillDocuments(contentDir?)`, `getPublishedSkills(contentDir?)`, `getPublishedSkillBySlug(slug, contentDir?)`, and `SkillTitleRecord`.
- Consumes: parser and validator from Task 1 plus Markdown from Task 2.

- [ ] **Step 1: Write failing repository tests for drafts, order, and duplicate validation**

Create `tests/lib/skill-repository.test.ts` using `mkdtemp` and complete serialized fixtures:

```ts
it("returns only published Skills and sorts featured Skills by rank", async () => {
  await writeDocuments(tempDir, [publishedRank2, draftRank1, publishedRank1]);
  const skills = await getPublishedSkills(tempDir);
  expect(skills.map((skill) => skill.slug)).toEqual(["rank-one", "rank-two"]);
  expect(skills.every((skill) => !("status" in skill))).toBe(true);
});

it("fails the repository load when any document is invalid", async () => {
  await writeFile(path.join(tempDir, "broken.md"), "invalid");
  await expect(getSkillDocuments(tempDir)).rejects.toThrow(/broken\.md/);
});
```

Run `npm test -- tests/lib/skill-repository.test.ts`; expect FAIL because the repository module is missing.

- [ ] **Step 2: Implement the build-time repository**

Create `src/lib/skills/repository.ts`:

```ts
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { Skill } from "@/types/content";
import { parseSkillMarkdown, validateSkillDocuments } from "./markdown";
import type { SkillDocument } from "./schema";

export type SkillTitleRecord = Pick<Skill, "slug" | "name" | "nameZh">;

export async function getSkillDocuments(contentDir = path.join(process.cwd(), "content/skills")): Promise<SkillDocument[]>;
export async function getPublishedSkills(contentDir?: string): Promise<Skill[]>;
export async function getPublishedSkillBySlug(slug: string, contentDir?: string): Promise<Skill | undefined>;
```

Read only `.md` files in lexical filename order, parse all files, validate the full collection, exclude drafts, and strip `schemaVersion/status`. Sort the public result with featured items first, featured items by ascending `featuredRank`, and all ties/non-featured items by descending `addedAt`; this prevents the conventional rank `0` on non-featured records from appearing before administrator selections.

- [ ] **Step 3: Refactor server entry points to load once and pass props**

Use these prop contracts:

```ts
export function DiscoverySearch({ skills }: { skills: Skill[] })
export function FeaturedSkills({ skills }: { skills: Skill[] })
export function RecentSkills({ skills }: { skills: Skill[] })
export function CategoryExplorer({ skills, showHeader = true }: { skills: Skill[]; showHeader?: boolean })
export function HeroSearch({ skills }: { skills: Skill[] })
export function SkillLibrary({ skills }: { skills: Skill[] })
export function SkillDetail({ skill, skills }: { skill: Skill; skills: Skill[] })
export function SiteShell({ children, skillTitles }: { children: ReactNode; skillTitles: SkillTitleRecord[] })
export function LocalizedDocumentTitle({ skillTitles }: { skillTitles: SkillTitleRecord[] })
```

Make `RootLayout`, `Home`, `SkillsPage`, `SkillPage`, and `sitemap` async where needed. `generateStaticParams` and `generateMetadata` must read published Markdown only. Add `export const dynamicParams = false` in the slug page.

Update the `recommended` comparator in `src/lib/skill-query.ts` so featured records sort before non-featured records and two featured records compare by ascending `featuredRank` before verification/download tie-breakers. This keeps `/skills?featured=true` consistent with the administrator's homepage order.

- [ ] **Step 4: Remove popular-search rendering while preserving typed suggestions**

Delete `popularSearches` and render the result panel only when both conditions are true:

```tsx
{open && query.trim() ? (
  <div id="hero-search-results" className="search-results" role="listbox">
    {/* existing suggestion/no-result branches */}
  </div>
) : null}
```

Keep Enter submission, arrow-key navigation, Escape dismissal, URL encoding, and typed Skill suggestions.
Delete the now-unused `.popular-searches` and `.popular-search-term` rules from `src/app/editorial.css` so the removed feature leaves no dormant implementation behind.

- [ ] **Step 5: Update component/query/sitemap tests to use Markdown fixtures**

Create a test helper:

```ts
// tests/helpers/load-test-skills.ts
import { getPublishedSkills } from "@/lib/skills/repository";
export const loadTestSkills = () => getPublishedSkills();
```

Convert tests that imported `@/data/skills` to async tests that call `loadTestSkills()`. Add assertions that `.popular-searches` and `.popular-search-term` are absent before and after focusing an empty search, while typed `PDF` still renders suggestions.

- [ ] **Step 6: Run focused and full tests, then delete the legacy source**

Run:

```bash
npm test -- tests/lib/skill-markdown.test.ts tests/lib/skill-migration.test.ts tests/lib/skill-repository.test.ts tests/components/app-shell.test.tsx tests/lib/skill-query.test.ts tests/lib/sitemap.test.ts
rg -n 'data/skills' src tests
```

Expected: tests PASS and `rg` returns no consumers except `tests/lib/skill-migration.test.ts`. Run that migration test one final time, then delete both `tests/lib/skill-migration.test.ts` and `src/data/skills.ts`; run the remaining suite and verify `rg` returns no matches. The passing Task 2 commit is the permanent migration evidence, so no second content fixture is maintained.

- [ ] **Step 7: Commit the public website migration**

```bash
git add src tests content
git commit -m "feat: load Skill catalog from Markdown"
```

---

### Task 4: Static Next.js export and Cloudflare Pages contract

**Files:**

- Modify: `next.config.ts`
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify: `.gitignore`
- Modify: `README.md`
- Modify: `e2e/platform.spec.ts`
- Modify: `playwright.config.ts`

**Interfaces:**

- Consumes: published Markdown repository from Task 3.
- Produces: deterministic `out/` static site compatible with Cloudflare Pages.

- [ ] **Step 1: Add a failing static-output acceptance check**

Add a script to `package.json`:

```json
"test:static-output": "node scripts/verify-static-output.mjs"
```

Create `scripts/verify-static-output.mjs` that asserts these files exist after build:

```js
const required = [
  "out/index.html",
  "out/skills/index.html",
  "out/about/index.html",
  "out/skills/data-analysis-assistant/index.html",
  "out/sitemap.xml",
];
```

The verifier must also read frontmatter from every `content/skills/*.md`, assert `out/skills/<slug>/index.html` exists for each `published` record, assert it does not exist for each `draft`, and compare the generated detail-route count with the published-record count. This remains valid when the administrator later adds drafts.

Run `npm run test:static-output`; expect FAIL before a static export exists.

- [ ] **Step 2: Enable static export**

Install the static acceptance server once so E2E never downloads an ad-hoc package:

```bash
npm install --save-dev serve
```

Set `next.config.ts` to:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
```

Add `out/` and `.skill-manager-trash/` to `.gitignore`.

- [ ] **Step 3: Build and validate every published route**

Run:

```bash
npm run build
npm run test:static-output
find out/skills -maxdepth 2 -name index.html | sort
```

Expected during migration: build succeeds, the verifier passes, and exactly one library index plus eight published Skill detail indexes are listed. Future runs derive the expected detail count from published frontmatter rather than hard-coding eight.

- [ ] **Step 4: Document the Cloudflare Pages settings**

Update README with the exact dashboard values:

```text
Production branch: main
Build command: npm run build
Build output directory: out
Root directory: /
Node version: 20 or newer
```

Document that preview branches may build preview URLs and that Cloudflare content always comes from GitHub; there is no production editor or database.

- [ ] **Step 5: Run E2E against the static server and commit**

Update Playwright `webServer.command` to `npm run build && serve out -l 3000`, keep its URL at `http://127.0.0.1:3000`, and set `reuseExistingServer: false` so acceptance always exercises the generated static artifact. Run the homepage, library, detail, 404, language, mobile, and removed-popular-search cases.

```bash
npm run test:e2e
git add next.config.ts package.json package-lock.json .gitignore README.md scripts/verify-static-output.mjs e2e playwright*.ts
git commit -m "build: add Cloudflare Pages static export"
```

---

### Task 5: Local file store and localhost API

**Files:**

- Modify: `package.json`
- Modify: `package-lock.json`
- Create: `tools/skill-manager/lib/skill-store.ts`
- Create: `tools/skill-manager/server.ts`
- Create: `tools/skill-manager/index.html`
- Create: `tools/skill-manager/vite.config.ts`
- Create: `tests/manager/skill-store.test.ts`
- Create: `tests/manager/skill-manager-api.test.ts`

**Interfaces:**

- Produces: `SkillStore.list()`, `get(slug)`, `validate(source, fileName)`, `save(input)`, `remove(slug)`, and API routes under `/api`.
- Consumes: shared Markdown parser/serializer and schema.

- [ ] **Step 1: Install local-manager runtime dependencies**

Run:

```bash
npm install express fflate
npm install --save-dev @types/express vite
```

Add scripts:

```json
"skill-manager": "tsx tools/skill-manager/server.ts",
"test:manager": "vitest run tests/manager"
```

- [ ] **Step 2: Write failing atomic-store tests**

Create `tests/manager/skill-store.test.ts` with temporary content/trash directories and complete Skill documents. Cover:

```ts
it("saves canonical Markdown atomically and reloads it", async () => {
  const saved = await store.save({ document, originalSlug: undefined });
  expect(saved.path).toBe(path.join(contentDir, "example-skill.md"));
  expect((await store.get("example-skill")).document).toEqual(document);
  expect(await readdir(contentDir)).toEqual(["example-skill.md"]);
});

it("does not silently overwrite a different existing slug", async () => {
  await store.save({ document: first });
  await expect(store.save({ document: secondWithSameSlug })).rejects.toThrow(/already exists/i);
});

it("moves deletion to trash and returns the deleted content path", async () => {
  const result = await store.remove("example-skill");
  expect(result.deletedPath).toEndWith("example-skill.md");
  expect(await readdir(trashDir)).toHaveLength(1);
});
```

Create `tests/manager/skill-manager-api.test.ts` against an exported `createSkillManagerApp({ store })` factory. Start it on an ephemeral loopback port and assert that template retrieval, Markdown validation, canonical serialization, save, conflict, list, and recoverable delete responses use the documented JSON shapes and status codes.

Run `npm run test:manager`; expect FAIL because `SkillStore` is missing.

- [ ] **Step 3: Implement recoverable, atomic content operations**

Export:

```ts
export type StoredSkill = { document: SkillDocument; source: string; path: string };
export type SaveSkillInput = { document: SkillDocument; originalSlug?: string };

export class SkillStore {
  constructor(private contentDir: string, private trashDir: string) {}
  async list(): Promise<StoredSkill[]>;
  async get(slug: string): Promise<StoredSkill>;
  validate(source: string, fileName: string): SkillDocument;
  async save(input: SaveSkillInput): Promise<StoredSkill>;
  async remove(slug: string): Promise<{ deletedPath: string; trashPath: string }>;
}
```

`save` must write `<target>.tmp-<random>`, `fsync`/close it, then `rename` over the target. When changing slug, write the new file first and move the old file to trash only after the new file validates. `remove` moves rather than permanently deletes.

- [ ] **Step 4: Implement the localhost-only API**

Export `createSkillManagerApp({ store })` without opening a socket so tests can inject a temporary store. The executable entry point then explicitly calls:

```ts
app.listen(4174, "127.0.0.1");
```

Routes:

```text
GET    /api/skills
GET    /api/skills/:slug
GET    /api/template
POST   /api/validate        { source, fileName }
POST   /api/serialize       { document }
PUT    /api/skills/:slug    { document, originalSlug }
DELETE /api/skills/:slug
```

Return errors as `{ error: { code, message, field?, fileName? } }` with 400 for validation, 409 for slug conflicts, and 500 only for unexpected failures. Keep an in-memory `Set<string>` of paths successfully saved or deleted during the current manager session for Task 7's publication route.

- [ ] **Step 5: Run store/API tests and commit**

```bash
npm run test:manager
npm run typecheck
git add package.json package-lock.json tools/skill-manager tests/manager/skill-store.test.ts tests/manager/skill-manager-api.test.ts
git commit -m "feat: add local Skill content service"
```

---

### Task 6: Full-field manager UI, import/export, and live preview

**Files:**

- Create: `tools/skill-manager/src/main.tsx`
- Create: `tools/skill-manager/src/api.ts`
- Create: `tools/skill-manager/src/App.tsx`
- Create: `tools/skill-manager/src/components/SkillList.tsx`
- Create: `tools/skill-manager/src/components/SkillForm.tsx`
- Create: `tools/skill-manager/src/components/LocalizedTextEditor.tsx`
- Create: `tools/skill-manager/src/components/StringListEditor.tsx`
- Create: `tools/skill-manager/src/components/ChangelogEditor.tsx`
- Create: `tools/skill-manager/src/components/FaqEditor.tsx`
- Create: `tools/skill-manager/src/components/ImportReview.tsx`
- Create: `tools/skill-manager/src/components/SkillPreview.tsx`
- Create: `tools/skill-manager/src/styles.css`
- Create: `tests/manager/skill-manager-ui.test.tsx`

**Interfaces:**

- Consumes: manager API from Task 5 and `SkillDocument` from Task 1.
- Produces: complete no-code create/edit/copy/delete/import/export/save experience.

- [ ] **Step 1: Write failing UI workflow tests**

Mock `tools/skill-manager/src/api.ts` and test:

```tsx
it("shows every metadata and body field in one form", async () => {
  render(<App />);
  await user.click(await screen.findByRole("button", { name: /数据分析助手/ }));
  for (const label of [
    "状态", "Slug", "英文名称", "中文名称", "分类", "标签", "平台", "作者",
    "版本", "许可证", "加入日期", "更新日期", "GitHub", "官方网站", "下载地址",
    "精选", "精选顺序", "已核验", "图标", "Stars", "Downloads",
    "简短描述", "详细介绍", "核心功能", "适用场景", "安装方式", "使用说明",
    "示例工作流", "更新记录", "常见问题",
  ]) expect(screen.getByText(label)).toBeInTheDocument();
});

it("reviews Markdown conflicts before importing", async () => {
  await importMarkdownFiles([existingSlugFile, newSlugFile]);
  expect(await screen.findByText("1 个新增，1 个冲突")).toBeInTheDocument();
  expect(api.saveSkill).not.toHaveBeenCalled();
});

it("filters the list and reorders administrator-featured Skills", async () => {
  render(<App />);
  await user.type(screen.getByRole("searchbox", { name: "搜索 Skill" }), "PDF");
  expect(screen.getByRole("button", { name: /PDF/ })).toBeInTheDocument();
  await moveFeaturedSkill("pdf-document-toolkit", 1);
  expect(screen.getByLabelText("精选顺序")).toHaveValue(1);
});
```

Run `npm run test:manager`; expect the UI tests to fail because the app does not exist.

- [ ] **Step 2: Implement typed API client and manager state**

`api.ts` exports:

```ts
export async function listSkills(): Promise<StoredSkill[]>;
export async function validateMarkdown(source: string, fileName: string): Promise<SkillDocument>;
export async function serializeSkill(document: SkillDocument): Promise<string>;
export async function saveSkill(document: SkillDocument, originalSlug?: string): Promise<StoredSkill>;
export async function deleteSkill(slug: string): Promise<void>;
export async function getTemplate(): Promise<string>;
```

`App` owns `items`, `selectedSlug`, `drafts: Map<string, SkillDocument>`, `originalSlugs`, `dirtySlugs`, `pendingDeletions`, `savedPaths`, modal state, and operation status. This supports multi-file import and featured reordering without writing prematurely. Never mutate a loaded document object; clone array/nested structures when editing.

Both bottom actions first validate every dirty draft and show a summary of new, updated, renamed, and deleted paths. “仅保存” proceeds only to atomic file writes and refreshes the manager's loaded data/preview; it never calls a Git route.

- [ ] **Step 3: Implement the complete long form with focused editors**

`SkillForm` receives:

```ts
type SkillFormProps = {
  value: SkillDocument;
  onChange(next: SkillDocument): void;
  errors: Record<string, string>;
};
```

Use fixed dropdowns for the eight categories and eight icon keys. Use reusable add/remove/reorder controls for tags, platforms, features, use cases, installation commands, workflow, changelog, and FAQ. Render Chinese and English inputs side-by-side on desktop and stacked on narrow windows. Keep every section visible on the same scrollable form; do not hide advanced fields in accordions.

The left list includes text search plus category and publication-status filters. Its toolbar must include new, copy, and delete actions. Copy deep-clones the selected document, assigns an unused `-copy` slug suffix, resets it to `status: draft`, clears `featured`, and leaves it unsaved for review. Delete requires an explicit confirmation and queues the slug in `pendingDeletions`; the recoverable trash-backed API is called only by a bottom save action. Changing the slug of a saved published Skill requires a second confirmation that the old public URL will stop working.

Add a compact featured-order panel that supports pointer drag plus keyboard move-up/move-down controls. Each reorder recalculates contiguous 1-based ascending `featuredRank` values in local drafts; non-featured Skills keep rank `0`, and changed Markdown files are written only when the administrator saves.

- [ ] **Step 4: Implement import review and export**

On file selection, read every `.md` via `File.text()`, validate through `/api/validate`, classify each as `new`, `conflict`, or `invalid`, and open `ImportReview`. Require an explicit checkbox beside every conflict before replacement. Confirming the import only adds accepted documents to the local `drafts` map and marks them dirty; it must not write files. The administrator still uses “仅保存” or “保存并发布”. That save operation writes dirty imported files with `saveSkill` one at a time and reports partial success without discarding failed items.

For export, request canonical text from `/api/serialize` so browser code never imports Node-oriented Markdown parsing dependencies:

```ts
const source = await serializeSkill(document);
downloadBlob(new Blob([source], { type: "text/markdown;charset=utf-8" }), `${document.slug}.md`);
const sources = await Promise.all(items.map(async ({ document }) => [document.slug, await serializeSkill(document)] as const));
const template = await getTemplate();
const zip = zipSync(Object.fromEntries([
  ...sources.map(([slug, markdown]) => [`skills/${slug}.md`, strToU8(markdown)] as const),
  ["skill-template.md", strToU8(template)] as const,
]));
downloadBlob(new Blob([zip], { type: "application/zip" }), "weian-skills.zip");
```

- [ ] **Step 5: Implement live preview and visual system**

The right preview must show the actual values for name, category, verification, featured state, description, platform pills, license, stars, installation, workflow, and changelog. It is a local visual approximation and must not import Next.js-only components. Use the existing light WEIAN palette, clear three-column hierarchy, 44px minimum controls, visible focus states, inline errors, and no black buttons.

- [ ] **Step 6: Run UI tests and commit**

```bash
npm run test:manager
npm run lint
npm run typecheck
git add tools/skill-manager/src tools/skill-manager/index.html tools/skill-manager/vite.config.ts tests/manager/skill-manager-ui.test.tsx
git commit -m "feat: build local Skill manager interface"
```

---

### Task 7: Safe Git publication and Mac launcher

**Files:**

- Create: `tools/skill-manager/lib/git-publisher.ts`
- Modify: `tools/skill-manager/server.ts`
- Modify: `tools/skill-manager/src/api.ts`
- Modify: `tools/skill-manager/src/App.tsx`
- Create: `启动Skill管理器.command`
- Create: `tests/manager/git-publisher.test.ts`
- Modify: `tests/test-website-launcher.zsh`

**Interfaces:**

- Produces: `GitPublisher.inspect(paths)`, `publish(paths, message)`, and `retryPush()`.
- Consumes: explicit saved-path set from Task 5.

- [ ] **Step 1: Write failing Git safety tests with an injected runner**

Define the expected constructor and test double:

```ts
type GitResult = { stdout: string; stderr: string; exitCode: number };
type GitRunner = (args: string[], cwd: string) => Promise<GitResult>;

const calls: string[][] = [];
const runner: GitRunner = async (args) => {
  calls.push(args);
  return fakeGitResponse(args);
};
```

Tests must assert:

```ts
await publisher.publish(["content/skills/example.md"], "content: update example");
expect(calls).toContainEqual(["add", "--", "content/skills/example.md"]);
expect(calls).not.toContainEqual(expect.arrayContaining(["add", "."]));
await expect(publisher.publish(["src/app/page.tsx"], "bad")).rejects.toThrow(/content\/skills/);
await expect(behindPublisher.publish(validPaths, "message")).rejects.toThrow(/remote.*ahead/i);
```

Run `npm run test:manager`; expect FAIL because `GitPublisher` is missing.

- [ ] **Step 2: Implement explicit-path inspection and publication**

Export:

```ts
export type PublishResult = { commit: string; pushed: boolean; message: string };

export class GitPublisher {
  constructor(private root: string, private runGit: GitRunner = runGitProcess) {}
  async inspect(paths: string[]): Promise<{ branch: string; remoteUrl: string; remoteAhead: number; dirtyCodePaths: string[]; conflictedPaths: string[] }>;
  async publish(paths: string[], message: string): Promise<PublishResult>;
  async retryPush(): Promise<PublishResult>;
}
```

Validate every normalized relative path against `^content/skills/[a-z0-9-]+\.md$`. Use `spawn("git", args, { cwd, shell: false })`. Inspect with `rev-parse --abbrev-ref HEAD`, `remote get-url origin`, `fetch origin main`, `rev-list --count HEAD..origin/main`, repository-wide `status --porcelain`, and `diff --name-only --diff-filter=U`. Require branch `main`, a configured GitHub origin, remote-ahead count `0`, no conflicted paths, a non-empty explicit path list drawn from the current session's saved paths or Git's content-only dirty paths, and a non-empty sanitized commit message. Return non-content dirty paths so the UI can warn that they will remain untouched. Run `add -- <each path>`, `diff --cached --quiet`, `commit -m`, then `push origin main`. A push failure keeps the local commit and enables `retryPush`.

- [ ] **Step 3: Wire the two separate buttons and human-readable states**

Add `POST /api/publish { paths, message }` to the local server, returning 503 for Git/network availability failures and the shared structured error envelope for all failures. Extend `api.ts` with:

```ts
export async function publishSkills(paths: string[], message: string): Promise<PublishResult>;
```

“仅保存” calls only `saveSkill`. “保存并发布” calls save, shows the exact Markdown paths, any untouched non-content changes, and the generated message in a confirmation dialog, then calls `publishSkills`. Render these states separately:

```text
已保存到本机
正在检查 GitHub
已提交，正在 push
GitHub 已接收，Cloudflare 正在发布
已保存，但 push 失败；可以重试发布
```

Never claim Cloudflare deployment completion because the local manager does not poll Cloudflare.

- [ ] **Step 4: Add the Mac launcher with working-directory protection**

Create `启动Skill管理器.command`:

```zsh
#!/bin/zsh
set -u
PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR" || exit 1

if ! command -v node >/dev/null 2>&1; then
  echo "错误：未找到 Node.js 20 或更高版本。"
  read -r "?按回车键关闭..."
  exit 1
fi

if [ ! -d node_modules ]; then
  echo "首次运行，正在安装依赖..."
  npm install || { echo "错误：依赖安装失败。"; read -r "?按回车键关闭..."; exit 1; }
fi

npm run skill-manager
STATUS=$?
echo "Skill 管理器已停止（状态码：$STATUS）。"
read -r "?按回车键关闭..."
exit $STATUS
```

Make it executable with `chmod +x 启动Skill管理器.command`. In the server, call macOS `open http://127.0.0.1:4174` only after the listener is ready.

- [ ] **Step 5: Test the launcher from the home directory and commit**

Extend the existing zsh launcher test to execute the command with a fake `npm` earlier in `PATH` and an initial working directory outside the repository. Assert the fake npm log records the project root, not the user's home directory.

```bash
npm run test:manager
zsh tests/test-website-launcher.zsh
git add tools/skill-manager 启动Skill管理器.command tests/manager/git-publisher.test.ts tests/test-website-launcher.zsh
git commit -m "feat: publish Skill content safely from Mac"
```

---

### Task 8: End-to-end acceptance, documentation, and cleanup

**Files:**

- Modify: `README.md`
- Modify: `CONTRIBUTING.md`
- Modify: `e2e/platform.spec.ts`
- Modify: relevant tests under `tests/`
- Delete: obsolete legacy fixtures/imports discovered by `rg`

**Interfaces:**

- Consumes: all prior tasks.
- Produces: verified maintainer workflow and production-ready static site.

- [ ] **Step 1: Add final public-site acceptance cases**

E2E must cover:

```ts
await page.goto("/");
await page.getByRole("combobox", { name: "搜索 Skill" }).focus();
await expect(page.locator(".popular-searches")).toHaveCount(0);
await page.getByRole("combobox", { name: "搜索 Skill" }).fill("PDF");
await expect(page.getByRole("option")).toHaveCount(1);
await expect(page.locator(".featured-skill").first()).toContainText(expectedRankOneName);

const draftResponse = await page.goto("/skills/draft-fixture");
expect(draftResponse?.status()).toBe(404);
```

Do not leave the draft fixture in production content; generate it only inside the repository unit test or a temporary E2E fixture build.

- [ ] **Step 2: Add manager acceptance coverage**

Run the manager against a temporary copied content directory and assert through Testing Library/API integration that an administrator can:

1. Import the official template.
2. Edit every field group.
3. Save a new Markdown file.
4. Reopen it with identical values.
5. Export and parse the result.
6. Mark two Skills featured and reorder their ranks.
7. Delete a Skill into trash.
8. Attempt publication with a code path and receive a rejection.

- [ ] **Step 3: Update maintainer documentation**

README and CONTRIBUTING must contain:

- Double-click startup instructions.
- The difference between “仅保存” and “保存并发布”.
- Markdown import/export instructions.
- Draft, featured, rank, verified, slug, and deletion behavior.
- GitHub/Cloudflare Pages production flow.
- Recovery steps for remote-ahead, push failure, invalid Markdown, and Cloudflare build failure.
- Exact Cloudflare settings and rollback through GitHub.

- [ ] **Step 4: Run the complete verification matrix**

Run fresh, in this order:

```bash
npm test
npm run test:manager
zsh tests/test-website-launcher.zsh
npm run lint
npm run typecheck
npm run build
npm run test:static-output
npm run test:e2e
! rg -n 'data/skills|popularSearches|popular-search-term' src tools
git diff --check
```

Expected: every command passes; the negated final `rg` confirms there is no legacy catalog import or popular-search implementation. Tests may still mention removed selectors to assert their deliberate absence.

- [ ] **Step 5: Perform manual visual and safety acceptance**

At desktop and 390×844 mobile widths, inspect homepage empty/typed search states, six administrator-ranked featured cards, library, detail, and 404. In the local manager inspect the full form, inline errors, import review, preview, and both save buttons. Verify no horizontal overflow and no black controls. In a disposable Git clone, verify publication stages only selected Markdown.

- [ ] **Step 6: Commit the final acceptance and documentation**

```bash
git add README.md CONTRIBUTING.md e2e tests tools content src package.json package-lock.json next.config.ts .gitignore 启动Skill管理器.command
git commit -m "test: verify local Skill repository workflow"
```

## Delivery Checkpoint

Before integration, report:

- The eight migrated Markdown paths.
- The local manager URL and launcher path.
- The exact Git commit produced by a disposable publication test.
- Full test/build/E2E counts.
- Cloudflare Pages dashboard values.
- Any deployment step that still requires the administrator to authorize GitHub or Cloudflare access.
