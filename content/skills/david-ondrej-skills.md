---
schemaVersion: 1
status: published
slug: david-ondrej-skills
name: David Ondrej Agent Skills
nameZh: David Ondrej 智能体技能
category: development
tags: [Agent Orchestration, Research, Development]
platforms: [Agent Skills]
author: David Ondrej
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-11-03'
githubUrl: 'https://github.com/davidondrej/skills'
officialUrl: ''
downloadUrl: 'https://github.com/davidondrej/skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 4256
---
# Description

## zh

个人 Agent Skills 合集，覆盖代理编排、工作树、评审、研究和开发工作流。

## en

A personal Agent Skills collection covering orchestration, worktrees, reviews, research, and development workflows.

# Long Description

## zh

仓库包含多项用于协调代理与工程任务的技能，例如目标循环、子代理、工作树和二次评审。多代理产出仍需由主执行者核对差异和证据。

## en

The repository includes skills for coordinating agents and engineering work, such as goal loops, subagents, worktrees, and second reviews. The controlling operator must still verify diffs and evidence from multiple agents.

# Features

## zh

- 覆盖多代理编排与评审
- 提供开发和研究辅助流程

## en

- Covers multi-agent orchestration and review
- Provides development and research workflows

# Use Cases

## zh

- 将独立任务分配给多个代理
- 用第二模型复核实现方案

## en

- Assign independent tasks to several agents
- Use a second model to review an implementation

# Installation

```bash
npx skills add davidondrej/skills
```

# Usage

## zh

只并行化边界清晰的任务，明确每个代理的文件范围。汇总后检查重复、冲突和未经验证的结论。

## en

Parallelize only clearly bounded tasks and define each agent's file scope. Check for duplication, conflicts, and unverified claims during integration.

# Workflow

## zh

1. 拆分独立任务
2. 运行相关编排技能
3. 汇总、审查并验证

## en

1. Split independent tasks
2. Run the relevant orchestration skill
3. Integrate, review, and verify

# Changelog

## TODO | 2026-11-03

### zh

仓库没有版本化 Release；此处记录最近更新时间。

### en

The repository has no versioned release; this records its latest update.

# FAQ

## Question 1

### question.zh

多个代理的结论一致就一定正确吗？

### question.en

Are matching conclusions from several agents necessarily correct?

### answer.zh

不一定。它们可能共享相同偏差，仍需查看代码、来源和实际测试。

### answer.en

No. They may share the same bias, so inspect code, sources, and real tests.
