---
schemaVersion: 1
status: published
slug: academic-pptx-skill
name: Academic PPTX Skill
nameZh: 学术 PPTX 技能
category: files-pdf
tags:
  - Presentations
  - Academic Research
  - PowerPoint
  - Scientific Communication
platforms:
  - Claude.ai
author: Gabberflast
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-14'
githubUrl: 'https://github.com/Gabberflast/academic-pptx-skill'
officialUrl: ''
downloadUrl: 'https://github.com/Gabberflast/academic-pptx-skill/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: document
stars: 1446
---
# Description

## zh

用于制作学术演示文稿的 Claude 技能，把研究材料转成结构清晰、可交付的 PowerPoint 文件。

## en

A Claude skill for academic presentations that turns research materials into structured, deliverable PowerPoint files.

# Long Description

## zh

该仓库提供可上传到 Claude.ai 的技能包，面向论文汇报、研究演讲和学术会议等场景。它帮助组织叙事、幻灯片结构和 PPTX 产出，但不会自动保证引用正确或视觉可读。用户应提供经过确认的来源、目标时长和受众，并在导出后逐页检查内容、图表、字体与版式。

## en

The repository provides a skill package uploadable to Claude.ai for paper talks, research briefings, and academic conferences. It helps organize narrative, slide structure, and PPTX output, but does not guarantee citation accuracy or visual readability. Supply confirmed sources, target duration, and audience, then inspect content, charts, fonts, and layout slide by slide after export.

# Features

## zh

- 专注学术演示和研究汇报
- 生成可继续编辑的 PPTX 文件
- 帮助组织叙事与幻灯片结构
- 以 Claude.ai 技能包形式使用

## en

- Focuses on academic talks and research briefings
- Produces editable PPTX files
- Helps organize narrative and slide structure
- Used as a Claude.ai skill package

# Use Cases

## zh

- 将论文整理成会议演讲幻灯片
- 为研究组汇报生成可编辑初稿
- 根据演讲时长压缩复杂研究内容

## en

- Turn a paper into conference-talk slides
- Generate an editable draft for a lab presentation
- Compress complex research to fit a speaking duration

# Installation

```bash
git clone https://github.com/Gabberflast/academic-pptx-skill.git
```

```bash
cd academic-pptx-skill && zip -r academic-pptx-skill.zip . -x '.git/*'
```

# Usage

## zh

将打包后的技能上传到 Claude.ai，然后提供论文、已核实的引用、受众、时长和模板偏好。生成 PPTX 后用 PowerPoint 或兼容软件打开，逐页核对文字溢出、图片清晰度、图表标签和字体替换。

## en

Upload the packaged skill to Claude.ai, then provide the paper, verified citations, audience, duration, and template preferences. Open the resulting PPTX in PowerPoint or compatible software and inspect text overflow, image resolution, chart labels, and font substitutions on every slide.

# Workflow

## zh

1. 克隆并打包技能
2. 上传到 Claude.ai
3. 提供材料、受众与演讲时长
4. 生成并下载 PPTX
5. 逐页检查后再演示

## en

1. Clone and package the skill
2. Upload it to Claude.ai
3. Provide sources, audience, and speaking duration
4. Generate and download the PPTX
5. Inspect every slide before presenting

# Changelog

## TODO | 2026-07-14

### zh

仓库尚未发布带版本号的 Release；此处记录最近更新时间，具体变更请查看提交历史。

### en

The repository has no versioned release yet; this records its latest update date. See the commit history for details.

# FAQ

## Question 1

### question.zh

生成的 PPTX 可以不检查直接演示吗？

### question.en

Can I present the generated PPTX without checking it?

### answer.zh

不建议。不同软件和字体环境可能改变版式，而且引用、图表标签与内容准确性都需要人工核验。

### answer.en

It is not recommended. Software and font environments can alter layout, while citations, chart labels, and content accuracy all require human verification.
