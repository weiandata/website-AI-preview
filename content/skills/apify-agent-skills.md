---
schemaVersion: 1
status: published
slug: apify-agent-skills
name: Apify Agent Skills
nameZh: Apify 代理技能
category: automation
tags: [Apify, Web Data, Automation]
platforms: [Claude Code, Codex]
author: apify
version: TODO
license: Not specified
addedAt: '2026-07-31'
updatedAt: '2026-10-30'
githubUrl: 'https://github.com/apify/agent-skills'
officialUrl: ''
downloadUrl: 'https://github.com/apify/agent-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: automation
stars: 2489
---
# Description

## zh

Apify 的 Agent Skills 合集，用于网页数据采集、Actor 与自动化工作流。

## en

A collection of Apify Agent Skills for web data collection, Actors, and automation workflows.

# Long Description

## zh

仓库为代理提供使用 Apify 平台和 Actor 的任务指导，帮助配置采集、运行和结果处理。 采集必须遵守网站条款、robots、隐私和适用法律；限制请求、敏感数据、凭据与平台费用。

## en

The repository guides agents through Apify platform and Actor tasks, including collection setup, execution, and result handling. Collection must follow site terms, robots policies, privacy rules, and applicable law; bound requests, sensitive data, credentials, and platform cost.

# Features

## zh

- 指导 Apify Actor 使用
- 覆盖采集到结果处理

## en

- Guides Apify Actor usage
- Covers collection through result handling

# Use Cases

## zh

- 运行网页数据采集任务
- 把 Actor 接入自动化流程

## en

- Run a web-data collection task
- Connect Actors to automation workflows

# Installation

```bash
npx skills add apify/agent-skills
```

# Usage

## zh

先在非生产环境选择与任务匹配的技能，提供明确输入和边界。采集必须遵守网站条款、robots、隐私和适用法律；限制请求、敏感数据、凭据与平台费用。

## en

Start in a non-production environment with the task-specific skill and explicit inputs and boundaries. Collection must follow site terms, robots policies, privacy rules, and applicable law; bound requests, sensitive data, credentials, and platform cost.

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

## TODO | 2026-10-30

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

不应。采集必须遵守网站条款、robots、隐私和适用法律；限制请求、敏感数据、凭据与平台费用。

### answer.en

No. Collection must follow site terms, robots policies, privacy rules, and applicable law; bound requests, sensitive data, credentials, and platform cost.
