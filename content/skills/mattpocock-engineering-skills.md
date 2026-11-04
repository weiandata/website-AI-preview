---
schemaVersion: 1
status: published
slug: mattpocock-engineering-skills
name: Matt Pocock Engineering Skills
nameZh: Matt Pocock 工程技能
category: development
tags: [Engineering, Code Review, Debugging]
platforms: [Agent Skills]
author: Matt Pocock
version: 1.3.2
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-11-04'
githubUrl: 'https://github.com/mattpocock/skills'
officialUrl: ''
downloadUrl: 'https://github.com/mattpocock/skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 312289
---
# Description

## zh

面向真实软件工程工作的技能合集，覆盖代码审查、代码库设计、故障诊断和重构规划。

## en

A collection for practical software engineering, including code review, codebase design, bug diagnosis, and refactoring plans.

# Long Description

## zh

仓库按工程主题提供多个独立 `SKILL.md`，将作者的开发经验整理成代理可执行步骤。它适合辅助复杂代码库工作；采用建议前仍应结合项目约定、测试和人工审查。

## en

The repository provides independent `SKILL.md` files by engineering topic, turning the author's development practices into agent-executable steps. It supports complex codebase work, but recommendations still need project conventions, tests, and human review.

# Features

## zh

- 覆盖审查、设计、调试和重构
- 可按工程任务选择单个技能

## en

- Covers review, design, debugging, and refactoring
- Allows selecting one skill for the engineering task

# Use Cases

## zh

- 审查复杂代码修改
- 系统诊断难以复现的缺陷

## en

- Review a complex code change
- Diagnose a difficult-to-reproduce defect systematically

# Installation

```bash
npx skills add mattpocock/skills
```

# Usage

## zh

提供代码库结构、问题证据、约束和验收条件。让代理先分析再修改，并用项目自身的 lint、类型检查和测试验证输出。

## en

Provide repository structure, problem evidence, constraints, and acceptance criteria. Ask the agent to analyze before editing and verify output with the project's linting, type checks, and tests.

# Workflow

## zh

1. 选择工程技能
2. 提供代码与证据
3. 审查方案并执行验证

## en

1. Select an engineering skill
2. Provide code and evidence
3. Review the approach and run verification

# Changelog

## 1.3.2 | 2026-10-29

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

技能建议可以替代项目测试吗？

### question.en

Can skill guidance replace project tests?

### answer.zh

不能。技能提供工程方法，实际修改仍要通过项目的自动化检查和人工审查。

### answer.en

No. Skills provide engineering methods; actual changes still require project checks and human review.
