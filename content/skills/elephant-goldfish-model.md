---
schemaVersion: 1
status: published
slug: elephant-goldfish-model
name: Elephant Goldfish Model
nameZh: 大象金鱼模型设计评审
category: development
tags: [Software Design, Spec Review, Subagents]
platforms: [Claude Code, Codex, Antigravity]
author: Google
version: 0.1.0
license: Apache-2.0
addedAt: '2026-11-04'
updatedAt: '2026-11-03'
githubUrl: 'https://github.com/google/elephant-goldfish-model'
officialUrl: 'https://egm.dev'
downloadUrl: 'https://github.com/google/elephant-goldfish-model/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: code
stars: 11522
---
# Description

## zh

用掌握完整背景的代理起草设计，再用没有上下文的代理审查，在写代码前发现盲点。

## en

Drafts designs with a context-rich agent and reviews them with zero-context agents, exposing blind spots before code is written.

# Long Description

## zh

这个插件来自 Google。“大象”持有项目背景并起草规格，“金鱼”评审者只看草稿和引用的材料，不看之前的对话，从而暴露没写明的假设，架构决定仍由人来做。仓库称有数千名 Google 工程师在使用。它适合需要先做设计决策的功能，简单明确的缺陷修复按常规流程处理即可。目前版本是 0.1.0，还处于早期。

## en

This plugin comes from Google. The elephant holds project context and drafts the specification, while goldfish reviewers see only the draft and referenced material, not the earlier conversation, which exposes unstated assumptions. People still make the architectural decisions. The repository says thousands of Google engineers use it. It suits features that need design decisions; for a small, clear bug fix use your normal workflow. At version 0.1.0 it is still early.

# Features

## zh

- 带完整背景的代理起草规格
- 零上下文子代理独立评审
- 暴露未说明的假设和盲点
- 架构决定由人保留
- 支持多种编程代理

## en

- A context-rich agent drafts the specification
- Zero-context subagents review independently
- Exposes unstated assumptions and blind spots
- Architectural decisions stay with people
- Works across several coding agents

# Use Cases

## zh

- 开发前为新功能写设计文档
- 检查规格是否依赖没写明的假设
- 在团队中建立统一的设计评审流程

## en

- Writing a design document before building a feature
- Checking whether a spec relies on unstated assumptions
- Establishing one design review process for a team

# Installation

```bash
claude plugin marketplace add google/elephant-goldfish-model
```

```bash
claude plugin install egm@egm
```

# Usage

## zh

安装完整插件后开启新会话，这样技能才能读取评审提示词和文档标准。Codex 使用 codex plugin 命令，Antigravity 使用 agy plugin install。然后描述要设计的功能，审阅评审意见并做出决定。

## en

Install the complete plugin and start a new session so its skills can read the reviewer prompts and document standards. Codex uses the codex plugin commands and Antigravity uses agy plugin install. Then describe the feature, read the review, and make the decisions.

# Workflow

## zh

1. 安装插件并开启新会话
2. 描述需要设计的功能
3. 由大象代理起草规格
4. 由金鱼代理独立评审
5. 由人决定架构后开始实现

## en

1. Install the plugin and start a new session
2. Describe the feature to design
3. Let the elephant agent draft the specification
4. Let goldfish agents review it independently
5. Decide the architecture, then build

# Changelog

## 0.1.0 | 2026-10-27

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

小改动也要用吗？

### question.en

Should I use it for small changes?

### answer.zh

不需要。README 建议它用于需要设计决策的功能，简单明确的缺陷修复走常规流程。

### answer.en

No. The README recommends it for features that need design decisions; use your normal workflow for a small, clear bug fix.

## Question 2

### question.zh

为什么评审者不看之前的对话？

### question.en

Why do reviewers skip the earlier conversation?

### answer.zh

这是方法的核心：没有上下文的评审者更容易发现草稿里没写明的假设。

### answer.en

That is the core of the method: reviewers without context more readily spot assumptions the draft leaves unstated.
