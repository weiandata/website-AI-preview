---
schemaVersion: 1
status: published
slug: cloudflare-skills
name: Cloudflare Skills
nameZh: Cloudflare 开发技能
category: development
tags: [Cloudflare, Workers, Deployment]
platforms: [Claude Code, Codex]
author: cloudflare
version: TODO
license: Apache-2.0
addedAt: '2026-07-31'
updatedAt: '2026-07-24'
githubUrl: 'https://github.com/cloudflare/skills'
officialUrl: ''
downloadUrl: 'https://github.com/cloudflare/skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 2518
---
# Description

## zh

Cloudflare 官方代理技能，指导在其平台上构建和部署应用。

## en

Cloudflare's official agent skills for building and deploying applications on its platform.

# Long Description

## zh

仓库把 Cloudflare 产品知识和开发模式整理为技能，辅助从本地实现到平台配置。 部署、域名、密钥和生产配置属于高影响操作；先展示目标账号、环境和差异并获得确认。

## en

The repository packages Cloudflare product knowledge and development patterns as skills, from local implementation to platform configuration. Deployments, domains, secrets, and production configuration are high-impact; show the target account, environment, and diff and obtain approval first.

# Features

## zh

- 提供 Cloudflare 平台指导
- 覆盖构建与部署流程

## en

- Provides Cloudflare platform guidance
- Covers build and deployment workflows

# Use Cases

## zh

- 开发 Workers 应用
- 配置 Cloudflare 项目

## en

- Develop Workers applications
- Configure Cloudflare projects

# Installation

```bash
npx skills add cloudflare/skills
```

# Usage

## zh

先在非生产环境选择与任务匹配的技能，提供明确输入和边界。部署、域名、密钥和生产配置属于高影响操作；先展示目标账号、环境和差异并获得确认。

## en

Start in a non-production environment with the task-specific skill and explicit inputs and boundaries. Deployments, domains, secrets, and production configuration are high-impact; show the target account, environment, and diff and obtain approval first.

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

## TODO | 2026-07-24

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

不应。部署、域名、密钥和生产配置属于高影响操作；先展示目标账号、环境和差异并获得确认。

### answer.en

No. Deployments, domains, secrets, and production configuration are high-impact; show the target account, environment, and diff and obtain approval first.
