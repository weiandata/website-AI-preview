---
schemaVersion: 1
status: published
slug: jeecgboot-skills
name: JeecgBoot Skills
nameZh: JeecgBoot 低代码技能
category: development
tags: [JeecgBoot, Low Code, JimuReport]
platforms: [Claude Code, Codex]
author: jeecgboot
version: v1.0.0
license: Apache-2.0
addedAt: '2026-07-31'
updatedAt: '2026-05-17'
githubUrl: 'https://github.com/jeecgboot/skills'
officialUrl: 'https://jeecg.com'
downloadUrl: 'https://github.com/jeecgboot/skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 206
---
# Description

## zh

为 JeecgBoot 与 JimuReport 生成代码、表单、流程、报表和大屏的技能。

## en

Skills for generating code, forms, workflows, reports, charts, and dashboards for JeecgBoot and JimuReport.

# Long Description

## zh

仓库以标准 SKILL.md 提供可安装工作流。生成工件需核对平台版本、权限、数据库结构和业务规则；部署前完整测试。

## en

The repository provides installable workflows through standard SKILL.md files. Verify platform version, permissions, database schema, and business rules for generated artifacts; test fully before deployment.

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
npx skills add jeecgboot/skills
```

# Usage

## zh

先在非生产环境选择匹配任务的技能，并限定输入与权限。生成工件需核对平台版本、权限、数据库结构和业务规则；部署前完整测试。

## en

Start in a non-production environment with task-matched skills and bounded inputs and permissions. Verify platform version, permissions, database schema, and business rules for generated artifacts; test fully before deployment.

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

## v1.0.0 | 2026-05-17

### zh

对应仓库发布的 v1.0.0 版本。

### en

Matches the repository's v1.0.0 release.

# FAQ

## Question 1

### question.zh

可以不经审查直接应用技能输出吗？

### question.en

Can the skill output be applied without review?

### answer.zh

不应。生成工件需核对平台版本、权限、数据库结构和业务规则；部署前完整测试。

### answer.en

No. Verify platform version, permissions, database schema, and business rules for generated artifacts; test fully before deployment.
