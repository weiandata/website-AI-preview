---
schemaVersion: 1
status: published
slug: pm-skills
name: PM Skills
nameZh: 产品管理技能集
category: productivity
tags:
  - Product Management
  - Strategy
  - Discovery
  - Workflow
platforms:
  - Claude Code
author: phuryn
version: 2.1.0
license: MIT
addedAt: 2026-07-19
updatedAt: 2026-07-03
githubUrl: https://github.com/phuryn/pm-skills
officialUrl: https://www.productcompass.pm/p/pm-skills-2-red-team-ship
downloadUrl: https://github.com/phuryn/pm-skills/archive/refs/heads/main.zip
featured: false
featuredRank: 0
verified: false
icon: productivity
stars: 23990
downloads: 0
---

# Description

## zh

面向产品经理的技能集，六十多个技能和四十多条串联好的工作流，覆盖从需求发现、策略制定到执行、发布和增长的完整链路。

## en

A product management skill set of sixty-plus skills and forty-plus chained workflows, spanning discovery, strategy, execution, launch, and growth.

# Long Description

## zh

产品工作难在流程本身不确定：同样是「要不要做这个功能」，有人从用户访谈入手，有人先看数据，有人直接写需求文档。这套技能把产品管理各阶段的常规方法整理成可调用的步骤，并按九个插件分组，每个插件对应一类工作。真正好用的是它把技能串成了工作流——不是给你一堆孤立的方法，而是从一个起点带着走完一段完整流程。入口设计得很直接：有新想法就用发现相关的命令，需要理清战略方向就用策略相关的命令。主要面向 Claude Code 和 Cowork，技能本身也兼容其他 AI 助手。

## en

Product work is hard partly because the process itself is unsettled: faced with "should we build this", one person starts from user interviews, another from the data, another straight into a spec. This set turns the standard methods of each product stage into callable steps, grouped into nine plugins by kind of work. What makes it useful is that the skills are chained into workflows — not a pile of isolated techniques, but a path that carries you through a complete stretch from a single starting point. The entry points are direct: a new idea starts with discovery, a need for direction starts with strategy. It targets Claude Code and Cowork, with the skills themselves compatible with other AI assistants.

# Features

## zh

- 六十多个技能，按九个插件分组
- 四十多条串联好的工作流，而非孤立方法
- 覆盖发现、策略、执行、发布、增长各阶段
- 入口命令直接，按当前处境选择
- 有配套的相关项目可一并使用

## en

- Sixty-plus skills grouped into nine plugins
- Forty-plus chained workflows rather than isolated techniques
- Covers discovery, strategy, execution, launch, and growth
- Direct entry commands chosen by the situation you are in
- Companion projects available alongside it

# Use Cases

## zh

- 有个新想法，需要系统验证而不是凭感觉判断
- 战略方向不清晰，需要理出优先级
- 要写需求文档或发布计划，希望结构完整
- 想学产品管理的常规方法，看专业流程怎么走

## en

- A new idea that needs systematic validation rather than gut feel
- Unclear direction that needs priorities worked out
- Writing a spec or launch plan and wanting the structure complete
- Learning standard product methods by seeing how the process runs

# Installation

```bash
/plugin marketplace add phuryn/pm-skills
```

# Usage

## zh

按你当前的处境选择入口：有新想法就从发现流程开始，需要理清方向就从策略流程开始。它会带你走完对应的完整链路，而不是只给出一个建议就结束。产出的是可以继续加工的材料，最终判断仍然由你来做。

## en

Pick the entry point that matches where you are: a new idea starts with discovery, unclear direction starts with strategy. It carries you through the corresponding chain rather than offering one suggestion and stopping. What comes out is material you keep working on; the judgement remains yours.

# Workflow

## zh

1. 通过插件市场安装
2. 判断当前处于产品流程的哪个阶段
3. 用对应的入口命令启动工作流
4. 按步骤提供你掌握的信息
5. 基于产出做出自己的决策

## en

1. Install through the plugin marketplace
2. Identify which stage of the product process you are in
3. Start the workflow with the matching entry command
4. Supply what you know as each step asks for it
5. Make your own decision from what it produces

# Changelog

## 2.1.0 | 2026-07-03

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

只能配合 Claude Code 使用吗？

### question.en

Is it only for Claude Code?

### answer.zh

它主要针对 Claude Code 和 Cowork 设计，工作流和命令在这两个环境里体验最完整。仓库说明技能本身与其他 AI 助手兼容，但部分依赖插件机制的功能可能受限。

### answer.en

It is designed primarily for Claude Code and Cowork, where the workflows and commands work most fully. The repository notes the skills themselves are compatible with other AI assistants, though features relying on the plugin mechanism may be limited.

## Question 2

### question.zh

它能替我做产品决策吗？

### question.en

Will it make product decisions for me?

### answer.zh

不能，也不该。它提供的是经过整理的方法和流程，帮你把该考虑的都考虑到、该问的都问到。但产品决策依赖具体的业务背景、资源约束和判断力，这些仍然要由你来定。

### answer.en

No, and it should not. What it provides is organised method and process, making sure the right questions get asked. Product decisions depend on business context, constraints, and judgement that remain yours to supply.
