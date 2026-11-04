---
schemaVersion: 1
status: published
slug: diagram-design
name: Diagram Design
nameZh: Diagram Design 图表设计
category: image-design
tags: [Diagrams, SVG, Visualization]
platforms: [Claude Code, Codex, Cursor, GitHub Copilot, Gemini CLI]
author: Cathryn Lavery
version: TODO
license: MIT
addedAt: '2026-11-04'
updatedAt: '2026-11-03'
githubUrl: 'https://github.com/cathrynlavery/diagram-design'
officialUrl: 'https://diagramdesign.dev'
downloadUrl: 'https://github.com/cathrynlavery/diagram-design/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: image
stars: 64878
---
# Description

## zh

让代理把架构图、时序图、象限图等画成一个自包含的 HTML 和 SVG 文件，并匹配你的品牌风格。

## en

Has agents draw architecture, sequence, quadrant, and other diagrams as one self-contained HTML and SVG file that matches your brand.

# Long Description

## zh

用日常语言描述需要的图，代理会选择图表类型、说明计划，再写出一个双击就能打开的文件。仓库提供 45 种图表类型，风格上偏编辑排版。给它一个网站地址，它可以提取配色和字体，让后续图表保持一致。它还支持从 draw.io、Mermaid、Excalidraw 导入，并能导出 PNG 和 SVG。

## en

Describe the diagram in plain words and the agent picks a type, states its plan, and writes a single file you can open by double-clicking. The repository offers 45 diagram types in an editorial style. Point it at a website and it pulls the palette and fonts so later diagrams match. It also imports from draw.io, Mermaid, and Excalidraw and exports to PNG and SVG.

# Features

## zh

- 45 种图表类型
- 输出单个自包含的 HTML 和 SVG 文件
- 从网站提取配色和字体
- 支持导入 draw.io、Mermaid、Excalidraw
- 可导出 PNG 和 SVG

## en

- 45 diagram types
- Outputs one self-contained HTML and SVG file
- Pulls palette and fonts from a website
- Imports from draw.io, Mermaid, and Excalidraw
- Exports to PNG and SVG

# Use Cases

## zh

- 为技术文档绘制系统架构图
- 把项目优先级做成象限图
- 把旧的 Mermaid 图改成统一品牌风格

## en

- Drawing system architecture for technical documents
- Plotting project priorities on a quadrant
- Restyling old Mermaid diagrams to one brand

# Installation

```bash
npx skills add cathrynlavery/diagram-design
```

# Usage

## zh

安装后用日常语言提要求，例如画一张包含前端、后端、数据库和缓存的架构图。想匹配品牌时，让它对你的网站执行 onboard。Claude Code 用户也可以通过插件市场安装，以便获得更新和斜杠命令。

## en

After installing, ask in plain words, for example for an architecture diagram with a frontend, backend, database, and cache. To match your brand, ask it to onboard your website. Claude Code users can also install through the plugin marketplace for updates and slash commands.

# Workflow

## zh

1. 安装技能
2. 需要时先用网站完成品牌配置
3. 用日常语言描述图表
4. 确认代理说明的图表类型和计划
5. 打开生成的 HTML 检查，按需导出

## en

1. Install the skill
2. Optionally onboard a website for branding
3. Describe the diagram in plain words
4. Confirm the type and plan the agent states
5. Open the HTML to check it and export if needed

# Changelog

## TODO | 2026-11-03

### zh

仓库未发布带版本号的 Release，此处记录最近一次更新日期。请查看提交历史了解变更。

### en

The repository publishes no versioned releases; this records the most recent update date. See the commit history for changes.

# FAQ

## Question 1

### question.zh

生成的图需要什么环境才能看？

### question.en

What do I need to view a generated diagram?

### answer.zh

输出是自包含的 HTML 文件，双击用浏览器打开即可。

### answer.en

The output is a self-contained HTML file. Double-click it to open in a browser.

## Question 2

### question.zh

能复用已有的图吗？

### question.en

Can I reuse existing diagrams?

### answer.zh

可以，README 说明支持从 draw.io、Mermaid 和 Excalidraw 导入。

### answer.en

Yes. The README describes importing from draw.io, Mermaid, and Excalidraw.
