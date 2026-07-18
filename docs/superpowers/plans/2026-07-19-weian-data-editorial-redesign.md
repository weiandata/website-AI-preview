# WEIAN DATA Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the existing bilingual WEIAN DATA site in the approved full-screen editorial visual direction while preserving discovery and download behavior and removing public Skill submission completely.

**Architecture:** Keep the current Next.js App Router, data modules, language provider, query engine, and client-side interaction components. Replace the visual shell and page composition in focused React components, use official SVG assets from `public/brand`, and centralize the responsive editorial system in `src/app/globals.css` without adding dependencies.

**Tech Stack:** Next.js 16, React 19, TypeScript 6, CSS, lucide-react, Vitest, Testing Library, Playwright.

## Global Constraints

- Preserve search, filters, sorting, grid/list view, load-more, Skill details, guarded downloads, copy actions, bilingual state, metadata, structured data, mobile drawer, offline status, and accessibility behavior.
- Use the exact official `WEIAN-logo-primary.svg`, `WEIAN-logo-reversed.svg`, and `WEIAN-mark-primary.svg` assets without redrawing or editing their letterforms.
- Use the exact hero video URL `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4`.
- Remove `/submit`, its components, validation, tests, translations, links, sitemap entry, localized title, and home contribution section; `/submit` must return the normal 404 page with no redirect.
- Do not add dependencies, a backend, authentication, a CMS, Supabase, or any replacement public submission workflow.
- Use `#0C447C` navy, `#2E86DE` blue, `#F0F0EE` paper, `#F8F9F8` white, `#17212B` ink, and `#68737D` muted copy as the core palette.
- Respect `prefers-reduced-motion`, keyboard focus, semantic landmarks, dialog focus restoration, touch targets, and 390px no-overflow behavior.

---

### Task 1: Brand assets and editorial application shell

**Files:**
- Create: `public/brand/weian-logo-primary.svg`
- Create: `public/brand/weian-logo-reversed.svg`
- Create: `public/brand/weian-mark-primary.svg`
- Modify: `src/app/icon.svg`
- Modify: `src/components/layout/site-header.tsx`
- Modify: `src/components/layout/site-footer.tsx`
- Modify: `src/components/layout/site-shell.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/components/app-shell.test.tsx`

**Interfaces:**
- Consumes: `usePathname()`, `useLanguage()`, `LanguageSwitcher`, `Dialog`, `siteConfig`, and the existing `/skills?focus=search` behavior.
- Produces: `SiteHeader` with `isHome` visual state, official `<img>` lockups, navigation containing only `/`, `/skills`, `/categories`, and `/about`, plus the shared editorial CSS tokens used by all later tasks.

- [ ] **Step 1: Write failing shell tests**

Add a navigation mock and assertions that render `SiteHeader` and `SiteFooter` inside `LanguageProvider`:

```tsx
vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useRouter: () => ({ push: vi.fn() }),
}));

it("uses the official brand lockups and excludes submission navigation", () => {
  render(
    <LanguageProvider>
      <SiteHeader />
      <SiteFooter />
    </LanguageProvider>,
  );

  expect(screen.getByRole("img", { name: "WEIAN DATA TECH" })).toHaveAttribute(
    "src",
    "/brand/weian-logo-reversed.svg",
  );
  expect(screen.queryByRole("link", { name: /提交|submit/i })).not.toBeInTheDocument();
  expect(screen.getAllByRole("link", { name: /关于我们/i }).length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run the shell test and verify RED**

Run: `npm test -- tests/components/app-shell.test.tsx`

Expected: FAIL because the current shell uses the Workflow icon and still renders `/submit`.

- [ ] **Step 3: Add exact official SVG assets**

Copy the source bytes from:

```text
<本机公司 logo 素材目录>/WEIAN-logo-primary.svg
<本机公司 logo 素材目录>/WEIAN-logo-reversed.svg
<本机公司 logo 素材目录>/WEIAN-mark-primary.svg
```

into the three `public/brand` targets. Replace `src/app/icon.svg` with the exact mark asset bytes.

- [ ] **Step 4: Implement the shared shell and design tokens**

Change `SiteHeader` to select the logo from the pathname and remove the submit item:

```tsx
const isHome = pathname === "/";
const navItems = [
  { href: "/", label: t("nav.home") },
  { href: "/skills", label: t("nav.skills") },
  { href: "/categories", label: t("nav.categories") },
  { href: "/about", label: t("nav.about") },
];

