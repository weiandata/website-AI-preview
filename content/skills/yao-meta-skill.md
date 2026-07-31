---
schemaVersion: 1
status: published
slug: yao-meta-skill
name: YAO Meta Skill
nameZh: YAO 元技能
category: development
tags: [Skill Engineering, Evaluation, Governance]
platforms: [Claude Code, Codex]
author: yaojingang
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-16'
githubUrl: 'https://github.com/yaojingang/yao-meta-skill'
officialUrl: 'https://github.com/yaojingang/yao-meta-skill#readme'
downloadUrl: 'https://github.com/yaojingang/yao-meta-skill/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 2150
---
# Description

## zh

用于构建、评估、治理和移植可复用 Agent Skills 的严谨元技能。

## en

A rigorous meta-skill for engineering, evaluating, governing, and porting reusable Agent Skills.

# Long Description

## zh

仓库以标准 SKILL.md 提供可安装工作流。评估结果只提供证据；发布技能前仍需人工检查安全、许可、可移植性和实际行为。

## en

The repository provides installable workflows through standard SKILL.md files. Evaluation provides evidence only; review security, licensing, portability, and actual behavior before publication.

# Features

## zh

- 提供面向具体任务的 Agent Skills
- 支持按需安装和调用

## en

- Provides task-specific Agent Skills
- Supports on-demand installation and use

# Use Cases

## zh

- 为代理扩展专业任务能力
- 建立可重复的工作流程

## en

- Extend an agent with specialist capabilities
- Establish a repeatable workflow

# Installation

```bash
npx skills add yaojingang/yao-meta-skill
```

# Usage

## zh

先在非生产环境选择匹配任务的技能，并限定输入与权限。评估结果只提供证据；发布技能前仍需人工检查安全、许可、可移植性和实际行为。

## en

Start in a non-production environment with task-matched skills and bounded inputs and permissions. Evaluation provides evidence only; review security, licensing, portability, and actual behavior before publication.

# Workflow

## zh

1. 选择任务对应的技能
2. 核对输入、权限和预期输出
3. 审阅结果后再应用或发布

## en

1. Select the skill for the task
2. Check inputs, permissions, and expected outputs
3. Review results before applying or publishing

# Changelog

## TODO | 2026-07-16

### zh

仓库没有版本化 Release；此处记录最近更新时间。

### en

The repository has no versioned release; this records its latest update.

# FAQ

## Question 1

### question.zh

可以不经审查直接应用技能输出吗？

### question.en

Can the skill output be applied without review?

### answer.zh

不应。评估结果只提供证据；发布技能前仍需人工检查安全、许可、可移植性和实际行为。

### answer.en

No. Evaluation provides evidence only; review security, licensing, portability, and actual behavior before publication.
