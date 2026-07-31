---
schemaVersion: 1
status: published
slug: ios-simulator-skill
name: iOS Simulator Skill
nameZh: iOS 模拟器技能
category: development
tags:
  - iOS
  - Xcode
  - Simulator Automation
  - Accessibility Testing
platforms:
  - Claude Code
author: Conor Luddy
version: 1.4.0
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-06-18'
githubUrl: 'https://github.com/conorluddy/ios-simulator-skill'
officialUrl: 'https://www.conor.fyi'
downloadUrl: 'https://github.com/conorluddy/ios-simulator-skill/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 1193
---
# Description

## zh

用于构建、测试和自动化 iOS 应用的 Claude Code 技能，整合 Xcode 构建、模拟器控制和可访问性优先的界面导航。

## en

A Claude Code skill for building, testing, and automating iOS apps, combining Xcode builds, simulator control, and accessibility-first interface navigation.

# Long Description

## zh

仓库提供 27 个面向开发者和代理优化的脚本，覆盖构建测试、设备生命周期、语义导航、截图、可访问性审计与调试。输出采用渐进披露以减少无关日志。它要求 macOS、Xcode 命令行工具和 Python 3，部分交互能力还依赖 IDB；删除或抹除模拟器等操作具有破坏性，必须明确指定目标并提前确认。

## en

The repository provides 27 scripts optimized for developers and agents across builds, tests, device lifecycle, semantic navigation, screenshots, accessibility audits, and debugging. Output uses progressive disclosure to avoid unnecessary logs. It requires macOS, Xcode command-line tools, and Python 3, with IDB needed for some interactions; destructive operations such as deleting or erasing simulators require an explicit target and confirmation.

# Features

## zh

- 封装 Xcode 构建与测试并压缩输出
- 通过可访问性树语义定位界面元素
- 覆盖模拟器生命周期和设备状态
- 提供截图差异、审计与调试脚本

## en

- Wraps Xcode builds and tests with concise output
- Locates interface elements semantically through accessibility
- Covers simulator lifecycle and device state
- Includes screenshot diffing, audits, and debugging scripts

# Use Cases

## zh

- 构建 iOS 项目并提取关键错误
- 自动执行模拟器中的界面流程
- 检查可访问性、定位或权限场景
- 收集截图、日志和应用状态用于排障

## en

- Build an iOS project and extract key errors
- Automate interface flows in the simulator
- Test accessibility, location, or permission scenarios
- Capture screenshots, logs, and app state for debugging

# Installation

```bash
/plugin marketplace add conorluddy/ios-simulator-skill
```

```bash
/plugin install ios-simulator-skill@conorluddy
```

# Usage

## zh

确认 macOS、Xcode 和 Python 环境后，提供项目路径、scheme、目标模拟器与测试目标。优先使用语义导航而不是坐标点击；执行删除、抹除或权限重置前，先列出并确认准确设备。

## en

After confirming macOS, Xcode, and Python, provide the project path, scheme, target simulator, and test goal. Prefer semantic navigation over coordinate taps, and list and confirm the exact device before deletion, erasure, or permission resets.

# Workflow

## zh

1. 安装技能并检查依赖
2. 指定项目、scheme 和模拟器
3. 构建并处理关键错误
4. 执行语义界面测试
5. 收集结果并人工复核

## en

1. Install the skill and check prerequisites
2. Select the project, scheme, and simulator
3. Build and address key errors
4. Run semantic interface tests
5. Capture results and review them

# Changelog

## 1.4.0 | 2026-04-12

### zh

对应仓库发布的 1.4.0 版本；后续提交活动记录在 GitHub 仓库中。

### en

Matches the repository's 1.4.0 release; subsequent activity is recorded in the GitHub repository.

# FAQ

## Question 1

### question.zh

为什么优先用可访问性树而不是截图坐标？

### question.en

Why prefer the accessibility tree over screenshot coordinates?

### answer.zh

语义元素比固定像素坐标更稳定，也能用更少输出描述当前界面；同时它会推动应用提供更好的可访问性标记。

### answer.en

Semantic elements are more stable than fixed pixels and describe the current interface with less output; they also encourage better accessibility labeling in the app.
