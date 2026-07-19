---
schemaVersion: 1
status: published
slug: book-to-skill
name: book-to-skill
nameZh: 资料转技能
category: research-writing
tags:
  - Knowledge Base
  - PDF
  - EPUB
  - Reference
platforms:
  - Claude Code
  - GitHub Copilot
  - Amp
author: virgiliojr94
version: 1.2.0
license: MIT
addedAt: 2026-07-19
updatedAt: 2026-07-16
githubUrl: https://github.com/virgiliojr94/book-to-skill
officialUrl: ""
downloadUrl: https://github.com/virgiliojr94/book-to-skill/archive/refs/heads/master.zip
featured: false
featuredRank: 0
verified: false
icon: research
stars: 8775
downloads: 0
---

# Description

## zh

把一本技术书、一个资料文件夹或一批零散来源，整理成一个统一的技能，让 AI 在你工作时随时查阅和引用。

## en

Turns a technical book, a folder of documents, or a scattered set of sources into one unified skill your AI can study, reference, and use while you work.

# Long Description

## zh

手上有一本讲清楚了某个主题的书，或者攒了一堆规范文档、内部资料，问题是 AI 用不上它们——每次都要手动贴进去，贴多了又超出上下文。这个工具把这些材料转成一个结构化的技能：AI 需要时会去查对应章节，而不是把整本书塞进对话。支持的格式很多，PDF、EPUB、DOCX、Markdown、HTML、RTF、MOBI 都能处理，所以无论是买来的电子书、导出的文档还是网页存档都可以作为输入。做出来的技能符合开放标准，可以在 GitHub Copilot CLI、Amp 和 Claude Code 里使用。

## en

You have a book that explains a subject well, or a pile of specs and internal documents — but your AI cannot use them. Pasting them in by hand does not scale, and a whole book will not fit in context. This tool converts that material into a structured skill: the AI consults the relevant section when it needs to, rather than swallowing the book whole. It handles PDF, EPUB, DOCX, Markdown, HTML, RTF, and MOBI, so purchased ebooks, exported documents, and saved web pages all work as input. The resulting skill follows the open standard and runs in GitHub Copilot CLI, Amp, and Claude Code.

# Features

## zh

- 支持 PDF、EPUB、DOCX、Markdown、HTML、RTF、MOBI 七种格式
- 可以把整个文件夹或多个来源合并成一个技能
- 产出结构化技能，按需查阅而不是整本塞进上下文
- 符合开放的 Agent Skills 标准
- 适用于 GitHub Copilot CLI、Amp 与 Claude Code

## en

- Handles seven formats: PDF, EPUB, DOCX, Markdown, HTML, RTF, and MOBI
- Merges a whole folder or several sources into a single skill
- Produces a structured skill consulted on demand rather than loaded wholesale
- Follows the open Agent Skills standard
- Works with GitHub Copilot CLI, Amp, and Claude Code

# Use Cases

## zh

- 有一本讲透某个框架的书，想让 AI 按书里的方法做事
- 团队内部规范散在多个文档里，希望 AI 能遵守
- 学习某个领域时，希望 AI 基于指定教材回答
- 把行业标准或法规文本变成可查阅的依据

## en

- Owning a book that covers a framework well and wanting your AI to follow it
- Internal conventions spread across documents that the AI should honour
- Studying a field and wanting answers grounded in a specific text
- Turning a standard or regulatory text into something consultable

# Installation

```bash
pip install book-to-skill
```

# Usage

## zh

把要转换的书或文件夹交给它，生成一个技能目录，再按你所用工具的方式装上。之后 AI 遇到相关问题会去查这份材料，回答会基于你提供的来源而不是它的泛化印象。多个来源可以合并成一个技能，适合把同一主题的资料集中起来。

## en

Point it at the book or folder, get a skill directory, and install that into whichever tool you use. From then on your AI consults that material when the topic comes up, so answers rest on the source you supplied rather than its general impressions. Several sources can be merged into one skill, which suits gathering everything on a subject together.

# Workflow

## zh

1. 安装工具
2. 准备好要转换的书籍或文档文件夹
3. 运行转换，生成技能目录
4. 把技能装进你所用的代理工具
5. 正常提问，AI 会按这份材料作答

## en

1. Install the tool
2. Gather the book or document folder you want converted
3. Run the conversion to produce a skill directory
4. Install that skill into the agent tool you use
5. Ask as usual and the AI answers from that material

# Changelog

## 1.2.0 | 2026-07-16

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

转换受版权保护的书籍合适吗？

### question.en

Is it appropriate to convert a copyrighted book?

### answer.zh

工具本身只做格式转换，怎么用取决于你。合理的做法是只处理你有权使用的材料——自己购买的书籍供个人参考、公司内部文档、或开放授权的资料，并且不要把转换结果公开分发。

### answer.en

The tool only converts; how you use it is on you. The sensible boundary is material you have the right to use — books you bought, for your own reference, internal company documents, or openly licensed sources — and not redistributing what comes out.

## Question 2

### question.zh

整本书会不会占满 AI 的上下文？

### question.en

Will a whole book fill up the AI's context?

### answer.zh

不会。它产出的是结构化技能，AI 按需要查阅对应部分，而不是一次性把全文读进对话，所以长文档也能用。

### answer.en

No. It produces a structured skill that the AI consults section by section as needed, rather than reading the whole text into the conversation, so long documents remain workable.
