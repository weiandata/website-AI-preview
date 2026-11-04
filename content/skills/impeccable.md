---
schemaVersion: 1
status: published
slug: impeccable
name: Impeccable
nameZh: Impeccable 界面设计词汇
category: image-design
tags: [Design, Frontend, Design Review, Accessibility]
platforms: [Claude Code, Cursor, Codex, GitHub Copilot, Gemini CLI]
author: Paul Bakaus
version: 4.8.0
license: Apache-2.0
addedAt: '2026-11-04'
updatedAt: '2026-11-04'
githubUrl: 'https://github.com/pbakaus/impeccable'
officialUrl: 'https://impeccable.style'
downloadUrl: 'https://github.com/pbakaus/impeccable/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: image
stars: 102043
---
# Description

## zh

给编程代理一套设计词汇，用明确的命令调整界面、评审设计，并在上线前拦下千篇一律的 AI 风格。

## en

Gives coding agents a design vocabulary: named commands to steer an interface, review it, and catch generic AI styling before it ships.

# Long Description

## zh

它把“改好看一点”这类含糊要求换成具体动作，例如 polish、bolder、quieter，每个动作对应一份针对性的操作说明。评审方面，critique 按可用性原则打分并排出修改优先级，audit 检查无障碍、性能、主题和响应式问题。仓库还带一个不依赖大模型的检测器，用确定性规则找出常见的模板化痕迹。作者说明它最擅长改进已有界面，从零新建页面相对更难。

## en

It replaces vague requests like "make it nicer" with specific moves such as polish, bolder, and quieter, each backed by its own playbook. For review, critique scores a design against usability heuristics and ranks fixes, while audit checks accessibility, performance, theming, and responsive behaviour. A detector that needs no LLM uses deterministic rules to flag common template tells. The author notes it is strongest on existing interfaces; building new pages from scratch is the harder mode.

# Features

## zh

- polish、bolder、quieter 等可针对具体目标的设计命令
- critique 按可用性原则评分并排序问题
- audit 按 P0 到 P3 分级报告无障碍、性能等问题
- 不需要大模型和 API 密钥的规则检测器
- init 生成 PRODUCT.md，后续命令共用项目背景

## en

- Design commands such as polish, bolder, and quieter aimed at a specific target
- critique scores against usability heuristics and ranks issues
- audit reports accessibility, performance, and related issues from P0 to P3
- A rule-based detector that needs no LLM or API key
- init writes a PRODUCT.md that later commands share as project context

# Use Cases

## zh

- 代理做出的页面太像模板，需要明确的改进方向
- 上线前对现有页面做一次设计和无障碍检查
- 在持续集成里用规则扫描界面问题

## en

- Agent-built pages look templated and need a clear direction
- Reviewing an existing page for design and accessibility before launch
- Scanning interface code with rules in continuous integration

# Installation

```bash
npx impeccable install
```

# Usage

## zh

在项目根目录安装后重新加载编程工具，先运行一次 /impeccable init，它会读取代码并询问无法推断的信息。之后用命令加目标的方式工作，例如让它评审定价卡片。Codex 中命令前缀是 $impeccable。

## en

Install from the project root, reload your coding tool, and run /impeccable init once; it reads the code and asks only what it cannot infer. Then name a command and a target, for example a critique of the pricing cards. On Codex the prefix is $impeccable.

# Workflow

## zh

1. 在项目根目录安装
2. 运行 init 生成项目背景文件
3. 用 critique 或 audit 找出问题
4. 用 polish、bolder 等命令逐项修改
5. 用检测器复查结果

## en

1. Install from the project root
2. Run init to write the project context file
3. Find issues with critique or audit
4. Fix them with commands such as polish and bolder
5. Recheck the result with the detector

# Changelog

## 4.8.0 | 2026-10-26

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

它适合从零做新页面吗？

### question.en

Is it suited to building new pages from scratch?

### answer.zh

可以用，但作者明确说它最擅长改进已经存在的界面，新建页面是更难的模式，官网有单独的说明。

### answer.en

It can, but the author says it is strongest on interfaces that already exist. New work is the harder mode and has its own guide on the website.

## Question 2

### question.zh

检测器需要联网或密钥吗？

### question.en

Does the detector need network access or a key?

### answer.zh

规则检测本身不需要大模型或 API 密钥。扫描线上页面时会用到本机安装的 Chrome 或 Edge。

### answer.en

The rule detection needs no LLM or API key. Scanning a live page uses your installed Chrome or Edge.
