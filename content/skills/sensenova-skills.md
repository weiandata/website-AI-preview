---
schemaVersion: 1
status: published
slug: sensenova-skills
name: SenseNova Skills
nameZh: 商汤日日新技能合集
category: files-pdf
tags:
  - Documents
  - Spreadsheets
  - Presentations
  - OpenClaw
platforms:
  - OpenClaw
  - Hermes Agent
author: OpenSenseNova
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-28'
githubUrl: 'https://github.com/OpenSenseNova/SenseNova-Skills'
officialUrl: ''
downloadUrl: 'https://github.com/OpenSenseNova/SenseNova-Skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: document
stars: 4833
---
# Description

## zh

面向 OpenClaw 与 Hermes Agent 的文档类技能合集，用于处理办公文件和常见内容生产任务。

## en

A document-oriented skill collection for OpenClaw and Hermes Agent, built for office files and common content-production tasks.

# Long Description

## zh

SenseNova Skills 以多个技能目录组织文件与内容能力，README 提供将技能复制到 OpenClaw 目录的安装方式，并说明 Hermes Agent 的使用场景。它适合让代理在文档、表格和演示文稿任务中遵循更明确的步骤。处理真实业务文件时，应先备份原件，并在交付前检查格式、公式、引用和敏感数据。

## en

SenseNova Skills organizes file and content capabilities into multiple skill directories. Its README documents copying skills into OpenClaw and describes Hermes Agent usage. It gives agents clearer steps for documents, spreadsheets, and presentations. Back up original business files and check formatting, formulas, citations, and sensitive data before delivery.

# Features

## zh

- 多个办公文件与内容处理技能
- 为 OpenClaw 提供明确的目录安装方式
- 支持 Hermes Agent 使用场景
- 可按需复制单个技能目录

## en

- Multiple office-file and content-processing skills
- Clear directory-based installation for OpenClaw
- Supports Hermes Agent scenarios
- Allows copying individual skill directories as needed

# Use Cases

## zh

- 让代理整理或生成办公文档
- 处理表格与演示文稿任务
- 为 OpenClaw 补充可复用的文件工作流

## en

- Ask an agent to organize or generate office documents
- Handle spreadsheet and presentation tasks
- Add reusable file workflows to OpenClaw

# Installation

```bash
git clone https://github.com/OpenSenseNova/SenseNova-Skills.git
```

```bash
cp -R SenseNova-Skills/skills/* ~/.openclaw/skills/
```

# Usage

## zh

复制所需技能后重启或刷新代理，并提供输入文件、期望输出格式和必须保留的内容。先在副本上运行，交付前打开结果检查布局、公式、媒体与元数据。

## en

After copying the required skills, restart or refresh the agent and provide the input file, desired output format, and content that must be preserved. Work on a copy first, then open the result and inspect layout, formulas, media, and metadata before delivery.

# Workflow

## zh

1. 克隆仓库并选择技能
2. 复制到代理技能目录
3. 备份并提供输入文件
4. 执行文档处理任务
5. 打开成品进行人工检查

## en

1. Clone the repository and select a skill
2. Copy it into the agent's skills directory
3. Back up and provide the input file
4. Run the document-processing task
5. Open the result for human inspection

# Changelog

## TODO | 2026-07-28

### zh

仓库尚未发布带版本号的 Release；此处记录最近更新时间，具体变更请查看提交历史。

### en

The repository has no versioned release yet; this records its latest update date. See the commit history for details.

# FAQ

## Question 1

### question.zh

为什么建议先备份输入文件？

### question.en

Why should I back up the input files first?

### answer.zh

办公文件可能包含复杂布局、公式和嵌入对象。先处理副本可以在输出不符合预期时保留可恢复的原件。

### answer.en

Office files may contain complex layout, formulas, and embedded objects. Working on a copy preserves a recoverable original if the output is not as expected.
