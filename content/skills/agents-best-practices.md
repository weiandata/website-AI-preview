---
schemaVersion: 1
status: draft
slug: agents-best-practices
name: Agents Best Practices
nameZh: 智能体架构设计实践
category: development
tags:
  - Agent Design
  - Architecture Review
  - Harness Design
  - Provider Neutral
platforms:
  - Claude Code
  - Codex
author: DenisSergeevitch
version: TODO
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-06-29'
githubUrl: 'https://github.com/DenisSergeevitch/agents-best-practices'
officialUrl: ''
downloadUrl: >-
  https://github.com/DenisSergeevitch/agents-best-practices/archive/refs/heads/main.zip
featured: false
featuredRank: 0
verified: true
icon: code
stars: 2132
downloads: 0
---
# Description

## zh

一个不绑定厂商的技能，用于设计、审计和重构智能体运行框架，也能为新项目产出最小可行的架构蓝图。

## en

A provider-neutral skill for designing, auditing, refactoring, and explaining agentic harnesses, and for generating MVP blueprints for new ones.

# Long Description

## zh

它遵循一条核心原则：模型负责提出动作，运行框架负责校验、授权、执行、记录并返回观测结果。围绕这条分工，这个技能可以帮你从零设计一个智能体运行框架，也可以审计现有实现、指出边界模糊的地方，或者解释某个框架为什么这么设计。适用范围不限于编程代理——研究、客服、运营、销售、财务、数据分析、采购、法务、医疗和教育场景下的智能体，都需要同一套运行时纪律。安装方式与厂商无关，Codex 和 Claude Code 都可以使用。

## en

It follows one core principle: the model proposes actions, while the harness validates, authorises, executes, records, and returns observations. Around that division it helps you design a harness from scratch, audit an existing implementation and point out where boundaries blur, or explain why a given harness is built the way it is. Its scope goes well beyond coding agents: research, support, operations, sales, finance, data analysis, procurement, legal, healthcare, and education agents all need the same runtime discipline. Installation is provider-neutral and works with both Codex and Claude Code.

# Features

## zh

- 明确区分模型职责与运行框架职责
- 支持从零设计，也支持审计和重构现有实现
- 可生成最小可行的架构蓝图
- 适用于编程之外的各类业务智能体
- 与厂商无关，多种代理环境通用

## en

- Draws a clear line between what the model does and what the harness does
- Supports designing from scratch as well as auditing and refactoring
- Generates MVP blueprints for new harnesses
- Applies to business agents well beyond coding
- Provider-neutral and usable across several harnesses

# Use Cases

## zh

- 准备自建智能体运行框架，需要先想清楚职责边界
- 现有实现出过越权或漏记录的问题，需要一次审计
- 要向团队解释某个框架的设计取舍
- 非编程场景的智能体，需要同样的运行时约束

## en

- Building a harness and needing the responsibility boundaries settled first
- Auditing an existing implementation after an authorisation or logging gap
- Explaining a harness's design trade-offs to a team
- Non-coding agents that need the same runtime discipline

# Installation

```bash
npx skills add DenisSergeevitch/agents-best-practices -g
```

# Usage

## zh

安装后，向代理说明你的目标即可：要设计新框架就描述业务场景和约束，要审计就把现有实现交给它，要解释就指定目标框架。全局安装后每个项目都能发现这个技能。

## en

Once installed, tell the agent what you need: describe the scenario and constraints to design a new harness, hand over an existing implementation to audit it, or name the harness you want explained. Installing globally makes it discoverable from every project.

# Workflow

## zh

1. 全局安装技能
2. 说明目标：设计、审计、重构还是解释
3. 提供业务场景、约束或现有实现
4. 依据「模型提议、框架执行」这条原则审阅产出
5. 按建议调整职责边界与记录方式

## en

1. Install the skill globally
2. State the goal: design, audit, refactor, or explain
3. Provide the scenario, constraints, or existing implementation
4. Review the output against the propose-versus-execute principle
5. Adjust responsibility boundaries and recording accordingly

# Changelog

## TODO | 2026-06-29

### zh

仓库未发布带版本号的 Release，此处记录最近一次更新日期。请查看提交历史了解变更。

### en

The repository publishes no versioned releases; this records the most recent update date. See the commit history for changes.

# FAQ

## Question 1

### question.zh

只适合做编程代理吗？

### question.en

Is it only for coding agents?

### answer.zh

不是。仓库明确说明它同样适用于研究、客服、运营、销售、财务、数据分析、采购、法务、医疗和教育等场景的智能体，因为这些场景需要相同的运行时纪律。

### answer.en

No. The repository states it applies equally to research, support, operations, sales, finance, data analysis, procurement, legal, healthcare, and education agents, since they need the same runtime discipline.

## Question 2

### question.zh

「模型提议、框架执行」具体指什么？

### question.en

What does "the model proposes, the harness executes" mean in practice?

### answer.zh

指模型只负责提出要做什么，而校验参数、判断是否有权限、真正执行、留下记录并把结果返回给模型，这些都由运行框架承担。职责混在一起时，越权和漏记录就容易发生。

### answer.en

The model only proposes what to do; validating arguments, deciding whether it is authorised, actually executing, recording what happened, and returning observations all belong to the harness. When those responsibilities blur, authorisation gaps and missing records follow.
