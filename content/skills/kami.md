---
schemaVersion: 1
status: published
slug: kami
name: Kami
nameZh: Kami 文档排版
category: files-pdf
tags: [PDF, Typesetting, PowerPoint]
platforms: [Claude Code, Codex, Cursor, Claude Desktop]
author: tw93
version: 1.20.0
license: MIT
addedAt: '2026-11-04'
updatedAt: '2026-11-04'
githubUrl: 'https://github.com/tw93/Kami'
officialUrl: 'https://kami.tw93.fun'
downloadUrl: 'https://github.com/tw93/Kami/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: document
stars: 12240
---
# Description

## zh

为代理提供排版规则和模板，把内容导出成讲究的 PDF、PNG 和可编辑的 PowerPoint。

## en

Gives agents layout rules and templates for exporting content as well-set PDF, PNG, and editable PowerPoint files.

# Long Description

## zh

Kami 在日语中是“纸”的意思。它内置九种文档模板和一个产品落地页，示例包括简历、单页介绍和财报点评，并覆盖多种语言。它与同一作者的 Waza 属于同一系列，负责最后的交付环节。较大的中日韩字体不包含在安装包里，由脚本补齐到用户字体目录。

## en

Kami means paper in Japanese. It ships nine document templates and a product landing page, with samples such as resumes, one-pagers, and equity reports across several languages. It belongs to a series with the author's Waza and handles the delivery step. Large CJK fonts stay out of the package and a script recovers them into the user font directory.

# Features

## zh

- 九种内置文档模板
- 导出 PDF、PNG 和可编辑 PowerPoint
- 提供多语言排版样例
- 按需补齐中日韩字体

## en

- Nine built-in document templates
- Exports PDF, PNG, and editable PowerPoint
- Multilingual layout samples
- Recovers CJK fonts on demand

# Use Cases

## zh

- 让代理输出排版整齐的简历
- 把分析内容做成单页介绍或研究报告
- 需要可继续编辑的演示文稿

## en

- Getting a well-set resume from an agent
- Turning analysis into a one-pager or research report
- Needing an editable presentation

# Installation

```bash
npx skills add tw93/kami -a claude-code codex cursor -g -y
```

# Usage

## zh

安装后告诉代理要生成的文档类型并提供内容。Claude Desktop 用户需要下载 Release 中的 kami.zip，不要使用 GitHub 自动生成的源码压缩包。缺少中文或韩文字体时，运行仓库里的字体脚本。

## en

After installing, tell the agent which document you need and provide the content. Claude Desktop users should download kami.zip from Releases rather than GitHub's source ZIP. If Chinese or Korean fonts are missing, use the repository's font script.

# Workflow

## zh

1. 安装技能
2. 选择文档类型
3. 提供内容和要求
4. 检查字体和版式
5. 导出并复核成品

## en

1. Install the skill
2. Pick a document type
3. Provide content and requirements
4. Check fonts and layout
5. Export and review the result

# Changelog

## 1.20.0 | 2026-10-29

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

Claude Desktop 怎么安装？

### question.en

How do I install it on Claude Desktop?

### answer.zh

下载 Release 里的 kami.zip。README 特别提醒不要用 GitHub 的源码压缩包。

### answer.en

Download kami.zip from Releases. The README specifically warns against GitHub's source ZIP.

## Question 2

### question.zh

中文字体为什么没有一起安装？

### question.en

Why are Chinese fonts not installed with it?

### answer.zh

大字体文件没有放进安装包，由 ensure-fonts.sh 脚本补到用户字体目录。

### answer.en

Large fonts stay out of the package; the ensure-fonts.sh script recovers them into the user font directory.
