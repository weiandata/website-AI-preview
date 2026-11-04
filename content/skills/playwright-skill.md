---
schemaVersion: 1
status: published
slug: playwright-skill
name: Playwright Skill
nameZh: Playwright 浏览器自动化技能
category: automation
tags:
  - Playwright
  - Browser Automation
  - End to End Testing
  - Screenshots
platforms:
  - Claude Code
author: lackeyjb
version: 5.0.0
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-11-01'
githubUrl: 'https://github.com/lackeyjb/playwright-skill'
officialUrl: ''
downloadUrl: 'https://github.com/lackeyjb/playwright-skill/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: automation
stars: 3264
---
# Description

## zh

让 Claude Code 按任务即时编写并执行 Playwright 自动化，用于页面测试、交互流程、截图和浏览器检查。

## en

Enables Claude Code to write and execute task-specific Playwright automation for page tests, interaction flows, screenshots, and browser checks.

# Long Description

## zh

这个仓库以 Claude Code 插件形式封装一个符合 Agent Skills 结构的 Playwright 技能，包含通用执行器、辅助函数和按需加载的 API 参考。浏览器默认可见，便于观察实际行为。它可以执行任意定制自动化，因此应避免在生产账号上处理敏感数据，并为提交表单、购买、删除等副作用操作设置明确边界。

## en

The repository packages a Playwright skill as a Claude Code plugin, with a universal executor, helper functions, and an API reference loaded on demand. The browser is visible by default so behavior can be observed. Because it can run arbitrary custom automation, avoid sensitive production accounts and set explicit boundaries around side effects such as submissions, purchases, or deletion.

# Features

## zh

- 根据任务即时生成 Playwright 脚本
- 默认显示浏览器执行过程
- 提供通用执行器与辅助函数
- 支持截图、表单、响应式和流程验证

## en

- Generates Playwright scripts for the specific task
- Shows browser execution by default
- Includes a universal executor and helpers
- Supports screenshots, forms, responsive checks, and flow validation

# Use Cases

## zh

- 验证注册、登录或搜索流程
- 在不同视口生成页面截图
- 检查链接、图片和表单校验
- 复现需要多步交互的前端问题

## en

- Verify signup, login, or search flows
- Capture pages across several viewports
- Check links, images, and form validation
- Reproduce frontend issues requiring multistep interaction

# Installation

```bash
/plugin marketplace add lackeyjb/playwright-skill
```

```bash
/plugin install playwright-skill@playwright-skill
```

```bash
cd ~/.claude/plugins/marketplaces/playwright-skill/skills/playwright-skill && npm run setup
```

# Usage

## zh

安装并完成浏览器依赖设置后，用自然语言说明网址、步骤、预期结果和允许的副作用。优先使用测试账号和隔离环境，检查生成脚本后再运行涉及写入或外部提交的流程。

## en

After installation and browser setup, describe the URL, steps, expected result, and permitted side effects in natural language. Prefer test accounts and isolated environments, and inspect generated scripts before workflows that write data or submit externally.

# Workflow

## zh

1. 安装插件并运行 setup
2. 准备测试环境和账号
3. 描述步骤与预期结果
4. 审核并执行自动化
5. 检查控制台、截图和断言

## en

1. Install the plugin and run setup
2. Prepare a test environment and account
3. Describe steps and expected results
4. Review and execute the automation
5. Inspect console output, screenshots, and assertions

# Changelog

## 5.0.0 | 2026-08-11

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

可以直接在生产环境运行吗？

### question.en

Can I run it directly against production?

### answer.zh

只读检查也应谨慎，涉及提交、购买、删除或真实账号的流程应先在测试环境运行，并明确禁止未经批准的副作用。

### answer.en

Even read-only checks need care. Test workflows involving submission, purchasing, deletion, or real accounts in a safe environment first and prohibit unapproved side effects.
