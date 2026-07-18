# WEIAN DATA Interface Refinement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the approved WEIAN DATA website so navigation destinations are precise, home and library controls remain readable, Skill cards have one clear action, detail anchors land correctly, and the About page uses a consistent light editorial layout.

**Architecture:** Extend the existing URL-driven Skill filter state with a deterministic 30-day period, then keep navigation behavior in existing layout components and visual refinements in `editorial.css`. Remove the redundant Categories route and values section instead of hiding them. Preserve existing bilingual data, video hero, download dialog, and detail data model.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, native CSS, Lucide React, Vitest, Testing Library, Playwright.

## Global Constraints

- Preserve the approved home video hero, hero copy, WEIAN DATA logos, Geist typography, bilingual behavior, and existing Skill data.
- Use one light theme throughout. Do not add dark sections, black controls, saturated gradients, or new runtime dependencies.
- Use `DESIGN_VARIANCE 6`, `MOTION_INTENSITY 3`, and `VISUAL_DENSITY 3` as the visual baseline.
- Keep all eight category filters in the Skills dropdown and the home workflow section, but remove the `/categories` route and navigation item.
- Skill cards and list rows have exactly one primary action: navigate to the detail page. Downloads remain on detail pages only.
- `period=30d` is deterministic relative to the newest `addedAt` date in the supplied catalog.
- At widths below 768 px, multi-column refinements collapse to one column without overlap or horizontal overflow.
- Respect `prefers-reduced-motion: reduce` for anchor scrolling.
- Add no submission workflow, authentication, database, external integration, or dark theme.

---

## File Responsibility Map

- `src/types/filters.ts`: public shape of URL-driven Skill filter state.
- `src/lib/skill-query.ts`: parsing, serialization, deterministic period filtering, and sorting.
- `src/components/layout/site-header.tsx`: route-aware navigation and header actions.
- `src/components/layout/site-footer.tsx`: truthful recent and direct featured links.
- `src/components/home/*.tsx`: home anchor, featured tones, workflow layout, recent link, and removed values section.
- `src/components/skills/skill-card.tsx`: complete-card detail navigation for grid view.
- `src/components/skills/skill-list-row.tsx`: complete-row detail navigation for list view.
- `src/components/skills/skill-detail.tsx`: project action and exact section anchors.
- `src/components/about/about-content.tsx`: consistent About page information structure.
- `src/app/editorial.css`: all light editorial visual refinements and responsive behavior.
- `tests/**/*.test.ts(x)`: deterministic behavior and component contracts.
- `e2e/platform.spec.ts`: browser behavior, responsive layout, anchor position, and removed routes.

---

### Task 1: Deterministic recent filtering and simplified navigation

**Files:**
- Modify: `src/types/filters.ts`
- Modify: `src/lib/skill-query.ts`
- Modify: `tests/lib/skill-query.test.ts`
- Modify: `src/components/layout/site-header.tsx`
- Modify: `src/components/layout/site-footer.tsx`
- Modify: `src/components/home/discovery-search.tsx`
- Modify: `src/app/sitemap.ts`
- Delete: `src/app/categories/page.tsx`
- Delete: `src/components/home/categories-page-content.tsx`
- Modify: `tests/components/app-shell.test.tsx`
- Modify: `tests/lib/sitemap.test.ts`
- Delete: `tests/components/skill-library-visual-structure.test.tsx`

**Interfaces:**
- Consumes: existing `SkillFilterState`, `parseSkillQuery`, `serializeSkillQuery`, `filterSkills`, `skills`, and `usePathname()`.
- Produces: `SkillPeriod = "30d"`, `SkillFilterState.period?: SkillPeriod`, the stable `#home-search` target, and a primary navigation containing only Home, Skills, and About.

- [ ] **Step 1: Write failing query and shell tests**

Add these cases to `tests/lib/skill-query.test.ts`:

