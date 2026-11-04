---
schemaVersion: 1
status: published
slug: anydoc
name: anydoc
nameZh: anydoc 文档转 Markdown
category: files-pdf
tags: [Document Conversion, Markdown, PDF]
platforms: [Claude Code, Codex, Cursor, OpenCode]
author: Firecrawl
version: 0.2.4
license: MIT
addedAt: '2026-11-04'
updatedAt: '2026-10-23'
githubUrl: 'https://github.com/firecrawl/anydoc'
officialUrl: 'https://firecrawl.github.io/anydoc/'
downloadUrl: 'https://github.com/firecrawl/anydoc/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: document
stars: 23343
---
# Description

## zh

把 Word、PowerPoint、Excel、PDF 等文档转换成干净的 Markdown，并以技能形式提供给代理。

## en

Converts Word, PowerPoint, Excel, PDF, and other documents to clean Markdown, and ships as a skill for agents.

# Long Description

## zh

这是 Firecrawl 开发的 Rust 库，支持 Word、PowerPoint、Excel、OpenDocument、RTF、EPUB、CSV 和 PDF，并提供 Node.js、Python 和浏览器绑定。附带的技能教代理用命令行转换遇到的文档。网页演示以 WebAssembly 运行，文件在本地处理。扫描件可通过 --ocr hosted 使用 Firecrawl Parse，这时内容会交给托管服务处理。

## en

Built by Firecrawl, this Rust library handles Word, PowerPoint, Excel, OpenDocument, RTF, EPUB, CSV, and PDF, with Node.js, Python, and browser bindings. The included skill teaches agents to convert documents with the CLI. The web demo runs as WebAssembly, so files are processed locally. Scanned files can go through Firecrawl Parse with --ocr hosted, in which case a hosted service handles the content.

# Features

## zh

- 支持八类常见文档格式
- 输出 GitHub 风格 Markdown
- 提供命令行、Node.js、Python 和浏览器版本
- 附带可安装的 Agent Skill
- 可选托管 OCR 处理扫描件

## en

- Supports eight common document formats
- Outputs GitHub-Flavored Markdown
- CLI, Node.js, Python, and browser versions
- Includes an installable Agent Skill
- Optional hosted OCR for scanned files

# Use Cases

## zh

- 让代理读取 Office 文档
- 批量把资料转换成 Markdown 供检索使用
- 在应用中集成文档解析

## en

- Letting agents read Office documents
- Converting material to Markdown in bulk for retrieval
- Adding document parsing to an application

# Installation

```bash
npx skills add firecrawl/anydoc
```

# Usage

## zh

安装技能后，代理遇到文档时会调用命令行转换。也可以直接运行 npx @firecrawl/anydoc report.docx 把结果输出到终端，或加 -o 写入文件。处理机密文件时不要使用 hosted OCR，除非已确认可以发送给该服务。

## en

With the skill installed, the agent converts documents through the CLI when it meets them. You can also run npx @firecrawl/anydoc report.docx to print to the terminal, or add -o to write a file. Avoid hosted OCR on confidential files unless sending them to that service is approved.

# Workflow

## zh

1. 安装技能或命令行工具
2. 把文档交给代理或直接运行转换
3. 检查表格和标题是否正确
4. 扫描件先判断能否使用托管 OCR
5. 把 Markdown 用于后续任务

## en

1. Install the skill or CLI
2. Hand the document to the agent or run the conversion
3. Check tables and headings
4. Decide whether hosted OCR is acceptable for scans
5. Use the Markdown in later work

# Changelog

## 0.2.4 | 2026-08-27

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

文件会上传到服务器吗？

### question.en

Are files uploaded to a server?

### answer.zh

常规转换在本地完成，网页演示也在浏览器内运行。只有使用 --ocr hosted 时，扫描页才会交给 Firecrawl Parse。

### answer.en

Regular conversion is local, and the web demo runs in the browser. Only --ocr hosted sends scanned pages to Firecrawl Parse.

## Question 2

### question.zh

能在 Python 里调用吗？

### question.en

Can I call it from Python?

### answer.zh

可以，安装 firecrawl-anydoc 包。Node.js 使用 @firecrawl/anydoc。

### answer.en

Yes, through the firecrawl-anydoc package. Node.js uses @firecrawl/anydoc.
