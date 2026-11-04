---
schemaVersion: 1
status: published
slug: legal-scholarship-skills
name: Legal Scholarship Skills
nameZh: 法学研究技能
category: research-writing
tags:
  - Legal Research
  - Academic Writing
  - Citations
  - Scholarship
platforms:
  - Claude Code
  - Codex
author: Kenneth Khoo
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-09-04'
githubUrl: 'https://github.com/kennethkhoocy/legal-scholarship-skills'
officialUrl: ''
downloadUrl: 'https://github.com/kennethkhoocy/legal-scholarship-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: research
stars: 7
---
# Description

## zh

为法学研究与学术写作设计的技能合集，辅助代理组织论证、研究材料和引注检查流程。

## en

A skill collection for legal research and scholarly writing, helping agents organize arguments, research materials, and citation-review workflows.

# Long Description

## zh

该仓库提供可用于 Claude Code 与 Codex 的法学研究技能，可通过插件或复制到技能目录接入。它适合支持文献整理、论文结构和引注核查，但生成内容不构成法律意见，且模型可能编造案例、法规或引文。所有权威来源都必须回到官方数据库或原始出版物逐项核验。

## en

The repository provides legal-scholarship skills for Claude Code and Codex, installable as a plugin or by copying them into a skills directory. It supports literature organization, article structure, and citation checks, but generated content is not legal advice and models may invent cases, statutes, or citations. Verify every authority against an official database or original publication.

# Features

## zh

- 面向法学研究和学术写作
- 辅助组织论证、材料和引注
- 支持 Claude Code 与 Codex
- 可融入可核查的研究流程

## en

- Targets legal research and scholarly writing
- Helps organize arguments, sources, and citations
- Supports Claude Code and Codex
- Fits a source-verifiable research workflow

# Use Cases

## zh

- 构建法学论文的问题与论证结构
- 整理案例、法规和二手文献
- 检查脚注与参考文献的一致性

## en

- Structure a legal scholarship question and argument
- Organize cases, statutes, and secondary literature
- Check consistency across footnotes and bibliography

# Installation

```bash
git clone https://github.com/kennethkhoocy/legal-scholarship-skills.git
```

```bash
cp -R legal-scholarship-skills/skills/* ~/.agents/skills/
```

# Usage

## zh

安装后提供研究法域、时间范围、引用格式和已确认的一手材料。要求代理为每个法律命题附来源，并把无法确认的引用显式标记；最终由研究者在权威来源中核对。

## en

After installation, provide the jurisdiction, time range, citation style, and confirmed primary materials. Require a source for each legal proposition and explicit marking of unverified citations, then have a researcher check them in authoritative sources.

# Workflow

## zh

1. 安装法学研究技能
2. 明确法域、问题和引用规范
3. 收集并区分一手与二手来源
4. 组织论证并生成草稿
5. 在权威数据库逐项核验

## en

1. Install the legal-scholarship skills
2. Define jurisdiction, question, and citation style
3. Collect and distinguish primary and secondary sources
4. Structure the argument and draft
5. Verify each authority in an authoritative database

# Changelog

## TODO | 2026-09-04

### zh

仓库尚未发布带版本号的 Release；此处记录最近更新时间，具体变更请查看提交历史。

### en

The repository has no versioned release yet; this records its latest update date. See the commit history for details.

# FAQ

## Question 1

### question.zh

生成的案例和引文可以信任吗？

### question.en

Can I trust generated cases and citations?

### answer.zh

不能直接信任。模型可能生成不存在或不准确的权威来源，必须在官方数据库或原始出版物中逐项核对。

### answer.en

Not without verification. Models can produce nonexistent or inaccurate authorities, so check each one in an official database or original publication.
