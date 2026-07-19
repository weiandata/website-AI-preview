---
schemaVersion: 1
status: published
slug: docx-cli
name: docx-cli
nameZh: Word 文档批注与修订
category: files-pdf
tags:
  - Word
  - Redline
  - Contracts
  - CLI
platforms:
  - Claude Code
  - Codex
author: kklimuk
version: 0.21.0
license: MIT
addedAt: 2026-07-19
updatedAt: 2026-07-18
githubUrl: https://github.com/kklimuk/docx-cli
officialUrl: ""
downloadUrl: https://github.com/kklimuk/docx-cli/archive/refs/heads/main.zip
featured: false
featuredRank: 0
verified: false
icon: document
stars: 144
downloads: 0
---

# Description

## zh

让 AI 读写 Word 文档、留批注、提修订建议，同时不破坏原有排版，改动以修订形式呈现，由人在 Word 里决定接受还是拒绝。

## en

Lets an AI read, edit, comment on, and redline Word documents without breaking the formatting, leaving changes as tracked revisions for a human to accept or reject in Word.

# Long Description

## zh

让 AI 改 Word 文档，常规做法是把 .docx 解压后直接写里面的 OOXML。这对模型要求很高，费 token，而且经常产出 Word 打不开的文件。这个工具换了个思路：给 AI 的是普通命令和一份带标注的 Markdown 阅读视图，它不必去理解 XML；工具在原文件的 XML 上就地修改，所以自定义样式、主题色和嵌入对象都能原样保留。定位方式也很实在——AI 用稳定的定位符加字符偏移来指明位置，而人打开文件看到的仍是正常的 Word 排版。作者做过一次对照测试：六个真实文档任务，同样的起始文件，由独立评判从 Word 渲染后的页面打分，结果显示在弱模型和强模型下都明显优于默认做法。

## en

The usual way to have an AI edit Word files is to unzip the .docx and write the OOXML by hand. That demands a strong model, burns tokens, and routinely yields a file Word refuses to open. This tool takes a different route: the AI gets plain commands and an annotated-Markdown read view, so it never reasons about XML, while the tool mutates the original file's XML in place — custom styles, theme colours, and embedded objects all survive. Addressing is practical too: the AI points at stable locators with character offsets, while a human opening the file sees ordinary Word formatting. The author ran a controlled comparison across six real document tasks with identical starting files, judged independently from the Word-rendered pages, and it outperformed the default approach at both a weak and a strong model tier.

# Features

## zh

- 在原文件 XML 上就地修改，排版与嵌入对象不丢失
- 改动以 Word 修订形式呈现，可逐条接受或拒绝
- 支持留批注，适合评审场景
- AI 通过稳定定位符指明位置，不必处理 XML
- 作者提供了公开的对照测试数据

## en

- Mutates the original file's XML in place, preserving formatting and embedded objects
- Presents changes as Word revisions to accept or reject individually
- Supports comments, which suits review workflows
- The AI addresses text by stable locators rather than handling XML
- The author publishes controlled comparison results

# Use Cases

## zh

- 让 AI 审阅合同并以修订形式提出修改
- 批量填写格式固定的文档，如保密协议、发票
- 给文档留批注供他人处理
- 调整简历或报告的排版而不重做格式

## en

- Having an AI review a contract and propose changes as redlines
- Filling in fixed-format documents such as NDAs and invoices
- Leaving comments on a document for someone else to action
- Restyling a résumé or report without rebuilding the formatting

# Installation

```bash
npm install -g docx-cli
```

# Usage

## zh

把 .docx 文件交给装好这个工具的 AI，说明要做什么——填写、批注还是提修订。拿回来的是一份带修订和批注的副本，用 Word 打开后像平常一样逐条接受或拒绝。因为改动都是修订形式，你始终能看到它动了什么。

## en

Hand a .docx to an AI with this installed and say what you need — filling in, commenting, or redlining. You get back a copy carrying revisions and comments; open it in Word and accept or reject as usual. Because everything arrives as tracked changes, you can always see what it touched.

# Workflow

## zh

1. 安装命令行工具
2. 把要处理的 .docx 交给 AI
3. 说明是填写、批注还是提修订
4. 用 Word 打开返回的副本
5. 逐条接受或拒绝修订

## en

1. Install the CLI
2. Hand the .docx to your AI
3. Say whether you want it filled, commented, or redlined
4. Open the returned copy in Word
5. Accept or reject each revision

# Changelog

## 0.21.0 | 2026-07-18

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

会不会把原来的格式改乱？

### question.en

Will it wreck my existing formatting?

### answer.zh

它在原文件的 XML 上就地修改，而不是让模型重新生成一份文档，所以自定义样式、主题色和嵌入对象都会保留。这正是它与「让模型直接写 OOXML」那种做法的区别。

### answer.en

It edits the original file's XML in place rather than having a model re-emit the document, so custom styles, theme colours, and embedded objects survive. That is precisely what separates it from having a model write OOXML directly.

## Question 2

### question.zh

AI 的修改会直接生效吗？

### question.en

Do the AI's edits apply directly?

### answer.zh

不会。改动以 Word 修订的形式留在文档里，需要人在 Word 中逐条接受或拒绝。对合同这类文件来说，这一步很重要——你能清楚看到每一处改了什么。

### answer.en

No. Changes arrive as tracked revisions for a person to accept or reject in Word. For documents like contracts that step matters, because you can see exactly what was altered.
