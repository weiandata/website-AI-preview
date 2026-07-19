# Documentation

Durable project documentation that does not belong in the root README.
Documentation explains purpose and constraints before implementation details,
and is updated in the same change as the behavior it describes.

## For the administrator (Chinese)

Written for a non-programmer maintaining Skill content.

- [Skill 管理器使用说明](skill-manager-guide.md) covers the four launcher icons,
  both save buttons, publishing, import and export, and how to recover when a
  publish is refused.
- [Cloudflare 上线手册](cloudflare-deployment-guide.md) covers deployment
  settings and the failure modes worth recognising.

## For an agent preparing content

- [Skill 导入模板](skill-import-template.md) is the blank Skill file. Its
  parseability is guarded by `tests/lib/skill-import-template.test.ts`.
- [Agent 填写说明书](skill-agent-authoring-guide.md) states where each field
  comes from, what may never be guessed, and how to read an import failure.

## Project state

- [Handover notes](project-status.md) record what is published, what is still
  open, and the decisions that belong to the administrator.

## Design history

- [Platform design](superpowers/specs/2026-07-18-weian-data-skills-platform-design.md)
- [Skill manager design](superpowers/specs/2026-07-19-local-skill-repository-manager-design.md)
- [Skill manager exit design](superpowers/specs/2026-07-19-skill-manager-exit-design.md)

## Template baseline

- [Repository standard](repository-standard.md) summarizes the baseline this
  repository was generated from.
- [Repository Template Development Guide](Repository_Template_Development_Guide.md)
  is the specification used to develop that template.
- [Licensing profiles](../templates/licensing/README.md) provide the R package
  GPL and proprietary project files.
