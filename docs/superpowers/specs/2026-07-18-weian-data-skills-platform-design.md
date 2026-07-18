# WEIAN DATA Open-Source AI Skills Platform Design

**Date:** 2026-07-18  
**Status:** Approved  
**Product:** WEIAN DATA（惟安数据科技）open-source AI Skills directory

## Product Goal

Build a polished, responsive, bilingual content platform that helps people discover, understand, and download practical open-source AI Skills. The first release uses a typed local dataset, but its page and component boundaries must support a much larger library and a future move to a CMS, database, or GitHub-backed publishing workflow.

The product is a resource directory, not a generic SaaS marketing page. Every Skill has a dedicated route, clear attribution, compatibility metadata, installation and usage guidance, and safe links to its source and download location.

## Scope

The first release includes:

- A complete home page with discovery-oriented sections.
- A searchable and filterable Skill library with shareable URL state.
- Static Skill detail pages generated from structured data.
- Category, About, and Submit a Skill pages.
- Complete Simplified Chinese and English interface content.
- Persistent, route-preserving language switching.
- Client-side form validation and simulated success feedback for submissions.
- Confirmation before opening third-party download links.
- SEO metadata, structured data, sitemap, robots rules, canonical URLs, and language alternates.
- Responsive, accessible interaction states and reduced-motion behavior.

The first release does not include a production submission backend, user accounts, payments, comments, ratings, an admin console, or first-party file hosting. Submission data remains client-side and the UI explicitly describes the review process. Sample external links use clearly marked neutral demonstration URLs rather than implying ownership of real projects.

## Technical Approach

Use Next.js with the App Router, React, TypeScript, Tailwind CSS, Lucide icons, and small accessible custom components. Next.js is preferred over a client-only SPA because the library requires static Skill routes, page-specific metadata, structured data, sitemap generation, and strong crawlability.

The core content source is a typed TypeScript dataset. Pure selector utilities provide localized labels, search indexing, filtering, sorting, related-Skill ranking, and category counts. UI components consume those interfaces without depending on how data is stored, preserving a clean migration path to a CMS or API.

The project will use server components for static page composition and metadata where practical. Client components are limited to interactive behavior such as language state, navigation drawers, search, filters, dialogs, clipboard feedback, and form validation. Route-based splitting is provided by the App Router.

## Information Architecture

### `/`

The home page communicates the platform purpose immediately and includes:

1. Sticky global navigation.
2. Two-column hero with search and a layered Skill-library preview.
3. Six featured Skills.
4. Category explorer.
5. Four platform-value principles.
6. Recently added Skills.
7. Open-source contribution callout.
8. Global footer.

### `/skills`

The library presents all Skills and supports:

- Keyword search across names, localized descriptions, tags, categories, platforms, and use cases.
- Category, platform, license, and tag filters.
- Recommended, updated, added, name, and download-count sort modes.
- Active filter chips and a clear-all action.
- Grid and compact-list views.
- Result count, empty state, and progressive “load more” pagination.
- URL query parameters for all filter, sort, and search state.
- A mobile filter drawer and desktop filter controls.

### `/skills/[slug]`

Each static detail page includes:

- A metadata-rich header and primary external actions.
- Overview, features, use cases, installation, usage, workflow example, changelog, and FAQ.
- Copyable installation commands.
- Sticky metadata sidebar on desktop.
- Download safety confirmation.
- Related Skills ranked by category and overlapping tags.
- Breadcrumb navigation and JSON-LD using `CreativeWork` with software metadata.
- A bilingual not-found page for unknown slugs.

### `/categories`

A visual index of all categories shows bilingual names, descriptions, counts, and links to pre-filtered library views.

### `/submit`

An accessible form collects Skill name, source URL, introduction, category, platforms, license, submitter name, email, and notes. Validation errors are displayed inline and announced accessibly. Successful submission produces a local confirmation without claiming that data was sent to a server.

### `/about`

This page explains WEIAN DATA’s mission, selection principles, attribution approach, contact channel, and third-party-project disclaimer.

## Data Model

`LocalizedText` contains `zh` and `en` strings. A `Skill` record contains stable identifiers, localized descriptions and documentation sections, category and tag identifiers, platform compatibility, source attribution, version, license, dates, popularity placeholders, feature flags, icon key, and optional GitHub, official, and download URLs.

Categories and platforms use stable language-independent slugs. Display labels are resolved through translation dictionaries. UI components never use translated labels as filter keys or route parameters.

The initial dataset contains at least eight realistic neutral examples so grids, category counts, related content, filtering, and recent-content layouts can be evaluated across multiple states. No page or layout depends on the initial item count.

## Internationalization

Simplified Chinese is the default. On the first visit, the app may select English only when the browser explicitly prefers English and no stored choice exists; Chinese remains the fallback. The selected language is stored in `localStorage`.

The language provider exposes the active locale and a translation helper. Switching language:

- Updates all navigation, page copy, filters, metadata labels, forms, states, and Skill content.
- Preserves the current pathname and query parameters.
- Updates the root `lang` attribute.
- Uses a short opacity transition that is disabled under reduced motion.

Static server metadata uses Chinese as the canonical default and publishes English alternates. Client-side title updates keep the visible browser title aligned with a language switch without changing the route.

## Visual Direction

**Design read:** a technical open-source resource directory for AI practitioners, combining GitHub-like credibility with Linear-like clarity and a restrained premium finish.

