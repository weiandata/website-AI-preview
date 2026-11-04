---
schemaVersion: 1
status: published
slug: agent-browser
name: agent-browser
nameZh: agent-browser 代理浏览器
category: automation
tags: [Browser Automation, CLI, Rust]
platforms: [MCP]
author: Vercel Labs
version: 0.41.2
license: Apache-2.0
addedAt: '2026-11-04'
updatedAt: '2026-11-04'
githubUrl: 'https://github.com/vercel-labs/agent-browser'
officialUrl: 'https://agent-browser.dev'
downloadUrl: 'https://github.com/vercel-labs/agent-browser/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: automation
stars: 45479
---
# Description

## zh

为 AI 代理打造的浏览器自动化命令行工具，可打开页面、读取结构并操作元素。

## en

A browser automation CLI for AI agents that opens pages, reads their structure, and acts on elements.

# Long Description

## zh

这是一个原生 Rust 命令行工具。snapshot 把页面变成紧凑的文本，并给每个元素分配引用，例如 @e1；代理按引用操作，再读取页面确认结果。附带的技能是一个轻量入口，让代理加载与已安装版本一致的说明，所以指令不会和工具脱节。它也能作为 MCP 服务器运行。让代理操作已登录的页面时，要注意权限和误操作风险。

## en

This native Rust CLI lets an agent drive a browser one command at a time. snapshot returns a compact text view with a ref such as @e1 for each element; the agent acts on a ref and reads the page again to check. The bundled skill is a thin stub that loads instructions matching the installed version, so guidance stays in step with the tool. It can also run as an MCP server. Take care with permissions and mistakes when an agent works in logged-in pages.

# Features

## zh

- 用无障碍树输出紧凑的页面文本
- 按元素引用执行点击等操作
- 技能说明随命令行版本更新
- 提供 Electron、Slack 等专项技能
- 可作为 MCP 服务器运行

## en

- Compact page text from the accessibility tree
- Clicks and other actions by element ref
- Skill guidance tracks the CLI version
- Specialised skills such as Electron and Slack
- Runs as an MCP server

# Use Cases

## zh

- 让代理操作网页完成测试或检查
- 自动走查网站流程
- 给不支持浏览器的代理增加网页能力

## en

- Having an agent test or check web pages
- Walking through site flows automatically
- Adding web access to agents without a browser

# Installation

```bash
npm install -g agent-browser
```

```bash
agent-browser install
```

```bash
npx skills add vercel-labs/agent-browser
```

# Usage

## zh

第一次使用时运行 agent-browser install 下载测试版 Chrome。常用流程是 open 打开页面，snapshot -i 列出可交互元素，click @e1 操作元素，再用 get url 检查结果，结束后 close。安装技能后代理会自动加载 core 说明。

## en

On first use, agent-browser install downloads Chrome for Testing. The usual loop is open, snapshot -i to list interactive elements, click @e1 to act, get url to check, then close. With the skill installed, the agent loads the core guidance itself.

# Workflow

## zh

1. 安装命令行工具和浏览器
2. 安装技能
3. 打开目标页面
4. 读取快照并按引用操作
5. 检查结果后关闭

## en

1. Install the CLI and browser
2. Install the skill
3. Open the target page
4. Read the snapshot and act by ref
5. Check the result and close

# Changelog

## 0.41.2 | 2026-11-03

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

为什么安装的技能内容很少？

### question.en

Why is the installed skill so small?

### answer.zh

这是有意设计。它只提示代理运行 agent-browser skills get core，让说明始终与已安装版本一致。

### answer.en

That is by design. It tells the agent to run agent-browser skills get core so guidance always matches the installed version.

## Question 2

### question.zh

必须通过技能使用吗？

### question.en

Must I use it through the skill?

### answer.zh

不必。可以在 AGENTS.md 里写一段说明，也可以用 agent-browser mcp 接入 MCP 客户端。

### answer.en

No. You can add a note to AGENTS.md, or connect an MCP client with agent-browser mcp.