<img
  src={isHome ? "/brand/weian-logo-reversed.svg" : "/brand/weian-logo-primary.svg"}
  alt="WEIAN DATA TECH"
/>
```

Update the footer to use `/brand/weian-logo-reversed.svg`, keep browse/company/contact/privacy/GitHub destinations, and omit submission. Update `SiteShell` with pathname-aware home styling only if needed. Define the shared paper/navy/blue tokens, container, header, footer, button, focus, dialog, and responsive rules in `globals.css`.

- [ ] **Step 5: Run the shell test and verify GREEN**

Run: `npm test -- tests/components/app-shell.test.tsx`

Expected: PASS with no submit link and the official home logo source.

- [ ] **Step 6: Commit the shell**

```bash
git add public/brand src/app/icon.svg src/components/layout src/app/globals.css tests/components/app-shell.test.tsx
git commit -m "feat: add editorial brand shell"
```

### Task 2: Full-screen home hero and editorial discovery sections

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/home/hero.tsx`
- Modify: `src/components/skills/hero-search.tsx`
- Modify: `src/components/home/featured-skills.tsx`
- Modify: `src/components/home/category-explorer.tsx`
- Modify: `src/components/home/platform-values.tsx`
- Modify: `src/components/home/recent-skills.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/components/app-shell.test.tsx`

**Interfaces:**
- Consumes: `skills`, `categories`, `getCategoryCounts`, `localize`, `formatDate`, `HeroSearch`, and translated hero/home strings.
- Produces: the exact `<video>` hero, functional post-hero search, asymmetric featured links, eight category links, values list, and recent Skill links.

- [ ] **Step 1: Write failing home composition tests**

Add:

```tsx
it("renders the approved video hero and preserved discovery content", () => {
  const { container } = render(
    <LanguageProvider>
      <Home />
    </LanguageProvider>,
  );

  const video = container.querySelector("video");
  expect(video).toHaveAttribute("autoplay");
  expect(video).toHaveAttribute("muted");
  expect(video).toHaveAttribute("loop");
  expect(video).toHaveAttribute("playsinline");
  expect(video?.querySelector("source")).toHaveAttribute(
    "src",
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4",
  );
  expect(screen.getByRole("link", { name: /浏览全部 Skills/i })).toHaveAttribute("href", "/skills");
  expect(screen.getByRole("combobox", { name: "搜索 Skill" })).toBeInTheDocument();
  expect(container.querySelectorAll(".category-card")).toHaveLength(8);
  expect(screen.queryByText(/一起完善开源 Skill 生态/)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run the home test and verify RED**

Run: `npm test -- tests/components/app-shell.test.tsx`

Expected: FAIL because the current hero has no video and renders the submission CTA/contribution section.

- [ ] **Step 3: Implement the hero and section ordering**

Use this semantic structure in `Hero`:

```tsx
<section className="hero-section">
  <video className="hero-video" autoPlay muted loop playsInline aria-hidden="true">
    <source src={HERO_VIDEO_URL} type="video/mp4" />
  </video>
  <div className="hero-shade" aria-hidden="true" />
  <div className="container-shell hero-content">
    <span className="hero-eyebrow">{t("hero.badge")}</span>
    <h1 aria-label={accessibleTitle}>...</h1>
    <p>{t("hero.description")}</p>
    <ButtonLink href="/skills" size="lg">{t("hero.primary")}...</ButtonLink>
  </div>
</section>
```

Move `HeroSearch` into its own first light section in `page.tsx`. Delete the `ContributionSection` import and render. Keep the remaining home sections in the approved order.

- [ ] **Step 4: Recompose feature, category, values, and recent components**

Render real data with direct links and stable class contracts:

```tsx
const featured = skills.filter((skill) => skill.featured).slice(0, 3);

<div className="featured-grid">
  {featured.map((skill, index) => (
    <Link
      className={cn("featured-skill", index === 0 && "featured-skill-primary")}
      href={`/skills/${skill.slug}`}
      key={skill.id}
    >
      ...localized name, category, description, verified/license metadata...
    </Link>
  ))}
