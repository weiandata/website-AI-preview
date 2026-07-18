# WEIAN DATA Skills Platform

A polished bilingual website for discovering, evaluating, and sharing open-source AI Skills from WEIAN DATA（惟安数据科技）.

The platform includes a discovery homepage, shareable search and filters, statically generated Skill pages, category browsing, and company information. Chinese and English can be switched without leaving the current route, and the selection persists locally.

## Development

Requirements:

- Node.js 20 or newer
- npm

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Optional public deployment settings:

```bash
NEXT_PUBLIC_SITE_URL=https://skills.weiandata.com
NEXT_PUBLIC_CONTACT_EMAIL=contact@weiandata.com
```

The values must be a valid absolute HTTP(S) origin and email address. They drive canonical URLs, sitemap and structured-data links, and every contact action.

## Validation

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

Install Playwright Chromium once before the browser suite if it is not already available:

```bash
npx playwright install chromium
```

## Content

Each Skill is maintained as one Markdown file in `content/skills/`. The versioned format is documented by `content/skill-template.md`. Categories and interface translations live in `src/data/categories.ts` and `src/data/translations.ts`.

Each Skill record contains bilingual presentation copy, platform and license metadata, installation commands, usage notes, changelog entries, FAQ content, and source attribution. Search and filter state is encoded in the URL so result pages can be shared.

Draft Markdown records are excluded from public pages, search, static detail routes, and the sitemap.

## Cloudflare Pages

Connect Cloudflare Pages to the GitHub repository with these settings:

```text
Production branch: main
Build command: npm run build
Build output directory: out
Root directory: /
Node version: 20 or newer
```

GitHub is the only production deployment source. A push to `main` triggers a production build; non-production branches may create preview deployments. Cloudflare does not edit or store Skill source content, and this project has no production editor or content database.

## Main routes

- `/` discovery homepage
- `/skills` searchable Skill library
- `/skills/[slug]` static Skill detail pages
- `/about` company, project, attribution, and contact information

## Project documentation

- [Design specification](docs/superpowers/specs/2026-07-18-weian-data-skills-platform-design.md)
- [Implementation plan](docs/superpowers/plans/2026-07-18-weian-data-skills-platform.md)
- [Contributing guide](CONTRIBUTING.md)
- [Security policy](SECURITY.md)

## License

Copyright (c) 2026 WEIAN DATA TECH (Beijing) Co., Ltd. All rights reserved. See [PROPRIETARY.md](PROPRIETARY.md).
