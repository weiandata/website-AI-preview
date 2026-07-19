---
schemaVersion: 1
status: published
slug: archify
name: Archify
nameZh: 架构图生成技能
category: development
tags:
  - Architecture Diagram
  - Documentation
  - Visualization
  - SVG Export
platforms:
  - Claude
  - Codex CLI
  - opencode
author: tt-a1i
version: 2.11.0
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-07-16'
githubUrl: 'https://github.com/tt-a1i/archify'
officialUrl: 'https://tt-a1i.github.io/archify/'
downloadUrl: 'https://github.com/tt-a1i/archify/archive/refs/heads/main.zip'
featured: true
featuredRank: 0
verified: true
icon: code
stars: 5881
downloads: 0
---
# Description

## zh

用一段自然语言描述换一张架构图。支持时序图、数据流图和状态机，可切换深浅色主题并导出高分辨率图片或 SVG。

## en

Turns a plain-language description of a system into a polished diagram, covering architecture, sequence, data-flow, and lifecycle views, with a dark/light toggle and high-resolution image or SVG export.

# Long Description

## zh

画架构图的麻烦通常不在于想不清楚，而在于把想清楚的东西摆整齐。Archify 让你用英文描述系统结构，直接生成一个自包含的 HTML 文件——打开就能看，一键切换深浅色，可以复制 PNG 到剪贴板直接粘进 Slack 或 Notion，也可以导出最高四倍分辨率的 PNG、JPEG、WebP 或矢量 SVG。导出的 SVG 同时带有深浅两套变量，放进 GitHub README 会跟随读者的系统主题，不必再准备两张图。组件可以用 aws.lambda、postgres、redis 这类语义标签描述，它会自动映射到对应的视觉分类。画完之后还能继续用对话调整，比如「加一个 Redis」「把鉴权移到左边」。

## en

The hard part of an architecture diagram is usually not the thinking but the tidying. Archify takes an English description and produces a self-contained HTML file: open it, toggle between dark and light, copy a PNG straight to the clipboard for Slack or Notion, or export PNG, JPEG, and WebP at up to 4× source resolution, or SVG for true vector. Exported SVGs carry both colour variable sets plus a prefers-color-scheme query, so dropping one into a GitHub README makes it follow the reader's theme without maintaining two images. Components can be described with semantic labels such as aws.lambda, postgres, or redis, which map to the right visual category automatically. You can keep refining by chat afterwards, with instructions like "add Redis" or "move auth to the left".

# Features

## zh

- 用自然语言描述换架构图，无需掌握绘图工具
- 支持架构、时序、数据流、生命周期等多种图型
- 一键切换深浅色主题，设置跨会话保留
- 导出最高四倍分辨率的 PNG、JPEG、WebP，或矢量 SVG
- 导出的 SVG 自动跟随读者的系统深浅色偏好
- 生成的 HTML 零依赖，发文件即可分享

## en

- Produces diagrams from plain language, with no drawing tool to learn
- Covers architecture, sequence, data-flow, and lifecycle diagram types
- One-click dark/light toggle that persists across sessions
- Exports PNG, JPEG, and WebP at up to 4× resolution, or vector SVG
- Exported SVGs follow the reader's system colour preference automatically
- Generated HTML has zero dependencies, so sharing is just sending the file

# Use Cases

## zh

- 给新同事解释系统结构，需要一张能看懂的图
- 写技术文档或 README，需要跟随主题的架构图
- 梳理 CI/CD 流程、审批流或请求调用链
- 讨论中快速画图，边说边改

## en

- Explaining a system's structure to someone joining the project
- Writing docs or a README that needs a theme-aware architecture diagram
- Mapping a CI/CD pipeline, approval flow, or request call chain
- Sketching during a discussion and adjusting as you talk

# Installation

```bash
npx skills add tt-a1i/archify -g
```

# Usage

## zh

安装后直接让代理使用这个技能，例如「用 archify 画出这个仓库的运行时架构」。生成的是一个自包含 HTML 文件，打开后可切换主题、复制到剪贴板或导出图片。想调整就继续对话，说明要加什么、移动什么或改成什么颜色。

## en

Once installed, ask your agent to use it, for example "use archify to map this repository's runtime architecture". The result is a self-contained HTML file you can open, toggle, copy to the clipboard, or export. To adjust it, keep talking: say what to add, what to move, or what colour to use.

# Workflow

## zh

1. 安装技能
2. 用一段话描述你的系统或流程
3. 打开生成的 HTML 查看效果
4. 通过对话继续调整布局和配色
5. 复制到剪贴板或导出所需格式

## en

1. Install the skill
2. Describe your system or process in a sentence or two
3. Open the generated HTML to review it
4. Keep refining layout and colour through conversation
5. Copy to the clipboard or export in the format you need

# Changelog

## 2.11.0 | 2026-07-16

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

放进 GitHub README 需要准备深浅两张图吗？

### question.en

Do I need two images for a GitHub README, one per theme?

### answer.zh

不需要。导出的 SVG 同时包含两套颜色变量和 prefers-color-scheme 媒体查询，会自动跟随读者的系统主题，不必再用 picture 标签包两张 PNG。

### answer.en

No. Exported SVGs ship both variable sets plus a prefers-color-scheme query, so a single file follows the reader's theme without wrapping two PNGs in a picture element.

## Question 2

### question.zh

需要提前准备图标库吗？

### question.en

Do I need an icon library up front?

### answer.zh

不需要。用 aws.lambda、postgres、redis、github-actions 这类语义标签描述组件即可，它会映射到合适的视觉分类。

### answer.en

No. Describe components with semantic labels such as aws.lambda, postgres, redis, or github-actions, and they map to the right visual category.
