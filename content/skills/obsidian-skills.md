---
schemaVersion: 1
status: published
slug: obsidian-skills
name: Obsidian Skills
nameZh: Obsidian 笔记技能
category: productivity
tags:
  - Obsidian
  - Notes
  - Knowledge Management
platforms:
  - Claude Code
  - Codex
  - OpenCode
author: kepano
version: TODO
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-06-08'
githubUrl: 'https://github.com/kepano/obsidian-skills'
officialUrl: ''
downloadUrl: 'https://github.com/kepano/obsidian-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: productivity
stars: 42577
downloads: 0
---
# Description

## zh

让 AI 直接操作你的 Obsidian 笔记库的一组技能，按开放标准编写，多种代理环境通用。

## en

A set of skills that lets an AI work directly with your Obsidian vault, written to the open standard so any compatible agent can use them.

# Long Description

## zh

笔记库用久了会遇到同一个问题：东西都记下来了，但要找、要整理、要串起来时全靠手工。这组技能把 Obsidian 交给 AI 来操作，让它能读取笔记、建立关联、按你的组织方式整理内容，而不是只能靠你逐条翻找。它遵循 Agent Skills 开放规范编写，因此不限定某一个工具，Claude Code、Codex 和 Open Code 等支持该规范的环境都能使用。作者是 Obsidian 团队的成员，技能对这个工具本身的组织方式理解得比较到位。安装方式提供插件市场和命令行两种。

## en

Any long-lived vault runs into the same problem: everything is written down, but finding, tidying, and connecting it stays manual. These skills hand Obsidian to an AI so it can read notes, build links, and organise content the way you structure it, instead of leaving you to page through entries by hand. They follow the open Agent Skills specification, so they are not tied to one tool — Claude Code, Codex, and Open Code all work. The author is part of the Obsidian team, and the skills reflect a close understanding of how the tool is meant to be organised. Installation is available through a plugin marketplace or the command line.

# Features

## zh

- 让 AI 直接读写你的 Obsidian 笔记库
- 遵循 Agent Skills 开放规范，不绑定特定工具
- 支持插件市场与命令行两种安装方式
- 由 Obsidian 团队成员编写
- 尊重笔记库既有的组织方式

## en

- Lets an AI read and write your Obsidian vault directly
- Follows the open Agent Skills specification rather than one tool
- Installable through a plugin marketplace or the command line
- Written by a member of the Obsidian team
- Respects how your vault is already organised

# Use Cases

## zh

- 笔记积累多了，想让 AI 帮忙梳理和建立关联
- 按主题把散落的笔记汇总成一篇
- 让 AI 基于你自己的笔记回答问题
- 整理会议记录或读书笔记

## en

- A vault grown large enough that linking and tidying needs help
- Pulling scattered notes on a topic into one piece
- Having an AI answer from your own notes
- Cleaning up meeting notes or reading notes

# Installation

```bash
/plugin marketplace add kepano/obsidian-skills
```

```bash
npx skills add kepano/obsidian-skills
```

# Usage

## zh

安装后向代理说明你要做什么，例如把某个主题的笔记汇总起来、给某几篇建立关联、或者基于笔记回答某个问题。它会按你笔记库的既有结构操作。建议先在副本或不重要的笔记上试一次，确认行为符合预期再用于主库。

## en

Once installed, say what you need — gather notes on a topic, link a few pieces together, or answer a question from what you have written. It works within your vault's existing structure. Try it on a copy or on notes that do not matter first, and move to your main vault once the behaviour matches your expectations.

# Workflow

## zh

1. 通过插件市场或命令行安装
2. 确认代理有权限访问你的笔记库
3. 先在不重要的笔记上试用
4. 说明要整理、汇总还是查询
5. 检查改动是否符合你的组织习惯

## en

1. Install through the marketplace or the CLI
2. Confirm the agent can reach your vault
3. Try it first on notes that do not matter
4. Say whether you want tidying, gathering, or a query
5. Check the changes fit how you organise things

# Changelog

## TODO | 2026-06-08

### zh

仓库未发布带版本号的 Release，此处记录最近一次更新日期。请查看提交历史了解变更。

### en

The repository publishes no versioned releases; this records the most recent update date. See the commit history for changes.

# FAQ

## Question 1

### question.zh

会不会改乱我的笔记？

### question.en

Could it disturb my notes?

### answer.zh

它确实有写入笔记库的能力，所以建议先在副本或不重要的笔记上试一次。如果笔记库已经纳入版本控制或有备份，改动出问题时可以回退。

### answer.en

It genuinely can write to your vault, so try it first on a copy or on notes that do not matter. If your vault is under version control or backed up, an unwanted change can be undone.

## Question 2

### question.zh

只能配合 Claude Code 使用吗？

### question.en

Is it limited to Claude Code?

### answer.zh

不是。它按 Agent Skills 开放规范编写，仓库明确说明任何支持该规范的代理都能使用，包括 Claude Code、Codex 和 Open Code。

### answer.en

No. It follows the open Agent Skills specification, and the repository states that any skills-compatible agent can use it, naming Claude Code, Codex, and Open Code.
