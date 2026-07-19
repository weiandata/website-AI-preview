---
schemaVersion: 1
status: published
slug: generative-media-skills
name: Generative Media Skills
nameZh: 多模态媒体生成
category: image-design
tags:
  - Image Generation
  - Video
  - Audio
  - Multimodal
platforms:
  - Claude Code
  - Cursor
  - Gemini CLI
  - OpenCode
author: SamurAIGPT
version: TODO
license: MIT
addedAt: 2026-07-19
updatedAt: 2026-07-18
githubUrl: https://github.com/SamurAIGPT/Generative-Media-Skills
officialUrl: ""
downloadUrl: https://github.com/SamurAIGPT/Generative-Media-Skills/archive/refs/heads/main.zip
featured: false
featuredRank: 0
verified: false
icon: image
stars: 3842
downloads: 0
---

# Description

## zh

让代理能生成和编辑图像、视频与音频的一组技能，用统一的结构描述任务，配套现成的配方和提示词库。

## en

A set of skills that lets agents generate and edit images, video, and audio through one consistent structure, with ready-made recipes and a prompt library alongside.

# Long Description

## zh

生成媒体的麻烦在于每种模型的参数、格式和调用方式都不一样，换一个模型就要重学一遍。这组技能用一套统一的结构来描述任务——要什么、什么规格、什么风格——底层由命令行工具对接不同的模型服务，所以你不必记各家的差异。除了基础能力，它还提供一组现成的配方，覆盖常见的成品需求，以及一个偏专业用法的库。同时提供 MCP 服务，可以接进支持 MCP 的环境。它依托作者的模型聚合服务运行，因此使用前需要配置相应的凭据。

## en

The friction in generative media is that every model has its own parameters, formats, and calling conventions, so switching models means relearning them. These skills describe a task through one consistent structure — what you want, at what spec, in what style — while a CLI underneath talks to the different model services, so the differences stay out of your way. Beyond the basics it ships a recipe pack covering common finished outputs and a library aimed at more expert usage, plus an MCP server for environments that support it. It runs against the author's model aggregation service, so credentials need configuring first.

# Features

## zh

- 图像、视频、音频统一用一套结构描述任务
- 内置配方覆盖常见成品需求
- 另有面向专业用法的提示词与参数库
- 提供 MCP 服务，可接入支持该协议的环境
- 适用于 Claude Code、Cursor、Gemini CLI 与 OpenCode

## en

- One task structure covering image, video, and audio alike
- A recipe pack for common finished outputs
- A further library aimed at expert-level prompting and parameters
- Ships an MCP server for compatible environments
- Works with Claude Code, Cursor, Gemini CLI, and OpenCode

# Use Cases

## zh

- 内容创作需要配图、配乐或短视频素材
- 想试不同模型的效果但不愿逐个学参数
- 已有成品需求，希望有现成配方直接用
- 把媒体生成接进已有的代理工作流

## en

- Content work that needs images, audio, or short video assets
- Trying several models without learning each one's parameters
- Having a known output in mind and wanting a recipe for it
- Wiring media generation into an existing agent workflow

# Installation

```bash
npx skills add SamurAIGPT/Generative-Media-Skills -g
```

# Usage

## zh

安装后先配置所用模型服务的凭据，之后向代理描述要生成的内容即可，包括题材、规格和风格。想要稳定成品可以直接套用内置配方；需要更精细的控制时，参考它提供的专业库调整参数。

## en

Once installed, configure credentials for the model service, then describe what you want generated — subject, spec, and style. For predictable output, use a built-in recipe; when you need finer control, adjust parameters using the expert library.

# Workflow

## zh

1. 安装技能并配置模型服务凭据
2. 明确要生成的媒体类型与规格
3. 直接描述需求，或套用现成配方
4. 查看结果并调整提示词或参数
5. 导出素材接入你的内容流程

## en

1. Install the skills and configure model service credentials
2. Decide the media type and specification you need
3. Describe the request, or apply a ready-made recipe
4. Review the result and adjust the prompt or parameters
5. Export the asset into your content process

# Changelog

## TODO | 2026-07-18

### zh

仓库未发布带版本号的 Release，此处记录最近一次更新日期。请查看提交历史了解变更。

### en

The repository publishes no versioned releases; this records the most recent update date. See the commit history for changes.

# FAQ

## Question 1

### question.zh

使用需要付费吗？

### question.en

Does using it cost money?

### answer.zh

技能本身是 MIT 开源的，但它调用的模型服务通常按用量计费，需要你自行配置凭据。具体价格取决于你使用的模型和调用量。

### answer.en

The skills themselves are MIT licensed, but the model services they call are typically billed by usage and need your own credentials. Cost depends on which models you use and how much.

## Question 2

### question.zh

生成的内容可以商用吗？

### question.en

Can the generated content be used commercially?

### answer.zh

这取决于你调用的具体模型服务的条款，而不是这组技能的许可证。商用前请查阅对应模型提供方的使用条款，不同模型的规定差别较大。

### answer.en

That depends on the terms of the specific model service you call, not on these skills' licence. Check the model provider's terms before commercial use — they vary considerably between models.
