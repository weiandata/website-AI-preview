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

The `Repository checks` workflow validates every tracked Markdown file's style and links on each push. Both halves run locally too:

```bash
npx markdownlint-cli2 "**/*.md"
```

Link checking uses lychee in CI, configured to skip loopback addresses; `example.com` is reserved for documentation and is never resolved. This workflow is independent of the site build — a red check there does not mean the deployed site is broken.

Discovery, sitemap, and shell tests load `tests/fixtures/skills/` rather than `content/skills/`. Editors add and retire real Skills routinely, and a filter test that breaks because a Skill was removed is testing the catalogue, not the selector — which is exactly what happened when the seeded placeholders were retired. Assertions that would otherwise hard-code editorial facts (how many Skills are featured, which detail URL exists) assert structure instead. Only `tests/lib/skill-import-template.test.ts` reads real project files, deliberately, to keep the agent-facing template parseable.

CI runs Markdown style and link checks only; the test suite, typecheck, and build are not gated there, so run them locally before pushing.

## Content

Each Skill is maintained as one Markdown file in `content/skills/`. The versioned format is documented by `content/skill-template.md`. Categories and interface translations live in `src/data/categories.ts` and `src/data/translations.ts`.

Each Skill record contains bilingual presentation copy, platform and license metadata, installation commands, usage notes, changelog entries, FAQ content, and source attribution. Search and filter state is encoded in the URL so result pages can be shared.

Draft Markdown records are excluded from public pages, search, static detail routes, and the sitemap.

The frontmatter schema is `.strict()`, so an unrecognised key fails the parse rather than being ignored. Removing a field therefore means updating the schema, every content file, the fixtures, and the template in the same change — and a Skill manager left running on the old schema can no longer read content until it is restarted.

There is no download counter. The catalogue indexes third-party repositories and has no download telemetry, so the field read zero everywhere and was removed; `stars` comes from the GitHub API and is what the library sorts and tie-breaks on.

## Local Skill manager

Skill content is maintained through a local, administrator-facing manager rather than by editing Markdown by hand. It binds to `127.0.0.1` only, is never part of the deployed site, and has no `/admin` route, account system, or production editor.

Start it by double-clicking `打开 Skill 管理器.app`, or from a terminal:

```bash
npm run skill-manager   # http://127.0.0.1:4174
```

Four AppleScript launchers sit in the project root: open/stop for the manager, and open/stop for a local site preview on port 3000. They exist because double-clicking a `.command` always spawns a Terminal window that means nothing to a non-programmer, and because running the server in the foreground made re-launching start a second instance instead of reopening the interface. All four are thin shells over `tools/skill-manager/launcher.sh`, which holds the logic so it stays testable; regenerate them with `./scripts/build-launchers.sh`.

Opening is idempotent: it starts the service only when the port is free, and otherwise just reopens the browser, so closing the tab is recoverable. Stopping walks the recorded process tree rather than matching command lines — `pkill -f` also matches unrelated processes that merely mention the path. The preview additionally requires its recorded PID to be alive before claiming port 3000 is its own, since that port is common enough that another project's dev server would otherwise be adopted and killed.

A GUI launch inherits `PATH=/usr/bin:/bin:/usr/sbin:/sbin`, which contains neither Homebrew nor any Node version manager, so the launcher widens `PATH` before probing for Node. Verifying this needs `env -i`; running `osascript` from a shell inherits that shell's environment and hides the failure.

The manager offers two distinct actions:

- **仅保存** writes the changed `content/skills/*.md` files atomically and touches nothing else. No network, no Git.
- **保存并发布** saves, then commits and pushes those same files to `main`.

Publication is deliberately narrow. Only paths matching `content/skills/<slug>.md` may be staged, each with an explicit `git add -- <path>`. There is no `git add .`, no force push, and no reset. The publishable set is derived from `git status` at startup, so a Skill saved before a restart stays publishable instead of being stranded. Publishing requires `main`, a GitHub origin, a remote that is not ahead, and a conflict-free tree; otherwise the manager refuses and explains why. A failed push keeps the local commit and offers a retry. Because the manager does not poll Cloudflare, it reports that GitHub accepted the commit — never that a deploy finished.