</div>
```

Keep all eight category links, the existing four values, and four recent Skills. Style them with rule-based grids and rows rather than repeated glass cards.

- [ ] **Step 5: Add responsive and reduced-motion styles**

Add CSS that makes the hero at least `100dvh`, uses `object-fit: cover`, disables the video display or animation for reduced motion, collapses asymmetric grids intentionally at 900px, and keeps all sections overflow-free at 390px.

- [ ] **Step 6: Run the home test and verify GREEN**

Run: `npm test -- tests/components/app-shell.test.tsx`

Expected: PASS with the exact video source, functional search, eight categories, and no contribution content.

- [ ] **Step 7: Commit the home page**

```bash
git add src/app/page.tsx src/components/home src/components/skills/hero-search.tsx src/app/globals.css tests/components/app-shell.test.tsx
git commit -m "feat: rebuild editorial home page"
```

### Task 3: Refine the Skill library and category page without changing behavior

**Files:**
- Modify: `src/components/skills/skill-library.tsx`
- Modify: `src/components/skills/skill-card.tsx`
- Modify: `src/components/skills/skill-list-row.tsx`
- Modify: `src/components/home/categories-page-content.tsx`
- Modify: `src/components/home/category-explorer.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/components/skill-library-visual-structure.test.tsx`
- Test: `e2e/platform.spec.ts`

**Interfaces:**
- Consumes: `parseSkillQuery`, `serializeSkillQuery`, `filterSkills`, current filter-group arrays, mobile `Dialog`, `SkillCard`, and `SkillListRow`.
- Produces: unchanged shareable query behavior with editorial page hero, desktop rail, toolbar, cards, list rows, category grid, and mobile filter drawer.

- [ ] **Step 1: Write failing structural tests**

Create:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CategoriesPageContent } from "@/components/home/categories-page-content";
import { LanguageProvider } from "@/components/language/language-provider";

vi.mock("next/navigation", () => ({
  usePathname: () => "/categories",
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("editorial collection pages", () => {
  it("renders all category destinations in the editorial grid", () => {
    const { container } = render(
      <LanguageProvider><CategoriesPageContent /></LanguageProvider>,
    );
    expect(screen.getByRole("heading", { name: "Skill 分类" })).toBeInTheDocument();
    expect(container.querySelectorAll(".category-card")).toHaveLength(8);
    expect(container.querySelector(".page-hero-editorial")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the structural test and verify RED**

Run: `npm test -- tests/components/skill-library-visual-structure.test.tsx`

Expected: FAIL because `.page-hero-editorial` does not exist.

- [ ] **Step 3: Recompose library markup without touching query logic**

Keep `updateFilters`, `toggleFilter`, `removeFilter`, filtering, sorting, focus, view, load-more, and dialog code unchanged. Rework only the rendered hierarchy into:

```tsx
<main className="skill-library-page">
  <header className="page-hero-editorial">...</header>
  <div className="container-shell library-layout">
    <aside className="library-filter-rail">...</aside>
    <section className="library-results">...</section>
  </div>
