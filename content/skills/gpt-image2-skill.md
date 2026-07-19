---
schemaVersion: 1
status: published
slug: gpt-image2-skill
name: GPT Image 2 Skill
nameZh: 图像提示词库
category: image-design
tags:
  - Image Generation
  - Prompt Library
  - CLI
platforms:
  - Claude Code
  - Codex
author: wuyoscar
version: 0.2.0
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-07-01'
githubUrl: 'https://github.com/wuyoscar/GPT-Image2-Skill'
officialUrl: ''
downloadUrl: 'https://github.com/wuyoscar/GPT-Image2-Skill/archive/refs/heads/main.zip'
featured: true
featuredRank: 6
verified: true
icon: image
stars: 3819
downloads: 0
---
# Description

## zh

一个经过整理的图像提示词库，配套可直接运行的技能和命令行工具，提示词都可以复制即用。

## en

A curated gallery of image prompts paired with a runnable skill and CLI, where every prompt is ready to copy and use.

# Long Description

## zh

生成图像的效果高度依赖提示词怎么写，而好的写法往往是试出来的，不是想出来的。这个项目把已经验证过的提示词整理成库，每条都附带实际效果，可以直接复制使用，也可以在此基础上改。除了当参考资料看，它同时是一个可运行的技能，装好后代理可以直接调用；也提供命令行工具，方便批量生成或接进脚本。README 提供中英两个版本，中文用户查阅方便。运行需要 Python 3.11 以上环境，以及所用模型服务的凭据。

## en

Image results depend heavily on how the prompt is written, and the good formulations are usually found by trial rather than reasoning. This project collects prompts that have been tested into a gallery, each shown with what it produces, ready to copy as-is or adapt. Beyond being reference material it is also a runnable skill an agent can call once installed, plus a CLI for batch generation or scripting. The README ships in both English and Chinese. It needs Python 3.11 or newer and credentials for the model service you use.

# Features

## zh

- 整理好的提示词库，每条附带实际效果
- 提示词可直接复制使用，也便于二次修改
- 同时提供代理技能与命令行两种用法
- 中英文双语说明文档
- 可用于批量生成或接入脚本

## en

- A curated prompt gallery, each entry shown with its result
- Prompts are copy-paste ready and easy to adapt
- Usable both as an agent skill and as a CLI
- Documentation in both English and Chinese
- Suits batch generation or scripted use

# Use Cases

## zh

- 想生成某种风格的图但不知道提示词怎么写
- 需要批量生成风格一致的图片
- 学习提示词的写法，看有效的例子长什么样
- 把图像生成接进已有的自动化流程

## en

- Wanting a particular style but unsure how to phrase the prompt
- Generating batches of images with consistent style
- Learning prompt craft by studying examples that work
- Wiring image generation into an existing automated process

# Installation

```bash
pip install gpt-image2-skill
```

# Usage

## zh

作为技能安装后，向代理描述你要的图像即可，它会参考库中的写法组织提示词。也可以先自己浏览提示词库，找到接近的风格再改写。命令行用法适合批量生成。使用前需要配置模型服务的凭据，并确保 Python 版本在 3.11 以上。

## en

Installed as a skill, describe the image you want and it draws on the gallery's phrasing to compose the prompt. You can also browse the gallery yourself, find a close style, and adapt it. The CLI suits batch work. Configure your model service credentials first and make sure Python is 3.11 or newer.

# Workflow

## zh

1. 安装并确认 Python 3.11 以上环境
2. 配置模型服务凭据
3. 浏览提示词库，或直接描述需求
4. 生成并查看效果
5. 按需要调整提示词再次生成

## en

1. Install and confirm Python 3.11 or newer
2. Configure model service credentials
3. Browse the gallery, or simply describe what you want
4. Generate and review the result
5. Adjust the prompt and run again as needed

# Changelog

## 0.2.0 | 2026-07-01

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

只能配合某一个图像模型使用吗？

### question.en

Is it tied to one image model?

### answer.zh

它的提示词库主要围绕 GPT Image 2 整理，写法针对该模型调优。提示词的思路对其他模型也有参考价值，但直接照搬未必得到相同效果。

### answer.en

The gallery is built around GPT Image 2 and its phrasing is tuned for that model. The underlying approach transfers to other models as reference, but copying a prompt across will not necessarily reproduce the same result.

## Question 2

### question.zh

使用需要额外付费吗？

### question.en

Are there additional costs?

### answer.zh

项目本身是 MIT 开源的，但生成图像要调用模型服务，那部分按对方的计价收费，需要你自行准备凭据。

### answer.en

The project itself is MIT licensed, but generating images calls a model service that bills on its own terms, and you supply the credentials.
