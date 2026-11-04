---
schemaVersion: 1
status: published
slug: gemini-skills
name: Gemini Skills
nameZh: Gemini API 技能
category: development
tags: [Gemini API, SDK, AI Agents]
platforms: [Gemini CLI, Claude Code, Codex]
author: google-gemini
version: TODO
license: Apache-2.0
addedAt: '2026-07-31'
updatedAt: '2026-11-03'
githubUrl: 'https://github.com/google-gemini/gemini-skills'
officialUrl: 'https://ai.google.dev/gemini-api/docs'
downloadUrl: 'https://github.com/google-gemini/gemini-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 4387
---
# Description

## zh

Google 提供的 Gemini API、SDK、模型与代理交互技能合集。

## en

Google's skills for the Gemini API, SDKs, models, and agent interactions.

# Long Description

## zh

仓库把 Gemini 开发指导整理为代理可调用技能，辅助选择接口、编写集成并遵循官方模式。 使用当前官方文档核验接口和模型；密钥不得写入代码，调用前设置数据边界与费用限制。

## en

The repository packages Gemini development guidance as callable skills for choosing interfaces, building integrations, and following official patterns. Verify APIs and models against current official docs; never commit keys, and set data boundaries and cost limits before calls.

# Features

## zh

- 覆盖 Gemini API 与 SDK
- 包含模型和代理交互指导

## en

- Covers Gemini APIs and SDKs
- Includes model and agent interaction guidance

# Use Cases

## zh

- 构建 Gemini 集成
- 核对 Gemini 开发模式

## en

- Build a Gemini integration
- Check Gemini development patterns

# Installation

```bash
npx skills add google-gemini/gemini-skills
```

# Usage

## zh

先在非生产环境选择与任务匹配的技能，提供明确输入和边界。使用当前官方文档核验接口和模型；密钥不得写入代码，调用前设置数据边界与费用限制。

## en

Start in a non-production environment with the task-specific skill and explicit inputs and boundaries. Verify APIs and models against current official docs; never commit keys, and set data boundaries and cost limits before calls.

# Workflow

## zh

1. 选择与任务匹配的技能
2. 检查输入、权限和预期输出
3. 审阅结果后再应用或发布

## en

1. Select the skill that matches the task
2. Check inputs, permissions, and expected outputs
3. Review results before applying or publishing

# Changelog

## TODO | 2026-11-03

### zh

仓库没有版本化 Release；此处记录最近更新时间。

### en

The repository has no versioned release; this records its latest update.

# FAQ

## Question 1

### question.zh

可以不经审查直接应用技能输出吗？

### question.en

Can the skill output be applied without review?

### answer.zh

不应。使用当前官方文档核验接口和模型；密钥不得写入代码，调用前设置数据边界与费用限制。

### answer.en

No. Verify APIs and models against current official docs; never commit keys, and set data boundaries and cost limits before calls.
