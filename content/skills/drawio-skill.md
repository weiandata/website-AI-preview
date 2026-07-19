---
schemaVersion: 1
status: published
slug: drawio-skill
name: drawio-skill
nameZh: draw.io 图表生成
category: data-analytics
tags:
  - Diagrams
  - Visualization
  - draw.io
  - Documentation
platforms:
  - Claude Code
  - Cursor
  - Copilot
  - Codex
author: Agents365-ai
version: 1.34.0
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-07-17'
githubUrl: 'https://github.com/Agents365-ai/drawio-skill'
officialUrl: 'https://agents365-ai.github.io/drawio-skill/'
downloadUrl: 'https://github.com/Agents365-ai/drawio-skill/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: analysis
stars: 6014
---
# Description

## zh

把一段文字描述变成可编辑的 draw.io 图表，也能直接从代码库、数据库表结构或基础设施配置自动画图，支持导出 PNG、SVG、PDF。

## en

Turns a written description into an editable draw.io diagram, and can also draw automatically from a codebase, a SQL schema, or infrastructure config, exporting to PNG, SVG, or PDF.

# Long Description

## zh

它的价值在于两头都省事：想画什么就用中文或英文说出来，得到的不是一张死图，而是可以继续在 draw.io 里编辑的源文件。内置十一种图型预设，从实体关系图、UML 类图、时序图到 C4、流程图、泳道图和网络拓扑都有。更省事的是它能直接读现成的东西自动成图——扫描 Python、JavaScript、Go 或 Rust 项目画出模块依赖关系，读 Terraform、Kubernetes 或 docker-compose 配置画出架构图并自动套用各云厂商的官方图标，或者解析 SQL 建表语句生成带主外键标记的实体关系图。也支持用 Mermaid 文本描述二十多种图型，再转成排好版的 draw.io 文件。

## en

It saves effort at both ends: describe what you want in plain language and get back not a flat picture but an editable draw.io source file. Eleven diagram presets cover ERD, UML class, sequence, C4, architecture, flowchart, swimlane, and network topology among others. More useful still, it can draw from what you already have — scanning a Python, JavaScript, Go, or Rust project into a module dependency graph, reading Terraform, Kubernetes, or docker-compose config into an architecture diagram with each resource rendered in its official cloud icon, or parsing CREATE TABLE statements into an ER diagram with primary and foreign key markers. It also accepts Mermaid text for over twenty diagram types and converts it into a laid-out draw.io file.

# Features

## zh

- 十一种图型预设，覆盖常见的技术与业务图
- 从代码库自动生成模块依赖图，自动排版
- 读 Terraform、Kubernetes、docker-compose 生成架构图，套用官方云图标
- 解析 SQL 建表语句生成实体关系图，标注主外键
- 支持 Mermaid 文本输入，转成可编辑的 draw.io 文件
- 导出 PNG、SVG、PDF、JPG，源文件可继续编辑

## en

- Eleven diagram presets covering common technical and business views
- Generates module dependency graphs from a codebase with automatic layout
- Reads Terraform, Kubernetes, and docker-compose into architecture diagrams with official cloud icons
- Parses SQL DDL into ER diagrams with primary and foreign key markers
- Accepts Mermaid text and converts it into an editable draw.io file
- Exports PNG, SVG, PDF, and JPG while keeping the source editable

# Use Cases

## zh

- 接手一个陌生项目，想先看清模块之间怎么依赖
- 写技术文档需要架构图，且以后还要改
- 从数据库表结构直接生成实体关系图
- 把已有的 Mermaid 图转成可编辑、可排版的格式

## en

- Taking over an unfamiliar project and needing to see how modules depend on each other
- Writing docs that need an architecture diagram you will revise later
- Generating an ER diagram straight from an existing database schema
- Converting existing Mermaid diagrams into an editable, properly laid-out format

# Installation

```bash
npx skills add Agents365-ai/drawio-skill -g
```

# Usage

## zh

安装后直接说明你要画什么，例如「把这个仓库的模块依赖画出来」或「按这段建表语句生成实体关系图」。生成的是 .drawio 文件，可以用 draw.io 打开继续调整，也可以让它直接导出成图片或 PDF。导出功能依赖本机的 draw.io 桌面端命令行。

## en

Once installed, say what you want drawn — "diagram this repository's module dependencies" or "build an ER diagram from this schema". You get a .drawio file you can open and adjust, or ask it to export straight to an image or PDF. Export relies on the draw.io desktop CLI being installed locally.

# Workflow

## zh

1. 安装技能，并准备好 draw.io 桌面端用于导出
2. 描述要画的内容，或指定要读取的代码、配置、建表语句
3. 让它生成 .drawio 源文件
4. 用对话继续调整结构与配色
5. 导出成 PNG、SVG 或 PDF

## en

1. Install the skill and have the draw.io desktop app available for export
2. Describe the diagram, or point it at code, config, or SQL to read
3. Let it produce the .drawio source file
4. Keep adjusting structure and colour through conversation
5. Export to PNG, SVG, or PDF

# Changelog

## 1.34.0 | 2026-07-17

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

生成的图能继续手动修改吗？

### question.en

Can I keep editing the generated diagram by hand?

### answer.zh

可以。它产出的是 .drawio 源文件而不是图片，用 draw.io 打开就能像平常一样拖拽修改。导出的 PNG、SVG 等只是附带产物。

### answer.en

Yes. It produces a .drawio source file rather than a flat image, so you can open it in draw.io and edit normally. The exported PNG or SVG is just a by-product.

## Question 2

### question.zh

导出图片需要额外装东西吗？

### question.en

Does exporting images require anything extra?

### answer.zh

需要。导出功能调用的是本机 draw.io 桌面端的命令行工具，所以要先装好 draw.io 桌面版。只生成 .drawio 文件则不需要。

### answer.en

Yes. Export calls the native draw.io desktop CLI, so the desktop app needs to be installed. Generating the .drawio file alone does not require it.
