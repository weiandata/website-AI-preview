---
schemaVersion: 1
status: published
slug: gpt-image2-ppt-skills
name: GPT Image to PPT Skills
nameZh: GPT 图像转 PPT 技能
category: image-design
tags:
  - Presentations
  - Image Generation
  - PowerPoint
  - Visual Design
platforms:
  - Claude Code
  - Codex
  - Cursor
  - OpenClaw
author: JuneYaooo
version: TODO
license: Apache-2.0
addedAt: '2026-07-31'
updatedAt: '2026-08-22'
githubUrl: 'https://github.com/JuneYaooo/gpt-image2-ppt-skills'
officialUrl: ''
downloadUrl: 'https://github.com/JuneYaooo/gpt-image2-ppt-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: image
stars: 1426
---
# Description

## zh

结合图像生成与幻灯片制作的技能合集，用于创建视觉化页面并整理成可交付的演示文稿。

## en

A skill collection combining image generation with slide production to create visual pages and assemble them into deliverable presentations.

# Long Description

## zh

该仓库提供面向 Claude Code、Codex、Cursor 和 OpenClaw 的安装脚本与技能内容，将提示设计、图像生成和 PPT 输出串成工作流。它适合快速探索高视觉表现的演示方向，但图片中的文字、事实和可编辑性可能受限。使用外部图像模型前需准备相应凭据并了解费用，成品也要逐页检查版权、清晰度和信息准确性。

## en

The repository supplies an installer and skill content for Claude Code, Codex, Cursor, and OpenClaw, linking prompt design, image generation, and PPT output into one workflow. It is useful for exploring visually rich presentation directions, though text inside images, factual accuracy, and editability may be limited. Prepare credentials and understand cost for external image models, then review rights, resolution, and information accuracy on every slide.

# Features

## zh

- 串联图像生成和 PPT 制作
- 支持多种代理客户端
- 提供仓库内安装脚本
- 适合视觉优先的演示探索

## en

- Connects image generation and PPT production
- Supports several agent clients
- Provides an installer in the repository
- Suits visual-first presentation exploration

# Use Cases

## zh

- 快速制作视觉提案或概念演示
- 用统一视觉方向生成整套幻灯片
- 将图像素材整理进 PowerPoint 交付物

## en

- Rapidly create a visual proposal or concept deck
- Generate a full slide set with one visual direction
- Assemble image assets into a PowerPoint deliverable

# Installation

```bash
git clone https://github.com/JuneYaooo/gpt-image2-ppt-skills.git
```

```bash
cd gpt-image2-ppt-skills && bash install_as_skill.sh --target claude
```

# Usage

## zh

安装后配置所需图像模型凭据，并提供受众、页数、比例、品牌规范与内容大纲。先生成少量样张确认视觉方向，再批量制作；输出后检查图片文字、分辨率、事实与可编辑需求。

## en

After installation, configure the required image-model credentials and provide audience, slide count, aspect ratio, brand rules, and content outline. Generate a few samples to approve the visual direction before producing the full deck, then check image text, resolution, facts, and editability requirements.

# Workflow

## zh

1. 克隆并运行目标客户端安装脚本
2. 配置图像模型凭据
3. 提供大纲和视觉约束
4. 先确认样张再生成整套页面
5. 检查并导出演示文稿

## en

1. Clone and run the installer for the target client
2. Configure image-model credentials
3. Provide an outline and visual constraints
4. Approve sample slides before generating the full set
5. Inspect and export the presentation

# Changelog

## TODO | 2026-08-22

### zh

仓库尚未发布带版本号的 Release；此处记录最近更新时间，具体变更请查看提交历史。

### en

The repository has no versioned release yet; this records its latest update date. See the commit history for details.

# FAQ

## Question 1

### question.zh

图像中的文字可以可靠编辑吗？

### question.en

Can text inside generated images be edited reliably?

### answer.zh

通常不能像原生文本框那样编辑，而且模型可能生成错误文字。重要标题和数据最好保留为原生幻灯片元素或在导出后重建。

### answer.en

Usually not like native text boxes, and image models can render incorrect text. Keep important titles and data as native slide elements or rebuild them after export.
