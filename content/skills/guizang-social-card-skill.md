---
schemaVersion: 1
status: published
slug: guizang-social-card-skill
name: Guizang Social Card Skill
nameZh: 社交图文卡片生成
category: content-creation
tags:
  - Social Media
  - Editorial Design
  - Xiaohongshu
platforms:
  - Claude Code
  - Codex
author: op7418
version: TODO
license: AGPL-3.0
addedAt: '2026-07-19'
updatedAt: '2026-07-01'
githubUrl: 'https://github.com/op7418/guizang-social-card-skill'
officialUrl: ''
downloadUrl: >-
  https://github.com/op7418/guizang-social-card-skill/archive/refs/heads/main.zip
featured: false
featuredRank: 0
verified: true
icon: image
stars: 5191
---
# Description

## zh

把文章、文案、截图或视频字幕变成小红书图文组图、动态卡片和公众号封面对，内置两套成熟的视觉风格。

## en

Turns articles, copy, screenshots, or video subtitles into social image sets, motion cards, and cover pairs, using two well-defined visual systems.

# Long Description

## zh

做社交图文最费神的不是写字，是排版——同样的内容，版面松紧、字号对比和留白决定了它像不像样。这个技能内置两套完整的视觉系统，共用同一套图文工作流。一套是电子杂志风，参考 Monocle、Kinfolk、Cereal 那种克制的版面，适合叙事、生活方式、旅行、阅读和个人观察这类内容。另一套是瑞士国际主义风格，讲究网格、单一锚点色、直角发丝线和极致的字号对比，适合产品测评、数据、方法论和教程。输入可以是文章、文案、截图、产品笔记、字幕或照片，输出包括小红书组图、Live Photo 动态卡和公众号 21:9 与 1:1 的封面对。

## en

The hard part of social image posts is not the words but the layout — the same content lives or dies on spacing, type contrast, and white space. This skill carries two complete visual systems sharing one workflow. The first is editorial, in the restrained manner of Monocle, Kinfolk, and Cereal, suited to narrative, lifestyle, travel, reading, and personal observation. The second is Swiss international style — grid-driven, a single anchor colour, hairline rules, extreme type contrast — which fits product reviews, data, methodology, and tutorials. Input can be an article, copy, a screenshot, product notes, subtitles, or photos; output covers multi-image social sets, Live Photo motion cards, and paired 21:9 and 1:1 covers.

# Features

## zh

- 两套完整视觉系统：电子杂志风与瑞士国际主义
- 支持文章、截图、字幕、照片等多种输入
- 产出小红书组图、动态卡片与公众号封面对
- 版面规则内置，不需要自己调字号和间距
- 有姊妹项目专门处理演示文稿，风格语言一致

## en

- Two complete visual systems: editorial and Swiss international
- Accepts articles, screenshots, subtitles, and photos as input
- Produces multi-image social sets, motion cards, and paired covers
- Layout rules are built in, so type and spacing need no manual tuning
- A sister project handles presentations in the same visual language

# Use Cases

## zh

- 把一篇文章改成小红书图文组图
- 给公众号文章做封面，需要 21:9 和 1:1 两个尺寸
- 产品测评或教程需要信息密度高但不乱的版面
- 手上有素材但没有设计能力，需要成型的版式

## en

- Turning an article into a multi-image social post
- Producing article covers that need both 21:9 and 1:1 crops
- Reviews or tutorials that need dense but orderly layout
- Having the material but not the design skills to lay it out

# Installation

```bash
npx skills add op7418/guizang-social-card-skill -g
```

# Usage

## zh

安装后把素材交给它，说明要哪种输出和哪套视觉风格。叙事类内容用电子杂志风，偏数据和方法论的用瑞士风格。生成后可以继续通过对话调整配色、字号或版面松紧。

## en

Once installed, hand over the material and say which output and which visual system you want — editorial for narrative content, Swiss for data and methodology. After generating, keep adjusting colour, type size, or density through conversation.

# Workflow

## zh

1. 安装技能
2. 准备素材：文章、截图、字幕或照片
3. 选择输出形式与视觉风格
4. 生成图文卡片
5. 按需要微调配色与版面

## en

1. Install the skill
2. Prepare the material: article, screenshot, subtitles, or photos
3. Choose the output format and visual system
4. Generate the cards
5. Fine-tune colour and layout as needed

# Changelog

## TODO | 2026-07-01

### zh

仓库未发布带版本号的 Release，此处记录最近一次更新日期。请查看提交历史了解变更。

### en

The repository publishes no versioned releases; this records the most recent update date. See the commit history for changes.

# FAQ

## Question 1

### question.zh

许可证有什么需要注意的？

### question.en

Is there anything to watch out for in the licence?

### answer.zh

它采用 AGPL-3.0，属于传染性较强的开源许可证。个人使用生成图片没有问题，但如果你把它整合进对外提供的网络服务，AGPL 要求你一并公开相应的源代码。商用前请阅读许可证原文。

### answer.en

It uses AGPL-3.0, a strongly copyleft licence. Generating images for your own use is fine, but if you fold it into a network service offered to others, AGPL requires you to publish the corresponding source. Read the licence before commercial use.

## Question 2

### question.zh

两套视觉风格该怎么选？

### question.en

How do I choose between the two visual systems?

### answer.zh

按内容性质选：叙事、生活方式、旅行、阅读、影视和个人观察这类偏感受的内容用电子杂志风；产品测评、数据、方法论、教程和工具介绍这类偏信息的内容用瑞士国际主义风格。

### answer.en

Follow the content: editorial suits narrative, lifestyle, travel, reading, and personal observation, where feel matters; Swiss suits reviews, data, methodology, tutorials, and tool write-ups, where information density matters.
