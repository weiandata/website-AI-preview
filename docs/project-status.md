# Handover notes

State that is not derivable from the code or the commit history. Accurate as of
2026-07-19; treat anything here as a claim to re-check rather than a fact.

## What is published

31 Skills across the eight categories: 10 in `development`, 3 in each of the
other seven. Every entry's metadata — stars, licence, release tag, default
branch — was read from the GitHub API at authoring time, and every URL was
confirmed to resolve.

Stars go stale. They are a snapshot, not a live figure, and nothing refreshes
them.

## Open decisions that belong to the administrator

**Featured placement is unset for most categories.** An agent may never set
`featured`, `featuredRank`, `verified`, or `status: published` on its own —
those are editorial calls. Only a few `development` entries are currently
featured, so the homepage featured strip does not represent the catalogue.
Setting them is done in the manager.

**Two categories are thin on merit, not on effort.** `files-pdf` and
`data-analytics` have no popular single-purpose Skills in the ecosystem: the
document and analysis entries top out in the low hundreds of stars, while other
categories reach tens of thousands. `docx-cli` (144 stars) was included because
its author publishes controlled comparison results, which is better evidence
than a star count. If the low numbers are unacceptable, those six entries are
the ones to revisit.

## Fields that need a human eye

Ten Skills carry `version: TODO` because their repositories publish no release,
tag, or manifest version. That is deliberate — the authoring rules forbid
inventing one — but it renders as "TODO" on the detail page, so replace it if a
version ever appears upstream.

Five entries carry licences that restrict reuse, each explained in the Skill's
own FAQ rather than only in frontmatter:

| Skill | Licence | Constraint |
| --- | --- | --- |
| `anthropic-agent-skills` | Unlicensed | No repository-wide LICENSE file |
| `dashi-ppt-skill` | AGPL-3.0 | Network use triggers source disclosure |
| `guizang-social-card-skill` | AGPL-3.0 | Same |
| `storybloq` | PolyForm-Shield-1.0.0 | Not open source; restricts competing use |
| `context-mode` | Elastic-2.0 | Not open source; no hosted-service resale |

## Traps worth knowing before changing things

**The frontmatter schema is strict.** Adding or removing a field means updating
the schema, all content files, the fixtures, and the template together. A Skill
manager left running on the previous schema cannot read content until it is
restarted, and its error says a number is missing rather than that the schema
changed.

**Tests read fixtures, not content.** See the README's validation section. If a
discovery test starts failing after a content edit, the fixture convention was
probably bypassed.

**Verify UI work in a browser.** Several defects in this project's history were
invisible to the test suite because jsdom does not lay out: a list marker
suppressed by `display: grid`, a modal footer pushed past `max-height`, a
heading row collapsed by a flex parent. Tests asserting text presence passed
throughout.

**Verify launcher work with `env -i`.** A GUI launch gets a bare `PATH`.
Running `osascript` from a shell inherits that shell's environment and will not
reproduce what a double-click does.

## Not done

Nothing is known to be broken. The catalogue could grow, and the featured
selection is the main gap between the current site and a finished one.
