---
schemaVersion: 1
status: published
slug: open-design
name: Open Design
nameZh: 开源设计工作台
category: image-design
tags:
  - Design Tool
  - Local First
  - Design System
platforms:
  - Codex
  - OpenCode
author: nexu-io
version: 0.15.1
license: Apache-2.0
addedAt: '2026-07-19'
updatedAt: '2026-07-19'
githubUrl: 'https://github.com/nexu-io/open-design'
officialUrl: 'https://open-design.ai'
downloadUrl: 'https://github.com/nexu-io/open-design/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: image
stars: 79602
downloads: 0
---
# Description

## zh

一个本地优先的开源设计工作台，把设计系统、插件、编程代理和多种媒体模型放在同一个应用里，可直接导出演示文稿和 PDF。

## en

A local-first open-source design workspace that brings design systems, plugins, coding agents, and multiple media models into one app, with direct export to slides and PDF.

# Long Description

## zh

它把设计工作中原本分散在各处的环节收进一个应用：设计系统、插件生态、编程代理和多家媒体模型都在里面，不必在工具之间来回切换。本地优先意味着工作内容默认留在你自己的机器上。0.15 之前的几个版本重点解决长时间设计的连续性问题——一次运行被打断后能接着跑，模型选择更直接，导出带截图的 PPTX 或 PDF 不必再绕出应用。项目采用 Apache-2.0，可以直接下载各平台的发布版本使用。官方另有一个付费的模型服务，一次充值即可在应用内调用二十多个主流模型，按实际用量计费；不用这个服务的话，自己配置模型密钥同样可以工作。

## en

It pulls the scattered parts of design work into one application: design systems, a plugin ecosystem, coding agents, and several media model providers, with no switching between tools. Local-first means your work stays on your own machine by default. Recent releases have focused on continuity through long sessions — a run resumes after an interruption, model selection is more direct, and exporting screenshot-backed PPTX or PDF no longer requires leaving the app. It is Apache-2.0 licensed with prebuilt downloads for each platform. The project also offers a paid model service where one top-up gives in-app access to twenty-plus flagship models billed by real usage; without it, supplying your own model keys works just as well.

# Features

## zh

- 设计系统、插件、编程代理与媒体模型集中在一个应用
- 本地优先，工作内容默认留在自己机器上
- 长会话可恢复，被打断后接着跑
- 直接导出带截图的 PPTX 与 PDF
- Apache-2.0 许可证，提供各平台发布版本

## en

- Design systems, plugins, coding agents, and media models in one app
- Local-first, keeping your work on your own machine by default
- Long sessions resume after an interruption instead of losing their place
- Exports screenshot-backed PPTX and PDF directly
- Apache-2.0 licensed with prebuilt downloads per platform

# Use Cases

## zh

- 设计流程涉及多个工具，想减少来回切换
- 对数据留在本地有要求，不便使用纯云端服务
- 设计过程较长，经常被打断
- 需要把设计成果直接交付成演示文稿或 PDF

## en

- A design process spread across tools that you want to consolidate
- Requirements that keep work on your own machine rather than in the cloud
- Long design sessions that get interrupted often
- Needing to hand off the result as slides or a PDF

# Installation

```bash
git clone https://github.com/nexu-io/open-design.git
```

# Usage

## zh

从官网或仓库的发布页下载对应系统的安装包，装好后配置要使用的模型。可以自己填模型密钥，也可以使用官方的付费模型服务。日常使用中在同一个应用里完成设计、调用代理和导出交付物。

## en

Download the installer for your platform from the website or the repository's releases page, then configure which models to use — either your own keys or the project's paid service. From there, design, invoke agents, and export deliverables all within the same app.

# Workflow

## zh

1. 下载并安装对应平台的版本
2. 配置模型密钥或开通官方模型服务
3. 在应用内进行设计并调用代理
4. 中途被打断后恢复原有会话
5. 导出 PPTX 或 PDF 交付

## en

1. Download and install the build for your platform
2. Configure model keys or enable the project's model service
3. Design and invoke agents inside the app
4. Resume the session after any interruption
5. Export PPTX or PDF to hand off

# Changelog

## 0.15.1 | 2026-07-19

### zh

对应仓库当前发布的版本。近期版本着重解决长时间设计会话的连续性。完整变更请查看 GitHub Releases。

### en

Matches the release currently published. Recent versions focus on continuity through long design sessions. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

必须购买官方的模型服务吗？

### question.en

Do I have to buy the project's model service?

### answer.zh

不必。官方模型服务只是省去自己配置的一种选择，按实际用量计费。你也可以自行填入所用模型的密钥，功能同样可用。

### answer.en

No. The model service is one convenience option, billed by actual usage. Supplying your own model keys works equally well.

## Question 2

### question.zh

本地优先具体意味着什么？

### question.en

What does local-first mean in practice?

### answer.zh

意味着应用运行在你自己的机器上，设计内容默认保存在本地，而不是先上传到服务器。但调用云端模型时，相应的请求内容仍会发送给对应的模型服务商，这一点与你选择的模型有关。

### answer.en

The app runs on your machine and your design work is stored locally by default rather than uploaded first. That said, when you call a cloud model, the request contents still go to that model provider — which depends on the models you choose.
