---
schemaVersion: 1
status: published
slug: google-agent-skills
name: Google Agent Skills
nameZh: Google 智能体技能合集
category: development
tags:
  - Google Cloud
  - Gemini API
  - Agent Development
  - Cloud Operations
platforms:
  - Claude Code
  - Codex
  - Antigravity
author: Google
version: TODO
license: Apache-2.0
addedAt: '2026-07-31'
updatedAt: '2026-11-04'
githubUrl: 'https://github.com/google/skills'
officialUrl: ''
downloadUrl: 'https://github.com/google/skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 21884
---
# Description

## zh

Google 维护的智能体技能合集，为代理补充使用 Google 开发者产品、云服务和相关工作流的操作知识。

## en

A Google-maintained collection that gives coding agents operational knowledge for Google developer products, cloud services, and related workflows.

# Long Description

## zh

这个仓库把多个独立技能放在同一目录中，覆盖 Google 生态内的开发和云端任务。安装时可以导入整个合集，也可以只选择当前项目需要的技能。它适合希望代理按产品约定完成配置、开发和排障的团队，但使用云端服务前仍需准备相应账号、项目与凭据。

## en

The repository packages multiple independent skills for development and cloud tasks across the Google ecosystem. You can install the full collection or select only the skills a project needs. It is useful when an agent should follow product-specific conventions for setup, development, and troubleshooting; cloud services still require the appropriate account, project, and credentials.

# Features

## zh

- 由 Google 官方组织维护
- 一个仓库提供多个可独立选择的技能
- 面向 Google 开发者产品与云端工作流
- 支持常见 Agent Skills 安装工具

## en

- Maintained by the official Google organization
- Provides multiple independently selectable skills in one repository
- Covers Google developer products and cloud workflows
- Works with common Agent Skills installers

# Use Cases

## zh

- 为项目代理补充 Google 产品的专项操作指南
- 在云端开发任务中统一团队的执行步骤
- 按需安装某个技能而不是引入整套说明

## en

- Give a project agent product-specific guidance for Google services
- Standardize execution steps for cloud development tasks
- Install one relevant skill instead of importing the entire collection

# Installation

```bash
npx skills add google/skills
```

# Usage

## zh

安装后在任务中说明要使用的 Google 产品、目标和已有环境。涉及云资源时先确认账号、项目、区域和凭据，执行前复核代理生成的命令以及可能产生费用或修改资源的操作。

## en

After installation, name the Google product, desired outcome, and available environment. For cloud resources, confirm the account, project, region, and credentials first, then review generated commands and any action that may incur cost or modify resources.

# Workflow

## zh

1. 安装合集或所需技能
2. 准备对应产品的账号与凭据
3. 向代理说明目标和当前环境
4. 审核生成的配置与命令
5. 执行并验证结果

## en

1. Install the collection or selected skill
2. Prepare the required product account and credentials
3. Describe the goal and current environment
4. Review the generated configuration and commands
5. Execute and verify the result

# Changelog

## TODO | 2026-11-04

### zh

仓库尚未发布带版本号的 Release；此处记录最近更新时间，具体变更请查看提交历史。

### en

The repository has no versioned release yet; this records its latest update date. See the commit history for details.

# FAQ

## Question 1

### question.zh

必须一次安装全部技能吗？

### question.en

Do I have to install every skill at once?

### answer.zh

不必。仓库是技能合集，可以按安装工具提供的选择能力只导入当前任务需要的技能。

### answer.en

No. It is a collection, and installers that support selection can import only the skills needed for the current task.
