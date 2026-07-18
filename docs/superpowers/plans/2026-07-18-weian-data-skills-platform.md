# WEIAN DATA Skills Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-quality, responsive, bilingual open-source AI Skills directory with static detail pages, searchable URL-driven filters, accessible external-download flows, and complete SEO metadata.

**Architecture:** Use Next.js App Router for static page composition and route metadata, with narrowly scoped client components for language, search, filtering, dialogs, and forms. A typed local dataset and pure selector/query utilities isolate content from presentation so a future CMS or API can replace the source without redesigning the interface.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS, Lucide React, Geist Sans, Vitest, Testing Library, Playwright, ESLint.

## Global Constraints

- Simplified Chinese is the default locale; English is available with a one-click persistent switch.
- Required routes are `/`, `/skills`, `/skills/[slug]`, `/categories`, `/submit`, and `/about`.
- Use the approved deep navy, data-blue, and restrained teal visual system in CSS variables.
- All Skill content and navigation/filter/form/error labels must support `zh` and `en`.
- External downloads must be confirmed and opened with `noopener,noreferrer`.
- Filter state must be encoded in URL query parameters.
- Sample data must remain neutral and must not imply WEIAN DATA maintains third-party projects.
- Respect keyboard navigation, WCAG 2.2 AA fundamentals, and `prefers-reduced-motion`.
- Do not add accounts, a backend submission service, ratings, payments, comments, or first-party file hosting.

---

## Planned File Structure

```text
src/
├── app/
│   ├── about/page.tsx
│   ├── categories/page.tsx
│   ├── skills/[slug]/page.tsx
│   ├── skills/page.tsx
│   ├── submit/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── home/{category-explorer,hero,platform-values,recent-skills}.tsx
│   ├── layout/{site-footer,site-header,site-shell}.tsx
│   ├── language/{language-provider,language-switcher}.tsx
│   ├── skills/{download-dialog,hero-search,skill-card,skill-detail,skill-library,skill-list-row}.tsx
│   ├── submit/submit-skill-form.tsx
│   └── ui/{badge,button,copy-button,dialog,empty-state,scroll-to-top}.tsx
├── data/{categories,skills,translations}.ts
├── lib/{i18n,skill-query,submit-validation,utils}.ts
└── types/{content,filters}.ts
tests/
├── components/{download-dialog,language-provider,submit-skill-form}.test.tsx
├── lib/{i18n,skill-query,submit-validation}.test.ts
└── setup.ts
e2e/platform.spec.ts
```

Each file owns one responsibility: data files define content, `lib` files define pure behavior, page files compose static routes, and client components own isolated interactions.

### Task 1: Bootstrap the Next.js and Test Toolchain

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `next.config.ts`
- Create: `postcss.config.mjs`
- Create: `eslint.config.mjs`
- Create: `vitest.config.ts`
- Create: `playwright.config.ts`
- Create: `tests/setup.ts`
- Create: `src/app/layout.tsx`
- Create: `src/app/globals.css`
- Create: `src/app/page.tsx`

**Interfaces:**
- Produces: `npm run dev`, `npm run test`, `npm run lint`, `npm run typecheck`, `npm run build`, and `npm run test:e2e`.

- [ ] **Step 1: Install the application and verification dependencies**

Run:

```bash
npm install next@latest react@latest react-dom@latest lucide-react @fontsource/geist-sans
npm install -D typescript @types/node @types/react @types/react-dom tailwindcss @tailwindcss/postcss eslint eslint-config-next vitest jsdom @vitejs/plugin-react @testing-library/react @testing-library/jest-dom @testing-library/user-event @playwright/test
```

Expected: dependencies install successfully and `package-lock.json` is created.

- [ ] **Step 2: Create scripts and strict configuration**

Use these scripts in `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:e2e": "playwright test"
  }
}
```

Configure the `@/*` alias to `./src/*`, jsdom test environment, Testing Library setup, and Playwright’s `webServer` to run `npm run dev -- --hostname 127.0.0.1` on port `3000`.

- [ ] **Step 3: Create the minimal App Router shell**

Create a semantic root layout importing `globals.css`, set `lang="zh-CN"`, and render a temporary `<main><h1>WEIAN DATA</h1></main>` page. Define the approved CSS variables, General Sans Fontshare import, Geist import, focus ring, selection color, reduced-motion reset, and base navy background.

- [ ] **Step 4: Verify the bootstrap**

Run:

```bash
npm run typecheck
npm run lint
npm run build
```