```ts
it("round-trips and applies the latest 30-day catalog window", () => {
  const catalog = [
    { ...skills[0], id: "recent", slug: "recent", addedAt: "2026-07-12" },
    { ...skills[1], id: "boundary", slug: "boundary", addedAt: "2026-06-12" },
    { ...skills[2], id: "old", slug: "old", addedAt: "2026-06-11" },
  ];
  const state = parseSkillQuery("period=30d&sort=added");

  expect(state).toMatchObject({ period: "30d", sort: "added" });
  expect(serializeSkillQuery(state).toString()).toBe("period=30d&sort=added");
  expect(filterSkills(catalog, state, "en").map((skill) => skill.slug)).toEqual([
    "recent",
    "boundary",
  ]);
});

it("ignores unsupported period values", () => {
  expect(parseSkillQuery("period=year").period).toBeUndefined();
});
```

Update `tests/components/app-shell.test.tsx` so the home shell contract asserts:

```tsx
expect(screen.getByRole("link", { name: "搜索" })).toHaveAttribute(
  "href",
  "/#home-search",
);
expect(screen.queryByRole("link", { name: "GitHub" })).not.toBeInTheDocument();
expect(screen.queryByRole("link", { name: "分类" })).not.toBeInTheDocument();
expect(container.querySelector("#home-search")).toBeInTheDocument();
expect(container.querySelector(".values-section")).not.toBeInTheDocument();
```

Update `tests/lib/sitemap.test.ts` to assert that generated URLs do not contain `/categories`.

- [ ] **Step 2: Run the focused tests and verify RED**

Run:

```bash
npm test -- tests/lib/skill-query.test.ts tests/components/app-shell.test.tsx tests/lib/sitemap.test.ts
```

Expected: FAIL because `period` is not parsed or filtered, home search points to `/skills`, GitHub and Categories are rendered, the values section exists, and the sitemap still includes `/categories`.

- [ ] **Step 3: Implement the filter type and deterministic window**

In `src/types/filters.ts`, add:

```ts
export type SkillPeriod = "30d";

export type SkillFilterState = {
  query?: string;
  featured?: boolean;
  focusSearch?: boolean;
  period?: SkillPeriod;
  categories?: CategoryId[];
  platforms?: string[];
  licenses?: string[];
  tags?: string[];
  sort?: SkillSort;
  view?: SkillView;
};
```

In `src/lib/skill-query.ts`, import `SkillPeriod`, define `periodValues`, parse and serialize the parameter, and apply an inclusive UTC cutoff:

```ts
const periodValues = new Set<SkillPeriod>(["30d"]);

function getPeriodCutoff(collection: Skill[], period?: SkillPeriod): string | undefined {
  if (period !== "30d" || collection.length === 0) return undefined;
  const latest = collection.reduce(
    (current, skill) => (skill.addedAt > current ? skill.addedAt : current),
    collection[0].addedAt,
  );
  const cutoff = new Date(`${latest}T00:00:00.000Z`);
  cutoff.setUTCDate(cutoff.getUTCDate() - 30);
  return cutoff.toISOString().slice(0, 10);
}
```

Inside `filterSkills`, calculate `const periodCutoff = getPeriodCutoff(collection, filters.period);` and require `!periodCutoff || skill.addedAt >= periodCutoff`. In `parseSkillQuery`, accept only `periodValues`; in `serializeSkillQuery`, add `if (state.period) params.set("period", state.period);` immediately after focus state.

- [ ] **Step 4: Simplify header, footer, home anchor, and public routes**

In `src/components/layout/site-header.tsx`:

```tsx
const navItems = [
  { href: "/", label: t("nav.home") },
  { href: "/skills", label: t("nav.skills") },
  { href: "/about", label: t("nav.about") },
];

<Link
  href={isHome ? "/#home-search" : "/skills?focus=search"}
  className="icon-button header-search"
  aria-label={t("nav.search")}
>
  <Search aria-hidden="true" size={18} strokeWidth={1.8} />
</Link>

{!isHome ? (
  <a
    href="https://github.com/topics/ai-agents"
    target="_blank"
    rel="noopener noreferrer"
    className={buttonClassName({ variant: "secondary", size: "sm", className: "github-button" })}
  >
    <GitFork aria-hidden="true" size={16} strokeWidth={1.8} />
    <span>{t("nav.github")}</span>
  </a>
) : null}
```

