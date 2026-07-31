---
schemaVersion: 1
status: published
slug: dotnet-skills
name: Dotnet Skills
nameZh:  .NET 开发技能
category: development
tags: [.NET, C Sharp, Subagents]
platforms: [Claude Code]
author: Aaronontheweb
version: v1.4.1
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-03'
githubUrl: 'https://github.com/Aaronontheweb/dotnet-skills'
officialUrl: ''
downloadUrl: 'https://github.com/Aaronontheweb/dotnet-skills/archive/refs/heads/master.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 1090
---
# Description

## zh

面向 .NET 开发者的 Claude Code 技能与子代理合集。

## en

Claude Code skills and subagents for .NET developers.

# Long Description

## zh

仓库以标准 SKILL.md 提供可安装工作流。先核对 SDK、目标框架和包版本；代码与迁移修改必须通过项目构建和测试。

## en

The repository provides installable workflows through standard SKILL.md files. Confirm SDK, target framework, and package versions; code and migration changes must pass project build and tests.

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
npx skills add Aaronontheweb/dotnet-skills
```

# Usage

## zh

先在非生产环境选择匹配任务的技能，并限定输入与权限。先核对 SDK、目标框架和包版本；代码与迁移修改必须通过项目构建和测试。

## en

Start in a non-production environment with task-matched skills and bounded inputs and permissions. Confirm SDK, target framework, and package versions; code and migration changes must pass project build and tests.

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

## v1.4.1 | 2026-07-03

### zh

对应仓库发布的 v1.4.1 版本。

### en

Matches the repository's v1.4.1 release.

# FAQ

## Question 1

### question.zh

可以不经审查直接应用技能输出吗？

### question.en

Can the skill output be applied without review?

### answer.zh

不应。先核对 SDK、目标框架和包版本；代码与迁移修改必须通过项目构建和测试。

### answer.en

No. Confirm SDK, target framework, and package versions; code and migration changes must pass project build and tests.
