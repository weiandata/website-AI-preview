---
schemaVersion: 1
status: published
slug: cc-sdd
name: CC SDD
nameZh: CC 规格驱动开发
category: development
tags: [Spec Driven Development, Autonomous Coding, Workflow]
platforms: [Claude Code, Codex, Cursor, Copilot]
author: gotalab
version: 3.0.2
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-04-13'
githubUrl: 'https://github.com/gotalab/cc-sdd'
officialUrl: ''
downloadUrl: 'https://github.com/gotalab/cc-sdd/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 3596
---
# Description

## zh

把已批准规格转化为长时间自主实现的轻量规格驱动开发技能框架。

## en

A lightweight specification-driven development harness that turns approved specs into long-running autonomous implementation.

# Long Description

## zh

仓库为多种编码代理提供从规格、任务拆分到实现验证的可适配技能流程。 自主运行不扩大授权范围；限制文件和外部系统范围，并在每个检查点审阅差异、测试与未解决风险。

## en

The repository provides adaptable skills across coding agents, from specifications and task breakdown through implementation verification. Autonomy does not broaden authorization; constrain files and external systems, and review diffs, tests, and open risks at each checkpoint.

# Features

## zh

- 连接批准规格与实现
- 适配多种编码代理

## en

- Connects approved specs to implementation
- Adapts across multiple coding agents

# Use Cases

## zh

- 执行明确的软件规格
- 管理长时间编码任务

## en

- Execute a clear software specification
- Manage long-running coding tasks

# Installation

```bash
npx skills add gotalab/cc-sdd
```

# Usage

## zh

先在非生产环境选择与任务匹配的技能，提供明确输入和边界。自主运行不扩大授权范围；限制文件和外部系统范围，并在每个检查点审阅差异、测试与未解决风险。

## en

Start in a non-production environment with the task-specific skill and explicit inputs and boundaries. Autonomy does not broaden authorization; constrain files and external systems, and review diffs, tests, and open risks at each checkpoint.

# Workflow

## zh

1. 选择与任务匹配的技能
2. 检查输入、权限和预期输出
3. 审阅结果后再应用或发布

## en

1. Select the skill that matches the task
2. Check inputs, permissions, and expected outputs
3. Review results before applying or publishing

# Changelog

## 3.0.2 | 2026-04-13

### zh

对应仓库发布的 3.0.2 版本。

### en

Matches the repository's 3.0.2 release.

# FAQ

## Question 1

### question.zh

可以不经审查直接应用技能输出吗？

### question.en

Can the skill output be applied without review?

### answer.zh

不应。自主运行不扩大授权范围；限制文件和外部系统范围，并在每个检查点审阅差异、测试与未解决风险。

### answer.en

No. Autonomy does not broaden authorization; constrain files and external systems, and review diffs, tests, and open risks at each checkpoint.
