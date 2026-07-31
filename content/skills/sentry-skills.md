---
schemaVersion: 1
status: published
slug: sentry-skills
name: Sentry Team Skills
nameZh: Sentry 团队开发技能
category: development
tags: [Sentry, Engineering, Debugging]
platforms: [Claude Code, Codex]
author: getsentry
version: TODO
license: Apache-2.0
addedAt: '2026-07-31'
updatedAt: '2026-07-27'
githubUrl: 'https://github.com/getsentry/skills'
officialUrl: ''
downloadUrl: 'https://github.com/getsentry/skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 896
---
# Description

## zh

Sentry 团队用于软件开发与调试的 Agent Skills。

## en

Agent Skills used by the Sentry team for software development and debugging.

# Long Description

## zh

仓库以标准 SKILL.md 提供可安装工作流。团队内部模式需适配当前仓库；访问事件、日志或用户数据时遵守最小权限与隐私要求。

## en

The repository provides installable workflows through standard SKILL.md files. Adapt team-internal patterns to the current repository; use least privilege and privacy controls for events, logs, or user data.

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
npx skills add getsentry/skills
```

# Usage

## zh

先在非生产环境选择匹配任务的技能，并限定输入与权限。团队内部模式需适配当前仓库；访问事件、日志或用户数据时遵守最小权限与隐私要求。

## en

Start in a non-production environment with task-matched skills and bounded inputs and permissions. Adapt team-internal patterns to the current repository; use least privilege and privacy controls for events, logs, or user data.

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

不应。团队内部模式需适配当前仓库；访问事件、日志或用户数据时遵守最小权限与隐私要求。

### answer.en

No. Adapt team-internal patterns to the current repository; use least privilege and privacy controls for events, logs, or user data.
