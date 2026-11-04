---
schemaVersion: 1
status: published
slug: jezweb-claude-skills
name: Jezweb Claude Skills
nameZh: Jezweb 生产工作流技能
category: automation
tags:
  - Web Development
  - Deployment
  - Content Production
  - Developer Tools
platforms:
  - Claude Code
  - Codex
author: Jezweb
version: 12.0.0
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-10-09'
githubUrl: 'https://github.com/jezweb/claude-skills'
officialUrl: 'https://jezweb.com.au'
downloadUrl: 'https://github.com/jezweb/claude-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: automation
stars: 1095
---
# Description

## zh

面向生产交付的技能与插件合集，覆盖 Web 构建部署、设计素材、商业写作、开发工具和第三方集成。

## en

A production-oriented collection of skills and plugins covering web build and deployment, design assets, business writing, developer tools, and integrations.

# Long Description

## zh

该仓库将大量可交付工作流组织成多个 Claude Code 插件，例如 Cloudflare、Shopify、WordPress、前端、写作和开发工具。README 强调每个技能都要生成实际文件、项目或配置，而不是只提供知识。部分技能会触达部署、支付或外部服务，因此只应安装当前需要的插件，并在远程写入、凭据使用和费用产生前获得明确批准。

## en

The repository organizes many deliverable-producing workflows into Claude Code plugins for Cloudflare, Shopify, WordPress, frontend, writing, developer tools, and more. Its stated philosophy is that every skill produces files, projects, or configuration rather than only providing reference material. Some skills can reach deployment, payments, or external services, so install only what is needed and obtain explicit approval before remote writes, credential use, or spending.

# Features

## zh

- 多个按领域分组的生产工作流插件
- 覆盖开发、部署、设计、写作和集成
- 强调生成实际可交付物
- 可选择安装单个插件以控制上下文

## en

- Multiple production-workflow plugins grouped by domain
- Covers development, deployment, design, writing, and integrations
- Emphasizes tangible deliverables
- Supports installing one plugin to control context

# Use Cases

## zh

- 脚手架化并部署 Web 项目
- 生成设计资产或商业文档
- 为项目补充测试、文档和发布流程
- 配置经过审批的外部服务集成

## en

- Scaffold and deploy web projects
- Produce design assets or business documents
- Add testing, documentation, and release workflows
- Configure approved external-service integrations

# Installation

```bash
/plugin marketplace add jezweb/claude-skills
```

```bash
/plugin install dev-tools@jezweb-skills
```

# Usage

## zh

添加市场后只安装与任务相关的插件，并在自然语言任务中说明输入、交付物与验收条件。对于部署、支付、消息发送或批量操作，先使用预览或沙盒，并在实际执行前确认目标、凭据和影响范围。

## en

After adding the marketplace, install only the plugin relevant to the task and state inputs, deliverables, and acceptance criteria in natural language. For deployment, payments, messaging, or bulk operations, use previews or sandboxes first and confirm targets, credentials, and impact before execution.

# Workflow

## zh

1. 添加 Jezweb 插件市场
2. 选择并安装一个相关插件
3. 提供输入与验收条件
4. 生成项目、文件或配置
5. 验证并审批外部操作

## en

1. Add the Jezweb plugin marketplace
2. Select and install one relevant plugin
3. Provide inputs and acceptance criteria
4. Generate the project, files, or configuration
5. Verify and approve external actions

# Changelog

## 12.0.0 | 2026-03-13

### zh

对应仓库已发布的 12.0.0 版本；仓库后续内容和结构变化请查看提交历史。

### en

Matches the repository's published 12.0.0 release; see commit history for later content and structural changes.

# FAQ

## Question 1

### question.zh

应该一次安装所有插件吗？

### question.en

Should I install every plugin at once?

### answer.zh

通常不需要。按当前任务安装一个领域插件可以减少无关上下文，也能降低误触部署、支付或外部集成的风险。

### answer.en

Usually not. Installing one domain plugin for the current task reduces irrelevant context and lowers the risk of invoking deployment, payment, or external integrations unintentionally.
