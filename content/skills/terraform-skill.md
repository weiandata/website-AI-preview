---
schemaVersion: 1
status: published
slug: terraform-skill
name: Terraform Skill
nameZh: Terraform 基础设施技能
category: development
tags: [Terraform, OpenTofu, Infrastructure]
platforms: [Claude Code, Codex]
author: antonbabenko
version: 1.17.2
license: NOASSERTION
addedAt: '2026-07-31'
updatedAt: '2026-10-24'
githubUrl: 'https://github.com/antonbabenko/terraform-skill'
officialUrl: ''
downloadUrl: 'https://github.com/antonbabenko/terraform-skill/archive/refs/heads/master.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 2439
---
# Description

## zh

面向 Terraform 与 OpenTofu 的测试、模块、CI/CD 和生产模式技能。

## en

A Terraform and OpenTofu skill covering testing, modules, CI/CD, and production patterns.

# Long Description

## zh

仓库以标准 SKILL.md 提供可安装工作流。任何 plan、apply、destroy 或状态操作都要确认账号、工作区、目标资源和完整计划。

## en

The repository provides installable workflows through standard SKILL.md files. Confirm account, workspace, target resources, and the full plan before any plan, apply, destroy, or state operation.

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
npx skills add antonbabenko/terraform-skill
```

# Usage

## zh

先在非生产环境选择匹配任务的技能，并限定输入与权限。任何 plan、apply、destroy 或状态操作都要确认账号、工作区、目标资源和完整计划。

## en

Start in a non-production environment with task-matched skills and bounded inputs and permissions. Confirm account, workspace, target resources, and the full plan before any plan, apply, destroy, or state operation.

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

## 1.17.2 | 2026-10-24

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

可以不经审查直接应用技能输出吗？

### question.en

Can the skill output be applied without review?

### answer.zh

不应。任何 plan、apply、destroy 或状态操作都要确认账号、工作区、目标资源和完整计划。

### answer.en

No. Confirm account, workspace, target resources, and the full plan before any plan, apply, destroy, or state operation.
