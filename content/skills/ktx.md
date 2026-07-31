---
schemaVersion: 1
status: published
slug: ktx
name: KTX
nameZh: KTX 数据上下文层
category: data-analytics
tags: [Analytics, Semantic Context, Databases]
platforms: [Claude Code, Codex]
author: Kaelio
version: v0.16.0
license: Apache-2.0
addedAt: '2026-07-31'
updatedAt: '2026-07-03'
githubUrl: 'https://github.com/Kaelio/ktx'
officialUrl: 'https://docs.kaelio.com/ktx'
downloadUrl: 'https://github.com/Kaelio/ktx/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: analysis
stars: 1520
---
# Description

## zh

为数据分析代理提供可执行的企业上下文层，以更准确地查询数据库。

## en

An executable company-context layer that helps analytics agents query databases accurately.

# Long Description

## zh

仓库以标准 SKILL.md 提供可安装工作流。默认只读并限制数据范围；查询生产数据前确认凭据、权限、PII 处理和成本。

## en

The repository provides installable workflows through standard SKILL.md files. Default to read-only and bound data scope; confirm credentials, permissions, PII handling, and cost before production queries.

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
npx skills add Kaelio/ktx
```

# Usage

## zh

先在非生产环境选择匹配任务的技能，并限定输入与权限。默认只读并限制数据范围；查询生产数据前确认凭据、权限、PII 处理和成本。

## en

Start in a non-production environment with task-matched skills and bounded inputs and permissions. Default to read-only and bound data scope; confirm credentials, permissions, PII handling, and cost before production queries.

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

## v0.16.0 | 2026-07-03

### zh

对应仓库发布的 v0.16.0 版本。

### en

Matches the repository's v0.16.0 release.

# FAQ

## Question 1

### question.zh

可以不经审查直接应用技能输出吗？

### question.en

Can the skill output be applied without review?

### answer.zh

不应。默认只读并限制数据范围；查询生产数据前确认凭据、权限、PII 处理和成本。

### answer.en

No. Default to read-only and bound data scope; confirm credentials, permissions, PII handling, and cost before production queries.
