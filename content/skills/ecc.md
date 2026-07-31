---
schemaVersion: 1
status: published
slug: ecc
name: Everything Claude Code
nameZh: ECC 代理工程系统
category: development
tags: [Agent Skills, Context Engineering, Security]
platforms: [Claude Code, Codex, OpenCode, Cursor]
author: affaan-m
version: 2.1.0
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-27'
githubUrl: 'https://github.com/affaan-m/ECC'
officialUrl: 'https://ecc.tools'
downloadUrl: 'https://github.com/affaan-m/ECC/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 236543
---
# Description

## zh

面向编码代理的性能优化系统，包含技能、记忆、安全和研究优先的开发工作流。

## en

An agent-harness optimization system with skills, memory, security, and research-first development workflows.

# Long Description

## zh

仓库在 .agents 目录提供大量真实 SKILL.md，覆盖 API、后端、写作、基准测试、品牌与编码标准等领域。 该仓库范围较广；只启用任务所需部分，并在 hooks、记忆、外部命令或安全配置生效前逐项审查。

## en

The repository provides many real SKILL.md files under .agents across APIs, backend work, writing, benchmarking, brand, and coding standards. This repository has broad scope; enable only task-relevant parts and review hooks, memory, external commands, and security configuration before activation.

# Features

## zh

- 汇集多领域 Agent Skills
- 结合上下文、安全与研究流程

## en

- Collects Agent Skills across many domains
- Combines context, security, and research workflows

# Use Cases

## zh

- 建立完整的代理工程环境
- 按任务加载专业开发技能

## en

- Establish a complete agent-engineering environment
- Load specialist development skills by task

# Installation

```bash
npx skills add affaan-m/ECC
```

# Usage

## zh

先在非生产环境选择与任务匹配的技能，提供明确输入和边界。该仓库范围较广；只启用任务所需部分，并在 hooks、记忆、外部命令或安全配置生效前逐项审查。

## en

Start in a non-production environment with the task-specific skill and explicit inputs and boundaries. This repository has broad scope; enable only task-relevant parts and review hooks, memory, external commands, and security configuration before activation.

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

## 2.1.0 | 2026-07-27

### zh

对应仓库发布的 2.1.0 版本。

### en

Matches the repository's 2.1.0 release.

# FAQ

## Question 1

### question.zh

可以不经审查直接应用技能输出吗？

### question.en

Can the skill output be applied without review?

### answer.zh

不应。该仓库范围较广；只启用任务所需部分，并在 hooks、记忆、外部命令或安全配置生效前逐项审查。

### answer.en

No. This repository has broad scope; enable only task-relevant parts and review hooks, memory, external commands, and security configuration before activation.
