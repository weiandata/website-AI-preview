---
schemaVersion: 1
status: published
slug: dotnet-agent-skills
name: .NET Agent Skills
nameZh: .NET 智能体技能
category: development
tags:
  - .NET
  - C Sharp
  - NuGet
  - Application Development
platforms:
  - Claude Code
  - Codex
  - Cursor
  - GitHub Copilot CLI
author: .NET
version: 1.0.0
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-31'
githubUrl: 'https://github.com/dotnet/skills'
officialUrl: ''
downloadUrl: 'https://github.com/dotnet/skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 4819
---
# Description

## zh

.NET 官方组织维护的智能体技能合集，为代理提供构建、维护和现代化 .NET 应用所需的专项指导。

## en

An agent-skill collection maintained by the official .NET organization, providing specialized guidance for building, maintaining, and modernizing .NET applications.

# Long Description

## zh

该仓库按插件和技能组织 .NET 开发知识，可通过 Claude Code 或 Codex 的插件市场安装，也支持其他兼容的编码代理。它适合在真实代码库中补充框架约定、工具链步骤和常见开发模式。使用时应明确目标框架版本和项目类型，并以编译、测试和静态分析结果验证代理的修改。

## en

The repository organizes .NET development knowledge into plugins and skills installable through Claude Code or Codex marketplaces, with support for other compatible coding agents. It adds framework conventions, toolchain steps, and common development patterns to real codebases. State the target framework and project type, then verify agent changes with builds, tests, and static analysis.

# Features

## zh

- 由 .NET 官方 GitHub 组织维护
- 采用插件与技能相结合的结构
- 覆盖 .NET 应用开发和维护任务
- 支持多个主流编码代理

## en

- Maintained by the official .NET GitHub organization
- Combines plugin and skill packaging
- Covers .NET application development and maintenance
- Supports multiple major coding agents

# Use Cases

## zh

- 在现有解决方案中实现 .NET 功能
- 让代理遵循目标框架和工具链约定
- 对旧项目进行有验证步骤的现代化改造

## en

- Implement .NET features in an existing solution
- Keep an agent aligned with target-framework and toolchain conventions
- Modernize older projects with explicit verification steps

# Installation

```bash
codex plugin marketplace add dotnet/skills
```

```bash
/plugin marketplace add dotnet/skills
```

# Usage

## zh

添加市场后安装与项目匹配的插件，并向代理提供解决方案结构、目标框架、SDK 版本和验收条件。完成修改后运行还原、构建和测试，确认没有引入不兼容的 API 或包版本。

## en

After adding the marketplace, install the plugin that matches the project and provide the solution structure, target framework, SDK version, and acceptance criteria. Run restore, build, and tests afterward to catch incompatible APIs or package versions.

# Workflow

## zh

1. 添加 .NET 技能市场
2. 安装与项目匹配的插件
3. 提供框架版本和验收条件
4. 让代理实施或审查修改
5. 运行还原、构建和测试

## en

1. Add the .NET skills marketplace
2. Install the plugin matching the project
3. Provide framework versions and acceptance criteria
4. Ask the agent to implement or review changes
5. Run restore, build, and tests

# Changelog

## 1.0.0 | 2026-04-21

### zh

对应仓库发布的 1.0.0 版本；后续提交活动记录在 GitHub 仓库中。

### en

Matches the repository's 1.0.0 release; subsequent activity is recorded in the GitHub repository.

# FAQ

## Question 1

### question.zh

安装技能后还需要指定 .NET 版本吗？

### question.en

Should I still specify the .NET version after installation?

### answer.zh

需要。目标框架和 SDK 版本会影响可用 API、包版本与构建行为，应把它们作为任务上下文明确提供。

### answer.en

Yes. Target framework and SDK versions affect available APIs, package versions, and build behavior, so include them explicitly in the task context.
