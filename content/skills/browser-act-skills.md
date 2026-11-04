---
schemaVersion: 1
status: published
slug: browser-act-skills
name: BrowserAct Skills
nameZh: BrowserAct 浏览器技能
category: automation
tags: [Browser Automation, Multi Session, Human Handoff]
platforms: [Claude Code, Codex, Cursor]
author: browser-act
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-11-04'
githubUrl: 'https://github.com/browser-act/skills'
officialUrl: 'https://www.browseract.com/?co-from=github'
downloadUrl: 'https://github.com/browser-act/skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: automation
stars: 6318
---
# Description

## zh

面向 AI 代理的浏览器自动化技能，支持多会话任务、跨平台运行和人工接管。

## en

Browser-automation skills for AI agents with multi-session tasks, cross-platform operation, and human handoff.

# Long Description

## zh

仓库围绕 BrowserAct CLI 提供网页导航和任务执行指令，并为受阻流程保留人工接管路径。 登录凭据、验证码、购买、发布和删除等高影响步骤必须由用户控制并明确确认。

## en

The repository provides web-navigation and task-execution guidance around the BrowserAct CLI, with human handoff for blocked flows. Users must retain control and explicitly approve credentials, CAPTCHAs, purchases, publication, deletion, and other high-impact steps.

# Features

## zh

- 支持隔离的多会话浏览
- 为受阻步骤提供人工接管

## en

- Supports isolated multi-session browsing
- Provides human handoff for blocked steps

# Use Cases

## zh

- 并行收集网页信息
- 自动化需登录的重复流程

## en

- Collect web information in parallel
- Automate repetitive authenticated workflows

# Installation

```bash
npx skills add browser-act/skills
```

# Usage

## zh

先在非生产环境选择与任务匹配的技能，提供明确输入和边界。登录凭据、验证码、购买、发布和删除等高影响步骤必须由用户控制并明确确认。

## en

Start in a non-production environment with the task-specific skill and explicit inputs and boundaries. Users must retain control and explicitly approve credentials, CAPTCHAs, purchases, publication, deletion, and other high-impact steps.

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

## TODO | 2026-11-04

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

不应。登录凭据、验证码、购买、发布和删除等高影响步骤必须由用户控制并明确确认。

### answer.en

No. Users must retain control and explicitly approve credentials, CAPTCHAs, purchases, publication, deletion, and other high-impact steps.