Set `<section id="home-search" className="home-search-section">` in `src/components/home/discovery-search.tsx`.

In `src/components/layout/site-footer.tsx`, import `skills`, derive the first two featured entries, remove Categories and generic Featured links, use `/skills?period=30d&sort=added` for Recent, and append direct detail links using localized Skill names.

Delete the Categories route, its page-content component, and its dedicated component test. Remove `/categories` from `src/app/sitemap.ts`.

- [ ] **Step 5: Run focused and full tests and verify GREEN**

Run:

```bash
npm test -- tests/lib/skill-query.test.ts tests/components/app-shell.test.tsx tests/lib/sitemap.test.ts
npm test
```

Expected: all tests pass; no Categories component test remains.

- [ ] **Step 6: Commit Task 1**

```bash
git add src/types/filters.ts src/lib/skill-query.ts tests/lib/skill-query.test.ts src/components/layout/site-header.tsx src/components/layout/site-footer.tsx src/components/home/discovery-search.tsx src/app/sitemap.ts tests/components/app-shell.test.tsx tests/lib/sitemap.test.ts src/app/categories/page.tsx src/components/home/categories-page-content.tsx tests/components/skill-library-visual-structure.test.tsx
git commit -m "feat: simplify navigation and recent discovery"
```

### Task 2: Refine home sections and remove the values block

**Files:**
- Modify: `src/app/page.tsx`
- Delete: `src/components/home/platform-values.tsx`
- Modify: `src/components/home/featured-skills.tsx`
- Modify: `src/components/home/category-explorer.tsx`
- Modify: `src/components/home/recent-skills.tsx`
- Modify: `src/components/skills/hero-search.tsx`
- Modify: `src/app/editorial.css`
- Modify: `tests/components/app-shell.test.tsx`

**Interfaces:**
- Consumes: home sections, existing `skills` and `categories` datasets, and `HeroSearch` behavior.
- Produces: three distinct light featured tones, non-overlapping category metadata, readable popular terms, aligned recent heading, and a 30-day recent destination.

- [ ] **Step 1: Write failing home structure tests**

Extend the home test with:

```tsx
expect(container.querySelectorAll(".featured-skill[data-tone]")).toHaveLength(3);
expect(container.querySelectorAll(".category-card-footer")).toHaveLength(8);
expect(screen.getByRole("link", { name: /查看全部更新/ })).toHaveAttribute(
  "href",
  "/skills?period=30d&sort=added",
);
for (const term of container.querySelectorAll(".popular-searches button")) {
  expect(term).toHaveClass("popular-search-term");
}
```

- [ ] **Step 2: Run the home test and verify RED**

Run:

```bash
npm test -- tests/components/app-shell.test.tsx
```

Expected: FAIL because tone attributes, category footer wrappers, popular-search term classes, and the 30-day link do not exist.

- [ ] **Step 3: Implement the home component structure**

Remove the `PlatformValues` import and section from `src/app/page.tsx`, then delete `src/components/home/platform-values.tsx`.

In `FeaturedSkills`, add `data-tone={String(index + 1)}` and class `featured-skill-tone-${index + 1}` to each direct Skill link.

In `CategoryExplorer`, remove the `/categories` heading action and replace the count and arrow siblings with:

```tsx
<span className="category-card-footer">
  <span className="category-count">
    {counts[category.id]} {t("categories.skills")}
  </span>
  <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.7} />
</span>
```

In `RecentSkills`, use `href="/skills?period=30d&sort=added"` and rebuild the heading with the shared `section-heading recent-heading` structure.

In `HeroSearch`, apply `className="popular-search-term"` to each popular term button.

