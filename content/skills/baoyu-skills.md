---
schemaVersion: 1
status: published
slug: baoyu-skills
name: Baoyu Skills
nameZh: 宝玉内容创作技能合集
category: content-creation
tags:
  - Content Creation
  - Social Media
  - Images
  - Writing
platforms:
  - Claude Code
  - Codex
  - Cursor
  - OpenClaw
author: Jim Liu
version: 2.5.2
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-11-02'
githubUrl: 'https://github.com/JimLiu/baoyu-skills'
officialUrl: ''
downloadUrl: 'https://github.com/JimLiu/baoyu-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: writing
stars: 27271
---
# Description

## zh

面向内容创作的综合技能合集，覆盖写作、社交媒体内容、图像处理和多种发布素材的生产流程。

## en

A broad content-creation skill collection covering writing, social-media content, image work, and production workflows for multiple publishing formats.

# Long Description

## zh

宝玉技能库将多种内容任务拆成独立技能，可通过 Skills CLI 安装到 Claude Code、Codex、Cursor 或 OpenClaw 等环境。它适合从原始材料出发，组织文章、社交帖子和配套视觉素材。部分技能可能调用外部模型或平台，因此使用前应检查所需密钥、费用、内容版权和目标平台的发布规则。

## en

Baoyu Skills separates content tasks into independent skills installable through the Skills CLI for Claude Code, Codex, Cursor, OpenClaw, and related environments. It can turn source material into articles, social posts, and supporting visuals. Some skills may call external models or platforms, so check required keys, cost, content rights, and destination-platform rules before use.

# Features

## zh

- 覆盖文字、社交内容与视觉素材
- 多个独立技能可按任务选择
- 支持多种代理客户端
- 从素材整理延伸到成品生产

## en

- Covers writing, social content, and visual assets
- Offers independent skills selectable by task
- Supports several agent clients
- Extends from source organization to finished production

# Use Cases

## zh

- 把长文改写成多平台社交内容
- 为文章生成结构、配图和发布素材
- 建立可重复的个人内容生产流程

## en

- Adapt a long article into social content for several platforms
- Produce structure, visuals, and publishing assets for an article
- Build a repeatable personal content-production workflow

# Installation

```bash
npx skills add JimLiu/baoyu-skills
```

# Usage

## zh

安装后选择与目标格式匹配的技能，并提供原始材料、受众、语气、平台和尺寸要求。发布前人工核对事实、版权、品牌用语和敏感信息，不要把生成内容未经审阅直接发布。

## en

After installation, select the skill matching the target format and provide source material, audience, tone, platform, and dimensions. Before publishing, review facts, rights, brand language, and sensitive information rather than posting generated content unchecked.

# Workflow

## zh

1. 安装内容技能合集
2. 选择目标格式对应的技能
3. 提供素材、受众和品牌要求
4. 生成并迭代内容与视觉
5. 人工审校后发布

## en

1. Install the content skill collection
2. Select the skill for the target format
3. Provide sources, audience, and brand requirements
4. Generate and iterate on copy and visuals
5. Publish after human review

# Changelog

## 2.5.2 | 2026-06-18

### zh

对应仓库发布的 2.5.2 版本；后续提交活动记录在 GitHub 仓库中。

### en

Matches the repository's 2.5.2 release; subsequent activity is recorded in the GitHub repository.

# FAQ

## Question 1

### question.zh

可以把生成结果直接发布到社交平台吗？

### question.en

Can generated output be published directly to social platforms?

### answer.zh

不建议。发布前应核对事实、引用和素材版权，并检查品牌语气、隐私信息及目标平台规则。

### answer.en

It is not recommended. Check facts, citations, asset rights, brand tone, private information, and destination-platform rules before publishing.
