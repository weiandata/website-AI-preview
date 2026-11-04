---
schemaVersion: 1
status: published
slug: n8n-skills
name: n8n Skills
nameZh: n8n 工作流技能
category: automation
tags: [n8n, Workflow Automation, MCP]
platforms: [Claude Code]
author: czlonkowski
version: 1.37.1
license: MIT
addedAt: '2026-11-04'
updatedAt: '2026-10-24'
githubUrl: 'https://github.com/czlonkowski/n8n-skills'
officialUrl: 'https://www.n8n-skills.com'
downloadUrl: 'https://github.com/czlonkowski/n8n-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: automation
stars: 6585
---
# Description

## zh

教 Claude Code 通过 n8n-mcp 正确构建 n8n 工作流，减少表达式和配置错误。

## en

Teaches Claude Code to build n8n workflows correctly through n8n-mcp, cutting expression and configuration errors.

# Long Description

## zh

仓库包含 14 个互补的技能，外加常驻的路由技能和钩子层。它们针对用程序生成 n8n 工作流时的常见问题：错误使用 MCP 工具、卡在校验循环、选错工作流模式、节点配置不对。内容涵盖表达式语法、MCP 工具用法、工作流模式和校验错误处理。它依赖同一作者的 n8n-mcp 服务器。

## en

The repository holds 14 complementary skills plus an always-on router skill and a hooks layer. They target common problems when building n8n workflows programmatically: misused MCP tools, validation loops, wrong workflow patterns, and misconfigured nodes. Coverage includes expression syntax, MCP tool use, workflow patterns, and validation errors. It depends on the same author's n8n-mcp server.

# Features

## zh

- 14 个互补技能和路由技能
- 表达式语法与常见错误目录
- 工作流模式指导
- 校验错误解读
- 钩子层强制执行规则

## en

- 14 complementary skills and a router skill
- Expression syntax with a catalogue of mistakes
- Guidance on workflow patterns
- Interpretation of validation errors
- A hooks layer that enforces the rules

# Use Cases

## zh

- 用代理搭建 n8n 自动化流程
- 排查 n8n 表达式和节点配置错误
- 把手工流程迁移到 n8n

## en

- Building n8n automations with an agent
- Debugging n8n expressions and node configuration
- Moving manual processes to n8n

# Installation

```bash
/plugin install czlonkowski/n8n-skills
```

# Usage

## zh

先配置好 n8n-mcp 服务器，再安装插件。之后直接描述要搭建的流程，技能会在写表达式或配置节点时自动触发。在生产环境启用工作流之前，请先在测试实例验证。

## en

Set up the n8n-mcp server first, then install the plugin. Describe the workflow you want and the skills activate as expressions and nodes come up. Validate in a test instance before enabling a workflow in production.

# Workflow

## zh

1. 配置 n8n-mcp 服务器
2. 安装插件
3. 描述要搭建的工作流
4. 检查校验结果并修复
5. 在测试实例验证后启用

## en

1. Set up the n8n-mcp server
2. Install the plugin
3. Describe the workflow
4. Check validation results and fix them
5. Validate in a test instance, then enable

# Changelog

## 1.37.1 | 2026-10-24

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

必须安装 n8n-mcp 吗？

### question.en

Is n8n-mcp required?

### answer.zh

是的。这些技能就是围绕 n8n-mcp 服务器设计的。

### answer.en

Yes. These skills are designed around the n8n-mcp server.

## Question 2

### question.zh

生成的工作流可以直接上线吗？

### question.en

Can generated workflows go straight to production?

### answer.zh

不建议。工作流可能操作真实系统和数据，请先在测试实例验证。

### answer.en

Not advisable. Workflows can touch real systems and data, so validate in a test instance first.