- [ ] **Step 4: Add exact light visual rules**

In `src/app/editorial.css`, add explicit resting and focus states:

```css
.popular-search-term {
  color: var(--weian-navy);
  background: #f7f9fb;
  border: 1px solid #d7dee6;
}

.popular-search-term:hover,
.popular-search-term:focus-visible {
  color: #174a78;
  background: #eaf4fb;
  border-color: #9fc5df;
}

.featured-skill-tone-1 { background: #eaf4fb; }
.featured-skill-tone-2 { background: #f2f5f7; }
.featured-skill-tone-3 { background: #e8f5f4; }

.category-card-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  margin-top: auto;
}

.recent-heading { align-items: end; }

@media (max-width: 767px) {
  .recent-heading { align-items: start; }
}
```

Remove obsolete `.values-*` rules and superseded featured/category/recent declarations rather than leaving conflicting CSS.

- [ ] **Step 5: Run tests and verify GREEN**

```bash
npm test -- tests/components/app-shell.test.tsx
npm run lint
```

Expected: test and lint pass.

- [ ] **Step 6: Commit Task 2**

```bash
git add src/app/page.tsx src/components/home/platform-values.tsx src/components/home/featured-skills.tsx src/components/home/category-explorer.tsx src/components/home/recent-skills.tsx src/components/skills/hero-search.tsx src/app/editorial.css tests/components/app-shell.test.tsx
git commit -m "feat: refine home discovery sections"
```

### Task 3: Make Skill collection cards spacious and fully clickable

**Files:**
- Modify: `src/components/skills/skill-card.tsx`
- Modify: `src/components/skills/skill-list-row.tsx`
- Modify: `src/app/editorial.css`
- Create: `tests/components/skill-collection-items.test.tsx`

**Interfaces:**
- Consumes: `Skill`, `categories`, `localize`, and Next.js `Link`.
- Produces: one focusable detail link per card or row, with no list-level detail button or download dialog.

- [ ] **Step 1: Write the failing card contract tests**

Create `tests/components/skill-collection-items.test.tsx`:

```tsx
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { LanguageProvider } from "@/components/language/language-provider";
import { SkillCard } from "@/components/skills/skill-card";
import { SkillListRow } from "@/components/skills/skill-list-row";
import { skills } from "@/data/skills";

function renderItem(item: React.ReactNode) {
  window.localStorage.setItem("weian-locale", "zh");
  return render(<LanguageProvider>{item}</LanguageProvider>);
}

describe("Skill collection items", () => {
  it.each([
    ["grid", <SkillCard skill={skills[0]} />],
    ["list", <SkillListRow skill={skills[0]} />],
  ])("makes the complete %s item the only detail action", (_view, item) => {
    const { container } = renderItem(item);
    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", `/skills/${skills[0].slug}`);
    expect(links[0]).toHaveClass("skill-item-link");
    expect(screen.queryByText("查看详情")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /下载/ })).not.toBeInTheDocument();
    expect(container.querySelector("article > .skill-item-link")).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run the test and verify RED**

```bash
npm test -- tests/components/skill-collection-items.test.tsx
```

Expected: FAIL because the existing items expose separate detail and download actions and lack `.skill-item-link`.

- [ ] **Step 3: Implement one complete-item link**

In both components, remove `DownloadDialog`, button helpers, and action icon imports. Make the article contain one direct link:

```tsx
<article className="skill-card">
  <Link
    className="skill-item-link"
    href={`/skills/${skill.slug}`}
    aria-label={`${locale === "zh" ? skill.nameZh ?? skill.name : skill.name} - ${t("common.viewDetails")}`}
  >
    {/* existing icon, badges, copy, platforms, and metadata */}
  </Link>
