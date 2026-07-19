---
schemaVersion: 1
status: published
slug: pinme
name: PinMe
nameZh: 一键部署技能
category: development
tags:
  - Deployment
  - CLI
  - Full Stack
  - Zero Config
platforms:
  - Claude Code
author: glitternetwork
version: 2.0.4
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-07-12'
githubUrl: 'https://github.com/glitternetwork/pinme'
officialUrl: 'https://pinme.eth.limo/'
downloadUrl: 'https://github.com/glitternetwork/pinme/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 3712
downloads: 0
---
# Description

## zh

零配置的部署命令行工具，一条命令完成全栈项目的创建与上线，前端、Worker 后端和数据库一并配好。

## en

A zero-config deployment CLI that creates and ships a full-stack project in one command, wiring up the frontend, a Worker backend, and a database together.

# Long Description

## zh

部署一个小项目常常比写它还费时间：配置文件、构建脚本、环境变量、域名，每一步都要单独处理。PinMe 把这些收进一条命令，让前端、Worker 后端和数据库作为一个整体启动，省掉逐项配置的过程。它同时提供了给 AI 代理使用的技能包，装上之后代理可以在工作流里直接调用部署能力，不需要你手动切到终端敲命令。除了完整项目，它也支持静态文件上传和 IPFS 相关操作。

## en

Deploying a small project often takes longer than writing it: config files, build scripts, environment variables, domains, each handled separately. PinMe folds that into a single command, bringing up the frontend, a Worker backend, and a database as one unit instead of configuring each piece. It also ships a skill for AI agents, so once installed an agent can invoke deployment inside a workflow rather than making you switch to a terminal. Beyond full projects, it supports static uploads and IPFS utilities.

# Features

## zh

- 一条命令完成创建与部署，无需前置配置
- 前端、Worker 后端与数据库作为整体启动
- 提供代理技能包，可在 AI 工作流中直接调用
- 支持静态文件上传与 IPFS 相关操作
- 内置账号认证与项目管理命令

## en

- Creates and deploys in one command with no configuration up front
- Brings up frontend, Worker backend, and database as a single unit
- Ships an agent skill so deployment can run inside an AI workflow
- Supports static uploads and IPFS utilities
- Includes authentication and project management commands

# Use Cases

## zh

- 做完一个原型想立刻放到线上给人看
- 不想为小项目单独配置构建和部署流程
- 希望代理在完成开发后顺手完成部署
- 需要把静态站点或文件传到 IPFS

## en

- Getting a finished prototype online quickly for someone to look at
- Avoiding a bespoke build and deploy setup for a small project
- Letting an agent deploy as the last step after it finishes building
- Publishing a static site or files to IPFS

# Installation

```bash
npx skills add glitternetwork/pinme
```

# Usage

## zh

装好技能后，可以在对话中直接要求代理部署当前项目，它会调用 PinMe 完成构建与上线。也可以按仓库文档在终端直接使用命令行：先登录账号，再用创建或部署命令处理项目。静态文件上传和 IPFS 操作有单独的命令。

## en

With the skill installed, ask your agent to deploy the current project and it will call PinMe to build and ship it. You can also use the CLI directly as documented: authenticate first, then run the create or deploy command for your project. Static uploads and IPFS operations have their own commands.

# Workflow

## zh

1. 安装 PinMe 技能
2. 完成账号认证
3. 在项目目录中发起部署
4. 等待前端、后端与数据库一并就绪
5. 拿到访问地址并确认线上效果

## en

1. Install the PinMe skill
2. Authenticate your account
3. Trigger a deploy from the project directory
4. Wait for frontend, backend, and database to come up together
5. Open the resulting URL and confirm the deployment

# Changelog

## 2.0.4 | 2026-07-12

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

只能部署纯前端项目吗？

### question.en

Is it only for frontend-only projects?

### answer.zh

不是。仓库说明它面向全栈项目，可以把前端、Worker 后端和数据库作为一个整体启动。如果只需要放静态文件，也有单独的上传命令。

### answer.en

No. The repository positions it for full-stack projects, bringing frontend, a Worker backend, and a database up together. If you only need static files hosted, there are separate upload commands.

## Question 2

### question.zh

必须通过 AI 代理使用吗？

### question.en

Do I have to use it through an AI agent?

### answer.zh

不必。它本身就是一个命令行工具，可以直接在终端使用。技能包是为了让代理也能调用它，两种方式并存。

### answer.en

No. It is a CLI you can run directly in a terminal. The skill exists so an agent can call it as well; both paths work.