</main>
```

Retain all current accessible names and `data-filter-chip` attributes so behavior tests remain meaningful.

- [ ] **Step 4: Refine Skill cards, list rows, and categories**

Preserve direct detail links, download dialog triggers, localized data, platforms, license, stars, and dates. Replace glass ornamentation with fine rules, soft paper surfaces, clear heading hierarchy, and restrained hover movement. Add `page-hero-editorial` to the categories page and keep the eight category URLs unchanged.

- [ ] **Step 5: Run component and existing e2e behavior tests**

Run: `npm test -- tests/components/skill-library-visual-structure.test.tsx tests/lib/skill-query.test.ts`

Expected: PASS.

Run: `npm run test:e2e -- --grep "skill library keeps filters|supported navigation state"`

Expected: PASS, including URL state, empty state, list/grid, load more, mobile filter dialog, and focused search.

- [ ] **Step 6: Commit collection pages**

```bash
git add src/components/skills/skill-library.tsx src/components/skills/skill-card.tsx src/components/skills/skill-list-row.tsx src/components/home/categories-page-content.tsx src/components/home/category-explorer.tsx src/app/globals.css tests/components/skill-library-visual-structure.test.tsx e2e/platform.spec.ts
git commit -m "feat: refine skill collection pages"
```

### Task 4: Recompose Skill detail and About pages

**Files:**
- Modify: `src/components/skills/skill-detail.tsx`
- Modify: `src/components/about/about-content.tsx`
- Modify: `src/app/globals.css`
- Test: `tests/components/editorial-detail-about.test.tsx`
- Test: `e2e/platform.spec.ts`

**Interfaces:**
- Consumes: the complete `Skill` type, `DownloadDialog`, `CopyButton`, `SkillCard`, existing translations, `siteConfig.contactEmail`, structured data emitted by the route, and all current section IDs.
- Produces: editorial detail hero/facts/content/sidebar composition and editorial about hero/mission/principles/usage/attribution/contact composition with unchanged functionality.

- [ ] **Step 1: Write failing page-structure tests**

Create:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AboutContent } from "@/components/about/about-content";
import { LanguageProvider } from "@/components/language/language-provider";

vi.mock("next/navigation", () => ({ usePathname: () => "/about" }));

describe("editorial detail and about pages", () => {
  it("keeps the company sections without inviting Skill submissions", () => {
    const { container } = render(
      <LanguageProvider><AboutContent /></LanguageProvider>,
    );
    expect(screen.getByRole("heading", { name: "让优质开源资源更容易被使用" })).toBeInTheDocument();
    expect(container.querySelector(".about-editorial-hero")).toBeInTheDocument();
    expect(screen.queryByText(/欢迎推荐项目/)).not.toBeInTheDocument();
    expect(screen.getByText(/报告失效链接/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the page-structure test and verify RED**

Run: `npm test -- tests/components/editorial-detail-about.test.tsx`

Expected: FAIL because the new hero class and revised contact copy do not exist.

- [ ] **Step 3: Recompose Skill detail**

Keep every current data field, action, section ID, related card, and accessible label. Change layout only:

```tsx
<header className="detail-editorial-hero">
  <div className="detail-identity">...</div>
  <dl className="detail-facts">...</dl>
</header>
<div className="detail-editorial-layout">
  <div className="detail-content">...existing sections...</div>
  <nav className="detail-on-page-nav" aria-label={...}>...section links...</nav>
</div>
```

The on-page nav is sticky only on wide screens. Keep breadcrumbs, download dialog, copy buttons, GitHub/official links, stats, changelog, FAQ, report link, and three related Skills.

- [ ] **Step 4: Recompose About and revise contact copy**

Add `about-editorial-hero`, two-column mission, four principle panels, numbered usage steps, attribution/disclaimer split, and contact row. Use exact contact copy:

```tsx
{locale === "zh"
  ? "如需报告失效链接或提出目录改进建议，欢迎通过邮件与我们联系。"
  : "Contact us by email to report broken links or suggest improvements to the directory."}
