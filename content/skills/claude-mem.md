---
schemaVersion: 1
status: published
slug: claude-mem
name: Claude-Mem
nameZh: Claude-Mem 跨会话记忆
category: productivity
tags: [Memory, Context, Plugin]
platforms: [Claude Code, OpenCode, Google Antigravity]
author: thedotmack
version: 15.9.0
license: Apache-2.0
addedAt: '2026-11-04'
updatedAt: '2026-11-04'
githubUrl: 'https://github.com/thedotmack/claude-mem'
officialUrl: 'https://claude-mem.ai'
downloadUrl: 'https://github.com/thedotmack/claude-mem/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: productivity
stars: 112449
---
# Description

## zh

自动记录代理在会话中的操作，压缩成摘要，并在之后的会话中带回相关上下文。

## en

Records what an agent does during sessions, compresses it into summaries, and brings relevant context back in later sessions.

# Long Description

## zh

它在后台捕捉工具使用情况，用 AI 生成语义摘要，再把相关内容注入后续会话，让项目知识不会随会话结束而丢失。检索采用分层方式，并显示 token 成本。它提供隐私标签排除敏感内容，也有可选的团队共享工作区和云同步。由于它会保存代理的操作记录，使用前应确认数据存放位置，尤其是团队或含敏感信息的项目。

## en

It captures tool usage in the background, generates semantic summaries with AI, and injects relevant content into later sessions so project knowledge survives. Retrieval is layered and shows token cost. Privacy tags exclude sensitive content, and an optional team workspace and cloud sync are available. Because it stores a record of agent activity, confirm where data lives before use, especially on team projects or sensitive work.

# Features

## zh

- 自动捕捉操作并生成摘要
- 分层检索并显示 token 成本
- mem-search 技能查询项目历史
- 隐私标签排除敏感内容
- 可选的团队共享工作区

## en

- Captures activity and writes summaries automatically
- Layered retrieval that shows token cost
- A mem-search skill for querying project history
- Privacy tags that exclude sensitive content
- An optional shared team workspace

# Use Cases

## zh

- 长期项目中不想反复解释背景
- 查询之前某次会话做过的决定
- 多个代理工具之间延续工作

## en

- Avoiding repeated background explanations on a long project
- Looking up a decision from an earlier session
- Carrying work across agent tools

# Installation

```bash
npx claude-mem install
```

# Usage

## zh

安装程序完成设置后，会要求在浏览器登录 claude-mem 账号（邮箱链接，无需信用卡），登录后选择记忆服务：claude-mem observer（含 30 天免费试用）、你自己的 OpenRouter 或 Gemini 密钥，或你的 Anthropic 套餐。不想登录时，可传入 --provider 参数或设置 CLAUDE_MEM_ONLINE_OPTIN=false。之后它会自动运行，用 mem-search 技能回看历史。其他工具使用 --ide 参数，例如 --ide opencode。

## en

After setup the installer asks you to sign in to claude-mem in a browser (email link, no card required), then to pick a memory provider: the claude-mem observer with a 30-day free trial, your own OpenRouter or Gemini key, or your Anthropic plan. To skip sign-in, pass --provider or set CLAUDE_MEM_ONLINE_OPTIN=false. It then runs automatically; use the mem-search skill to look back. For other tools pass --ide, for example --ide opencode.

# Workflow

## zh

1. 确认数据存放方式
2. 安装并选择记忆服务
3. 正常工作，由它自动记录
4. 用隐私标签排除敏感内容
5. 需要时检索历史记录

## en

1. Confirm how data is stored
2. Install and choose a memory provider
3. Work as usual while it records
4. Exclude sensitive content with privacy tags
5. Search history when needed

# Changelog

## 15.9.0 | 2026-11-02

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

我的数据会上传吗？

### question.en

Is my data uploaded?

### answer.zh

取决于你选择的记忆服务和配置。默认安装会引导登录，可选 claude-mem observer、自己的 OpenRouter 或 Gemini 密钥，或 Anthropic 套餐；README 中 Grok Bot 的说明写明默认使用托管的 CMEM Pro。云同步和截图上传另有开关。请在安装前核对你所用工具的说明。

### answer.en

It depends on the memory provider and configuration you choose. The default install prompts a sign-in and offers the claude-mem observer, your own OpenRouter or Gemini key, or your Anthropic plan; the README's Grok Bot instructions name the hosted CMEM Pro as the default. Cloud sync and screenshot upload have their own settings. Check the instructions for your tool before installing.

## Question 2

### question.zh

免费试用结束后会怎样？

### question.en

What happens when the free trial ends?

### answer.zh

README 说明除非订阅，否则记忆服务会自动回退到你的 Anthropic 套餐，这会占用套餐额度。

### answer.en

The README says memory falls back to your Anthropic plan unless you subscribe, which draws on that plan's usage.

## Question 3

### question.zh

如何避免记录敏感内容？

### question.en

How do I keep sensitive content out?

### answer.zh

README 说明可以用隐私标签把内容排除在存储之外。处理受限数据前仍应先做测试。

### answer.en

The README describes privacy tags that exclude content from storage. Test this before working with restricted data.