Expected: all commands exit 0 and Next.js reports `/` as a static route.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json tsconfig.json next.config.ts postcss.config.mjs eslint.config.mjs vitest.config.ts playwright.config.ts tests/setup.ts src/app
git commit -m "chore: bootstrap Next.js skills platform"
```

### Task 2: Define Bilingual Content Types and Data

**Files:**
- Create: `src/types/content.ts`
- Create: `src/types/filters.ts`
- Create: `src/data/categories.ts`
- Create: `src/data/skills.ts`
- Create: `src/data/translations.ts`
- Test: `tests/lib/i18n.test.ts`
- Create: `src/lib/i18n.ts`

**Interfaces:**
- Produces: `Locale`, `LocalizedText`, `Category`, `Skill`, `SkillFilterState`, `localize(text, locale)`, `translate(key, locale)`, `skills`, and `categories`.

- [ ] **Step 1: Write the failing localization tests**

```ts
import { describe, expect, it } from "vitest";
import { localize, translate } from "@/lib/i18n";

describe("localization", () => {
  it("returns the requested localized field", () => {
    expect(localize({ zh: "数据分析", en: "Data Analytics" }, "en")).toBe("Data Analytics");
  });

  it("returns translated interface labels", () => {
    expect(translate("nav.skills", "zh")).toBe("Skill 库");
    expect(translate("nav.skills", "en")).toBe("Skills");
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

Run: `npm test -- tests/lib/i18n.test.ts`

Expected: FAIL because `@/lib/i18n` does not exist.

- [ ] **Step 3: Implement the content model and localization API**

Define `LocalizedText = { zh: string; en: string }`, the complete `Skill` interface described in the approved spec, stable category/platform slugs, and a nested translation dictionary. Implement:

```ts
export function localize(text: LocalizedText, locale: Locale): string {
  return text[locale] || text.zh;
}

export function translate(key: TranslationKey, locale: Locale): string {
  return translations[locale][key] ?? translations.zh[key];
}
```

Create eight neutral sample Skills covering all core categories. Each record includes detail-page sections, installation commands, source attribution, valid `https://example.com/...` demonstration URLs, dates, license, version, downloads, and stars.

- [ ] **Step 4: Run the localization tests**

Run: `npm test -- tests/lib/i18n.test.ts`

Expected: 2 tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/types src/data src/lib/i18n.ts tests/lib/i18n.test.ts
git commit -m "feat: add bilingual skills content model"
```

### Task 3: Implement Pure Search, Filtering, Sorting, and Query State

**Files:**
- Test: `tests/lib/skill-query.test.ts`
- Create: `src/lib/skill-query.ts`

**Interfaces:**
- Consumes: `Skill`, `SkillFilterState`, `Locale`, `skills`.
- Produces: `filterSkills`, `getRelatedSkills`, `getCategoryCounts`, `parseSkillQuery`, and `serializeSkillQuery`.

- [ ] **Step 1: Write failing behavior tests**

Cover these exact behaviors:

```ts
it("matches Chinese descriptions and English tags case-insensitively", () => {
  expect(filterSkills(skills, { query: "数据质量" }, "zh").map((skill) => skill.slug))
    .toContain("data-analysis-assistant");
  expect(filterSkills(skills, { query: "github" }, "en").map((skill) => skill.slug))
    .toContain("github-workflow-helper");
});

it("combines category, platform, and license filters", () => {
  const result = filterSkills(skills, {
    categories: ["data-analytics"], platforms: ["python"], licenses: ["MIT"]
  }, "en");
  expect(result.every((skill) => skill.category === "data-analytics")).toBe(true);
});

it("round-trips shareable query state", () => {
  const state = { query: "PDF", categories: ["files-pdf"], sort: "updated", view: "list" };
  expect(parseSkillQuery(serializeSkillQuery(state))).toMatchObject(state);
});

it("ranks same-category and shared-tag skills first", () => {
  const source = skills.find((skill) => skill.slug === "data-analysis-assistant")!;
  expect(getRelatedSkills(source, skills, 3)[0].slug).not.toBe(source.slug);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test -- tests/lib/skill-query.test.ts`

Expected: FAIL because selector functions do not exist.

- [ ] **Step 3: Implement normalized pure selectors**

Normalize text with `toLocaleLowerCase`, flatten both localized fields plus tags/platforms/use cases into the search document, AND filter groups together while OR-matching values within a group, implement stable sort modes, and encode arrays as repeated query keys.

- [ ] **Step 4: Run tests and verify GREEN**

Run: `npm test -- tests/lib/skill-query.test.ts`

Expected: all selector and query tests pass.

- [ ] **Step 5: Commit**

```bash
git add src/lib/skill-query.ts tests/lib/skill-query.test.ts
git commit -m "feat: add shareable skill discovery selectors"
```

### Task 4: Build Localization State and Global Layout

**Files:**
- Test: `tests/components/language-provider.test.tsx`
- Create: `src/components/language/language-provider.tsx`
- Create: `src/components/language/language-switcher.tsx`
- Create: `src/components/layout/site-header.tsx`
- Create: `src/components/layout/site-footer.tsx`
- Create: `src/components/layout/site-shell.tsx`
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/ui/scroll-to-top.tsx`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/globals.css`

**Interfaces:**
- Produces: `useLanguage(): { locale; setLocale; t }` and the global page chrome.

- [ ] **Step 1: Write failing locale persistence tests**

Test that Chinese is the default without storage, English is loaded from `localStorage`, switching updates every rendered label and `document.documentElement.lang`, and the current history URL remains unchanged.

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test -- tests/components/language-provider.test.tsx`

Expected: FAIL because `LanguageProvider` does not exist.

- [ ] **Step 3: Implement provider and responsive chrome**

Use a hydration-safe initial Chinese render, then read `weian-locale` after mount. Persist explicit changes, update `lang` to `zh-CN` or `en`, and expose a typed translator. Build a sticky translucent header, text-based W/data-node mark, desktop navigation, category dropdown, mobile drawer, search shortcut link, language switcher, safe GitHub button, four-column footer, disclaimer, and scroll-to-top control.

- [ ] **Step 4: Complete global design tokens**

Implement the approved HSL variables, typography, surface utilities, restrained liquid-glass utility, grid/noise backgrounds, container width, focus styles, dialog/drawer transitions, and reduced-motion overrides. Avoid gradients on body text except the `AI Skills` emphasis.

- [ ] **Step 5: Run tests, typecheck, and lint**

Run:

```bash
npm test -- tests/components/language-provider.test.tsx
npm run typecheck
npm run lint
```

Expected: all commands exit 0.

- [ ] **Step 6: Commit**

```bash
git add src/components/language src/components/layout src/components/ui src/app/layout.tsx src/app/globals.css tests/components/language-provider.test.tsx
git commit -m "feat: add bilingual global application shell"
```

### Task 5: Build Reusable Skill Components and Safe Actions

**Files:**
- Test: `tests/components/download-dialog.test.tsx`
- Create: `src/components/ui/dialog.tsx`
- Create: `src/components/ui/copy-button.tsx`
- Create: `src/components/skills/download-dialog.tsx`
- Create: `src/components/skills/skill-card.tsx`
- Create: `src/components/skills/skill-list-row.tsx`

**Interfaces:**
- Consumes: `Skill`, `Locale`, `useLanguage`.
- Produces: reusable card/list presentation and the only authorized external-download opener.

- [ ] **Step 1: Write failing download safety tests**

```tsx
it("requires confirmation before opening a third-party download", async () => {
  const open = vi.spyOn(window, "open").mockImplementation(() => null);
  render(<DownloadDialog skill={skills[0]} />);
  await user.click(screen.getByRole("button", { name: /下载|Download/ }));
  expect(open).not.toHaveBeenCalled();
  await user.click(screen.getByRole("button", { name: /继续下载|Continue/ }));
  expect(open).toHaveBeenCalledWith(skills[0].downloadUrl, "_blank", "noopener,noreferrer");
});
```

Also test Escape cancellation, focus return, and disabled output when the URL is missing.

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test -- tests/components/download-dialog.test.tsx`

Expected: FAIL because `DownloadDialog` does not exist.

- [ ] **Step 3: Implement accessible primitives and Skill presentations**

Build a native-dialog-style controlled overlay with focus management, Escape, labelled title/description, and return focus. Cards show icon, localized description, trust badge, category, platforms, tags, license, version, date, source, details link, and download action. List rows preserve the same information hierarchy in a denser layout.

- [ ] **Step 4: Run tests and verify GREEN**

Run:

```bash
npm test -- tests/components/download-dialog.test.tsx
npm run typecheck
npm run lint
```

Expected: all commands exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/ui src/components/skills tests/components/download-dialog.test.tsx
git commit -m "feat: add reusable skill cards and safe downloads"
```

### Task 6: Compose the Home and Category Pages

**Files:**
- Create: `src/components/skills/hero-search.tsx`
- Create: `src/components/home/hero.tsx`
- Create: `src/components/home/category-explorer.tsx`
- Create: `src/components/home/platform-values.tsx`
- Create: `src/components/home/recent-skills.tsx`
- Modify: `src/app/page.tsx`
- Create: `src/app/categories/page.tsx`

**Interfaces:**
- Consumes: `skills`, `categories`, selector/localization APIs, `SkillCard`.
- Produces: complete home and category discovery experiences.

- [ ] **Step 1: Write a failing Playwright home-page smoke test**

Add assertions that `/` shows the Chinese headline, has a link to `/skills`, search can navigate to `/skills?q=PDF`, the language switch reveals the English headline, and `/categories` contains all category links.

- [ ] **Step 2: Run the targeted browser test and verify RED**

Run: `npx playwright test e2e/platform.spec.ts --grep "home discovery"`

Expected: FAIL because the composed home sections do not exist.

- [ ] **Step 3: Implement the editorial two-column home page**

Build the badge, responsive headline, actions, keyboard-enabled autocomplete search, popular searches, CSS grid/node background, readable overlapping Skill-card preview, featured grid, asymmetric category explorer, four platform-value blocks, recent compact cards, and contribution callout. Implement `/categories` using real derived counts and pre-filtered links.

- [ ] **Step 4: Verify the home flow**

Run:

```bash
npx playwright test e2e/platform.spec.ts --grep "home discovery"
npm run typecheck
npm run lint
```

Expected: the targeted browser test and static checks pass.

- [ ] **Step 5: Commit**

```bash
git add src/components/home src/components/skills/hero-search.tsx src/app/page.tsx src/app/categories e2e/platform.spec.ts
git commit -m "feat: build Skills discovery homepage"
```

### Task 7: Build the URL-Driven Skill Library

**Files:**
- Create: `src/components/skills/skill-library.tsx`
- Modify: `src/app/skills/page.tsx`
- Modify: `e2e/platform.spec.ts`

**Interfaces:**
- Consumes: `parseSkillQuery`, `serializeSkillQuery`, `filterSkills`, card/list components.
- Produces: complete searchable/filterable `/skills` experience.

- [ ] **Step 1: Add failing browser tests**

Cover direct loading with `?category=data-analytics&platform=python&sort=updated`, result count, active chips, clearing filters, no-results state, grid/list switching, mobile filter drawer, and load-more behavior.

- [ ] **Step 2: Run the library tests and verify RED**

Run: `npx playwright test e2e/platform.spec.ts --grep "skill library"`

Expected: FAIL because the library UI does not exist.

- [ ] **Step 3: Implement URL-synchronized discovery controls**

Use `useSearchParams`, `useRouter`, and `usePathname`; replace query state without resetting scroll unnecessarily; debounce only free-text search; render category/platform/license/tag controls; display active chips; provide result count, sort, view switch, progressive page size, and bilingual empty state. Keep controls labelled and fully keyboard operable.

- [ ] **Step 4: Verify library behavior**

Run:

```bash
npx playwright test e2e/platform.spec.ts --grep "skill library"
npm test
npm run typecheck
npm run lint
```

Expected: all commands exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/components/skills/skill-library.tsx src/app/skills/page.tsx e2e/platform.spec.ts
git commit -m "feat: add searchable filterable Skill library"
```

### Task 8: Build Static Skill Detail Pages and SEO

**Files:**
- Create: `src/components/skills/skill-detail.tsx`
- Create: `src/app/skills/[slug]/page.tsx`
- Create: `src/app/not-found.tsx`
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`
- Modify: `e2e/platform.spec.ts`

**Interfaces:**
- Consumes: `skills`, `getRelatedSkills`, `SkillCard`, `DownloadDialog`, `CopyButton`.
- Produces: `generateStaticParams`, `generateMetadata`, sitemap, robots rules, JSON-LD detail pages.

- [ ] **Step 1: Add failing detail-page tests**

Test one known slug for heading, metadata, installation content, copy feedback, related Skills, breadcrumb, download confirmation, JSON-LD, and safe GitHub/official links. Test an unknown slug for the bilingual not-found state.

- [ ] **Step 2: Run the detail tests and verify RED**

Run: `npx playwright test e2e/platform.spec.ts --grep "skill detail"`

Expected: FAIL because the dynamic route does not exist.

- [ ] **Step 3: Implement static detail routes and metadata**

Generate every sample slug at build time. Compose the metadata header, overview, features, use cases, installation and usage, workflow example, changelog, FAQ, sticky sidebar, provenance, report-link action, and related cards. Add canonical URLs, language alternates, Open Graph, Twitter metadata, BreadcrumbList JSON-LD, CreativeWork JSON-LD, sitemap entries, and robots rules.

- [ ] **Step 4: Verify detail routes and metadata**

Run:

```bash
npx playwright test e2e/platform.spec.ts --grep "skill detail"
npm run build
```

Expected: tests pass, build exits 0, and all sample Skill routes are reported as static.

- [ ] **Step 5: Commit**

```bash
git add src/components/skills/skill-detail.tsx src/app/skills src/app/not-found.tsx src/app/sitemap.ts src/app/robots.ts e2e/platform.spec.ts
git commit -m "feat: add static Skill detail pages and metadata"
```

### Task 9: Build About and Validated Submit Pages

**Files:**
- Test: `tests/lib/submit-validation.test.ts`
- Test: `tests/components/submit-skill-form.test.tsx`
- Create: `src/lib/submit-validation.ts`
- Create: `src/components/submit/submit-skill-form.tsx`
- Create: `src/app/submit/page.tsx`
- Create: `src/app/about/page.tsx`

**Interfaces:**
- Produces: `validateSubmission(values, locale)` and the client-only submit workflow.

- [ ] **Step 1: Write failing validation tests**

Test empty required fields, invalid non-HTTPS source URL, invalid email, missing platform, bilingual messages, and a valid complete submission.

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test -- tests/lib/submit-validation.test.ts tests/components/submit-skill-form.test.tsx`

Expected: FAIL because validation and the form do not exist.

- [ ] **Step 3: Implement validation and pages**

Render explicitly labelled inputs, category select, platform checkboxes, inline `aria-describedby` errors, summary live region, submitting state, and an honest local-only success panel. Build the About page with mission, selection principles, attribution, contact, and disclaimer sections using the shared shell and bilingual content.

- [ ] **Step 4: Run tests and static checks**

Run:

```bash
npm test -- tests/lib/submit-validation.test.ts tests/components/submit-skill-form.test.tsx
npm run typecheck
npm run lint
```

Expected: all commands exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/lib/submit-validation.ts src/components/submit src/app/submit src/app/about tests/lib/submit-validation.test.ts tests/components/submit-skill-form.test.tsx
git commit -m "feat: add About and Skill submission flows"
```

### Task 10: Final Responsive, Accessibility, and Acceptance Pass

**Files:**
- Modify: `src/app/globals.css`
- Modify: affected components discovered during inspection
- Modify: `e2e/platform.spec.ts`
- Create: `README.md` only if the existing repository README does not already document local development; otherwise update its development section.

**Interfaces:**
- Produces: verified release candidate satisfying all acceptance criteria.

- [ ] **Step 1: Add final acceptance tests before visual fixes**

Cover route navigation, language persistence after reload, query preservation across language switching, keyboard search navigation, Escape behavior for drawers/dialogs, no horizontal overflow at `390×844`, and reduced-motion rendering.

- [ ] **Step 2: Run acceptance tests and record failures**

Run: `npx playwright test e2e/platform.spec.ts`

Expected: any remaining gaps fail with specific assertions before fixes are applied.

- [ ] **Step 3: Inspect the running site at desktop and mobile widths**

Start `npm run dev`, then inspect `/`, `/skills`, one detail route, `/categories`, `/submit`, and `/about` at `1440×1000`, `1024×768`, and `390×844`. Verify both locales, focus order, hover/focus states, drawers, dialog focus return, long English and Chinese wrapping, sticky elements, and all empty/error states.

- [ ] **Step 4: Apply only evidence-driven polish fixes**

Correct discovered overflow, contrast, hierarchy, wrapping, spacing, focus, or motion defects. Do not add new product scope or ornamental animation.

- [ ] **Step 5: Run the complete verification suite fresh**

Run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run test:e2e
git diff --check
git status --short
```

Expected: unit/component tests pass with 0 failures, ESLint reports 0 errors, TypeScript reports 0 errors, production build exits 0 with all required routes, Playwright passes at configured desktop and mobile projects, `git diff --check` is silent, and status contains only intentional files.

- [ ] **Step 6: Update local development documentation**

Document Node/npm prerequisites, `npm install`, `npm run dev`, verification commands, data-file location, bilingual content conventions, and the client-only nature of submissions.

- [ ] **Step 7: Commit**

```bash
git add src tests e2e README.md
git commit -m "test: verify responsive bilingual Skills platform"
```

## Completion Review

Before declaring completion, compare the implementation against every acceptance criterion in the approved design specification. Re-run the complete verification suite after the last code or style edit; earlier successful output is not sufficient evidence.
