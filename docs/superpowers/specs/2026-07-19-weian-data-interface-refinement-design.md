# WEIAN DATA Website Interface Refinement Design

## Status

Approved in conversation on 2026-07-19. This specification translates the user's 15 review items into one coordinated refinement pass.

## Objective

Preserve the approved video hero, bilingual content, light editorial identity, and overall page order while removing redundant navigation, correcting misleading links, improving card hierarchy, and rebuilding the About page with consistent alignment and typography.

## Design Direction

- Mode: redesign preserve.
- Aesthetic: light editorial directory for technical and research users.
- Design variance: 6. Use controlled asymmetry and varied featured blocks without disturbing the existing hero.
- Motion intensity: 3. Use hover feedback and native smooth anchor scrolling only.
- Visual density: 3. Increase whitespace and reduce competing actions.
- Theme: light only. No dark sections, black buttons, or inverted content blocks.
- Brand: preserve the approved WEIAN DATA logos, neutral palette, cool blue accent, and existing Geist typography.
- Dependencies: use the existing Next.js, React, TypeScript, CSS, and Lucide stack. Add no libraries.

## Information Architecture

### Primary navigation

The desktop and mobile primary navigation contains Home, Skills, and About. The separate Categories navigation item is removed. The Skills desktop dropdown remains the direct access point for all eight category filters.

The `/categories` route is removed rather than left as an unlinked duplicate. Category browsing remains available through the Skills dropdown and the home workflow section.

### Header actions

On the home page:

- Hide the GitHub action.
- The search action links to `/#home-search` and scrolls to the home search section.

On internal pages:

- The GitHub action may remain as the existing external resource.
- The search action continues to open the Skills library with search focus.

The home search section receives the stable `home-search` anchor. Anchor scrolling respects reduced-motion preferences.

## Home Page

### Search

Popular-search terms use explicit light surfaces, visible text, borders, hover states, and keyboard focus states. Their labels remain readable before hover. Existing search submission behavior remains unchanged.

### Featured Skills

Keep three featured Skills and the existing direct links to their detail pages. Replace the monotonous large blocks with a restrained set of low-saturation cool surfaces such as mist blue, pale cyan, silver blue, and warm white. Use differences in tint, proportion, and subtle pattern or border treatment. Do not introduce dark blocks, saturated gradients, or decorative animation.

### Workflow categories

Keep all eight category cards and their direct filtered-library links. Separate the Skill count and arrow into distinct layout areas so they never overlap at desktop or mobile widths. Remove the redundant "All categories" link because the standalone Categories page no longer exists.

### Platform values

Remove the complete "Why use this platform" section and its component usage. Remove translation keys and CSS that become unused.

### Recent Skills

Use a shared section-heading baseline so the title, description, and action align consistently. The home preview still shows the four newest entries.

"View all updates" links to `/skills?period=30d&sort=added`. `period=30d` filters the catalog to entries added during the latest 30-day catalog window, then `sort=added` orders newest first. The calculation is deterministic relative to the newest `addedAt` value in the local catalog so static builds and tests do not change with the machine clock.

### Footer

Remove the Categories link and the generic Featured Skills link. Replace the latter with direct links to named featured Skill detail pages. Keep Recent as a link to the 30-day filtered result. Footer link labels must accurately describe their destinations.

## Skills Library

### Card interaction

Grid cards and list rows become one primary navigation target: clicking anywhere on the card or row opens its Skill detail page. Remove the "View details" action and remove card-level download controls. Download remains available on the detail page, which avoids nested interactive elements and competing card actions.

Cards use more internal spacing, a calmer description line length, and clearer separation between category, title, summary, platform labels, and metadata. Descriptions are clamped consistently so cards remain balanced without hiding all useful detail.

Keyboard users can focus the complete card and receive a visible focus state. Hover feedback is a subtle border, surface, or translation change, not a dark fill.

### Filtering and sorting

Add `period=30d` to the existing query parser and filter pipeline. Preserve all current search, category, platform, featured, and sort behaviors.

The sort control and its options use a white or light-neutral surface with dark text in default, hover, focus, and open states. Do not rely on inherited browser dark color schemes.

## Skill Detail Page

Remove the separate official website or "Visit project site" action. When `githubUrl` exists, the GitHub action is the project-page action. Download remains the primary action.

Keep the right-side section navigation, but align each link with the exact content IDs. Apply consistent scroll offset through `scroll-margin-top` to `overview`, `features`, `installation`, and `usage`, accounting for the sticky site header and detail navigation. Verify direct hash loading and click-based navigation on desktop and mobile.

## About Page

Rebuild the complete page layout while preserving the existing factual content and bilingual behavior.

- Use one consistent content container and left alignment.
- Use a vertical hero composition with one H1 scale and a constrained introductory paragraph.
- Present the mission as a clear editorial statement, not an oversized disconnected block.
- Present the four selection principles in a balanced two-column light grid on desktop and one column on mobile.
- Present usage guidance as a concise sequence with verbs as headings, avoiding generic numbered stage labels.
- Group open-source, attribution, privacy, and contact information into clearly named light sections with consistent H2 sizing.
- Remove inconsistent floating icons, mixed heading scales, and split headers that do not share a baseline.

All content stays in the existing light theme. No dark panels are introduced.

## Responsive and Accessibility Requirements

- At widths below 768 px, asymmetric layouts collapse to one column with full-width controls and cards.
- Header search, card links, filters, sort controls, and detail anchors remain keyboard accessible.
- Visible focus indicators meet contrast requirements.
- Popular-search labels and sort text meet WCAG AA contrast in their resting state.
- Card-level links have meaningful accessible names in both languages.
- Smooth scrolling is disabled when `prefers-reduced-motion: reduce` is active.
- No content or action overlap is permitted at 390 px, 768 px, 1024 px, or 1440 px widths.

## Testing Strategy

### Unit and component tests

- Header home state hides GitHub and targets `#home-search`.
- Header internal state retains the internal search behavior.
- Primary navigation no longer renders Categories.
- Recent links include `period=30d&sort=added`.
- Query filtering includes only the latest 30-day catalog window.
- Skill cards and rows expose one detail link and no "View details" or download action.
- Skill detail renders GitHub but not the official website action.
- Removed sections and routes are absent.

### End-to-end tests

- Home search action lands on the home search section.
- Popular searches and sort controls are readable before hover.
- Category count and arrow do not overlap at target widths.
- Entire Skill cards open the correct detail page.
- The recent link produces the 30-day filtered library.
- Detail navigation lands each heading below sticky UI.
- `/categories` returns the normal not-found response.
- Desktop and mobile About layouts have consistent alignment.

### Visual verification

Capture and compare the home page, Skills grid, Skills list, one detail page, and About page at desktop and 390 px mobile widths in both Chinese and English where copy length materially changes layout.

## Out of Scope

- Changing the approved video hero media, hero copy, or WEIAN DATA logos.
- Adding submission functionality, authentication, a database, or new external integrations.
- Rewriting Skill data or changing download-dialog behavior on detail pages.
- Adding new runtime dependencies or a dark theme.