Design dials:

- `DESIGN_VARIANCE: 6` — structured grids with limited asymmetry in the hero and category composition.
- `MOTION_INTENSITY: 4` — purposeful entry, hover, drawer, dialog, and feedback transitions.
- `VISUAL_DENSITY: 5` — information-rich cards that remain easy to scan.

The interface uses a deep navy-black background, off-white primary text, blue-gray secondary text, data-blue primary actions, and teal accents used only for status and emphasis. General Sans is used for headings and Geist Sans for body copy, with Chinese system fallbacks.

The hero avoids the common centered “AI gradient” template. Its left column carries the editorial message and discovery controls, while the right column resembles a live catalog stack with readable, minimally tilted Skill cards. The background uses CSS-only grid lines, a few slow data nodes, and restrained radial light fields. No stock video, aggressive particle system, neon glow, or decorative 3D object is used.

Skill cards prioritize metadata hierarchy: identity and trust first, concise purpose second, compatibility and tags third, provenance and actions last. Liquid glass is limited to badges, icon wells, and selected controls. Primary content cards use solid translucent surfaces with visible borders.

## Component Boundaries

- `LanguageProvider` owns locale persistence and document-language updates.
- `SiteHeader`, `MobileNav`, and `SiteFooter` own global navigation.
- `HeroSearch` owns suggestion behavior and navigation into `/skills`.
- `SkillCard` and `SkillListRow` render the same typed Skill in two layouts.
- `SkillFilters` maps URL query state to controls without owning data selection.
- Pure library selectors perform search, filtering, sorting, counts, and related-Skill ranking.
- `DownloadDialog` is the only component that opens external download destinations.
- `CopyButton` owns clipboard feedback and fallback behavior.
- `SubmitSkillForm` owns validation, field state, and the simulated success state.
- Shared `Button`, `Badge`, `Dialog`, `Select`, and form primitives provide consistent focus and disabled states.

These units communicate through explicit props and stable data types. No page component owns duplicate filter or localization logic.

## Interaction Design

- Search suggestions open on focus or input, support arrow keys, Enter, Escape, and highlighted matching text.
- Pressing `/` focuses the primary search control when the user is not typing in another field.
- Cards rise by no more than four pixels and reveal directional feedback in under 200 milliseconds.
- Mobile navigation and filters use accessible modal drawers with focus containment and Escape handling.
- Download actions show the destination host and project-source warning before opening a new tab with `noopener,noreferrer`.
- Installation blocks provide explicit copy buttons and visible copied/error feedback.
- Toast-like feedback uses an `aria-live` region and never carries essential information alone.
- A scroll-to-top control appears only after meaningful scrolling.

## Error and Empty States

The interface provides bilingual states for no results, unknown Skill slugs, invalid forms, failed clipboard access, missing external links, and offline status. The library’s no-results state keeps active filters visible and offers a clear-all action. External actions are disabled when a sample record has no valid destination.

## Accessibility

The implementation targets WCAG 2.2 AA fundamentals:

- Semantic landmarks and heading order.
- Full keyboard access and visible focus indicators.
- Accessible names for icon controls.
- Labeled form fields with programmatic error associations.
- Dialog focus management and return focus.
- Sufficient contrast for text and controls.
- Minimum practical touch targets on mobile.
- Motion reduction through `prefers-reduced-motion`.
- Status announcements through restrained live regions.
- Natural wrapping and line-height for both Chinese and English.

## SEO and Performance

Every route provides a unique title and description. Skill pages generate canonical URLs, language alternates, Open Graph data, Twitter card data, breadcrumb JSON-LD, and CreativeWork JSON-LD. The app supplies `sitemap.xml` and `robots.txt` through Next.js metadata routes.

Pages render primarily as static HTML. There is no hero video and no large raster artwork required for first paint. CSS animation is limited to compositor-friendly properties. Fonts use `display: swap`, and the body retains high-quality system fallbacks. Images, if added, use Next.js optimization and descriptive alternative text.

## Testing and Verification

Automated tests cover:

- Locale selection, persistence, and full-interface label switching.
- Search matching across bilingual fields.
- Filter and sort selectors.
- URL query parsing and serialization.
- Related-Skill ranking.
- Submit-form validation and success behavior.
- Download-dialog confirmation and safe external opening.
- Copy feedback and missing-link states.

The final acceptance pass includes the full automated test suite, linting, TypeScript validation, a production build, and browser inspection at desktop and mobile widths. Browser inspection verifies all routes, both languages, keyboard navigation, dialogs, filters, search, form states, overflow, and reduced-motion behavior.

## Acceptance Criteria

The release is acceptable when:

1. All six required routes render and remain directly addressable.
2. Every visible interface area switches between Chinese and English without losing route or filters.
3. The library search, filters, sorting, active chips, views, and load-more behavior work on desktop and mobile.
4. Every sample Skill has a dedicated detail route with installation, usage, provenance, and related content.
5. Third-party download actions require confirmation and open safely.
6. The submit form provides accessible validation and honest client-only success messaging.
7. Metadata routes, static Skill generation, structured data, and page metadata build successfully.
8. There is no horizontal overflow at common mobile widths and all primary actions remain keyboard accessible.
9. Automated tests, lint, type checking, and production build pass.
10. The final visual result reads as a maintained open-source library rather than a generic SaaS template.
