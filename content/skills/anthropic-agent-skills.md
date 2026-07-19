---
schemaVersion: 1
status: published
slug: anthropic-agent-skills
name: Anthropic Agent Skills
nameZh: Anthropic 官方技能示例库
category: development
tags:
  - Agent Skills
  - Official Examples
  - Skill Specification
  - Document Processing
platforms:
  - Claude
  - Claude Code
  - Claude API
author: Anthropic
version: TODO
license: Unlicensed
addedAt: '2026-07-19'
updatedAt: '2026-07-17'
githubUrl: 'https://github.com/anthropics/skills'
officialUrl: 'https://agentskills.io'
downloadUrl: 'https://github.com/anthropics/skills/archive/refs/heads/main.zip'
featured: true
featuredRank: 2
verified: true
icon: code
stars: 162532
downloads: 0
---
# Description

## zh

Anthropic 官方维护的 Agent Skills 示例库，收录从创意设计到文档处理的多个技能，并附带技能规范和模板。

## en

Anthropic's official repository of Agent Skills examples, spanning creative and technical tasks, alongside the skill specification and a starter template.

# Long Description

## zh

技能是一组指令、脚本和资源构成的文件夹，Claude 在需要时动态加载，用来把某类任务做得更稳定可控。这个仓库收集了官方编写的示例，覆盖艺术与设计、开发与技术、企业沟通等方向，每个技能都自成一个文件夹并带有 SKILL.md 说明。仓库还包含驱动 Claude 文档能力的 docx、pdf、pptx、xlsx 四个技能，可作为复杂技能的参考实现。适合用来理解技能的写法，或作为自建技能的起点。

## en

A skill is a folder of instructions, scripts, and resources that Claude loads on demand to handle a specialised task repeatably. This repository collects Anthropic's own examples across creative and design work, development and technical tasks, and enterprise communication, each self-contained with a SKILL.md. It also includes the docx, pdf, pptx, and xlsx skills that power Claude's document capabilities, offered as a reference for more complex skills. It is a good place to learn the format or to start your own.

# Features

## zh

- 官方编写的技能示例，覆盖创意、技术与企业场景
- 每个技能自成文件夹，附 SKILL.md 说明与元数据
- 包含 Agent Skills 规范说明和技能模板
- 收录驱动 Claude 文档能力的四个复杂技能作为参考
- 可作为 Claude Code 插件市场直接注册使用

## en

- Official skill examples across creative, technical, and enterprise scenarios
- Each skill self-contained in its own folder with a SKILL.md and metadata
- Ships the Agent Skills specification and a skill template
- Includes the four document skills behind Claude's file features as a reference
- Can be registered directly as a Claude Code plugin marketplace

# Use Cases

## zh

- 想动手写第一个技能，需要一份可照着改的范例
- 想弄清 SKILL.md 的字段和技能的组织方式
- 需要处理 docx、pdf、pptx、xlsx 文件
- 想了解官方推荐的技能拆分与结构模式

## en

- Writing a first skill and needing a working example to adapt
- Understanding what belongs in a SKILL.md and how a skill is organised
- Working with docx, pdf, pptx, or xlsx files
- Studying the structural patterns Anthropic recommends

# Installation

```bash
/plugin marketplace add anthropics/skills
```

```bash
/plugin install document-skills@anthropic-agent-skills
```

# Usage

## zh

在 Claude Code 里把仓库注册为插件市场，然后按需安装 document-skills 或 example-skills。装好后直接在对话里提到技能即可触发，例如让 Claude 用 PDF 技能抽取某个文件的表单字段。这些示例技能在 Claude.ai 付费方案中已经可以直接使用。

## en

Register the repository as a plugin marketplace in Claude Code, then install either document-skills or example-skills. Once installed, mention the skill in conversation to use it, for example asking Claude to extract form fields from a PDF with the PDF skill. The example skills are already available on paid Claude.ai plans.

# Workflow

## zh

1. 在 Claude Code 中把仓库注册为插件市场
2. 选择要安装的技能集合
3. 在对话中提到技能名或对应任务来触发
4. 打开对应文件夹的 SKILL.md 了解它的写法
5. 复制 template 目录作为自建技能的起点

## en

1. Register the repository as a plugin marketplace in Claude Code
2. Choose which skill set to install
3. Trigger a skill by naming it or describing the matching task
4. Open a skill's SKILL.md to see how it is written
5. Copy the template directory as the starting point for your own skill

# Changelog

## TODO | 2026-07-17

### zh

仓库未发布带版本号的 Release，此处记录最近一次更新日期。请查看提交历史了解变更。

### en

The repository publishes no versioned releases; this records the most recent update date. See the commit history for changes.

# FAQ

## Question 1

### question.zh

这些技能可以直接用在生产环境吗？

### question.en

Can these skills be used in production?

### answer.zh

仓库明确说明这些技能仅供演示和学习。Claude 实际的行为可能与示例中的实现不同，用于关键任务前请在自己的环境里充分测试。

### answer.en

The repository states these skills are for demonstration and educational purposes. Claude's actual behaviour may differ from what the examples show, so test thoroughly in your own environment before relying on them.

## Question 2

### question.zh

整个仓库是开源的吗？

### question.en

Is the whole repository open source?

### answer.zh

不完全是。仓库说明指出其中许多技能采用 Apache 2.0，但 docx、pdf、pptx、xlsx 四个文档技能是「源码可见」而非开源。仓库根目录没有统一的 LICENSE 文件，商用前请逐个确认。

### answer.en

Not entirely. The repository notes that many skills are Apache 2.0, while the docx, pdf, pptx, and xlsx skills are source-available rather than open source. There is no repository-wide LICENSE file, so check individually before commercial use.
