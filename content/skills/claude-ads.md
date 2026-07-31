---
schemaVersion: 1
status: published
slug: claude-ads
name: Claude Ads
nameZh: Claude 广告运营技能
category: automation
tags: [Paid Media, Advertising, Audit]
platforms: [Claude Code]
author: Daniel Agrici
version: 2.0.1
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-13'
githubUrl: 'https://github.com/AgriciDaniel/claude-ads'
officialUrl: 'https://claude-ads.md'
downloadUrl: 'https://github.com/AgriciDaniel/claude-ads/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: automation
stars: 7727
---
# Description

## zh

覆盖 12 个广告平台的付费媒体运营技能，提供有来源的审计、确定性评分和受权限控制的账号变更。

## en

A paid-media operations collection for 12 ad platforms with source-grounded audits, deterministic scoring, and capability-gated account changes.

# Long Description

## zh

仓库覆盖 Google、Meta、YouTube、LinkedIn、TikTok 等平台的审计、预算、归因和创建流程。广告操作会影响真实预算与用户，默认应只读，任何写入都需明确账号、金额和人工批准。

## en

The repository covers audits, budgets, attribution, and creation across Google, Meta, YouTube, LinkedIn, TikTok, and more. Ad operations affect real spend and users, so default to read-only and require explicit account, amount, and human approval for writes.

# Features

## zh

- 覆盖 12 个主要广告平台
- 账号变更采用能力门禁

## en

- Covers 12 major advertising platforms
- Gates account changes by capability

# Use Cases

## zh

- 审计广告账号和归因问题
- 在审批后调整预算或创建活动

## en

- Audit an ad account and attribution
- Adjust budgets or create campaigns after approval

# Installation

```bash
npx skills add AgriciDaniel/claude-ads
```

# Usage

## zh

先提供只读数据和业务目标，生成审计报告。写入前逐项确认平台、账号、预算上限、地区、受众和回滚方案。

## en

Start with read-only data and business goals to produce an audit. Before writes, confirm platform, account, budget cap, region, audience, and rollback plan.

# Workflow

## zh

1. 以只读方式审计账号
2. 生成带证据的建议
3. 明确审批后执行变更

## en

1. Audit the account read-only
2. Produce evidence-backed recommendations
3. Execute changes only after explicit approval

# Changelog

## 2.0.1 | 2026-07-13

### zh

对应仓库发布的 2.0.1 版本。

### en

Matches the repository's 2.0.1 release.

# FAQ

## Question 1

### question.zh

可以默认允许技能修改广告预算吗？

### question.en

Should the skill have default permission to change ad budgets?

### answer.zh

不应该。预算写入必须限定账号和上限，并由有权限的负责人逐次批准。

### answer.en

No. Budget writes must be limited by account and cap and approved each time by an authorized owner.