Two preflight checks keep published content from failing the repository checks after the fact. Saving repairs Markdown style with the same `markdownlint-cli2` binary and `.markdownlint-cli2.yaml` config CI uses, so the two cannot drift. Publishing resolves every link in the files being published, including frontmatter URLs: a dead one blocks the publish and names itself, while one the network merely could not confirm only warns.

**退出** stops the local service from the interface, after listing what is unfinished — unsaved edits, Skills saved but never published, and a commit that never reached GitHub. It informs rather than forbids, since nothing is lost from disk.

Deletions move files into `.skill-manager-trash/` and stay recoverable. Import accepts multiple `.md` files at once, classifies them as new/conflicting/invalid, and requires an explicit opt-in before replacing an existing slug; export produces a single file or a zip of every Skill plus the template.

Field behavior: `status: draft` keeps a Skill out of every public page, the search corpus, structured data, static routes, and the sitemap. `slug` determines `/skills/<slug>/`, so changing it on a published Skill retires the old URL and requires a second confirmation. `featured` plus ascending `featuredRank` control the homepage order. `verified` renders the verification badge.

**[完整的中文管理员操作说明](docs/skill-manager-guide.md)** covers startup and exit, both save buttons, import/export, publication states, and recovery from remote-ahead, push failure, dead links, invalid Markdown, and failed Cloudflare builds.

## Cloudflare Pages

Connect Cloudflare Pages to the GitHub repository with these settings. A step-by-step Chinese walkthrough, including the failure modes worth knowing about, is in [docs/cloudflare-deployment-guide.md](docs/cloudflare-deployment-guide.md).

```text
Production branch: main
Build command: npm run build
Build output directory: out
Root directory: /
Node version: 20 or newer
```

The build output directory must be `out`. Pointing it at the repository root would serve `tools/skill-manager/` — the local manager's source — as part of the site. Nothing else in the deployment is security-sensitive; the manager is a separate local process bound to `127.0.0.1` and never enters the build.

GitHub is the only production deployment source. A push to `main` triggers a production build; non-production branches may create preview deployments. Cloudflare does not edit or store Skill source content, and this project has no production editor or content database.

To roll back, revert the offending content commit on `main` and push; Cloudflare rebuilds from the restored tree. Every publication from the manager is a separate commit touching only `content/skills/*.md`, so a rollback never disturbs application code.

## Main routes

- `/` discovery homepage
- `/skills` searchable Skill library
- `/skills/[slug]` static Skill detail pages
- `/about` company, project, attribution, and contact information

## Project documentation

- [Design specification](docs/superpowers/specs/2026-07-18-weian-data-skills-platform-design.md)
- [Implementation plan](docs/superpowers/plans/2026-07-18-weian-data-skills-platform.md)
- [Skill manager design](docs/superpowers/specs/2026-07-19-local-skill-repository-manager-design.md)
- [Skill manager exit design](docs/superpowers/specs/2026-07-19-skill-manager-exit-design.md)
- [Handover notes](docs/project-status.md) — published state, open editorial
  decisions, and the traps that cost time in this project
- [Cloudflare 上线手册（中文）](docs/cloudflare-deployment-guide.md)
- [Skill 管理器使用说明（中文）](docs/skill-manager-guide.md)
- [Skill 导入模板](docs/skill-import-template.md) and the [agent 填写说明书（中文）](docs/skill-agent-authoring-guide.md)
- [Contributing guide](CONTRIBUTING.md)
- [Security policy](SECURITY.md)

## License

Copyright (c) 2026 WEIAN DATA TECH (Beijing) Co., Ltd. All rights reserved. See [PROPRIETARY.md](PROPRIETARY.md).
