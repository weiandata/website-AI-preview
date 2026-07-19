# Changelog

All notable changes to this repository are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add an exit control to the Skill manager that stops the local service after
  listing unsaved edits, unpublished Skills, and an unpushed commit.
- Repair Markdown style when a Skill is saved, using the same tool and
  configuration the repository checks run.
- Check every link in a Skill before publishing it. A dead link blocks the
  publish and names itself; an unconfirmed one only warns.
- Add profile-specific GPL R-package and proprietary-project licensing assets.
- Apply the canonical proprietary notice to the template repository itself.

### Changed

- Derive the manager's publishable set from `git status` instead of only what
  the running process wrote, so a Skill saved before a restart stays
  publishable.
- Replace the generic license placeholder with deterministic company profile
  selection guidance.

### Fixed

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
