---
schemaVersion: 1
status: published
slug: web-quality-skills
name: Web Quality Skills
nameZh: Web 质量技能
category: development
tags:
  - Web Performance
  - Accessibility
  - SEO
  - Best Practices
platforms:
  - Claude Code
  - Codex
  - Gemini CLI
  - Cursor
  - OpenCode
author: Addy Osmani
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-08-24'
githubUrl: 'https://github.com/addyosmani/web-quality-skills'
officialUrl: ''
downloadUrl: 'https://github.com/addyosmani/web-quality-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 3034
---
# Description

## zh

面向现代网站的质量技能合集，让编码代理从性能、可访问性、SEO 和通用最佳实践等维度检查与改进页面。

## en

A quality skill collection for modern websites, helping coding agents inspect and improve pages across performance, accessibility, SEO, and general best practices.

# Long Description

## zh

这个仓库将常见 Web 质量领域拆成可安装技能，适合开发过程中持续审查页面，而不是只在上线前做一次检查。它可以辅助定位问题并提出代码修改，但真实质量仍应以 Lighthouse、浏览器辅助功能树、自动化测试和真实设备结果为准。对业务关键页面，建议把改进前后的指标一起记录。

## en

The repository separates common web-quality concerns into installable skills, making them useful for continuous review during development rather than a one-time prelaunch check. It can locate issues and suggest code changes, but actual quality should be judged with Lighthouse, browser accessibility trees, automated tests, and real-device results. Record before-and-after metrics for business-critical pages.

# Features

## zh

- 同时覆盖性能、可访问性、SEO 与通用实践
- 可按网站质量主题选择技能
- 支持多种兼容 Agent Skills 的编码代理
- 适合与现有测试和审计工具结合

## en

- Covers performance, accessibility, SEO, and general practices
- Lets users select skills by web-quality topic
- Supports several Agent Skills-compatible coding agents
- Complements existing tests and auditing tools

# Use Cases

## zh

- 上线前审查页面质量
- 排查 Core Web Vitals 或加载性能问题
- 检查键盘操作、语义结构与可访问性
- 为现有站点整理可执行的改进项

## en

- Review page quality before launch
- Investigate Core Web Vitals or loading problems
- Check keyboard use, semantics, and accessibility
- Produce actionable improvements for an existing site

# Installation

```bash
npx skills add addyosmani/web-quality-skills
```

# Usage

## zh

安装后指定页面、目标浏览器和最重要的质量维度，并提供已有的测量结果。让代理给出修改时要求保留可验证的验收条件，完成后重新运行实际审计与测试。

## en

After installation, identify the page, target browsers, priority quality dimensions, and any existing measurements. Ask the agent to preserve verifiable acceptance criteria in its changes, then rerun the real audits and tests.

# Workflow

## zh

1. 安装质量技能
2. 提供页面和基线指标
3. 选择性能、可访问性或 SEO 重点
4. 实施并审查建议修改
5. 重新测量并比较结果

## en

1. Install the quality skills
2. Provide the page and baseline metrics
3. Choose a performance, accessibility, or SEO focus
4. Implement and review suggested changes
5. Measure again and compare results

# Changelog

## TODO | 2026-08-24

### zh

仓库尚未发布带版本号的 Release；此处记录最近更新时间，具体变更请查看提交历史。

### en

The repository has no versioned release yet; this records its latest update date. See the commit history for details.

# FAQ

## Question 1

### question.zh

技能给出建议后还要运行 Lighthouse 吗？

### question.en

Should I still run Lighthouse after applying the recommendations?

### answer.zh

要。技能帮助分析和修改，Lighthouse、自动化测试与真实设备测量负责验证改动是否真的改善了结果。

### answer.en

Yes. The skills assist analysis and implementation, while Lighthouse, automated tests, and real-device measurements verify whether the change actually improved the outcome.