```

- [ ] **Step 5: Run unit and existing detail e2e tests**

Run: `npm test -- tests/components/editorial-detail-about.test.tsx tests/components/download-dialog.test.tsx`

Expected: PASS.

Run: `npm run test:e2e -- --grep "skill detail presents"`

Expected: PASS, including copy, guarded download, structured data, related Skills, and not-found behavior.

- [ ] **Step 6: Commit detail and about pages**

```bash
git add src/components/skills/skill-detail.tsx src/components/about/about-content.tsx src/app/globals.css tests/components/editorial-detail-about.test.tsx e2e/platform.spec.ts
git commit -m "feat: refine skill detail and company pages"
```

### Task 5: Remove public Skill submission completely

**Files:**
- Delete: `src/app/submit/page.tsx`
- Delete: `src/components/submit/submit-page-content.tsx`
- Delete: `src/components/submit/submit-skill-form.tsx`
- Delete: `src/lib/submit-validation.ts`
- Delete: `src/components/home/contribution-section.tsx`
- Delete: `tests/components/submit-skill-form.test.tsx`
- Delete: `tests/lib/submit-validation.test.ts`
- Modify: `src/data/translations.ts`
- Modify: `src/components/language/localized-document-title.tsx`
- Modify: `src/app/sitemap.ts`
- Modify: `e2e/platform.spec.ts`
- Test: `tests/components/app-shell.test.tsx`
- Test: `tests/lib/sitemap.test.ts`

**Interfaces:**
- Consumes: Next.js filesystem routing and `sitemap()` output.
- Produces: no `/submit` route, no public submit wording or links, and a sitemap containing only home, skills, categories, about, and Skill detail URLs.

- [ ] **Step 1: Write failing sitemap and public-surface tests**

Create `tests/lib/sitemap.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("public sitemap", () => {
  it("does not expose a Skill submission route", () => {
    expect(sitemap().map((entry) => new URL(entry.url).pathname)).not.toContain("/submit");
  });
});
```

Add to the shell test:

```tsx
expect(document.body.textContent).not.toMatch(/提交 Skill|Submit a Skill/i);
```

- [ ] **Step 2: Run tests and verify RED**

Run: `npm test -- tests/lib/sitemap.test.ts tests/components/app-shell.test.tsx`

Expected: FAIL because `/submit` remains in the sitemap and public translation/shell surface.

- [ ] **Step 3: Delete submission production and test modules**

Delete the exact files listed above. Remove `ContributionSection` imports already made unnecessary by Task 2.

- [ ] **Step 4: Remove remaining route metadata and translation keys**

Delete `/submit` from `routeTitles`, delete it from `staticRoutes`, and remove these bilingual keys:

```text
nav.submit
hero.secondary
home.contributeTitle
home.contributeDescription
home.contributeAction
submit.title
submit.description
```

Search literal public surfaces with:

```bash
rg -n '(/submit|nav\.submit|hero\.secondary|home\.contribute|submit\.(title|description)|提交 Skill|Submit a Skill)' src tests e2e
```

Expected: no matches.

- [ ] **Step 5: Add `/submit` 404 e2e assertion and verify GREEN**

Add:

```ts
test("public Skill submission is not a route", async ({ page }) => {
  const response = await page.goto("/submit");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: /页面不存在|Page not found/i })).toBeVisible();
});
```

Run: `npm test -- tests/lib/sitemap.test.ts tests/components/app-shell.test.tsx`

Expected: PASS.

Run: `npm run test:e2e -- --grep "public Skill submission"`

Expected: PASS with HTTP 404 and no redirect.

- [ ] **Step 6: Commit submission removal**

```bash
git add -A src tests e2e
git commit -m "refactor: remove public skill submission"
```

### Task 6: Final responsive, accessibility, and visual acceptance

**Files:**
- Modify: `src/app/globals.css`
- Modify: `e2e/platform.spec.ts`
- Modify: `next-env.d.ts` only if Next.js regeneration changed it from the repository baseline

**Interfaces:**
- Consumes: all completed pages and existing launcher script.
- Produces: a fully verified desktop/mobile site with clean checks and the approved visual composition.

- [ ] **Step 1: Extend global acceptance checks**

Add route coverage without snapshot brittleness:

```ts
for (const route of ["/", "/skills", "/categories", "/skills/data-analysis-assistant", "/about"]) {
  await page.goto(route);
  await expect(page.locator("body")).not.toHaveCSS("overflow-x", "scroll");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.getByRole("img", { name: "WEIAN DATA TECH" }).first()).toBeVisible();
}
```

Keep the existing bilingual, mobile drawer, Escape focus restoration, reduced-motion, and offline assertions.

- [ ] **Step 2: Run the complete unit suite**

Run: `npm test`

Expected: all Vitest files pass with zero failures.

- [ ] **Step 3: Run static validation**

Run: `npm run lint`

Expected: exit 0 with no ESLint errors.

Run: `npm run typecheck`

Expected: exit 0 with no TypeScript errors.

- [ ] **Step 4: Run the production build**

Run: `npm run build`

Expected: exit 0 and Next.js reports successful static generation, with no `/submit` route.

- [ ] **Step 5: Run the complete Playwright suite**

Run: `npm run test:e2e`

Expected: all Playwright tests pass at the configured browser and base URL.

- [ ] **Step 6: Inspect every route at desktop and mobile sizes**

Start the production or development server using the project launcher, then inspect:

```text
Desktop 1440 × 1000: /, /skills, /categories, /skills/data-analysis-assistant, /about
Mobile 390 × 844: /, /skills, /categories, /skills/data-analysis-assistant, /about
```

Verify the exact logo artwork, video crop and overlay, line lengths, spacing rhythm, active navigation, hover/focus states, dialogs, sticky detail nav, no clipped content, no horizontal overflow, and normal 404 at `/submit`.

- [ ] **Step 7: Check final diff and commit acceptance refinements**

Run:

```bash
git diff --check
git status --short
```

Expected: no whitespace errors and only intentional redesign changes plus pre-existing untracked `.codegraph/daemon.pid` and `.superpowers/` prototype artifacts.

Commit any final CSS/e2e refinements:

```bash
git add src/app/globals.css e2e/platform.spec.ts
git commit -m "test: verify editorial redesign acceptance"
```
