---
schemaVersion: 1
status: published
slug: aws-agent-skills
name: AWS Agent Skills
nameZh: AWS 代理技能
category: development
tags: [AWS, Cloud, Infrastructure]
platforms: [Claude Code, Codex]
author: itsmostafa
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-27'
githubUrl: 'https://github.com/itsmostafa/aws-agent-skills'
officialUrl: ''
downloadUrl: 'https://github.com/itsmostafa/aws-agent-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 1139
---
# Description

## zh

为代理提供 AWS 服务与云工程任务的技能合集。

## en

A collection of AWS service and cloud-engineering skills for agents.

# Long Description

## zh

仓库以标准 SKILL.md 提供可安装工作流。云命令可能产生费用或更改生产资源；明确账号、区域、角色和计划后再执行。

## en

The repository provides installable workflows through standard SKILL.md files. Cloud commands may incur cost or change production; confirm account, region, role, and plan before execution.

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
npx skills add itsmostafa/aws-agent-skills
```

# Usage

## zh

先在非生产环境选择匹配任务的技能，并限定输入与权限。云命令可能产生费用或更改生产资源；明确账号、区域、角色和计划后再执行。

## en

Start in a non-production environment with task-matched skills and bounded inputs and permissions. Cloud commands may incur cost or change production; confirm account, region, role, and plan before execution.

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

不应。云命令可能产生费用或更改生产资源；明确账号、区域、角色和计划后再执行。

### answer.en

No. Cloud commands may incur cost or change production; confirm account, region, role, and plan before execution.
