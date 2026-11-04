---
schemaVersion: 1
status: published
slug: microsoft-skills
name: Microsoft Agent Skills
nameZh: 微软 Azure 代理技能库
category: development
tags: [Azure, Microsoft Foundry, SDK]
platforms: [GitHub Copilot]
author: Microsoft
version: TODO
license: MIT
addedAt: '2026-11-04'
updatedAt: '2026-11-04'
githubUrl: 'https://github.com/microsoft/skills'
officialUrl: 'https://microsoft.github.io/skills/'
downloadUrl: 'https://github.com/microsoft/skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: code
stars: 3172
---
# Description

## zh

微软提供的技能、自定义代理和 MCP 配置，帮助编程代理正确使用 Azure SDK 和 Microsoft Foundry。

## en

Microsoft's skills, custom agents, and MCP configurations that help coding agents use Azure SDKs and Microsoft Foundry correctly.

# Long Description

## zh

编程代理本身缺少特定 SDK 的领域知识，这个仓库用技能、自定义代理、AGENTS.md 模板和 MCP 配置来补足。网站提供技能浏览器，列出约 175 个技能。仓库标注为开发中，内容还在增加和调整。README 特别提醒要按需选用：一次加载全部技能会分散注意力并浪费 token。

## en

Coding agents lack domain knowledge of specific SDKs, and this repository supplies it through skills, custom agents, AGENTS.md templates, and MCP configurations. A skill explorer lists about 175 skills. The repository is marked work in progress, with content still changing. The README stresses selective use: loading every skill dilutes attention and wastes tokens.

# Features

## zh

- 面向 Azure SDK 和 Microsoft Foundry 的技能
- 自定义代理和 AGENTS.md 模板
- MCP 配置
- 网页技能浏览器
- 安装向导可挑选技能

## en

- Skills for Azure SDKs and Microsoft Foundry
- Custom agents and AGENTS.md templates
- MCP configurations
- A web-based skill explorer
- An install wizard for picking skills

# Use Cases

## zh

- 用代理开发 Azure 应用
- 让代理使用最新的 SDK 写法
- 为团队提供统一的代理配置

## en

- Building Azure applications with an agent
- Keeping agents on current SDK patterns
- Sharing one agent setup across a team

# Installation

```bash
npx skills add microsoft/skills
```

# Usage

## zh

运行安装向导，只选当前项目用得到的技能。技能会装到所选代理的目录，例如 GitHub Copilot 的 .github/skills。不要全部安装。

## en

Run the wizard and pick only what the current project needs. Skills install into the chosen agent's directory, such as .github/skills for GitHub Copilot. Do not install everything.

# Workflow

## zh

1. 在技能浏览器查找所需技能
2. 运行安装向导
3. 只选择当前项目用到的技能
4. 开发时检查代理使用的 SDK 写法

## en

1. Find skills in the explorer
2. Run the install wizard
3. Pick only what the project uses
4. Check the SDK patterns the agent uses

# Changelog

## TODO | 2026-11-04

### zh

仓库未发布带版本号的 Release，此处记录最近一次更新日期。请查看提交历史了解变更。

### en

The repository publishes no versioned releases; this records the most recent update date. See the commit history for changes.

# FAQ

## Question 1

### question.zh

可以全部安装吗？

### question.en

Can I install everything?

### answer.zh

不建议。README 明确提醒全部加载会造成上下文退化，只安装当前项目必需的技能。

### answer.en

Not recommended. The README warns that loading everything degrades context, so install only what the project needs.

## Question 2

### question.zh

内容稳定吗？

### question.en

Is the content stable?

### answer.zh

仓库标注为开发中，技能仍在增加和更新，使用前请核对具体内容。

### answer.en

The repository is marked work in progress and skills are still changing, so check specifics before relying on them.
