---
schemaVersion: 1
status: published
slug: yahoo-finance2
name: yahoo-finance2
nameZh: 雅虎财经数据接口
category: data-analytics
tags:
  - Market Data
  - API
  - TypeScript
  - CLI
platforms:
  - Claude Code
  - Codex
author: Gadi Cohen
version: 4.0.0
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-07-14'
githubUrl: 'https://github.com/gadicc/yahoo-finance2'
officialUrl: ''
downloadUrl: 'https://github.com/gadicc/yahoo-finance2/archive/refs/heads/dev.zip'
featured: false
featuredRank: 0
verified: true
icon: analysis
stars: 767
downloads: 0
---
# Description

## zh

取用雅虎财经公开数据的非官方接口，同时提供命令行工具、MCP 服务和 Agent Skill 三种用法，让 AI 能直接查行情与公司数据。

## en

An unofficial interface to Yahoo Finance's public data, shipping a CLI, an MCP server, and an Agent Skill so an AI can look up quotes and company data directly.

# Long Description

## zh

分析要用数据，而拿数据这一步常常卡在接口上。这个项目把雅虎财经的公开数据整理成一致的调用方式，用 TypeScript 编写并带完整类型定义，既可以在自己的程序里当库用，也可以直接在命令行查，还能作为 Agent Skill 让 AI 自己去取。它是非官方项目，数据来自雅虎财经的公开接口，因此可用性取决于对方是否变更，用于正式用途前要考虑这一点。当前主版本是 v4，仓库名和分支都做过重命名，默认分支现在是 dev。

## en

Analysis needs data, and fetching it is often where things stall. This project wraps Yahoo Finance's public data in a consistent interface, written in TypeScript with full type definitions, usable as a library in your own code, straight from the command line, or as an Agent Skill so an AI can fetch on its own. It is unofficial: the data comes from Yahoo Finance's public endpoints, so availability depends on changes at their end — worth weighing before relying on it. The current major version is v4, and note the repository and its branches were renamed, with dev now the default branch.

# Features

## zh

- 一套接口覆盖行情、公司信息等常见查询
- 同时提供库、命令行、MCP 服务与 Agent Skill 四种用法
- TypeScript 编写，带完整类型定义
- 支持多种运行环境
- 通过语义化版本发布，升级路径有文档说明

## en

- One interface covering quotes, company information, and other common lookups
- Usable as a library, a CLI, an MCP server, or an Agent Skill
- Written in TypeScript with complete type definitions
- Runs across several JavaScript runtimes
- Released with semantic versioning and documented upgrade notes

# Use Cases

## zh

- 让 AI 在分析过程中自己去查行情数据
- 自己写脚本或程序时需要一个现成的财经数据接口
- 在命令行里快速查一个代码的当前数据
- 搭建需要行情输入的小工具或看板

## en

- Letting an AI fetch market data on its own during analysis
- Needing a ready-made finance data interface in your own script or app
- Checking a ticker's current data quickly from the command line
- Building a small tool or dashboard that needs quote input

# Installation

```bash
npm install yahoo-finance2
```

# Usage

## zh

作为 Agent Skill 安装后，AI 在需要行情或公司数据时会自己调用它。作为库使用时按 npm 包安装并引入，类型定义会随包提供。命令行用法和各接口的参数在仓库文档里有完整说明。从 v3 升级请先看仓库的升级说明。

## en

Installed as an Agent Skill, your AI calls it whenever it needs quotes or company data. As a library, install the npm package and import it; the type definitions ship with it. CLI usage and the parameters for each endpoint are documented in the repository. If you are coming from v3, read the upgrade notes first.

# Workflow

## zh

1. 按你的用法安装：npm 包、命令行或 Agent Skill
2. 确定要查的代码与数据类型
3. 发起查询并取回结果
4. 核对关键数字的时效性
5. 把数据接入你的分析或工具

## en

1. Install the way you intend to use it: npm package, CLI, or Agent Skill
2. Decide which ticker and which kind of data you need
3. Run the query and collect the result
4. Check how current the key figures are
5. Feed the data into your analysis or tool

# Changelog

## 4.0.0 | 2026-07-14

### zh

对应仓库当前发布的主版本。从 v3 升级请查看仓库中的升级说明文档。

### en

Matches the current major release. See the repository's upgrade notes when moving from v3.

# FAQ

## Question 1

### question.zh

这是雅虎官方的接口吗？

### question.en

Is this an official Yahoo interface?

### answer.zh

不是。仓库说明中写明它是非官方项目，数据来自雅虎财经的公开接口。这意味着对方调整接口时可能受影响，用在正式业务上要考虑这个风险。

### answer.en

No. The repository describes it as unofficial, drawing on Yahoo Finance's public endpoints. That means changes on their side can break it, which is worth weighing before depending on it in production.

## Question 2

### question.zh

下载链接为什么指向 dev 分支？

### question.en

Why does the download point at a dev branch?

### answer.zh

这是该仓库的默认分支。仓库名从 node-yahoo-finance2 改成 yahoo-finance2 时，分支也一并重命名，原来的 master 变成 main、devel 变成 dev，目前以 dev 为默认分支。

### answer.en

That is the repository's default branch. When it was renamed from node-yahoo-finance2, the branches were renamed too — master became main and devel became dev, with dev now serving as the default.
