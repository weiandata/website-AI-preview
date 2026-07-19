---
schemaVersion: 1
status: published
slug: storybloq
name: Storybloq
nameZh: 跨会话上下文管理
category: development
tags:
  - Context Persistence
  - Session Handover
  - MCP Server
  - Project Tracking
platforms:
  - Claude Code
  - Codex
author: Storybloq
version: 1.7.0
license: PolyForm-Shield-1.0.0
addedAt: '2026-07-19'
updatedAt: '2026-07-16'
githubUrl: 'https://github.com/Storybloq/storybloq'
officialUrl: 'https://www.storybloq.com'
downloadUrl: 'https://github.com/Storybloq/storybloq/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 669
---
# Description

## zh

用一个 .story 目录保存工单、问题、路线图和会话交接记录，让每次新开的编程会话不必从零开始。

## en

Keeps tickets, issues, roadmap, and session handovers in a .story directory so each new coding session starts from what came before instead of from zero.

# Long Description

## zh

编程助手是无状态的：每开一个新会话，它都不知道昨天做了什么、哪里还坏着、当初为什么那么决定、接下来该做什么。大家通常靠 CLAUDE.md 和散落的笔记来弥补，但没有统一结构，也没有会话之间的延续和配套工具。真正的代价不是重新交代背景花的那点时间，而是重复踩同一个坑、把已经定过的设计再吵一遍、以及凭空编出来的上下文——工作因此变成线性的，而不是累积的。Storybloq 给每个项目一个 .story 目录，用 JSON 和 Markdown 记录工单、问题、路线图阶段、会话交接和经验教训，纳入 Git 管理，任何 AI 都能读。它同时提供命令行工具、MCP 服务和技能三种接入方式。

## en

Coding assistants are stateless: every new session starts blank, with no idea what was built yesterday, what is broken, which decisions were made, or what to do next. People compensate with CLAUDE.md files and scattered notes, but there is no standard structure, no continuity between sessions, and no tooling around it. The real cost is not the setup time but the repeated mistakes, the relitigated design decisions, and the hallucinated context, which make work linear instead of compounding. Storybloq gives each project a .story directory holding tickets, issues, roadmap phases, session handovers, and lessons learned as JSON and Markdown, tracked by git and readable by any AI. It ships as a CLI, an MCP server, and a skill.

# Features

## zh

- 用 .story 目录统一保存项目上下文
- 记录工单、问题、路线图阶段与经验教训
- 会话交接有固定结构，新会话可直接接手
- 文件纳入 Git 管理，变更可追溯
- 同时提供命令行、MCP 服务与技能三种接入方式

## en

- A single .story directory holding the project's context
- Tracks tickets, issues, roadmap phases, and lessons learned
- Structured session handovers a new session can pick up directly
- Files are tracked by git, so changes stay reviewable
- Available as a CLI, an MCP server, and a skill

# Use Cases

## zh

- 项目跨越多天多次会话，每次都要重新交代背景
- 同一个设计决定被反复讨论，想留下依据
- 多人或多环境协作，需要共享同一份上下文
- 希望助手知道下一步该做什么，而不是每次问你

## en

- Projects spanning many sessions where context is re-explained each time
- Design decisions that keep getting relitigated and need a written record
- Several people or harnesses that need to share the same context
- Wanting the assistant to know what comes next instead of asking every time

# Installation

```bash
npm install -g @storybloq/storybloq
```

# Usage

## zh

在项目里初始化 .story 目录后，把工单、已知问题和路线图写进去。会话结束时留下交接记录，下次开新会话时助手读取这个目录即可接上进度。可以按需选择命令行、MCP 服务或技能的方式接入，文件本身是 JSON 和 Markdown，必要时直接编辑也可以。

## en

Initialise the .story directory in your project and record tickets, known issues, and the roadmap there. Leave a handover at the end of a session, and the next session picks up by reading the directory. Use whichever entry point suits you — CLI, MCP server, or skill — and since the files are plain JSON and Markdown, editing them by hand is always an option.

# Workflow

## zh

1. 全局安装并在项目中初始化 .story 目录
2. 录入当前的工单、问题与路线图阶段
3. 正常进行编程会话
4. 会话结束时写下交接记录与经验教训
5. 下次开新会话，让助手先读 .story 再动手

## en

1. Install globally and initialise .story in the project
2. Record current tickets, issues, and roadmap phases
3. Work through your coding session as usual
4. Write a handover and any lessons learned as the session ends
5. Have the next session read .story before starting work

# Changelog

## 1.7.0 | 2026-07-16

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

它和在 CLAUDE.md 里写项目说明有什么不同？

### question.en

How is this different from writing project notes in CLAUDE.md?

### answer.zh

CLAUDE.md 是一份自由格式的说明，没有固定结构，也不区分工单、问题和交接。Storybloq 给这些内容各自的位置和格式，并配了命令行与 MCP 服务来读写，所以新会话能按结构接手而不是通读一篇散文。

### answer.en

A CLAUDE.md is free-form prose with no structure and no separation between tickets, issues, and handovers. Storybloq gives each of those its own place and format, with a CLI and MCP server to read and write them, so a new session can pick up structurally rather than by reading an essay.

## Question 2

### question.zh

许可证是什么？可以商用吗？

### question.en

What is the licence, and can it be used commercially?

### answer.zh

仓库采用 PolyForm Shield 1.0，这不是标准的开源许可证，它限制用于与本项目竞争的用途。商用前请阅读仓库中的 LICENSE 原文确认。

### answer.en

The repository uses PolyForm Shield 1.0, which is not a standard open-source licence and restricts uses that compete with the project. Read the LICENSE file in the repository before commercial use.
