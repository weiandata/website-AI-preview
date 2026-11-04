---
schemaVersion: 1
status: published
slug: goose-skills
name: Goose Skills
nameZh: Goose 增长技能合集
category: content-creation
tags:
  - Growth Marketing
  - Advertising
  - Lead Generation
  - Competitive Intelligence
platforms:
  - Claude Code
  - Codex
  - Cursor
author: Gooseworks AI
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-10-27'
githubUrl: 'https://github.com/gooseworks-ai/goose-skills'
officialUrl: 'https://gooseworks.ai/cli'
downloadUrl: 'https://github.com/gooseworks-ai/goose-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: writing
stars: 1280
---
# Description

## zh

包含 200 多项增长技能的合集，覆盖广告、社交媒体、内容、SEO、线索获取、竞争情报和上市策略。

## en

A collection of more than 200 growth skills across ads, social media, content, SEO, lead generation, competitive intelligence, and go-to-market work.

# Long Description

## zh

Goose Skills 通过专用 CLI 为 Claude Code、Codex 与 Cursor 安装完整技能目录，并通过登录配置配套工具。每个技能目录包含 `SKILL.md` 与机器可读元数据，便于目录搜索和按名调用。由于部分能力会连接营销数据源或消耗服务额度，使用前应理解认证范围、费用和数据处理方式，并为对外发布、线索触达与广告操作保留人工审批。

## en

Goose Skills uses a dedicated CLI to install its full catalog for Claude Code, Codex, and Cursor, followed by login for supporting tools. Each skill directory includes `SKILL.md` and machine-readable metadata for catalog search and named invocation. Some capabilities connect to marketing data sources or consume service credits, so understand authentication scope, cost, and data handling, and keep human approval for publishing, lead outreach, and advertising actions.

# Features

## zh

- 提供 200 多项增长与营销技能
- 覆盖广告、SEO、社交、线索和竞争情报
- 专用 CLI 负责安装、搜索和更新
- 兼容 Claude Code、Codex 与 Cursor

## en

- Provides more than 200 growth and marketing skills
- Covers ads, SEO, social, leads, and competitive intelligence
- Dedicated CLI handles installation, search, and updates
- Supports Claude Code, Codex, and Cursor

# Use Cases

## zh

- 研究竞争对手和市场活动
- 生成广告、社交内容和视觉素材
- 查找并整理潜在线索
- 为上市和增长计划组合专项技能

## en

- Research competitors and market activity
- Produce ads, social content, and visual assets
- Find and organize potential leads
- Combine specialist skills for go-to-market and growth plans

# Installation

```bash
npx gooseworks install --all
```

```bash
npx gooseworks login
```

# Usage

## zh

安装并登录后，可先用 CLI 搜索最相关的技能，再通过 `/gooseworks` 或自然语言调用。连接数据源前检查授权和额度；生成线索、广告或公开内容后，由负责人核对事实、隐私和合规要求。

## en

After installation and login, search the catalog for the most relevant skill, then invoke it through `/gooseworks` or natural language. Check authorization and credits before connecting data sources, and have an owner review facts, privacy, and compliance for leads, ads, or public content.

# Workflow

## zh

1. 安装技能目录并登录
2. 搜索与目标匹配的技能
3. 配置经批准的数据源
4. 生成研究或营销产出
5. 人工审核后执行外部动作

## en

1. Install the catalog and log in
2. Search for a skill matching the goal
3. Configure approved data sources
4. Generate research or marketing output
5. Take external action only after human review

# Changelog

## TODO | 2026-10-27

### zh

仓库尚未发布带版本号的 Release；此处记录最近更新时间，具体变更请查看提交历史。

### en

The repository has no versioned release yet; this records its latest update date. See the commit history for details.

# FAQ

## Question 1

### question.zh

安装和登录后会产生费用吗？

### question.en

Can installation and login lead to charges?

### answer.zh

部分工具使用额度或外部服务。执行前应检查当前余额、具体技能依赖和服务定价，并对任何广告支出单独审批。

### answer.en

Some tools use credits or external services. Check the current balance, each skill's dependencies, and service pricing before execution, and approve any advertising spend separately.
