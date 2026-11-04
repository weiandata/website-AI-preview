---
schemaVersion: 1
status: published
slug: stitch-design-skills
name: Stitch Skills
nameZh: Stitch 设计技能
category: image-design
tags:
  - UI Design
  - Design to Code
  - Google Stitch
  - Frontend
platforms:
  - Claude Code
  - Codex
  - Gemini CLI
  - Cursor
  - OpenCode
  - Antigravity
author: Google Labs Code
version: '1.0'
license: Apache-2.0
addedAt: '2026-07-31'
updatedAt: '2026-08-17'
githubUrl: 'https://github.com/google-labs-code/stitch-skills'
officialUrl: 'https://stitch.withgoogle.com/docs/mcp/setup'
downloadUrl: 'https://github.com/google-labs-code/stitch-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: image
stars: 8674
---
# Description

## zh

面向 Google Stitch 的设计技能合集，帮助代理从界面探索走到可用的前端实现，并保持视觉与结构的一致性。

## en

A design skill collection for Google Stitch that helps agents move from interface exploration to usable frontend implementation while preserving visual and structural consistency.

# Long Description

## zh

仓库提供围绕 Stitch 设计工作流的多个技能，适用于生成界面方向、处理设计输出和衔接前端开发。它可以通过通用 Skills CLI 或支持的插件方式安装，并覆盖多种编码代理。使用时应提供清晰的产品目标、页面状态和技术栈；生成结果仍需做响应式、可访问性和真实内容检查。

## en

The repository provides multiple skills around Stitch design workflows, including interface exploration, handling design outputs, and carrying them into frontend development. It installs through the common Skills CLI or supported plugin methods and works with several coding agents. Provide clear product goals, page states, and a target stack; generated results still need responsive, accessibility, and real-content checks.

# Features

## zh

- 围绕 Google Stitch 组织设计到代码工作流
- 提供多个可组合的界面设计技能
- 支持多种编码代理和安装方式
- 兼顾设计探索与前端交付

## en

- Organizes design-to-code workflows around Google Stitch
- Provides multiple composable interface-design skills
- Supports several coding agents and installation methods
- Bridges design exploration and frontend delivery

# Use Cases

## zh

- 从产品描述探索新的页面方向
- 将 Stitch 设计结果转为前端实现
- 为已有界面补齐视觉和交互状态

## en

- Explore new page directions from a product brief
- Turn Stitch design output into frontend implementation
- Add missing visual and interaction states to an existing interface

# Installation

```bash
npx skills add google-labs-code/stitch-skills
```

# Usage

## zh

安装后提供产品目标、目标用户、页面范围、品牌约束和前端技术栈。先让代理生成或整理设计方向，再选择一个方向实施；最后在不同视口和键盘操作下检查成品。

## en

After installation, provide the product goal, target users, page scope, brand constraints, and frontend stack. Ask the agent to generate or organize design directions, select one for implementation, and check the result across viewports and keyboard interaction.

# Workflow

## zh

1. 安装 Stitch 技能合集
2. 提供产品与品牌约束
3. 生成并选择设计方向
4. 转换为目标前端技术栈
5. 验证响应式和可访问性

## en

1. Install the Stitch skill collection
2. Provide product and brand constraints
3. Generate and select a design direction
4. Convert it to the target frontend stack
5. Validate responsiveness and accessibility

# Changelog

## 1.0 | 2026-05-18

### zh

对应仓库发布的 1.0 版本；后续提交活动记录在 GitHub 仓库中。

### en

Matches the repository's 1.0 release; subsequent activity is recorded in the GitHub repository.

# FAQ

## Question 1

### question.zh

使用这些技能后还需要设计评审吗？

### question.en

Do I still need a design review after using these skills?

### answer.zh

需要。技能能加快探索和实现，但产品适配、品牌一致性、可访问性与跨设备表现仍应由团队检查。

### answer.en

Yes. The skills accelerate exploration and implementation, but the team should still review product fit, brand consistency, accessibility, and cross-device behavior.
