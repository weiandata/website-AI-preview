---
schemaVersion: 1
status: published
slug: understand-anything
name: Understand Anything
nameZh: Understand Anything 代码知识图谱
category: development
tags: [Code Understanding, Knowledge Graph, Onboarding]
platforms: [Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI]
author: Egonex-AI
version: 2.9.0
license: MIT
addedAt: '2026-11-04'
updatedAt: '2026-10-26'
githubUrl: 'https://github.com/Egonex-AI/Understand-Anything'
officialUrl: ''
downloadUrl: 'https://github.com/Egonex-AI/Understand-Anything/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: code
stars: 90453
---
# Description

## zh

把代码库、知识库或文档转成可探索、可搜索、可提问的交互式知识图谱。

## en

Turns a codebase, knowledge base, or set of documents into an interactive knowledge graph you can explore, search, and question.

# Long Description

## zh

这个插件用多代理流程分析项目，为文件、函数、类和依赖关系建立知识图谱，再通过可视化面板展示。它面向的典型场景是刚接手一个大型陌生代码库。除了代码，它也能处理按 Karpathy 模式组织的 LLM 知识库。首次分析会读取整个代码库，大项目的 token 消耗可能很高。

## en

This plugin analyses a project with a multi-agent pipeline, builds a knowledge graph of files, functions, classes, and dependencies, and presents it in a visual dashboard. The typical case is joining a large, unfamiliar codebase. Beyond code it also handles LLM wikis organised on the Karpathy pattern. The first analysis reads the whole codebase, so token use on large projects can be significant.

# Features

## zh

- 多代理流程构建代码知识图谱
- /understand-dashboard 打开可视化面板
- /understand-chat 针对项目提问
- /understand-knowledge 处理 LLM 知识库
- --language 指定输出语言，支持中文

## en

- A multi-agent pipeline that builds the code knowledge graph
- /understand-dashboard opens the visual dashboard
- /understand-chat answers questions about the project
- /understand-knowledge handles LLM wikis
- --language sets the output language, including Chinese

# Use Cases

## zh

- 加入新团队后快速了解大型代码库
- 追踪某条业务流程涉及哪些模块
- 把项目结构讲解给新成员

## en

- Getting oriented in a large codebase on a new team
- Tracing which modules a business flow touches
- Explaining project structure to new members

# Installation

```bash
/plugin marketplace add Egonex-AI/Understand-Anything
```

```bash
/plugin install understand-anything
```

# Usage

## zh

在 Claude Code 中注册插件市场并安装，然后运行 /understand 分析项目，用 /understand-dashboard 查看图谱，用 /understand-chat 提问，例如询问支付流程如何工作。其他代理可使用仓库提供的安装脚本。

## en

Register the marketplace and install in Claude Code, then run /understand to analyse the project, /understand-dashboard to view the graph, and /understand-chat to ask questions, such as how the payment flow works. Other agents can use the repository's install script.

# Workflow

## zh

1. 安装插件
2. 运行 /understand 分析项目
3. 打开面板查看图谱
4. 用 /understand-chat 提问
5. 代码变化后重新分析

## en

1. Install the plugin
2. Run /understand to analyse the project
3. Open the dashboard to view the graph
4. Ask questions with /understand-chat
5. Re-run the analysis after the code changes

# Changelog

## 2.9.0 | 2026-07-10

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

首次分析会很贵吗？

### question.en

Is the first analysis expensive?

### answer.zh

可能。README 提醒首次 /understand 会分析整个代码库，大项目会消耗大量 token。

### answer.en

It can be. The README warns that the first /understand analyses the whole codebase and can consume many tokens on large projects.

## Question 2

### question.zh

输出可以用中文吗？

### question.en

Can the output be in Chinese?

### answer.zh

可以，使用 /understand --language zh。首次运行时它也会检测你使用的语言。

### answer.en

Yes, with /understand --language zh. On a first run it also detects the language you are using.
