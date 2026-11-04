---
schemaVersion: 1
status: published
slug: skill-seekers
name: Skill Seekers
nameZh: Skill Seekers 技能生成器
category: automation
tags: [Skill Generation, Documentation, RAG]
platforms: [Claude, Gemini, OpenAI]
author: Yusuf Karaaslan
version: 3.10.0
license: MIT
addedAt: '2026-11-04'
updatedAt: '2026-09-30'
githubUrl: 'https://github.com/yusufkaraaslan/Skill_Seekers'
officialUrl: 'https://skillseekersweb.com/'
downloadUrl: 'https://github.com/yusufkaraaslan/Skill_Seekers/archive/refs/heads/development.zip'
featured: false
featuredRank: 0
verified: false
icon: automation
stars: 15276
---
# Description

## zh

把文档网站、GitHub 仓库、PDF 等资料转换成结构化知识，用于生成 AI 技能或 RAG 流程。

## en

Turns documentation sites, GitHub repositories, PDFs, and more into structured knowledge for AI skills or RAG pipelines.

# Long Description

## zh

这是一个命令行工具，支持 18 类来源，包括文档站、代码仓库、PDF、视频、笔记本和维基。它抓取资料后整理成可打包的知识资产，再按目标平台打包。scan 命令可以让 AI 读取项目的清单和文件，为检测到的框架生成配置。抓取外部资料前，请确认你有权使用这些内容。

## en

This command-line tool supports 18 source types, including documentation sites, repositories, PDFs, videos, notebooks, and wikis. It gathers material into structured assets and packages them per target platform. The scan command lets an AI read a project's manifests and files to emit a config for each detected framework. Confirm you have the right to use external material before collecting it.

# Features

## zh

- 支持 18 类资料来源
- 按目标平台打包技能
- scan 自动识别项目框架
- 可选 MCP 服务器
- 可指定不同的增强代理

## en

- Supports 18 source types
- Packages skills per target platform
- scan detects project frameworks
- Optional MCP server
- Choice of enhancement agent

# Use Cases

## zh

- 把框架官方文档做成技能
- 把内部文档整理成知识资产
- 为 RAG 流程准备结构化内容

## en

- Turning framework documentation into a skill
- Organising internal documents into knowledge assets
- Preparing structured content for a RAG pipeline

# Installation

```bash
pip install skill-seekers
```

# Usage

## zh

用 skill-seekers create 加资料地址生成技能，再用 skill-seekers package 指定目标平台打包，例如 --target claude。可以先用 detect 预览来源类型，不会实际创建内容。默认分支是 development。

## en

Create a skill with skill-seekers create and a source address, then package it with skill-seekers package and a target such as --target claude. Use detect to preview how a source is read without creating anything. The default branch is development.

# Workflow

## zh

1. 安装工具
2. 用 detect 预览来源
3. 用 create 生成技能
4. 检查内容是否准确
5. 按目标平台打包

## en

1. Install the tool
2. Preview the source with detect
3. Generate the skill with create
4. Check the content is accurate
5. Package it for the target platform

# Changelog

## 3.10.0 | 2026-09-30

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

只能给 Claude 用吗？

### question.en

Is it only for Claude?

### answer.zh

不是。README 列出 Claude、Gemini、OpenAI 等平台，也支持 RAG 流程。

### answer.en

No. The README lists Claude, Gemini, OpenAI, and others, as well as RAG pipelines.

## Question 2

### question.zh

生成的技能可以直接发布吗？

### question.en

Can generated skills be published directly?

### answer.zh

建议先审阅内容，并确认来源资料的版权允许这样使用。

### answer.en

Review the content first and confirm the source material's rights allow this use.