</article>
```

Use the same pattern for `.skill-list-row`, placing its existing icon, main copy, and compact metadata inside the link. Preserve `compact` styling for related Skill cards.

- [ ] **Step 4: Increase spacing and add card-level interaction states**

Update `src/app/editorial.css` so `.skill-item-link` owns padding, grid layout, focus, and hover. Use at least `1.5rem` card padding, `1rem` major-group gaps, two-line description clamping, a light border change, and `transform: translateY(-2px)` only on devices supporting hover. Set `.skill-card` and `.skill-list-row` to `overflow: clip`; keep all text dark on light surfaces.

Set `.sort-control`, `.sort-control select`, and `.sort-control option` to explicit light colors:

```css
.sort-control,
.sort-control select,
.sort-control option {
  color: var(--weian-navy);
  background: var(--weian-white);
  color-scheme: light;
}

.sort-control {
  border: 1px solid var(--weian-line);
}

.sort-control:focus-within {
  border-color: var(--weian-blue);
  box-shadow: 0 0 0 3px rgb(46 134 222 / 0.14);
}
```

- [ ] **Step 5: Run focused and full checks**

```bash
npm test -- tests/components/skill-collection-items.test.tsx
npm test
npm run typecheck
```

Expected: all commands pass.

- [ ] **Step 6: Commit Task 3**

```bash
git add src/components/skills/skill-card.tsx src/components/skills/skill-list-row.tsx src/app/editorial.css tests/components/skill-collection-items.test.tsx
git commit -m "feat: make Skill collection items fully clickable"
```

### Task 4: Correct Skill detail actions and anchor destinations

**Files:**
- Modify: `src/components/skills/skill-detail.tsx`
- Modify: `src/app/editorial.css`
- Modify: `tests/components/editorial-detail-about.test.tsx`
- Modify: `e2e/platform.spec.ts`

**Interfaces:**
- Consumes: Skill `githubUrl`, existing content section IDs, sticky header, and on-page navigation.
- Produces: one GitHub project action, no official website action, and four anchors that land below sticky UI.

- [ ] **Step 1: Write failing detail tests**

Render `SkillDetail` with `skills[0]` in the component test and assert:

```tsx
expect(screen.getByRole("link", { name: /GitHub/ })).toHaveAttribute(
  "href",
  skills[0].githubUrl,
);
expect(screen.queryByRole("link", { name: /访问项目主页|Visit project site/ }))
  .not.toBeInTheDocument();
expect(container.querySelectorAll(".detail-content > section[id]")).toHaveLength(4);
expect(container.querySelector("#overview")).toHaveClass("detail-anchor-section");
expect(container.querySelector("#features")).toHaveClass("detail-anchor-section");
expect(container.querySelector("#installation")).toHaveClass("detail-anchor-section");
expect(container.querySelector("#usage")).toHaveClass("detail-anchor-section");
```

- [ ] **Step 2: Run the component test and verify RED**

```bash
npm test -- tests/components/editorial-detail-about.test.tsx
```

Expected: FAIL because the website action still renders and anchor sections lack the shared class.

- [ ] **Step 3: Remove the duplicate project action and align anchor markup**

Remove the `Globe2` import and the complete `skill.officialUrl` action block. Add `className="detail-anchor-section"` to sections `overview`, `features`, `installation`, and `usage`. Keep the on-page links exactly `#overview`, `#features`, `#installation`, and `#usage`.

Add:

```css
.detail-anchor-section {
  scroll-margin-top: 9.5rem;
}

@media (max-width: 767px) {
  .detail-anchor-section {
    scroll-margin-top: 6.5rem;
  }
}
```

- [ ] **Step 4: Add browser anchor assertions**

In the detail Playwright test, click each on-page link and verify the matching ID and viewport offset:

