---
schemaVersion: 1
status: published
slug: delegate-skills
name: Delegate Skills
nameZh: 编码任务委派技能
category: automation
tags: [Delegation, Coding Agents, Code Review]
platforms: [Claude Code, Codex, Cursor, OpenCode]
author: Ahmed Elnagdy
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-31'
githubUrl: 'https://github.com/amElnagdy/delegate-skills'
officialUrl: 'https://www.skills.sh/amelnagdy/delegate-skills'
downloadUrl: 'https://github.com/amElnagdy/delegate-skills/archive/refs/heads/master.zip'
featured: false
featuredRank: 0
verified: true
icon: automation
stars: 656
---
# Description

## zh

把编码任务委派给独立代理 CLI、审查其差异并由当前代理决定是否落地的技能合集。

## en

A collection for delegating coding tasks to separate agent CLIs, reviewing their diffs, and landing changes from the controlling agent.

# Long Description

## zh

仓库为多种编码代理提供各自的委派技能，强调实现者和审查者分离。委派不会转移责任，调用外部代理前需限定代码、凭据和允许修改的范围。

## en

The repository provides delegate skills for several coding agents and separates implementation from review. Delegation does not transfer responsibility; scope code, credentials, and permitted edits before invoking another agent.

# Features

## zh

- 支持多个代理 CLI 作为实现者
- 保留差异审查和落地控制

## en

- Supports several agent CLIs as implementers
- Preserves diff review and landing control

# Use Cases

## zh

- 委派边界清晰的编码子任务
- 用第二代理生成可审查实现

## en

- Delegate a bounded coding subtask
- Obtain a reviewable implementation from a second agent

# Installation

```bash
npx skills add amElnagdy/delegate-skills
```

# Usage

## zh

提供最小任务范围、文件边界和验收条件。接收结果后检查完整差异并运行项目测试，不能直接信任实现者声明。

## en

Provide minimal scope, file boundaries, and acceptance criteria. Inspect the full diff and run project tests afterward rather than trusting the implementer's claim.

# Workflow

## zh

1. 定义可独立委派的任务
2. 运行实现者并获取差异
3. 审查、测试后再落地

## en

1. Define an independently delegable task
2. Run the implementer and obtain a diff
3. Review and test before landing

# Changelog

## TODO | 2026-07-31

### zh

仓库没有版本化 Release；此处记录最近更新时间。

### en

The repository has no versioned release; this records its latest update.

# FAQ

## Question 1

### question.zh

委派结果可以直接提交吗？

### question.en

Can delegated output be committed directly?

### answer.zh

不能。应检查完整差异、运行测试并确认没有越出授权范围。

### answer.en

No. Inspect the full diff, run tests, and confirm it stayed within scope.
