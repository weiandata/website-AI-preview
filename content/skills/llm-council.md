---
schemaVersion: 1
status: published
slug: llm-council
name: LLM Council
nameZh: LLM 顾问委员会
category: productivity
tags: [Decision Support, Peer Review, Multi Model]
platforms: [Claude Code]
author: aiwithremy
version: TODO
license: Not specified
addedAt: '2026-07-31'
updatedAt: '2026-04-26'
githubUrl: 'https://github.com/aiwithremy/claude-skills-llm-council'
officialUrl: ''
downloadUrl: 'https://github.com/aiwithremy/claude-skills-llm-council/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: productivity
stars: 1312
---
# Description

## zh

让五个 AI 顾问通过相互评审辅助决策的 Claude Code 技能。

## en

A Claude Code skill that sends decisions through five AI advisers with peer review.

# Long Description

## zh

仓库以标准 SKILL.md 提供可安装工作流。多模型共识仍可能共同出错；不得上传敏感数据，最终决定与高影响行动由人负责。

## en

The repository provides installable workflows through standard SKILL.md files. Multi-model consensus can still be wrong; do not upload sensitive data, and keep humans accountable for final and high-impact decisions.

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
npx skills add aiwithremy/claude-skills-llm-council
```

# Usage

## zh

先在非生产环境选择匹配任务的技能，并限定输入与权限。多模型共识仍可能共同出错；不得上传敏感数据，最终决定与高影响行动由人负责。

## en

Start in a non-production environment with task-matched skills and bounded inputs and permissions. Multi-model consensus can still be wrong; do not upload sensitive data, and keep humans accountable for final and high-impact decisions.

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

## TODO | 2026-04-26

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

不应。多模型共识仍可能共同出错；不得上传敏感数据，最终决定与高影响行动由人负责。

### answer.en

No. Multi-model consensus can still be wrong; do not upload sensitive data, and keep humans accountable for final and high-impact decisions.