```ts
for (const id of ["overview", "features", "installation", "usage"]) {
  await page.locator(`.detail-on-page-nav a[href="#${id}"]`).click();
  await expect(page).toHaveURL(new RegExp(`#${id}$`));
  const top = await page.locator(`#${id}`).evaluate((element) =>
    element.getBoundingClientRect().top,
  );
  expect(top).toBeGreaterThanOrEqual(80);
  expect(top).toBeLessThan(220);
}
```

- [ ] **Step 5: Run checks and verify GREEN**

```bash
npm test -- tests/components/editorial-detail-about.test.tsx
npm run typecheck
```

Expected: both commands pass. The Playwright test runs in Task 6 with a production server.

- [ ] **Step 6: Commit Task 4**

```bash
git add src/components/skills/skill-detail.tsx src/app/editorial.css tests/components/editorial-detail-about.test.tsx e2e/platform.spec.ts
git commit -m "fix: align Skill detail actions and anchors"
```

### Task 5: Rebuild the About page on one editorial grid

**Files:**
- Modify: `src/components/about/about-content.tsx`
- Modify: `src/app/editorial.css`
- Modify: `tests/components/editorial-detail-about.test.tsx`

**Interfaces:**
- Consumes: existing bilingual About copy, `principles`, `siteConfig.contactEmail`, and stable IDs `company`, `usage`, `open-source`, and `privacy`.
- Produces: one aligned About container, consistent H2 scale, a two-column principles grid, concise usage sequence, paired legal sections, and a light contact panel.

- [ ] **Step 1: Write failing structure tests**

Add:

```tsx
expect(container.querySelector(".about-content-grid")).toBeInTheDocument();
expect(container.querySelectorAll(".about-section-heading")).toHaveLength(5);
expect(container.querySelectorAll(".about-principle-card")).toHaveLength(4);
expect(container.querySelector(".about-legal-grid")).toBeInTheDocument();
expect(container.querySelectorAll(".about-usage-step")).toHaveLength(3);
expect(container.querySelector(".about-mark")).not.toBeInTheDocument();
```

- [ ] **Step 2: Run the component test and verify RED**

```bash
npm test -- tests/components/editorial-detail-about.test.tsx
```

Expected: FAIL because the new grid classes and structure do not exist and the floating mark still renders.

- [ ] **Step 3: Implement the single-container About structure**

Use one outer `<div className="container-shell about-content-grid">`. Keep the hero at `id="company"`; remove `Building2` and the floating mark. Apply `.about-section-heading` to Mission, Selection principles, Using the library, Open-source and disclaimer, and Contact headings.

Render principles as:

```tsx
<div className="about-principles-grid">
  {principles.map((principle) => {
    const [title, description] = principle[locale];
    const Icon = principle.icon;
    return (
      <article className="about-principle-card" key={title}>
        <Icon aria-hidden="true" size={21} strokeWidth={1.7} />
        <h3>{title}</h3>
        <p>{description}</p>
      </article>
    );
  })}
</div>
```

Represent the three usage items with `.about-usage-step` and verb-led headings. Wrap open-source attribution and disclaimer inside `.about-legal-grid`; preserve IDs `open-source` and `privacy`. Keep the email action inside a light `.about-contact-panel`.

- [ ] **Step 4: Replace conflicting About CSS**

Remove obsolete About layout selectors and add one consistent system:

```css
.about-content-grid {
  display: grid;
  gap: clamp(4rem, 8vw, 7rem);
  padding-block: clamp(4rem, 8vw, 7.5rem);
}

.about-content-grid h2 {
  max-width: 18ch;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  line-height: 1.08;
}

.about-principles-grid,
.about-legal-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
}

.about-principle-card,
.about-legal-grid > div,
.about-contact-panel {
  color: var(--weian-navy);
  background: var(--weian-white);
  border: 1px solid var(--weian-line);
}

