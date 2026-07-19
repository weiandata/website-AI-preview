---
schemaVersion: 1
status: published
slug: dashi-ppt-skill
name: Dashi PPT Skill
nameZh: 可编辑演示文稿生成
category: files-pdf
tags:
  - Presentation
  - PPTX
  - Templates
platforms:
  - Claude Code
  - Codex
author: chuspeeism
version: TODO
license: AGPL-3.0
addedAt: '2026-07-19'
updatedAt: '2026-07-17'
githubUrl: 'https://github.com/chuspeeism/dashi-ppt-skill'
officialUrl: ''
downloadUrl: 'https://github.com/chuspeeism/dashi-ppt-skill/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: document
stars: 3847
downloads: 0
---
# Description

## zh

把文档交给 AI 就能生成演示文稿，每一页都带编辑控制台，可以在浏览器里直接改，改完导出成真正可编辑的 PPTX。

## en

Hand a document to your AI and get a deck back, each page carrying an editing console you can adjust in the browser before exporting to a genuinely editable PPTX.

# Long Description

## zh

用 AI 做 PPT 常见的问题是：生成的东西大致像样，但总有几处要改，而一旦要改就发现拿到的是图片或者结构混乱的文件，改不动。这个技能的处理办法是把编辑能力放进产物本身——生成的每一页都带一个编辑控制台，在浏览器里看到不满意的地方直接调，调好之后再一键导出成真正的、可以在 PowerPoint 里继续编辑的 PPTX，而不是一堆图片拼成的假 PPT。内置十二套视觉主题，适配多种代理环境。它是中文项目，说明文档以中文为主，同时提供英文版。

## en

The common failure of AI-made decks is that the result looks broadly right but always needs a few fixes — and then you discover you have images or a tangled file you cannot edit. This skill puts the editing where it belongs: every generated page carries an editing console, so you adjust what you dislike right in the browser and then export a genuine PPTX that stays editable in PowerPoint, rather than a deck of flattened images. Twelve visual themes ship with it, and it supports a range of agent harnesses. It is a Chinese-language project, with documentation primarily in Chinese alongside an English version.

# Features

## zh

- 每页自带编辑控制台，在浏览器里直接调整
- 导出真正可编辑的 PPTX，不是图片拼接
- 内置十二套视觉主题
- 支持多种代理环境
- 中英文双语说明文档

## en

- An editing console on every page, adjustable right in the browser
- Exports a genuinely editable PPTX rather than flattened images
- Twelve visual themes included
- Supports a range of agent harnesses
- Documentation in both Chinese and English

# Use Cases

## zh

- 有现成文档或资料，需要快速变成一份能讲的 PPT
- 生成后总要微调几页，希望改起来方便
- 交付物必须是可编辑的 PPTX，别人还要接着改
- 需要统一的视觉风格但没有设计资源

## en

- Turning an existing document into a deck you can actually present
- Needing to tweak a few pages afterwards without fighting the file
- Deliverables that must be editable PPTX because someone else will revise them
- Wanting consistent visual style without design resources

# Installation

```bash
npx skills add chuspeeism/dashi-ppt-skill -g
```

# Usage

## zh

把文档或要点交给装好技能的代理，选择一套视觉主题，它会生成带编辑控制台的网页版演示文稿。在浏览器里逐页检查，不满意的地方直接改，确认后导出 PPTX。导出的文件可以在 PowerPoint 里继续编辑。

## en

Give the document or your key points to an agent with the skill installed, choose a theme, and it produces a web deck with editing consoles. Review page by page in the browser, fix what you dislike, then export the PPTX — which stays editable in PowerPoint.

# Workflow

## zh

1. 安装技能
2. 提供文档或要讲的要点
3. 选择一套视觉主题生成初稿
4. 在浏览器里逐页调整
5. 导出可编辑的 PPTX

## en

1. Install the skill
2. Provide the document or the points you want covered
3. Pick a theme and generate the first pass
4. Adjust page by page in the browser
5. Export the editable PPTX

# Changelog

## TODO | 2026-07-17

### zh

仓库未发布带版本号的 Release，此处记录最近一次更新日期。请查看提交历史了解变更。

### en

The repository publishes no versioned releases; this records the most recent update date. See the commit history for changes.

# FAQ

## Question 1

### question.zh

导出的 PPTX 真的能编辑吗？

### question.en

Is the exported PPTX genuinely editable?

### answer.zh

可以。仓库明确说明导出的是真实、可编辑的 PPTX，而不是把每页截图后拼成的文件，所以在 PowerPoint 里可以正常修改文字和元素。

### answer.en

Yes. The repository states the export is a real, editable PPTX rather than screenshots assembled into slides, so text and elements can be changed normally in PowerPoint.

## Question 2

### question.zh

许可证有什么限制？

### question.en

Are there licence restrictions?

### answer.zh

它采用 AGPL-3.0，属于传染性较强的开源许可证。自己做 PPT 用没有问题，但如果把它整合进对外提供的网络服务，AGPL 要求一并公开相应源代码。商用前请阅读许可证原文。

### answer.en

It uses AGPL-3.0, a strongly copyleft licence. Making your own decks is fine, but folding it into a network service offered to others triggers AGPL's requirement to publish the corresponding source. Read the licence before commercial use.
