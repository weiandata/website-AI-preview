---
schemaVersion: 1
status: published
slug: notebooklm-py-skill
name: NotebookLM Python Skill
nameZh: NotebookLM Python 技能
category: research-writing
tags: [NotebookLM, Research, Python API]
platforms: [Claude Code, Codex, OpenClaw]
author: Teng Lin
version: 0.7.3
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-29'
githubUrl: 'https://github.com/teng-lin/notebooklm-py'
officialUrl: 'https://github.com/teng-lin/notebooklm-py'
downloadUrl: 'https://github.com/teng-lin/notebooklm-py/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: research
stars: 18372
---
# Description

## zh

NotebookLM 的非官方 Python API、CLI 与 Agent Skill，用于以程序方式管理资料和研究工作流。

## en

An unofficial Python API, CLI, and Agent Skill for programmatic NotebookLM source and research workflows.

# Long Description

## zh

仓库通过根目录 `SKILL.md` 让代理调用其 Python 与命令行能力，并覆盖部分网页界面未开放的功能。它不是 Google 官方项目，使用时应保护账号会话、检查服务条款，并避免上传无权处理的敏感资料。

## en

The repository exposes its Python and CLI capabilities to agents through a root `SKILL.md`, including features not shown in the web interface. It is not an official Google project; protect account sessions, review service terms, and do not upload sensitive material without authorization.

# Features

## zh

- 以 Python 和 CLI 操作 NotebookLM
- 提供可供代理调用的技能入口

## en

- Operates NotebookLM through Python and CLI
- Provides an agent-callable skill entry point

# Use Cases

## zh

- 批量组织研究来源
- 自动化 NotebookLM 研究流程

## en

- Organize research sources in batches
- Automate NotebookLM research workflows

# Installation

```bash
npx skills add teng-lin/notebooklm-py
```

# Usage

## zh

配置前检查仓库的当前认证说明，仅使用授权资料和测试账号。运行后核对来源、生成内容和任何远程修改。

## en

Check current authentication instructions before setup and use only authorized sources and accounts. Review sources, generated content, and any remote modification after execution.

# Workflow

## zh

1. 安装技能并检查认证要求
2. 添加获授权的研究来源
3. 运行并核对输出

## en

1. Install the skill and inspect authentication requirements
2. Add authorized research sources
3. Run and verify output

# Changelog

## 0.7.3 | 2026-06-30

### zh

对应仓库发布的 0.7.3 版本。

### en

Matches the repository's 0.7.3 release.

# FAQ

## Question 1

### question.zh

这是 Google 官方 API 吗？

### question.en

Is this an official Google API?

### answer.zh

不是。仓库明确标注为非官方项目，兼容性和服务条款可能变化。

### answer.en

No. The repository describes itself as unofficial, so compatibility and service terms may change.
