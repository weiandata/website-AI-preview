---
schemaVersion: 1
status: published
slug: lieflat-charts
name: Lieflat Charts
nameZh: Lieflat Charts 数据可视化
category: data-analytics
tags: [Data Visualization, Charts, HTML Reports]
platforms: [Claude Code, Codex]
author: larashero3-dotcom
version: 1.2.0
license: PolyForm-Noncommercial-1.0.0
addedAt: '2026-11-04'
updatedAt: '2026-11-03'
githubUrl: 'https://github.com/larashero3-dotcom/lieflat-charts'
officialUrl: ''
downloadUrl: 'https://github.com/larashero3-dotcom/lieflat-charts/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: analysis
stars: 6690
---
# Description

## zh

把数据生成精致、可交互的 HTML 图表，也能按要求生成 PPT 和整页报告。

## en

Turns data into polished, interactive HTML charts, and can produce presentations and full-page reports on request.

# Long Description

## zh

默认输出图表，只有明确要求时才生成 HTML 或 PDF 格式的 PPT，或整页报告。它有三种视觉风格：Lupi 适合细读的数据故事，Glance 适合几秒看懂的汇报，Basics 适合结构简单的内容。配色包括黑白灰 Mono 和三套彩色方案，也可以用自定义品牌色。注意它采用 PolyForm Noncommercial 许可证，不是开源许可证，禁止商业使用。

## en

It produces charts by default, and builds HTML or PDF presentations or full-page reports only when asked. Three visual styles are offered: Lupi for data stories read slowly, Glance for reports understood in seconds, and Basics for simple content. Colour options are the Mono greyscale, three colour presets, and custom brand colours. Note that it uses the PolyForm Noncommercial licence, which is not open source and prohibits commercial use.

# Features

## zh

- 三种视觉风格
- Mono 与三套彩色配色
- 支持自定义品牌色
- 可生成可翻页 PPT 和整页报告
- 提供网络、路径和流向等大图

## en

- Three visual styles
- Mono and three colour presets
- Custom brand colours
- Paged presentations and full-page reports
- Network, path, and flow charts

# Use Cases

## zh

- 为论文或长文制作数据图
- 为周报制作结论先行的图表
- 把数据做成可交互报告

## en

- Making charts for papers or long articles
- Building conclusion-first charts for weekly reports
- Turning data into an interactive report

# Installation

```bash
npx skills add https://github.com/larashero3-dotcom/lieflat-charts --skill lieflat-charts
```

# Usage

## zh

安装后把数据交给代理并说明用途，代理会选择图型和配色。需要 PPT 或报告时要明确说出来，否则默认只出图表。生成后请核对图中数字和单位。商业场景使用前必须先解决授权问题。

## en

After installing, give the agent your data and purpose; it chooses the chart type and colours. Ask explicitly for a presentation or report, otherwise you get charts. Check numbers and units afterwards. Resolve licensing before any commercial use.

# Workflow

## zh

1. 确认使用场景符合许可证
2. 提供数据并说明用途
3. 由代理选择图型和配色
4. 核对数字、单位和来源
5. 按需继续调色或导出

## en

1. Confirm the use fits the licence
2. Provide data and purpose
3. Let the agent choose chart type and colours
4. Check numbers, units, and sources
5. Adjust colours or export as needed

# Changelog

## 1.2.0 | 2026-08-14

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

公司可以用它吗？

### question.en

Can a company use it?

### answer.zh

要谨慎。PolyForm Noncommercial 1.0.0 禁止商业使用，GitHub 页面不会直接显示这个许可证名称。商业用途请先联系作者或咨询法务。

### answer.en

Be careful. PolyForm Noncommercial 1.0.0 prohibits commercial use, and GitHub does not show the licence name directly. For commercial use, contact the author or legal counsel first.

## Question 2

### question.zh

怎样生成 PPT？

### question.en

How do I get a presentation?

### answer.zh

需要明确要求。默认只生成图表，明确说要 PPT 或幻灯片时才会进入 PPT 模式。

### answer.en

Ask explicitly. Charts are the default; PPT mode starts only when you request a presentation or slides.
