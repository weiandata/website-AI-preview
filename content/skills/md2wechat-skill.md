---
schemaVersion: 1
status: published
slug: md2wechat-skill
name: MD2WeChat Skill
nameZh: Markdown 微信发布技能
category: content-creation
tags: [WeChat, Markdown, Publishing]
platforms: [Claude Code, Codex]
author: geekjourneyx
version: 3.2.0
license: NOASSERTION
addedAt: '2026-07-31'
updatedAt: '2026-07-24'
githubUrl: 'https://github.com/geekjourneyx/md2wechat-skill'
officialUrl: 'https://md2wechat.cn'
downloadUrl: 'https://github.com/geekjourneyx/md2wechat-skill/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: writing
stars: 3385
---
# Description

## zh

将 Markdown 排版并发布到微信公众号，支持多种样式、AI 配图、批量和多账号流程。

## en

Formats and publishes Markdown to WeChat Official Accounts with themes, AI images, batch workflows, and multiple accounts.

# Long Description

## zh

仓库结合 Markdown 转换、公众号排版和发布操作，帮助代理准备可预览的微信内容。 账号凭据必须安全保存；正式发布、批量操作和账号切换前展示预览并由用户确认。

## en

The repository combines Markdown conversion, Official Account formatting, and publishing operations so agents can prepare previewable WeChat content. Store account credentials securely; show a preview and obtain user confirmation before live publication, batch actions, or account switching.

# Features

## zh

- 提供多种微信排版样式
- 支持批量与多账号工作流

## en

- Provides multiple WeChat formatting styles
- Supports batch and multi-account workflows

# Use Cases

## zh

- 排版微信公众号文章
- 管理多账号内容草稿

## en

- Format WeChat Official Account articles
- Manage drafts across multiple accounts

# Installation

```bash
npx skills add geekjourneyx/md2wechat-skill
```

# Usage

## zh

先在非生产环境选择与任务匹配的技能，提供明确输入和边界。账号凭据必须安全保存；正式发布、批量操作和账号切换前展示预览并由用户确认。

## en

Start in a non-production environment with the task-specific skill and explicit inputs and boundaries. Store account credentials securely; show a preview and obtain user confirmation before live publication, batch actions, or account switching.

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

## 3.2.0 | 2026-07-24

### zh

对应仓库发布的 3.2.0 版本。

### en

Matches the repository's 3.2.0 release.

# FAQ

## Question 1

### question.zh

可以不经审查直接应用技能输出吗？

### question.en

Can the skill output be applied without review?

### answer.zh

不应。账号凭据必须安全保存；正式发布、批量操作和账号切换前展示预览并由用户确认。

### answer.en

No. Store account credentials securely; show a preview and obtain user confirmation before live publication, batch actions, or account switching.
