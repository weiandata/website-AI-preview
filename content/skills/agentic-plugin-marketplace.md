---
schemaVersion: 1
status: published
slug: agentic-plugin-marketplace
name: Agentic Plugin Marketplace
nameZh: 智能体插件市场
category: automation
tags:
  - Plugin Marketplace
  - Subagents
  - Workflow
platforms:
  - Claude Code
  - Codex
  - Cursor
  - OpenCode
  - GitHub Copilot
author: wshobson
version: TODO
license: MIT
addedAt: 2026-07-19
updatedAt: 2026-07-18
githubUrl: https://github.com/wshobson/agents
officialUrl: https://sethhobson.com
downloadUrl: https://github.com/wshobson/agents/archive/refs/heads/main.zip
featured: false
featuredRank: 0
verified: false
icon: automation
stars: 38038
downloads: 0
---

# Description

## zh

一个成建制的插件市场，包含九十多个插件、两百多个专项代理和上百个技能与命令，一份源码同时供五种代理环境使用。

## en

A substantial plugin marketplace of over ninety plugins, two hundred-plus specialist agents, and a hundred-plus skills and commands, serving five agent harnesses from a single source.

# Long Description

## zh

它解决的是「装一堆零散技能」之后的混乱：内容按插件组织，每个插件对应一类工作，比如 Python 开发、前端、数据处理，装一个就把相关的代理、技能和命令一并装好，不必自己拼凑。规模不小——九十多个插件、两百多个代理、一百七十多个技能、一百多个命令。工程上值得一提的是它只维护一份 Markdown 源，然后为每种代理环境生成符合各自习惯的产物，而不是取最小公约数做统一翻译，所以在 Claude Code、Codex、Cursor、OpenCode 和 GitHub Copilot 里用起来都贴合各自的方式。仓库提供了能力对照表，说明各环境支持到什么程度。

## en

It addresses the mess that follows from installing a pile of loose skills: content is organised into plugins, each covering a kind of work — Python development, frontend, data handling — so installing one brings its agents, skills, and commands together rather than leaving you to assemble them. The scale is considerable: over ninety plugins, more than two hundred agents, a hundred and seventy-plus skills, and a hundred-plus commands. Notably, it maintains one Markdown source and generates harness-native artefacts for each target rather than lowest-common-denominator translations, so it feels idiomatic in Claude Code, Codex, Cursor, OpenCode, and GitHub Copilot alike. The repository publishes a capability matrix showing how far each harness is supported.

# Features

## zh

- 九十多个插件，按工作类型组织，装一个即配齐
- 两百多个专项代理，一百七十多个技能
- 一份源码，为五种代理环境分别生成贴合的产物
- 提供各环境的能力对照表
- 可通过插件市场按需安装，不必全量装入

## en

- Over ninety plugins organised by kind of work, each self-contained
- More than two hundred specialist agents and 170-plus skills
- One source generating harness-native artefacts for five targets
- Publishes a capability matrix for each harness
- Installable plugin by plugin rather than all at once

# Use Cases

## zh

- 想一次配齐某个方向的完整工具，而不是零散安装
- 团队使用多种代理工具，希望能力保持一致
- 需要针对特定语言或框架的专项代理
- 想看看成熟的技能与代理是怎么组织的

## en

- Equipping a whole area of work at once instead of installing piecemeal
- Teams on several different agent tools that should behave consistently
- Needing specialist agents for a particular language or framework
- Studying how a mature set of skills and agents is organised

# Installation

```bash
/plugin marketplace add wshobson/agents
```

```bash
/plugin install python-development
```

# Usage

## zh

先把仓库注册为插件市场，再按需要安装具体插件，例如做 Python 开发就装对应插件，它会把相关的代理、技能和命令一并配好。不必全部装上，按当前工作方向选择即可。使用其他代理环境时，参照仓库的能力对照表确认支持范围。

## en

Register the repository as a plugin marketplace, then install the plugins you need — installing the Python development plugin, for instance, brings its agents, skills, and commands together. There is no need to take everything; pick by the work in front of you. On other harnesses, check the capability matrix for what is supported.

# Workflow

## zh

1. 把仓库注册为插件市场
2. 浏览插件列表，按工作方向挑选
3. 安装所需插件
4. 正常提出需求，相关代理与技能自动介入
5. 换环境时对照能力表确认支持情况

## en

1. Register the repository as a plugin marketplace
2. Browse the plugin list and pick by the work you do
3. Install the plugins you need
4. Work as usual; the relevant agents and skills step in
5. Check the capability matrix when moving to another harness

# Changelog

## TODO | 2026-07-18

### zh

仓库未发布带版本号的 Release，此处记录最近一次更新日期。请查看提交历史了解变更。

### en

The repository publishes no versioned releases; this records the most recent update date. See the commit history for changes.

# FAQ

## Question 1

### question.zh

必须把全部插件都装上吗？

### question.en

Do I have to install all the plugins?

### answer.zh

不必。它是按插件组织的市场，可以只装当前用得上的那几个。每个插件自带相关的代理、技能和命令，互相独立。

### answer.en

No. It is organised as a marketplace, so you install only the plugins you need. Each is self-contained, bringing its own agents, skills, and commands.

## Question 2

### question.zh

在非 Claude Code 的环境里功能一样吗？

### question.en

Are the capabilities the same outside Claude Code?

### answer.zh

不完全一样。它以 Claude Code 为原生目标，同时为 Codex、Cursor、OpenCode 和 GitHub Copilot 生成各自贴合的产物，但各环境本身能力有差异。仓库提供了能力对照表，安装前可以先查。

### answer.en

Not identically. Claude Code is the native target, with harness-native artefacts generated for Codex, Cursor, OpenCode, and GitHub Copilot, but the harnesses themselves differ in capability. The repository's capability matrix is worth checking first.
