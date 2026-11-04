---
schemaVersion: 1
status: published
slug: skillopt
name: SkillOpt
nameZh: SkillOpt 技能优化器
category: development
tags: [Skill Optimization, Evaluation, Agent Training]
platforms: [Claude Code, Codex, Cursor, OpenClaw]
author: Microsoft
version: 0.2.0
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-11-04'
githubUrl: 'https://github.com/microsoft/SkillOpt'
officialUrl: 'https://aka.ms/skillopt'
downloadUrl: 'https://github.com/microsoft/SkillOpt/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 18886
---
# Description

## zh

微软发布的文本空间技能优化系统，通过轨迹驱动编辑和验证门禁训练可复用自然语言技能。

## en

Microsoft's text-space skill optimizer trains reusable natural-language skills through trajectory-driven edits and validation gates.

# Long Description

## zh

SkillOpt 从代理运行轨迹中提出技能修改，并通过评估选择可部署结果，同时为多个客户端提供安装技能。优化质量取决于评估集；不代表真实用户的测试会放大偏差。

## en

SkillOpt proposes skill edits from agent trajectories and selects deployable results through evaluation, with installer skills for several clients. Quality depends on the evaluation set; tests that do not represent real users can amplify bias.

# Features

## zh

- 从运行轨迹迭代技能文本
- 用验证门禁筛选改进

## en

- Iterates skill text from run trajectories
- Selects improvements with validation gates

# Use Cases

## zh

- 优化重复使用的代理技能
- 比较技能版本的任务表现

## en

- Optimize a repeatedly used agent skill
- Compare task performance across skill versions

# Installation

```bash
npx skills add microsoft/SkillOpt
```

# Usage

## zh

准备具有代表性的训练与保留评估任务，记录成本和失败类型。只有在保留集和人工审查均通过后才发布新版本。

## en

Prepare representative training and held-out evaluation tasks and record cost and failure types. Release a new version only after held-out tests and human review pass.

# Workflow

## zh

1. 建立基线与保留评估集
2. 从轨迹生成候选修改
3. 验证并人工审阅最佳版本

## en

1. Establish a baseline and held-out set
2. Generate candidate edits from trajectories
3. Validate and review the best version

# Changelog

## 0.2.0 | 2026-07-02

### zh

对应仓库发布的 0.2.0 版本。

### en

Matches the repository's 0.2.0 release.

# FAQ

## Question 1

### question.zh

训练分数提升就能直接发布吗？

### question.en

Can a skill ship as soon as training scores improve?

### answer.zh

不能。还需保留集、真实任务和人工安全审查，防止过拟合与行为退化。

### answer.en

No. Held-out tasks, real workloads, and human safety review are needed to prevent overfitting and regressions.
