---
schemaVersion: 1
status: published
slug: feiskyer-claude-code-settings
name: Claude Code Settings and Skills
nameZh: Claude Code 配置与技能
category: development
tags: [Claude Code, Research, GitHub Automation]
platforms: [Claude Code]
author: Feisky
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-09-27'
githubUrl: 'https://github.com/feiskyer/claude-code-settings'
officialUrl: 'https://feisky.xyz/claude-code-settings/'
downloadUrl: 'https://github.com/feiskyer/claude-code-settings/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 1672
---
# Description

## zh

Claude Code 的精选技能、子代理和配置模板，覆盖研究、图像生成、GitHub 自动化与会话交接。

## en

Curated Claude Code skills, subagents, and configuration templates for research, image generation, GitHub automation, and handoff.

# Long Description

## zh

仓库提供可复用的个人配置体系和多个 `SKILL.md`，用于扩展常见开发工作流。安装配置前应逐项查看 Hooks、命令和权限，避免把不适合当前项目的自动化直接全局启用。

## en

The repository provides reusable personal configuration and several `SKILL.md` files for common development workflows. Inspect hooks, commands, and permissions before installation rather than enabling unsuitable automation globally.

# Features

## zh

- 组合技能、子代理和配置模板
- 覆盖研究、图像和 GitHub 工作流

## en

- Combines skills, subagents, and configuration templates
- Covers research, images, and GitHub workflows

# Use Cases

## zh

- 搭建 Claude Code 个人工作环境
- 添加研究或 GitHub 评审流程

## en

- Build a personal Claude Code environment
- Add research or GitHub review workflows

# Installation

```bash
npx skills add feiskyer/claude-code-settings
```

# Usage

## zh

先选择单个技能，在测试项目中检查其命令、Hooks 和写入范围。确认兼容后再加入长期配置。

## en

Start with one skill and inspect commands, hooks, and write scope in a test project. Add it to long-term configuration only after compatibility is confirmed.

# Workflow

## zh

1. 审阅配置与权限
2. 在测试项目安装单项能力
3. 验证后再长期启用

## en

1. Review configuration and permissions
2. Install one capability in a test project
3. Enable long-term only after validation

# Changelog

## TODO | 2026-09-27

### zh

仓库没有版本化 Release；此处记录最近更新时间。

### en

The repository has no versioned release; this records its latest update.

# FAQ

## Question 1

### question.zh

可以直接复制全部 Claude Code 配置吗？

### question.en

Should I copy the entire Claude Code configuration?

### answer.zh

不建议。先检查命令、Hooks、路径和权限，并只启用当前需要的部分。

### answer.en

It is not recommended. Inspect commands, hooks, paths, and permissions and enable only what is needed.
