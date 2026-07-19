# Changelog

All notable changes to this repository are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Publish 31 Skills across the eight categories, each verified against the
  GitHub API at authoring time rather than from recall.
- Add a homepage getting-started section covering how to install a downloaded
  Skill and how to get better results from it.
- Replace the two `.command` launchers with four AppleScript apps: open/stop
  for the Skill manager, and open/stop for a local site preview. Opening is
  idempotent, so closing the browser tab no longer strands the service.
- Report every problem in a rejected Skill file at once, each with its location
  and a Chinese instruction naming the fix, plus a control to copy the report.
- Add an exit control to the Skill manager that stops the local service after
  listing unsaved edits, unpublished Skills, and an unpushed commit.
- Repair Markdown style when a Skill is saved, using the same tool and
  configuration the repository checks run.
- Check every link in a Skill before publishing it. A dead link blocks the
  publish and names itself; an unconfirmed one only warns.
- Add profile-specific GPL R-package and proprietary-project licensing assets.
- Apply the canonical proprietary notice to the template repository itself.

### Changed

- Lead the homepage with what a Skill does for the reader rather than with the
  words "open-source AI Skills", and invite plain-language search instead of
  naming metadata fields.
- Remove the `downloads` field. The catalogue has no download telemetry, so it
  read zero on every entry and drove a sort option that ordered identical
  zeroes; the library now sorts by `stars`, which is real.
- Show the author instead of a download count on Skill detail pages.
- Load discovery, sitemap, and shell tests from `tests/fixtures/skills/` so
  retiring a Skill no longer breaks tests that are about selectors.
- Retire the seeded placeholder Skills, which carried invented authors and
  `githubUrl` values pointing at GitHub topic pages.
- Derive the manager's publishable set from `git status` instead of only what
  the running process wrote, so a Skill saved before a restart stays
  publishable.
- Replace the generic license placeholder with deterministic company profile
  selection guidance.

### Fixed

- Let visitors leave the featured filter they arrive in from the homepage. It
  narrowed the library to six entries while rendering no chip and hiding the
  clear-all control, leaving no way back to the full catalogue.
- Keep modal footers reachable. Every dialog is a grid whose body row kept its
  auto minimum, pushing the confirm button past `max-height` where `overflow`
  hid it — unreachable on a long publish list.
- Stop the launcher from killing unrelated processes. Matching command lines
  with `pkill -f` also matched any process that merely mentioned the path.
- Find Node when a launcher is started by double-click, where `PATH` excludes
  Homebrew and every version manager.
- Keep a failed notification from being reported as a failed action; the
  `osascript` exit code propagated out and surfaced a spurious error dialog.
- Keep publishing reachable when the edit queue is empty. A Skill saved earlier
  had no route to GitHub, and the publish button appeared to do nothing.
- Surround lists in the generated plan documents with blank lines, which had
  failed the Markdown style check on every push.
- Skip loopback addresses in the CI link check and replace the Skill template's
  placeholder GitHub URLs with reserved `example.com` addresses, both of which
  the link check rejected.

## [1.0.0] - 2026-07-10

### Added

- Establish the language-independent WeianData repository template.
- Add governance, contribution, security, ownership, and versioning documents.
- Add issue and pull request templates.
- Add Markdown and link validation workflow.
- Add documentation, examples, and scripts guidance.
