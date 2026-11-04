---
schemaVersion: 1
status: published
slug: andrej-karpathy-skills
name: Karpathy-Inspired Claude Code Guidelines
nameZh: Karpathy 风格编码准则
category: development
tags: [Coding Guidelines, CLAUDE.md, Best Practices]
platforms: [Claude Code, Cursor]
author: multica-ai
version: TODO
license: Unlicensed
addedAt: '2026-11-04'
updatedAt: '2026-04-20'
githubUrl: 'https://github.com/multica-ai/andrej-karpathy-skills'
officialUrl: ''
downloadUrl: 'https://github.com/multica-ai/andrej-karpathy-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: code
stars: 229314
---
# Description

## zh

一份 CLAUDE.md 准则，源自 Andrej Karpathy 对大模型写代码常见问题的观察。

## en

A CLAUDE.md guideline file derived from Andrej Karpathy's observations on common LLM coding pitfalls.

# Long Description

## zh

这是一个很小的项目，核心只有一份文件和四条原则：编码前先思考、简单优先、精确修改、目标驱动执行。它针对模型擅自假设、过度设计、顺手改动无关代码等问题。这是社区项目，并非 Karpathy 本人发布。仓库没有 LICENSE 文件，最近一次更新是 2026 年 4 月。

## en

This is a very small project: one file and four principles covering thinking before coding, simplicity first, surgical changes, and goal-driven execution. It targets models that assume silently, over-engineer, or touch unrelated code. It is a community project, not published by Karpathy himself. The repository has no LICENSE file and was last updated in April 2026.

# Features

## zh

- 四条简短的编码原则
- 可作为 Claude Code 插件全局安装
- 可写入项目的 CLAUDE.md
- 附带 Cursor 项目规则

## en

- Four short coding principles
- Installs globally as a Claude Code plugin
- Can go into a project's CLAUDE.md
- Includes a Cursor project rule

# Use Cases

## zh

- 减少代理过度设计
- 防止代理修改无关代码
- 给团队一套简短的代理工作准则

## en

- Reducing agent over-engineering
- Keeping agents from touching unrelated code
- Giving a team a short set of agent rules

# Installation

```bash
/plugin marketplace add forrestchang/andrej-karpathy-skills
```

```bash
/plugin install andrej-karpathy-skills@karpathy-skills
```

# Usage

## zh

通过插件安装后，准则在所有项目中可用。也可以把 CLAUDE.md 下载到单个项目中；如果项目已有该文件，请追加而不是覆盖。仓库已迁到 multica-ai，README 中的安装命令仍使用旧路径，旧路径目前可以跳转。

## en

Installed as a plugin, the guidelines apply across projects. You can also download CLAUDE.md into one project; if the file already exists, append rather than overwrite. The repository moved to multica-ai while the README's commands still use the old path, which currently redirects.

# Workflow

## zh

1. 选择插件或单项目安装
2. 阅读四条原则
3. 按项目需要调整
4. 观察代理改动范围是否收窄

## en

1. Choose a plugin or per-project install
2. Read the four principles
3. Adjust them for your project
4. Check whether agent changes become narrower

# Changelog

## TODO | 2026-04-20

### zh

仓库未发布带版本号的 Release，此处记录最近一次更新日期。请查看提交历史了解变更。

### en

The repository publishes no versioned releases; this records the most recent update date. See the commit history for changes.

# FAQ

## Question 1

### question.zh

这是 Karpathy 本人的项目吗？

### question.en

Is this Karpathy's own project?

### answer.zh

不是。它是根据他公开的观察整理的社区项目。

### answer.en

No. It is a community project based on his public observations.

## Question 2

### question.zh

可以商用吗？

### question.en

Can it be used commercially?

### answer.zh

仓库没有 LICENSE 文件，因此没有明确授权。商用或再分发前请先向作者确认。

### answer.en

The repository has no LICENSE file, so no licence is granted. Check with the author before commercial use or redistribution.
