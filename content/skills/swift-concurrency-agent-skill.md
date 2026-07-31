---
schemaVersion: 1
status: published
slug: swift-concurrency-agent-skill
name: Swift Concurrency Agent Skill
nameZh: Swift 并发技能
category: development
tags: [Swift, Concurrency, Swift 6]
platforms: [Claude Code, Codex, Cursor]
author: AvdLee
version: 2.1.1
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-05-04'
githubUrl: 'https://github.com/AvdLee/Swift-Concurrency-Agent-Skill'
officialUrl: 'https://www.swiftconcurrencycourse.com'
downloadUrl: 'https://github.com/AvdLee/Swift-Concurrency-Agent-Skill/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 1606
---
# Description

## zh

为编码代理提供安全并发、性能优化和 Swift 6 迁移指导。

## en

Provides coding agents with safe concurrency, performance, and Swift 6 migration guidance.

# Long Description

## zh

仓库以标准 SKILL.md 提供可安装工作流。并发修改需结合编译器诊断、数据竞争检查和项目测试，不能只依赖静态建议。

## en

The repository provides installable workflows through standard SKILL.md files. Concurrency changes require compiler diagnostics, race checks, and project tests, not static guidance alone.

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
npx skills add AvdLee/Swift-Concurrency-Agent-Skill
```

# Usage

## zh

先在非生产环境选择匹配任务的技能，并限定输入与权限。并发修改需结合编译器诊断、数据竞争检查和项目测试，不能只依赖静态建议。

## en

Start in a non-production environment with task-matched skills and bounded inputs and permissions. Concurrency changes require compiler diagnostics, race checks, and project tests, not static guidance alone.

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

## 2.1.1 | 2026-05-04

### zh

对应仓库发布的 2.1.1 版本。

### en

Matches the repository's 2.1.1 release.

# FAQ

## Question 1

### question.zh

可以不经审查直接应用技能输出吗？

### question.en

Can the skill output be applied without review?

### answer.zh

不应。并发修改需结合编译器诊断、数据竞争检查和项目测试，不能只依赖静态建议。

### answer.en

No. Concurrency changes require compiler diagnostics, race checks, and project tests, not static guidance alone.