@media (max-width: 767px) {
  .about-principles-grid,
  .about-legal-grid {
    grid-template-columns: 1fr;
  }
}
```

Use consistent padding of `clamp(1.25rem, 3vw, 2rem)` for light panels and preserve readable paragraph widths of approximately 60 to 68 characters.

- [ ] **Step 5: Run focused and full checks**

```bash
npm test -- tests/components/editorial-detail-about.test.tsx
npm run lint
npm run typecheck
```

Expected: all commands pass.

- [ ] **Step 6: Commit Task 5**

```bash
git add src/components/about/about-content.tsx src/app/editorial.css tests/components/editorial-detail-about.test.tsx
git commit -m "feat: rebuild the About page layout"
```

### Task 6: Browser regression, visual verification, and final cleanup

**Files:**
- Modify: `e2e/platform.spec.ts`
- Modify if generated by Next dev: `next-env.d.ts`

**Interfaces:**
- Consumes: completed Tasks 1 through 5 and the existing Playwright configuration.
- Produces: browser proof for navigation, readable controls, complete-card navigation, removed routes, anchor positioning, and responsive alignment.

- [ ] **Step 1: Update the home and library end-to-end expectations**

Replace the Categories-page checks with:

```ts
await page.goto("/");
await expect(page.getByRole("link", { name: "GitHub" })).toHaveCount(0);
await page.getByRole("link", { name: "搜索" }).click();
await expect(page).toHaveURL(/#home-search$/);
await expect(page.locator("#home-search")).toBeInViewport();

const recentHref = await page.getByRole("link", { name: "查看全部更新" })
  .getAttribute("href");
expect(recentHref).toBe("/skills?period=30d&sort=added");

const categoriesResponse = await page.goto("/categories");
expect(categoriesResponse?.status()).toBe(404);
```

Add resting-color checks:

```ts
await page.goto("/");
const popular = page.locator(".popular-search-term").first();
await expect(popular).toHaveCSS("color", "rgb(20, 42, 66)");
await expect(popular).not.toHaveCSS("background-color", "rgb(0, 0, 0)");

await page.goto("/skills");
await expect(page.locator(".sort-control select")).not.toHaveCSS(
  "background-color",
  "rgb(0, 0, 0)",
);
```

- [ ] **Step 2: Add complete-card navigation and overlap checks**

```ts
await page.goto("/skills");
const firstCard = page.locator(".skill-card .skill-item-link").first();
const destination = await firstCard.getAttribute("href");
await firstCard.click();
await expect(page).toHaveURL(new RegExp(`${destination}$`));

await page.goto("/");
for (const card of await page.locator(".category-card").all()) {
  const countBox = await card.locator(".category-count").boundingBox();
  const arrowBox = await card.locator(".category-card-footer svg").boundingBox();
  expect(countBox && arrowBox && countBox.x + countBox.width <= arrowBox.x).toBe(true);
}
```

- [ ] **Step 3: Run the complete automated suite**

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Expected: all unit tests, lint, typecheck, production build, and Playwright tests pass. Build routes include `/`, `/about`, `/skills`, and `/skills/[slug]`, but not `/categories` or `/submit`.

- [ ] **Step 4: Perform in-app browser visual verification**

Open a fresh browser tab at `http://127.0.0.1:3000/` and capture the following states:

- Home at 1440 px and 390 px, including popular terms, featured Skills, workflow cards, recent heading, and footer.
- Skills grid and list at 1440 px and 390 px, including the open sort control where supported.
- One Skill detail at 1440 px and 390 px after clicking every on-page navigation link.
- About at 1440 px and 390 px in Chinese, then English at 390 px to validate longer labels.

For each state, verify no dark controls, clipped text, horizontal overflow, count-arrow collision, inconsistent About headings, or hidden anchor heading.

- [ ] **Step 5: Restore generated project files and inspect the final diff**

If Next rewrites `next-env.d.ts`, restore the repository form exactly:

```ts
/// <reference types="next" />
/// <reference types="next/image-types/global" />
import "./.next/types/routes.d.ts";
```

Then run:

```bash
git diff --check
git status --short
git diff --stat
```

Expected: no whitespace errors; `.codegraph/daemon.pid` and `.superpowers/` remain untracked and unstaged; only intended project files are modified.

- [ ] **Step 6: Commit the verified refinement**

```bash
git add e2e/platform.spec.ts next-env.d.ts
git commit -m "test: verify interface refinement"
```
