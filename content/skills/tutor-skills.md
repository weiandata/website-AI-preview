---
schemaVersion: 1
status: published
slug: tutor-skills
name: Tutor Skills
nameZh: Obsidian 学习导师技能
category: productivity
tags: [Learning, Obsidian, Study Vault]
platforms: [Claude Code]
author: bevibing
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-02-28'
githubUrl: 'https://github.com/bevibing/tutor-skills'
officialUrl: ''
downloadUrl: 'https://github.com/bevibing/tutor-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: productivity
stars: 1386
---
# Description

## zh

将 PDF、文档和代码库转为 Obsidian 学习 Vault 的 Claude Code 技能。

## en

A Claude Code skill that turns PDFs, documents, and codebases into Obsidian study vaults.

# Long Description

## zh

仓库包含导师和初始化技能，用结构化笔记、问题与学习路径整理输入材料。生成笔记可能遗漏细节，应保留原始资料并核对重要概念和引用。

## en

The repository includes tutor and setup skills that organize sources into structured notes, questions, and learning paths. Generated notes can omit detail, so retain source material and verify important concepts and citations.

# Features

## zh

- 把多种资料整理为学习 Vault
- 生成结构化笔记和学习路径

## en

- Turns several source types into a study vault
- Generates structured notes and learning paths

# Use Cases

## zh

- 学习大型代码库
- 将课程 PDF 整理为复习笔记

## en

- Study a large codebase
- Turn course PDFs into revision notes

# Installation

```bash
npx skills add bevibing/tutor-skills
```

# Usage

## zh

在副本 Vault 中提供获授权的资料与学习目标。生成后抽查笔记与原文是否一致，并补充缺失引用。

## en

Use a copy of the vault with authorized sources and learning goals. Sample notes against originals afterward and add missing citations.

# Workflow

## zh

1. 备份 Vault 并导入资料
2. 生成学习结构与笔记
3. 对照原文抽查

## en

1. Back up the vault and import sources
2. Generate study structure and notes
3. Sample against originals

# Changelog

## TODO | 2026-02-28

### zh

仓库没有版本化 Release；此处记录最近更新时间。

### en

The repository has no versioned release; this records its latest update.

# FAQ

## Question 1

### question.zh

生成笔记可以替代原始材料吗？

### question.en

Can generated notes replace source material?

### answer.zh

不能。笔记是压缩表示，重要概念和引用仍要回到原文确认。

### answer.en

No. Notes are compressed representations; confirm important concepts and citations in the source.
