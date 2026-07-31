---
schemaVersion: 1
status: published
slug: skills-janitor
name: Skills Janitor
nameZh: 技能清理管家
category: productivity
tags: [Skill Audit, Prompt Injection, Token Cost]
platforms: [Claude Code, Codex]
author: khendzel
version: 1.7.0
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-31'
githubUrl: 'https://github.com/khendzel/skills-janitor'
officialUrl: ''
downloadUrl: 'https://github.com/khendzel/skills-janitor/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: productivity
stars: 113
---
# Description

## zh

审计本地 Agent Skills 的工具型技能，检查价值、上下文成本和潜在提示注入风险。

## en

A skill-auditing collection that checks local Agent Skills for value, context cost, and potential prompt-injection risk.

# Long Description

## zh

仓库提供发现、报告、安全检查和修复等六个技能，且没有运行时依赖。安全扫描只能提供线索，删除或修改现有技能前仍要人工查看完整差异。

## en

The repository provides six skills for discovery, reporting, security checks, and fixes with no runtime dependencies. Scans provide signals only; inspect the full diff before deleting or modifying an existing skill.

# Features

## zh

- 检查提示注入与上下文浪费
- 报告技能价值和令牌成本

## en

- Checks prompt injection and context waste
- Reports skill value and token cost

# Use Cases

## zh

- 审计本地技能目录
- 找出重复或低价值技能

## en

- Audit a local skills directory
- Find duplicate or low-value skills

# Installation

```bash
npx skills add khendzel/skills-janitor
```

# Usage

## zh

先运行只读发现和报告，再检查安全发现。任何删除或重写操作都应显示明确目标和差异，并由用户确认。

## en

Run read-only discovery and reporting first, then inspect security findings. Deletion or rewriting must show exact targets and diffs for user approval.

# Workflow

## zh

1. 发现并评估本地技能
2. 审查安全与成本报告
3. 确认后再修复或移除

## en

1. Discover and assess local skills
2. Review security and cost reports
3. Fix or remove only after confirmation

# Changelog

## 1.7.0 | 2026-07-20

### zh

对应仓库发布的 1.7.0 版本。

### en

Matches the repository's 1.7.0 release.

# FAQ

## Question 1

### question.zh

扫描结果可以自动删除技能吗？

### question.en

Should scan results automatically delete skills?

### answer.zh

不应。扫描可能误报，必须检查内容、目标和完整差异后再决定。

### answer.en

No. Scans can be wrong, so inspect content, targets, and full diffs before deciding.
