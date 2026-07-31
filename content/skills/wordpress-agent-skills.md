---
schemaVersion: 1
status: published
slug: wordpress-agent-skills
name: WordPress Agent Skills
nameZh: WordPress 代理技能
category: development
tags: [WordPress, Blocks, Plugins]
platforms: [Claude Code, Codex]
author: WordPress
version: TODO
license: NOASSERTION
addedAt: '2026-07-31'
updatedAt: '2026-07-27'
githubUrl: 'https://github.com/WordPress/agent-skills'
officialUrl: ''
downloadUrl: 'https://github.com/WordPress/agent-skills/archive/refs/heads/trunk.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 1949
---
# Description

## zh

WordPress 官方级知识技能，覆盖区块、主题、插件和最佳实践。

## en

Expert WordPress skills covering blocks, themes, plugins, and best practices.

# Long Description

## zh

仓库以标准 SKILL.md 提供可安装工作流。先确认 WordPress、PHP 与插件版本；生产写入、更新和部署前备份并审查差异。

## en

The repository provides installable workflows through standard SKILL.md files. Confirm WordPress, PHP, and plugin versions; back up and review diffs before production writes, updates, or deployment.

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
npx skills add WordPress/agent-skills
```

# Usage

## zh

先在非生产环境选择匹配任务的技能，并限定输入与权限。先确认 WordPress、PHP 与插件版本；生产写入、更新和部署前备份并审查差异。

## en

Start in a non-production environment with task-matched skills and bounded inputs and permissions. Confirm WordPress, PHP, and plugin versions; back up and review diffs before production writes, updates, or deployment.

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

## TODO | 2026-07-27

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

不应。先确认 WordPress、PHP 与插件版本；生产写入、更新和部署前备份并审查差异。

### answer.en

No. Confirm WordPress, PHP, and plugin versions; back up and review diffs before production writes, updates, or deployment.
