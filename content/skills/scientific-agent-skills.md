---
schemaVersion: 1
status: published
slug: scientific-agent-skills
name: Scientific Agent Skills
nameZh: 科研技能库
category: research-writing
tags:
  - Scientific Research
  - Bioinformatics
  - Databases
  - Data Analysis
platforms:
  - Claude Code
  - Cursor
  - Codex
author: K-Dense AI
version: 2.53.0
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-07-15'
githubUrl: 'https://github.com/K-Dense-AI/scientific-agent-skills'
officialUrl: 'https://k-dense.ai'
downloadUrl: >-
  https://github.com/K-Dense-AI/scientific-agent-skills/archive/refs/heads/main.zip
featured: true
featuredRank: 5
verified: true
icon: research
stars: 31177
---
# Description

## zh

一百多个面向科研工作的技能，覆盖文献检索、数据分析、生物信息学和上百个公开科学数据库的查询。

## en

Over a hundred skills built for scientific work, spanning literature search, data analysis, bioinformatics, and queries against a hundred-plus public scientific databases.

# Long Description

## zh

科研里大量时间花在流程性工作上：查文献、取数据、跑标准分析、画图表。这个仓库把这些常规动作做成一百多个独立技能，让 AI 按各自领域的通行做法执行，而不是每次自己摸索。覆盖面很广，从化学、生物、天文到统计与可视化都有，并且接入了上百个公开科学数据库。它原名 Claude Scientific Skills，现在改用开放的 Agent Skills 标准，因此不再限于 Claude，Cursor、Codex 等支持该标准的环境都能用。仓库还提供一个可在本地运行的配套工作台，自带 API 密钥即可使用全部技能。

## en

Research spends a lot of time on procedure: finding papers, pulling data, running standard analyses, drawing figures. This repository turns those routines into more than a hundred discrete skills so an AI follows each field's accepted practice instead of improvising. Coverage is broad — chemistry, biology, astronomy, statistics, and visualisation among them — with connections to over a hundred public scientific databases. Formerly Claude Scientific Skills, it now follows the open Agent Skills standard, so it is no longer Claude-only and works in Cursor, Codex, and other compatible harnesses. A companion desktop workspace is also available, running locally with your own API keys.

# Features

## zh

- 一百多个技能，覆盖多个科学领域的常规工作
- 接入上百个公开科学数据库
- 遵循开放的 Agent Skills 标准，多环境通用
- 覆盖从取数、分析到出图的完整链路
- 提供可本地运行的配套工作台

## en

- More than a hundred skills across several scientific fields
- Connects to over a hundred public scientific databases
- Follows the open Agent Skills standard and runs in multiple harnesses
- Covers the chain from data retrieval through analysis to figures
- Ships a companion workspace that runs locally

# Use Cases

## zh

- 做文献调研，需要按学科惯例检索和整理
- 分析实验数据，希望用领域内公认的方法
- 查询基因、化合物、天体等公开科学数据库
- 出符合发表要求的图表

## en

- Literature reviews that need field-appropriate searching and organisation
- Analysing experimental data with methods accepted in the field
- Querying public databases for genes, compounds, celestial objects, and more
- Producing figures that meet publication expectations

# Installation

```bash
npx skills add K-Dense-AI/scientific-agent-skills -g
```

# Usage

## zh

安装后按任务描述需求即可，例如查某个基因的相关文献、对一批数据做特定统计检验、或从某个数据库取材料。技能会按对应领域的通行做法执行。数量较多，可以先浏览仓库说明了解覆盖范围，再按需要使用。

## en

Once installed, describe the task — find literature on a gene, run a particular statistical test on a dataset, or pull material from a specific database — and the matching skill follows its field's accepted practice. There are a lot of them, so it helps to skim the repository's overview first to see what is covered.

# Workflow

## zh

1. 安装技能库
2. 浏览仓库说明，了解覆盖哪些领域
3. 按研究任务描述你的需求
4. 让技能完成检索、取数或分析
5. 核对方法与数据来源是否符合你的要求

## en

1. Install the skill library
2. Skim the repository overview to see which fields are covered
3. Describe the research task at hand
4. Let the matching skill handle retrieval, data, or analysis
5. Check that the method and sources fit your requirements

# Changelog

## 2.53.0 | 2026-07-15

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

只能配合 Claude 使用吗？

### question.en

Is it Claude-only?

### answer.zh

不是。它原名 Claude Scientific Skills，现已改用开放的 Agent Skills 标准，因此支持该标准的代理环境都能用，仓库明确列出了 Cursor、Claude Code、Codex 等。

### answer.en

No. It was formerly Claude Scientific Skills but now follows the open Agent Skills standard, so any compatible harness works. The repository names Cursor, Claude Code, and Codex among them.

## Question 2

### question.zh

产出的分析结果可以直接用于发表吗？

### question.en

Can its output go straight into a publication?

### answer.zh

技能提供的是按领域惯例执行的流程和结果，但研究结论的责任仍在你。方法是否适用于你的数据、参数选择是否合理、结果如何解释，都需要你自己判断和复核。

### answer.en

The skills apply field-standard procedures, but responsibility for the conclusions stays with you. Whether a method suits your data, whether the parameters are right, and how to interpret the result all remain your judgement to make and check.
