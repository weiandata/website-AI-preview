---
schemaVersion: 1
status: published
slug: antfu-skills
name: Anthony Fu's Agent Skills
nameZh: Anthony Fu 智能体技能合集
category: development
tags:
  - Vue
  - Vite
  - Open Source
  - Frontend
platforms:
  - Agent Skills
author: Anthony Fu
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-06-23'
githubUrl: 'https://github.com/antfu/skills'
officialUrl: ''
downloadUrl: 'https://github.com/antfu/skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 5690
---
# Description

## zh

Anthony Fu 维护的个人智能体技能合集，沉淀其在现代前端工具链和开源开发中的实践。

## en

Anthony Fu's personal agent-skill collection, capturing practices from modern frontend tooling and open-source development.

# Long Description

## zh

这个仓库以开放的 Agent Skills 目录形式提供多个技能，可通过 Skills CLI 一次安装或按项选择。内容面向现代前端与作者熟悉的开源工作流，适合希望代理参考成熟项目习惯的开发者。仓库没有承诺绑定某个单一代理，因此实际兼容性取决于客户端是否支持 Agent Skills 规范。

## en

The repository publishes multiple skills in an open Agent Skills layout, installable together or selectively through the Skills CLI. Its material draws on modern frontend and open-source workflows familiar to the author, making it useful when an agent should follow mature project habits. It does not promise one specific agent host, so compatibility depends on the client supporting the Agent Skills convention.

# Features

## zh

- 来自知名前端开源维护者的实践合集
- 使用通用 Agent Skills 目录结构
- 支持一次安装全部技能或按需选择
- 面向现代前端与开源开发流程

## en

- Practices from a well-known frontend open-source maintainer
- Uses the common Agent Skills directory structure
- Supports installing all skills or selecting specific ones
- Focuses on modern frontend and open-source workflows

# Use Cases

## zh

- 为前端项目引入成熟的开发习惯
- 让代理更好理解现代工具链约定
- 从个人技能库中选择适合当前任务的能力

## en

- Bring mature development habits into a frontend project
- Give an agent better context for modern tooling conventions
- Select capabilities from a personal skill library for the current task

# Installation

```bash
pnpx skills add antfu/skills --skill='*'
```

# Usage

## zh

安装后在任务中注明项目使用的框架、构建工具、包管理器和现有约定。若只需要某项能力，优先选择单个技能，避免给代理加入无关上下文；完成后仍以项目自身的 lint、类型检查和测试为准。

## en

After installation, state the project's framework, build tool, package manager, and conventions. Prefer a single skill when only one capability is needed to avoid irrelevant context, and rely on the project's own linting, type checks, and tests for verification.

# Workflow

## zh

1. 查看仓库提供的技能
2. 安装全部或选择所需技能
3. 提供项目工具链和约定
4. 让代理完成开发任务
5. 运行项目检查验证修改

## en

1. Review the available skills
2. Install all or select the relevant skill
3. Provide project tooling and conventions
4. Ask the agent to complete the development task
5. Run project checks to verify the change

# Changelog

## TODO | 2026-06-23

### zh

仓库尚未发布带版本号的 Release；此处记录最近更新时间，具体变更请查看提交历史。

### en

The repository has no versioned release yet; this records its latest update date. See the commit history for details.

# FAQ

## Question 1

### question.zh

哪些代理可以使用这个合集？

### question.en

Which agents can use this collection?

### answer.zh

仓库采用通用 Agent Skills 结构，没有限定单一平台。能读取该规范或支持 Skills CLI 的客户端通常可以接入，具体以客户端文档为准。

### answer.en

The repository uses the common Agent Skills layout rather than naming one platform. Clients that read the convention or support the Skills CLI can generally use it; check the client documentation for exact support.
