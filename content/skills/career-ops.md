---
schemaVersion: 1
status: published
slug: career-ops
name: Career-Ops
nameZh: Career-Ops 求职代理
category: productivity
tags: [Job Search, Resume, Career]
platforms: [Claude Code, Codex, OpenCode]
author: career-ops-hq
version: 1.38.0
license: MIT
addedAt: '2026-11-04'
updatedAt: '2026-11-04'
githubUrl: 'https://github.com/career-ops-hq/career-ops'
officialUrl: 'https://career-ops.org'
downloadUrl: 'https://github.com/career-ops-hq/career-ops/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: productivity
stars: 80032
---
# Description

## zh

在本地 AI 命令行里筛选职位、评估匹配度、定制简历并起草申请内容，最后由你本人提交。

## en

Screens jobs, scores fit, tailors your CV, and drafts application answers in a local AI CLI, leaving the final submit to you.

# Long Description

## zh

作者最初为自己的求职搭建这个工具，之后开源。它扫描招聘信息，在申请前按 1 到 5 分评估职位与简历的匹配度，生成适配招聘系统的简历，并起草各字段的回答。它有明确的边界：不会自动提交申请，也不会替你发送联系信息。工具会检查 PDF 中的数字和事实是否能在你的资料里找到，但作者也提醒这项检查不能保证万无一失。

## en

The author built this for their own job search and then open-sourced it. It scans listings, scores fit against your CV from 1 to 5 before you apply, produces an ATS-friendly CV, and drafts answers for each field. Its boundaries are explicit: it does not auto-submit applications or send outreach for you. It checks that numbers and facts in a PDF appear in your own material, though the author warns this check is not foolproof.

# Features

## zh

- 申请前按 1 到 5 分评估职位匹配度
- 生成适配招聘系统的定制简历
- 起草申请表各字段的回答
- 批量并行评估职位
- 不自动提交，由本人确认

## en

- Scores job fit from 1 to 5 before you apply
- Produces a tailored, ATS-friendly CV
- Drafts answers for application fields
- Evaluates jobs in parallel batches
- Never auto-submits; you confirm

# Use Cases

## zh

- 求职时筛掉不值得投入时间的职位
- 针对具体职位调整简历
- 准备申请材料并保留人工把关

## en

- Filtering out jobs not worth the time
- Tailoring a CV to a specific job
- Preparing applications while keeping a human check

# Installation

```bash
npx @santifer/career-ops init
```

# Usage

## zh

在空目录运行初始化，然后在该目录打开你常用的 AI 命令行工具，粘贴一个职位开始评估。它在本地运行。没有 AI 命令行时，仓库也提供 Gemini、Ollama 等独立脚本。PDF 生成需要 Playwright 的 Chromium。

## en

Run init, open your usual AI CLI in that folder, and paste a job to evaluate. It runs locally. Without an AI CLI, the repository also offers standalone scripts for Gemini, Ollama, and others. PDF generation needs Playwright's Chromium.

# Workflow

## zh

1. 初始化工作目录
2. 提供你的简历
3. 粘贴职位进行评估
4. 根据分数决定是否申请
5. 核对定制简历和回答后自行提交

## en

1. Initialise a working folder
2. Provide your CV
3. Paste a job to evaluate
4. Decide from the score whether to apply
5. Check the tailored CV and answers, then submit yourself

# Changelog

## 1.38.0 | 2026-10-23

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

它会替我自动投递吗？

### question.en

Will it apply for me automatically?

### answer.zh

不会。README 明确说它只起草内容，由你检查并点击提交，脚本不会自动发送申请。

### answer.en

No. The README says it only drafts; you review and click Submit, and the script never sends the application.

## Question 2

### question.zh

生成的简历可以直接用吗？

### question.en

Can I use the generated CV as is?

### answer.zh

请先人工核对。工具要求不得编造经历，并设有事实检查，但作者提醒这项检查不能发现所有问题。

### answer.en

Review it first. The tool must not fabricate experience and includes a fact check, but the author warns it cannot catch everything.
