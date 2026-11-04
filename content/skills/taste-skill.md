---
schemaVersion: 1
status: published
slug: taste-skill
name: Taste Skill
nameZh: Taste 前端审美技能
category: image-design
tags: [Frontend, Art Direction, Web Design]
platforms: [Claude Code, Codex]
author: Leonxlnx
version: 2.1.5
license: MIT
addedAt: '2026-11-04'
updatedAt: '2026-11-04'
githubUrl: 'https://github.com/Leonxlnx/taste-skill'
officialUrl: 'https://tasteskill.dev'
downloadUrl: 'https://github.com/Leonxlnx/taste-skill/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: image
stars: 109799
---
# Description

## zh

让编程代理先做艺术指导再写页面，避免产出平均水平的落地页。

## en

Makes coding agents work out art direction before building, instead of assembling an average landing page.

# Long Description

## zh

这个技能为代理提供艺术指导流程、参考图片和浏览器检查，用来设计网站和应用界面。作者称它基于对 247 个精选网站的研究，一次构建分为六步。图片来自公开档案并由技能标注出处。需要注意成本：一次构建大约需要 30 到 45 分钟和几十万 token。仓库现在只保留 design-taste-frontend 一个技能，其他旧技能已迁到独立仓库。

## en

This skill gives agents an art-direction process, reference images, and a browser check for designing websites and app screens. The author says it is built on a study of 247 curated sites, with a build running in six steps. Pictures come from open archives and are credited by the skill. Mind the cost: a build takes roughly 30 to 45 minutes and a few hundred thousand tokens. The repository now holds one skill, design-taste-frontend; older skills moved to their own repositories.

# Features

## zh

- 写页面之前先确定艺术方向
- 从公开档案查找并标注参考图片
- 用浏览器检查生成结果
- 网站和应用界面走不同的构建路线

## en

- Settles art direction before writing the page
- Finds and credits reference images from open archives
- Checks the result in a browser
- Separate build routes for websites and app screens

# Use Cases

## zh

- 需要一个不像模板的营销页面或作品集
- 为仪表盘或应用界面确定视觉风格
- 愿意用更多时间和 token 换设计质量

## en

- Needing a marketing page or portfolio that does not look templated
- Setting a visual style for a dashboard or app screen
- Trading more time and tokens for design quality

# Installation

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

# Usage

## zh

安装后直接让代理设计网站或应用界面。技能的脚本需要 Node 22 以上版本和已安装的 Chrome、Edge 或 Chromium，不需要 API 密钥，查找图片时需要联网。也可以用 Claude Code 或 Codex 的插件方式安装。

## en

After installing, ask the agent to design a website or app screen. Its scripts need Node 22 or newer and an installed Chrome, Edge, or Chromium. No API keys are required, though finding pictures needs network access. Claude Code and Codex plugin installs are also available.

# Workflow

## zh

1. 安装技能并确认 Node 与浏览器环境
2. 向代理描述要做的网站或界面
3. 由代理确定艺术方向并收集图片
4. 生成页面并在浏览器中检查
5. 检查图片出处后再发布

## en

1. Install the skill and confirm Node and a browser are available
2. Describe the site or screen to the agent
3. Let the agent set the direction and gather pictures
4. Build the page and check it in a browser
5. Review picture credits before publishing

# Changelog

## 2.1.5 | 2026-10-24

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

一次构建的开销大吗？

### question.en

How expensive is a build?

### answer.zh

作者给出的数字是约 30 到 45 分钟、几十万 token。按量计费时请先估算。

### answer.en

The author's figures are roughly 30 to 45 minutes and a few hundred thousand tokens. Estimate first if you pay per token.

## Question 2

### question.zh

旧版本里的其他技能去哪了？

### question.en

Where did the other skills from older versions go?

### answer.zh

它们迁到了独立仓库并保留原安装名，仓库 README 的 Moved skills 部分列出了去向。

### answer.en

They moved to their own repositories and kept their install names. The Moved skills section of the README lists where they went.
