---
schemaVersion: 1
status: published
slug: google-workspace-cli
name: Google Workspace CLI
nameZh: Google Workspace 命令行
category: automation
tags:
  - Google Workspace
  - CLI
  - Gmail
  - Automation
platforms:
  - Claude Code
  - Codex
author: googleworkspace
version: 0.22.5
license: Apache-2.0
addedAt: '2026-07-19'
updatedAt: '2026-07-17'
githubUrl: 'https://github.com/googleworkspace/cli'
officialUrl: 'https://developers.google.com/workspace'
downloadUrl: 'https://github.com/googleworkspace/cli/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: automation
stars: 29820
downloads: 0
---
# Description

## zh

用一个命令行工具操作 Google Drive、Gmail、日历等全部 Workspace 服务，输出结构化 JSON，并附带四十多个可供 AI 调用的技能。

## en

One command-line tool for Drive, Gmail, Calendar, and every other Workspace API, with structured JSON output and more than forty agent skills included.

# Long Description

## zh

它的设计有一点和同类工具不同：不预先写死一份命令列表，而是在运行时读取谷歌自己的 Discovery 服务，动态生成全部命令。这意味着 Workspace 新增了接口或方法，它会自动支持，不必等作者更新。输出统一为结构化 JSON，既方便脚本处理，也方便 AI 解析。仓库同时附带四十多个技能，让代理可以直接完成收发邮件、整理云端文件、安排日程这类操作。需要注意两点：这不是谷歌官方支持的产品，且项目仍在积极开发中，仓库明确提示在到达 1.0 之前会有破坏性变更。

## en

Its design differs from comparable tools in one respect: rather than shipping a fixed command list, it reads Google's own Discovery Service at runtime and builds its entire command surface dynamically. When Workspace adds an endpoint or method, the tool picks it up without waiting for an update. Output is uniformly structured JSON, convenient for both scripts and AI parsing, and the repository bundles over forty skills so an agent can handle mail, Drive files, and scheduling directly. Two caveats matter: this is not an officially supported Google product, and the repository warns to expect breaking changes on the way to v1.0.

# Features

## zh

- 运行时读取谷歌 Discovery 服务，自动覆盖新接口
- 一个工具贯通 Drive、Gmail、日历等全部服务
- 输出统一为结构化 JSON，便于脚本与代理处理
- 附带四十多个可直接调用的代理技能
- 提供各操作系统的预编译发布版本

## en

- Reads Google's Discovery Service at runtime, so new endpoints appear automatically
- One tool spanning Drive, Gmail, Calendar, and the rest
- Uniform structured JSON output for scripts and agents alike
- Bundles more than forty ready-to-use agent skills
- Ships prebuilt releases for each operating system

# Use Cases

## zh

- 让 AI 代收代整理邮件，或按条件归档
- 批量整理云端硬盘里的文件
- 按日程安排会议或查看空档
- 把 Workspace 操作接进自己的自动化脚本

## en

- Having an AI triage and file email by rule
- Tidying Drive files in bulk
- Scheduling meetings or checking availability
- Wiring Workspace operations into your own automation scripts

# Installation

```bash
npm install -g @googleworkspace/cli
```

# Usage

## zh

先完成账号授权，之后即可用命令操作各项服务，或让装好技能的代理代为执行。由于所有命令来自谷歌 Discovery 服务动态生成，可用操作与你账号的权限范围一致。涉及发送邮件、删除文件这类不可逆操作时，建议先在小范围试验。

## en

Authorise your account first, then drive the services by command or let an agent with the skills installed do it for you. Because the command surface is generated from Google's Discovery Service, what you can do matches your account's own permissions. For irreversible actions such as sending mail or deleting files, try a small case first.

# Workflow

## zh

1. 安装命令行工具
2. 完成谷歌账号授权
3. 确认要操作的服务与权限范围
4. 用命令或让代理执行操作
5. 核对结果，尤其是不可逆的操作

## en

1. Install the CLI
2. Authorise your Google account
3. Confirm which services and scopes you are granting
4. Run the operation by command or through an agent
5. Check the result, especially for anything irreversible

# Changelog

## 0.22.5 | 2026-07-17

### zh

对应仓库当前发布的版本。项目在到达 1.0 之前可能有破坏性变更，升级前请查看 Releases。

### en

Matches the release currently published. Expect breaking changes before v1.0, so check the Releases page before upgrading.

# FAQ

## Question 1

### question.zh

这是谷歌官方的工具吗？

### question.en

Is this an official Google tool?

### answer.zh

仓库位于谷歌的组织下，但 README 开头明确写着：这不是谷歌官方支持的产品。也就是说不提供官方技术支持，使用中的问题需要通过仓库的议题区反馈。

### answer.en

The repository sits under Google's organisation, but its README states plainly at the top that this is not an officially supported Google product. There is no official support channel; issues go through the repository's tracker.

## Question 2

### question.zh

现在适合用在正式工作流里吗？

### question.en

Is it ready for a production workflow?

### answer.zh

仓库提示项目仍在积极开发，到 1.0 之前会有破坏性变更。用于探索和个人自动化没问题，接入关键业务流程前建议锁定版本，并留意升级说明。

### answer.en

The repository warns that development is active and breaking changes should be expected before v1.0. It is fine for exploration and personal automation; if you wire it into something critical, pin the version and follow the release notes.
