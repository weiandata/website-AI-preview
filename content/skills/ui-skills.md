---
schemaVersion: 1
status: published
slug: ui-skills
name: UI Skills
nameZh: UI 设计技能集
category: development
tags:
  - UI Design
  - Frontend
  - Accessibility
  - Motion
platforms:
  - Claude
  - Codex
  - ChatGPT
author: ibelick
version: 0.2.3
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-07-17'
githubUrl: 'https://github.com/ibelick/ui-skills'
officialUrl: 'https://www.ui-skills.com'
downloadUrl: 'https://github.com/ibelick/ui-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 5233
---
# Description

## zh

为设计工程师和前端开发者提供一组可由 AI 编程代理调用的 UI 设计、可访问性、动效与界面优化技能。

## en

A collection of UI design, accessibility, motion, and interface-improvement skills that AI coding agents can use for design-engineering tasks.

# Long Description

## zh

UI Skills 是一个面向设计工程师的开源技能集合。它通过命令行工具识别当前任务，并把 AI 编程代理引导到合适的 UI 技能集。项目覆盖基础界面规范、可访问性修复、页面元数据、动效性能和整体界面改进等常见前端场景，适合在创建、审查或优化 Web 界面时作为结构化工作指南。

## en

UI Skills is an open-source collection built for design engineers. Its CLI identifies the current task and routes an AI coding agent to an appropriate UI skill set. The project covers baseline interface rules, accessibility fixes, metadata, motion performance, and general UI improvement, providing structured guidance for creating, reviewing, and refining web interfaces.

# Features

## zh

- 根据当前任务自动选择合适的 UI 技能集
- 提供基础 UI 设计与界面质量规范
- 检查并修复常见可访问性问题
- 优化页面元数据与动效性能
- 支持通过 CLI 查看分类、列出技能和读取指定技能

## en

- Route the current task to an appropriate UI skill set
- Provide baseline UI and interface-quality guidance
- Identify and fix common accessibility issues
- Improve page metadata and motion performance
- Browse categories, list skills, and retrieve a specific skill through the CLI

# Use Cases

## zh

- 使用 AI 编程代理创建新的网页界面
- 审查现有页面的视觉层级与交互细节
- 修复键盘操作、语义结构和其他可访问性问题
- 检查动画是否影响性能或用户体验
- 为前端团队建立统一的 UI 设计检查流程

## en

- Build new web interfaces with an AI coding agent
- Review visual hierarchy and interaction details
- Fix keyboard, semantic, and other accessibility issues
- Check whether animation harms performance or usability
- Establish a shared UI-review workflow for frontend teams

# Installation

```bash
npx ui-skills
```

```bash
npx ui-skills start
```

```bash
git clone https://github.com/ibelick/ui-skills.git
cd ui-skills
npm install
```

# Usage

## zh

在前端项目目录中运行 npx ui-skills start，让工具根据当前工作选择对应的 UI 技能。也可以使用分类、列表和读取命令，手动查看特定技能。

常用命令：

npx ui-skills categories
npx ui-skills list --category motion
npx ui-skills get baseline-ui

## en

Run npx ui-skills start inside a frontend project to route the current task to a suitable UI skill. You can also browse categories, list skills, or retrieve a specific skill manually.

Common commands:

npx ui-skills categories
npx ui-skills list --category motion
npx ui-skills get baseline-ui

# Workflow

## zh

1. 在需要设计或优化的前端项目中打开终端
2. 运行 npx ui-skills start
3. 让工具识别任务并选择对应技能集
4. 按技能中的检查规则创建、审查或修改界面
5. 使用可访问性、元数据和动效相关技能进行补充检查

## en

1. Open a terminal in the frontend project you want to design or improve
2. Run npx ui-skills start
3. Let the tool identify the task and select a relevant skill set
4. Create, review, or modify the interface using the skill guidance
5. Perform additional checks for accessibility, metadata, and motion

# Changelog

## 0.2.3 | 2026-07-19

### zh

同步 UI Skills 0.2.3 的项目信息、CLI 使用方式和当前技能分类。

### en

Synchronized project information, CLI usage, and available skill categories for UI Skills 0.2.3.

# FAQ

## Question 1

### question.zh

这个项目是一个完整的 UI 组件库吗？

### question.en

Is this a complete UI component library?

### answer.zh

不是。它主要是一组供 AI 编程代理使用的设计与前端工作技能，提供规则、检查方法和任务流程，而不是直接提供一套可复制的 UI 组件。

### answer.en

No. It is primarily a set of design and frontend workflow skills for AI coding agents, offering rules, checks, and task guidance rather than a ready-made component library.

## Question 2

### question.zh

必须先安装到电脑上才能使用吗？

### question.en

Must it be installed globally before use?

### answer.zh

不需要。可以直接运行 npx ui-skills 或 npx ui-skills start。也可以克隆 GitHub 仓库，在本地查看和修改全部技能内容。

### answer.en

No. You can run npx ui-skills or npx ui-skills start directly. You may also clone the GitHub repository to inspect or modify all skill files locally.
