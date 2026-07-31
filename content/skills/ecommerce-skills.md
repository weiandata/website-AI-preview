---
schemaVersion: 1
status: published
slug: ecommerce-skills
name: eCommerce Skills
nameZh: 电商技能合集
category: automation
tags:
  - Ecommerce
  - Product Listings
  - Conversion
  - Store Operations
platforms:
  - Claude Code
  - Codex
  - Cursor
  - OpenClaw
  - Windsurf
author: Nexscope AI
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-23'
githubUrl: 'https://github.com/nexscope-ai/eCommerce-Skills'
officialUrl: ''
downloadUrl: 'https://github.com/nexscope-ai/eCommerce-Skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: automation
stars: 544
---
# Description

## zh

面向电商运营的技能合集，帮助代理处理商品信息、内容优化、店铺分析和常见增长任务。

## en

An ecommerce operations skill collection that helps agents work with product information, content optimization, store analysis, and common growth tasks.

# Long Description

## zh

仓库以多个独立技能覆盖电商场景，并支持 Claude Code、Codex、Cursor、OpenClaw 和 Windsurf 等客户端。它适合生成商品页草稿、检查转化要素和整理运营任务。任何价格、库存、促销或店铺配置变更都可能直接影响客户与收入，应限制权限、预览差异并由运营人员批准。

## en

The repository uses multiple independent skills for ecommerce scenarios and supports clients including Claude Code, Codex, Cursor, OpenClaw, and Windsurf. It can draft product pages, inspect conversion elements, and organize operational tasks. Price, inventory, promotion, or store-configuration changes can directly affect customers and revenue, so restrict permissions, preview differences, and require an operator's approval.

# Features

## zh

- 覆盖商品内容与店铺运营任务
- 多项技能可按需选择
- 支持多个编码与通用代理客户端
- 适合把重复运营步骤标准化

## en

- Covers product content and store operations
- Offers multiple selectable skills
- Supports several coding and general agent clients
- Standardizes recurring operational steps

# Use Cases

## zh

- 生成并审查商品详情页内容
- 分析店铺页面的转化改进机会
- 整理促销或商品上新工作流

## en

- Draft and review product-detail content
- Analyze conversion opportunities on store pages
- Organize promotion or product-launch workflows

# Installation

```bash
npx skills add nexscope-ai/eCommerce-Skills -g
```

# Usage

## zh

安装后提供店铺平台、产品事实、品牌规范、目标市场和允许操作的范围。优先在草稿或沙盒环境生成结果；涉及价格、库存和公开发布时必须预览并由负责人确认。

## en

After installation, provide the store platform, product facts, brand rules, target market, and allowed actions. Prefer drafts or a sandbox environment; preview and obtain owner confirmation for pricing, inventory, and public publishing changes.

# Workflow

## zh

1. 安装电商技能
2. 提供平台、商品和品牌上下文
3. 限定代理可执行的操作
4. 在草稿环境生成或修改
5. 人工审批后发布

## en

1. Install the ecommerce skills
2. Provide platform, product, and brand context
3. Limit the agent's permitted actions
4. Generate or edit in a draft environment
5. Publish after human approval

# Changelog

## TODO | 2026-07-23

### zh

仓库尚未发布带版本号的 Release；此处记录最近更新时间，具体变更请查看提交历史。

### en

The repository has no versioned release yet; this records its latest update date. See the commit history for details.

# FAQ

## Question 1

### question.zh

可以让技能直接修改线上商品价格吗？

### question.en

Should the skills directly change live product prices?

### answer.zh

不建议默认开放这种权限。价格和库存会直接影响收入与客户，应先生成差异预览，再由有权限的运营人员审批。

### answer.en

Do not grant that permission by default. Pricing and inventory directly affect revenue and customers, so generate a change preview and require approval from an authorized operator.
