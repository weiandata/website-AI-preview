# WEIAN DATA Editorial Redesign Design

## Status

Approved by the user on 2026-07-19 after reviewing the clickable multi-page visual prototype.

## Objective

Redesign the existing bilingual WEIAN DATA website into a refined, responsive editorial experience while preserving its current content model and browsing capabilities. The implementation must retain search, filtering, sorting, grid and list views, Skill details, download safeguards, bilingual content, mobile navigation, accessibility, metadata, and offline status handling.

The public Skill submission feature is outside the product scope and must be removed completely.

## Product Scope

### Preserved routes

- `/`: editorial home page with video hero, search, featured Skills, categories, platform values, recent Skills, and footer.
- `/skills`: searchable and filterable Skill library with grid and list views.
- `/skills/[slug]`: detailed Skill information, provenance, install commands, usage guidance, changelog, FAQ, related Skills, and guarded downloads.
- `/categories`: eight existing categories with counts and links into the filtered library.
- `/about`: company mission, principles, usage guidance, open-source attribution, disclaimer, and contact information.
- Existing not-found states, sitemap, robots metadata, structured data, localized document titles, and responsive behavior.

### Removed scope

- Delete `/submit` so it resolves through the normal Next.js 404 experience.
- Remove the submission form, validation library, submission components, submission tests, navigation and footer links, home contribution callout, sitemap entry, page title handling, and submission translation keys.
- Do not redirect `/submit` to another page.
- Do not introduce any alternative public recommendation or contribution form.

## Brand Assets

Use the original company assets without redrawing, editing, or reconstructing the letterforms:

- `WEIAN-logo-primary.svg`: navigation and light surfaces.
- `WEIAN-logo-reversed.svg`: video hero and dark footer.
- `WEIAN-mark-primary.svg`: application icon or favicon.

Source directory:

`/Users/makunxiang/Documents/公司项目/创业内容/WEIAN DATA TECH/公司logo/`

Brand colors:

- Primary navy: `#0C447C`
- Interface blue: `#2E86DE`
- Paper background: `#F0F0EE`
- Soft white: `#F8F9F8`
- Dark ink: `#17212B`
- Muted copy: `#68737D`

## Visual Direction

The approved direction is a minimal full-screen editorial website with a calm, high-trust B2B character.

- Avoid generic dashboard styling, decorative gradient blobs, excessive icons, glass cards, and repetitive boxed sections.
- Use open spacing, fine rules, asymmetric compositions, restrained rounded corners, and information-led typography.
- Use the existing Geist Sans system font dependency; do not add another font or UI library.
- Keep controls tactile and accessible, with clear hover, active, focus-visible, and disabled states.
- Prefer one dominant composition per section. Cards should communicate hierarchy through scale, tone, and spacing rather than identical repeated panels.
- Preserve the approved prototype's overall proportions and ordering while refining typography, alignment, breakpoint behavior, and micro-interactions in the real application.

## Shared Layout

### Header

- The home page header sits over the video hero and uses the reversed logo.
- Internal pages use the primary logo on the paper background.
- Navigation contains Home, Skills, Categories, and About only.
- Search, language switching, GitHub, active-route states, and mobile drawer behavior remain available.
- The header may use restrained translucent treatment over video, but internal headers remain crisp and flat.

### Footer

- Dark navy background with the reversed official logo.
- Retain browsing, company, contact, privacy, GitHub, language, legal notice, and attribution destinations.
- Remove all submission or recommendation destinations.

## Home Page

### Full-screen video hero

- Exact video URL:
  `https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4`
- The video is full-bleed, autoplaying, muted, looping, `playsInline`, and `object-fit: cover`.
- Provide a navy fallback and a dark readability overlay.
- Preserve existing localized hero messaging and a single primary CTA to `/skills`.
- Do not show a secondary submission CTA.
- Reduced-motion users receive a still visual state without distracting motion.

### Search

- Place the existing functional `HeroSearch` in the first light section after the video hero.
- Keep query navigation to `/skills?q=...` and existing popular-search behavior.

### Featured Skills

- Use an asymmetric editorial composition: one large primary feature and smaller supporting features.
- Preserve real Skill data, bilingual names and descriptions, verified state, categories, links, and meaningful metadata.
- The full library remains reachable from the section heading action.

### Categories, values, and recent Skills

- Render all eight existing categories in a rule-based grid with counts and direct filtered-library links.
- Present platform values as a calm two-column statement and list rather than icon-heavy cards.
- Present recent Skills as compact editorial rows with meaningful dates and direct links.
- Remove the home contribution section.

## Internal Pages

### Skill library

- Retain query-string search, category/platform/license/tag filters, sorting, load-more behavior, active filter chips, grid/list switching, mobile filter dialog, empty state, and search focusing.
- Use a restrained page hero, persistent desktop filter rail, refined tool bar, and editorial Skill cards/rows.
- Do not alter filter semantics or shareable URLs.

### Categories

- Retain all eight current categories, counts, localized names, localized descriptions, and links to `/skills?category=...`.
- Use the same rule-based category grid as the home page with more generous page-level spacing.

### Skill detail

- Preserve breadcrumbs, structured data, localized copy, provenance, version, license, platforms, stars, downloads, download dialog, GitHub and official links, copy buttons, overview, features, use cases, installation, usage, workflow, changelog, FAQ, related Skills, and not-found handling.
- Recompose the hero as an editorial two-column identity and facts layout.
- Use a readable content column with a sticky in-page navigation on large screens.

### About

- Preserve the current company content and bilingual structure.
- Present the hero, mission, principles, usage, attribution, disclaimer, and contact as spacious editorial sections.
- Contact copy may invite broken-link reports and directory improvements, but must not invite public Skill submissions.

## Interaction and Accessibility

- Keep semantic headings, landmarks, labels, breadcrumbs, dialogs, keyboard focus management, escape behavior, and focus-visible outlines.
- Maintain usable touch targets and no horizontal overflow at 390px width.
- Use CSS-only transitions and existing dependencies; do not add a motion library.
- Hover movement should remain subtle, typically 1 to 2 pixels or a small arrow translation.
- Respect `prefers-reduced-motion: reduce`, including disabling smooth scrolling and video playback where practical.
- Maintain sufficient text contrast over video and on muted surfaces.

## Testing and Acceptance

- Unit/component tests verify the official logo assets, video attributes and source, preserved hero content, functional search, route navigation, and absence of submission links.
- Submission-specific tests and production modules are deleted.
- Sitemap tests or assertions verify `/submit` is absent.
- Playwright verifies home, library, category, detail, about, not-found, bilingual, search/filter, download dialog, copy action, mobile menu, reduced motion, and no horizontal overflow.
- `/submit` must return the normal 404 page.
- Run `npm test`, `npm run lint`, `npm run typecheck`, `npm run build`, and the applicable Playwright suite.
- Perform final visual inspection of `/`, `/skills`, `/categories`, `/skills/data-analysis-assistant`, and `/about` at desktop and mobile sizes.

## Non-goals

- No backend, authentication, database, Supabase, routing framework change, content-management system, new dependency, or public submission workflow.
- No rewrite of the Skill data model or query/filter engine.
- No changes to external project ownership or license disclaimers.
