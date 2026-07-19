---
schemaVersion: 1
status: published
slug: context-mode
name: Context Mode
nameZh: 上下文优化
category: productivity
tags:
  - Context Window
  - Token Efficiency
  - Sandbox
platforms:
  - Claude Code
  - Codex
author: mksglu
version: 1.0.169
license: Elastic-2.0
addedAt: '2026-07-19'
updatedAt: '2026-07-19'
githubUrl: 'https://github.com/mksglu/context-mode'
officialUrl: 'https://context-mode.com'
downloadUrl: 'https://github.com/mksglu/context-mode/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: productivity
stars: 19075
---
# Description

## zh

优化编程代理的上下文窗口占用，把工具调用产生的大量中间输出隔离开，让有限的上下文留给真正重要的内容。

## en

Optimises how a coding agent spends its context window, isolating the bulk output of tool calls so the limited space goes to what actually matters.

# Long Description

## zh

关于上下文的讨论多数集中在「怎么塞进更多信息」，但还有另一半问题：上下文常常不是被有用的信息占满的，而是被工具调用返回的大段中间结果、日志和文件内容挤爆的。真正需要模型记住的东西反而被挤了出去。这个项目处理的正是这一半——把这类中间输出隔离出去，只把结论和必要片段留在上下文里，从而在同样的窗口下让代理走得更远，也更不容易在长任务中忘掉前面的约定。项目在开发者社区中获得过较高关注度。需要留意的是它采用 Elastic License 2.0，不是标准的开源许可证。

## en

Most discussion of context is about fitting more in, but there is another half to the problem: the window usually fills not with useful information but with bulk tool output — logs, file dumps, intermediate results — crowding out what the model actually needs to remember. This project addresses that half, isolating such output so only conclusions and necessary fragments stay in context, letting an agent go further within the same window and drift less from earlier agreements during long tasks. It has drawn considerable attention in developer communities. Note that it uses the Elastic License 2.0, which is not a standard open-source licence.

# Features

## zh

- 把工具调用的大段输出隔离出上下文
- 只保留结论与必要片段，节省窗口空间
- 长任务中更不容易忘掉前面的约定
- 提供命令行安装，接入方式简单
- 有配套的官方网站与说明文档

## en

- Isolates bulk tool output away from the context window
- Keeps only conclusions and necessary fragments, saving space
- Reduces drift from earlier agreements during long tasks
- Installs from the command line with minimal setup
- Ships an official site and documentation

# Use Cases

## zh

- 代理跑长任务时经常「忘记」前面说好的事
- 上下文频繁被日志和文件内容占满
- 按 token 计费，希望减少无效占用
- 处理大型代码库，单次读取内容很多

## en

- Long agent runs where earlier agreements get forgotten
- A context window repeatedly swamped by logs and file dumps
- Paying per token and wanting less of it spent on noise
- Working in a large codebase where each read pulls in a lot

# Installation

```bash
npm install -g context-mode
```

# Usage

## zh

安装后按文档接入你所用的代理环境，它会在工具调用产生大量输出时自动处理，不需要你每次干预。日常使用中最直接的感受是长任务里代理更少偏离，以及同样的窗口能撑更久。

## en

Install it, wire it into your harness as documented, and it handles bulk tool output automatically without per-task intervention. In practice what you notice is that long runs drift less and the same window lasts longer.

# Workflow

## zh

1. 安装并接入你所用的代理环境
2. 正常进行较长的编程任务
3. 观察上下文占用与代理的连贯性
4. 按需要调整配置
5. 长期使用后对比 token 消耗

## en

1. Install and wire it into your harness
2. Run a longer coding task as usual
3. Watch context usage and how coherent the agent stays
4. Adjust configuration as needed
5. Compare token consumption over time

# Changelog

## 1.0.169 | 2026-07-19

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

许可证有什么限制？

### question.en

What does the licence restrict?

### answer.zh

它采用 Elastic License 2.0，这不是标准的开源许可证。主要限制是不能把本产品作为托管或托管式服务提供给第三方，也不能规避许可密钥功能。自己使用和内部使用通常没有问题，商用前请阅读仓库中的许可证原文。

### answer.en

It uses the Elastic License 2.0, which is not a standard open-source licence. The main restrictions are that you may not provide the product to others as a hosted or managed service, nor circumvent licence key functionality. Personal and internal use is generally fine; read the licence in the repository before commercial use.

## Question 2

### question.zh

和让 AI 少说话的技能有什么区别？

### question.en

How does it differ from skills that make the AI reply more briefly?

### answer.zh

那类技能压缩的是模型输出的文字，这个处理的是输入侧——工具调用返回的日志、文件内容等中间结果。两者针对的是上下文的不同来源，可以同时使用。

### answer.en

Those compress what the model writes; this handles the input side — the logs, file contents, and intermediate results that tool calls return. They target different sources of context pressure and can be used together.
