---
schemaVersion: 1
status: published
slug: waza
name: Waza
nameZh: Waza 工程习惯
category: development
tags: [Engineering Practices, Code Review, Workflow]
platforms: [Claude Code, Codex]
author: tw93
version: 3.32.0
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-19'
githubUrl: 'https://github.com/tw93/Waza'
officialUrl: ''
downloadUrl: 'https://github.com/tw93/Waza/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 6716
---
# Description

## zh

将常见工程习惯整理为可调用技能，帮助编码代理执行更一致的开发与审查流程。

## en

Turns familiar engineering habits into callable skills for more consistent development and review workflows.

# Long Description

## zh

仓库把工程实践拆成可复用指令，适合在实现、检查和交付阶段按需加载。 技能建议必须服从仓库约束；执行命令、改写文件或发布前仍需检查差异和授权。

## en

The repository packages engineering practices as reusable instructions that can be loaded during implementation, review, and delivery. Skill guidance must follow repository constraints; inspect diffs and authorization before commands, rewrites, or publication.

# Features

## zh

- 封装日常工程实践
- 支持按任务选择技能

## en

- Packages everyday engineering practices
- Supports task-specific skill selection

# Use Cases

## zh

- 规范实现与代码审查
- 建立可重复的交付检查

## en

- Standardize implementation and code review
- Create repeatable delivery checks

# Installation

```bash
npx skills add tw93/Waza
```

# Usage

## zh

先在非生产环境选择与任务匹配的技能，提供明确输入和边界。技能建议必须服从仓库约束；执行命令、改写文件或发布前仍需检查差异和授权。

## en

Start in a non-production environment with the task-specific skill and explicit inputs and boundaries. Skill guidance must follow repository constraints; inspect diffs and authorization before commands, rewrites, or publication.

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

## 3.32.0 | 2026-07-19

### zh

对应仓库发布的 3.32.0 版本。

### en

Matches the repository's 3.32.0 release.

# FAQ

## Question 1

### question.zh

可以不经审查直接应用技能输出吗？

### question.en

Can the skill output be applied without review?

### answer.zh

不应。技能建议必须服从仓库约束；执行命令、改写文件或发布前仍需检查差异和授权。

### answer.en

No. Skill guidance must follow repository constraints; inspect diffs and authorization before commands, rewrites, or publication.
