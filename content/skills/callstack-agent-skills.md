---
schemaVersion: 1
status: published
slug: callstack-agent-skills
name: Callstack Agent Skills
nameZh: Callstack 移动开发技能
category: development
tags:
  - React Native
  - Mobile Development
  - Performance
  - Testing
platforms:
  - Claude Code
  - Codex
  - Gemini CLI
  - Cursor
  - OpenCode
author: Callstack Incubator
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-25'
githubUrl: 'https://github.com/callstackincubator/agent-skills'
officialUrl: ''
downloadUrl: 'https://github.com/callstackincubator/agent-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 1574
---
# Description

## zh

Callstack Incubator 维护的移动开发技能合集，为 React Native 等项目提供实现、性能和测试方面的代理指导。

## en

A mobile-development skill collection from Callstack Incubator, providing agent guidance for implementation, performance, and testing in React Native and related projects.

# Long Description

## zh

该仓库收录多个面向移动应用工程的技能，并支持插件市场、技能安装器或手动复制等接入方式。它适合让代理在处理 React Native 代码时获得更具体的框架和性能上下文。由于移动端行为依赖平台、设备和原生工具链，所有改动都应分别在目标 iOS 与 Android 环境中构建和测试。

## en

The repository contains multiple skills for mobile application engineering and supports plugin marketplaces, skill installers, or manual copying. It gives agents more specific framework and performance context for React Native work. Because mobile behavior depends on platform, device, and native toolchains, build and test changes in each target iOS and Android environment.

# Features

## zh

- 针对 React Native 与移动工程任务
- 覆盖实现、性能和测试工作流
- 提供多种安装方式
- 可按需选择仓库内的独立技能

## en

- Targets React Native and mobile engineering tasks
- Covers implementation, performance, and testing workflows
- Offers several installation methods
- Allows selection of independent skills in the repository

# Use Cases

## zh

- 开发或重构 React Native 功能
- 分析移动应用的性能瓶颈
- 设计跨 iOS 与 Android 的验证步骤

## en

- Develop or refactor a React Native feature
- Analyze performance bottlenecks in a mobile app
- Design verification steps across iOS and Android

# Installation

```bash
npx skills add callstackincubator/agent-skills
```

# Usage

## zh

安装后提供 React Native 版本、目标平台、原生依赖和复现步骤。让代理先说明假设和验证方式，再修改代码；最终使用模拟器、真机或项目 CI 运行平台相关检查。

## en

After installation, provide the React Native version, target platforms, native dependencies, and reproduction steps. Ask the agent to state assumptions and validation methods before changing code, then run platform-specific checks in simulators, on devices, or in project CI.

# Workflow

## zh

1. 安装所需移动开发技能
2. 提供版本、平台和原生依赖
3. 让代理分析并实施修改
4. 分别构建 iOS 与 Android 目标
5. 在模拟器或真机验证行为

## en

1. Install the relevant mobile-development skill
2. Provide versions, platforms, and native dependencies
3. Ask the agent to analyze and implement the change
4. Build the iOS and Android targets separately
5. Verify behavior in a simulator or on a device

# Changelog

## TODO | 2026-07-25

### zh

仓库尚未发布带版本号的 Release；此处记录最近更新时间，具体变更请查看提交历史。

### en

The repository has no versioned release yet; this records its latest update date. See the commit history for details.

# FAQ

## Question 1

### question.zh

只在一个平台测试够吗？

### question.en

Is testing on one mobile platform enough?

### answer.zh

通常不够。React Native 会共享大量代码，但原生依赖、布局、权限和性能可能在 iOS 与 Android 上不同。

### answer.en

Usually not. React Native shares much of the code, but native dependencies, layout, permissions, and performance can differ between iOS and Android.
