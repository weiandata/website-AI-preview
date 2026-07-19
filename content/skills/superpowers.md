---
schemaVersion: 1
status: published
slug: superpowers
name: Superpowers
nameZh: Superpowers 开发方法论
category: development
tags:
  - Agent Skills
  - Development Methodology
  - TDD
  - Subagents
platforms:
  - Claude Code
  - Codex
  - Cursor
  - GitHub Copilot
  - OpenCode
author: obra
version: 6.1.1
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-07-17'
githubUrl: 'https://github.com/obra/superpowers'
officialUrl: ''
downloadUrl: 'https://github.com/obra/superpowers/archive/refs/heads/main.zip'
featured: true
featuredRank: 1
verified: true
icon: code
stars: 257267
---
# Description

## zh

一套完整的软件开发方法论，由可组合的技能构成，让编程代理在动手写代码前先厘清需求、给出计划，再分步实现。

## en

A complete software development methodology built from composable skills, so a coding agent clarifies the requirement and agrees on a plan before it starts writing code.

# Long Description

## zh

Superpowers 把资深工程师的工作方式固化成一组会自动触发的技能。代理看到你要构建东西时不会直接开写，而是先追问你真正想解决什么，把讨论收敛成一份规格，再分成小段让你逐段确认。你签字之后，它才生成实施计划，并强调红绿 TDD、YAGNI 和 DRY 三条原则。计划确认后，它启动子代理逐个任务推进，边做边自检和复查。技能是自动触发的，日常使用不需要额外记命令。

## en

Superpowers encodes how experienced engineers work as a set of skills that fire automatically. Rather than jumping straight to code, the agent asks what you are actually trying to do, distils the conversation into a spec, and shows it back in chunks short enough to read. Only after you sign off does it produce an implementation plan, built around red/green TDD, YAGNI, and DRY. Once you approve, it runs a subagent-driven process that works through each task while inspecting and reviewing its own output. The skills trigger on their own, so there are no extra commands to memorise.

# Features

## zh

- 先问清需求再动手，把对话收敛成可确认的规格
- 生成足够具体的实施计划，强调红绿 TDD、YAGNI 和 DRY
- 子代理逐任务推进，过程中自检与复查
- 技能自动触发，不需要手动记命令
- 支持十种以上的代理环境，可分别安装

## en

- Settles the requirement before coding and turns the conversation into a spec you approve
- Produces an implementation plan concrete enough to follow, built on red/green TDD, YAGNI, and DRY
- Drives work through subagents task by task, inspecting and reviewing along the way
- Skills fire automatically, so there are no commands to memorise
- Installs separately into more than ten different agent harnesses

# Use Cases

## zh

- 需求还没想清楚就想开工，希望先被追问一轮
- 希望代理按 TDD 推进而不是先写实现再补测试
- 较大的改动需要一份能逐段确认的计划
- 想让代理长时间自主推进而不偏离既定计划

## en

- Starting a task whose requirement is still fuzzy and needs to be questioned first
- Wanting the agent to work test-first instead of retrofitting tests afterwards
- Larger changes that need a plan you can approve section by section
- Letting the agent run autonomously for a stretch without drifting from the agreed plan

# Installation

```bash
/plugin install superpowers@claude-plugins-official
```

# Usage

## zh

安装后不需要额外调用。当你提出要构建或修改某个功能时，相关技能会自动介入：先与你确认需求和设计，再给出实施计划，等你说「开始」之后才进入子代理驱动的实现阶段。每种代理环境要单独安装一次。

## en

Nothing to invoke once installed. When you ask to build or change something, the relevant skills step in on their own: they settle the requirement and design with you, present an implementation plan, and only enter the subagent-driven build phase after you say go. Install it separately for each harness you use.

# Workflow

## zh

1. 在你的代理环境中安装插件
2. 提出你想构建或修改的东西
3. 回答代理关于需求的追问，确认收敛出的规格
4. 逐段审阅实施计划并签字
5. 说「开始」，让子代理逐任务实现并自检

## en

1. Install the plugin into your agent harness
2. Describe what you want to build or change
3. Answer the agent's questions and approve the resulting spec
4. Review the implementation plan section by section and sign off
5. Say go, and let subagents implement and verify task by task

# Changelog

## 6.1.1 | 2026-07-17

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

它和直接给代理写一份 CLAUDE.md 有什么区别？

### question.en

How is this different from just writing a CLAUDE.md for my agent?

### answer.zh

CLAUDE.md 是一段静态说明，代理读到多少、遵守多少并不确定。Superpowers 是一组会按情境自动触发的技能，把「先定规格、再定计划、然后 TDD 实现」这条流程拆成各自独立的步骤，并在过程中安排复查。

### answer.en

A CLAUDE.md is static prose, and how much of it the agent honours is uncertain. Superpowers is a set of skills that trigger by situation, splitting spec-then-plan-then-test-driven-implementation into discrete steps and scheduling review along the way.

## Question 2

### question.zh

只能配合 Claude Code 使用吗？

### question.en

Does it only work with Claude Code?

### answer.zh

不是。仓库说明列出了 Claude Code、Codex、Cursor、GitHub Copilot CLI、OpenCode 等十种以上的环境。如果你同时用多个，需要为每个环境分别安装一次。

### answer.en

No. The repository documents installation for more than ten harnesses including Claude Code, Codex, Cursor, GitHub Copilot CLI, and OpenCode. If you use several, install it once per harness.
