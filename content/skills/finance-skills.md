---
schemaVersion: 1
status: published
slug: finance-skills
name: Finance Skills
nameZh: 金融分析技能集
category: data-analytics
tags:
  - Financial Analysis
  - Market Data
  - Research
platforms:
  - Claude Code
  - Codex
author: himself65
version: 9.0.0
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-06-14'
githubUrl: 'https://github.com/himself65/finance-skills'
officialUrl: 'https://skills.himself65.com'
downloadUrl: 'https://github.com/himself65/finance-skills/archive/refs/heads/main.zip'
featured: true
featuredRank: 3
verified: true
icon: analysis
stars: 3030
downloads: 0
---
# Description

## zh

一组用于金融分析的技能，让 AI 按分析师的方法整理行情、财报与市场数据。仅供学习研究，不构成投资建议。

## en

A set of skills for financial analysis that lets an AI organise quotes, filings, and market data the way an analyst would. For study and research only; not investment advice.

# Long Description

## zh

看财报和行情最花时间的往往不是判断，而是把散落的数据整理成能比较的形式。这组技能按 Agent Skills 开放标准编写，把金融分析中反复出现的步骤固定下来，让 AI 按一致的方法取数、整理和呈现，而不是每次即兴发挥。仓库本身在开头就写明：项目仅用于教育和信息用途，其中任何内容都不构成财务建议，做投资决定前请自行研究并咨询有资质的顾问。把它当作整理和研究的助手，而不是决策依据。

## en

The slow part of reading filings and quotes is rarely the judgement — it is getting scattered numbers into a shape you can compare. These skills follow the open Agent Skills standard and fix the recurring steps of financial analysis so an AI fetches, organises, and presents data consistently instead of improvising each time. The repository states plainly up front that it exists for educational and informational purposes, that nothing in it constitutes financial advice, and that you should do your own research and consult a qualified advisor before making investment decisions. Treat it as a research aid, not a basis for decisions.

# Features

## zh

- 按 Agent Skills 开放标准编写，多种代理环境通用
- 把金融分析中反复出现的取数与整理步骤固定下来
- 覆盖行情、财报等常见分析材料
- 提供独立的文档站点，含示例与安装说明
- 可作为 Claude Code 插件整体安装

## en

- Written to the open Agent Skills standard and portable across harnesses
- Fixes the recurring fetch-and-organise steps of financial analysis
- Covers common inputs such as quotes and company filings
- Ships a separate documentation site with demos and setup instructions
- Installable as a Claude Code plugin set

# Use Cases

## zh

- 快速把一家公司的公开财务数据整理成可比较的表格
- 学习金融分析的常规步骤，看专业方法怎么拆解
- 需要重复做同一类整理工作，希望每次口径一致
- 做行业或个股研究时的资料准备阶段

## en

- Pulling a company's public financials into a comparable table quickly
- Learning how professional analysis breaks a question down
- Repeating the same kind of workup and needing consistent treatment each time
- The data-gathering stage of sector or single-name research

# Installation

```bash
npx skills add himself65/finance-skills -g
```

# Usage

## zh

安装后，向代理描述你要分析的对象和角度，相关技能会按既定步骤取数并整理结果。建议把产出当作整理好的原始材料，自己核对来源后再下判断。文档站点上有示例和更详细的配置说明。

## en

Once installed, describe what you want analysed and from what angle; the relevant skill fetches and organises the data along its defined steps. Treat the output as tidied source material and verify it before drawing conclusions. The documentation site carries examples and fuller setup notes.

# Workflow

## zh

1. 安装技能集
2. 说明要分析的公司、品种或问题
3. 让技能按既定步骤取数并整理
4. 自行核对数据来源与口径
5. 在此基础上做自己的判断

## en

1. Install the skill set
2. State the company, instrument, or question to analyse
3. Let the skill fetch and organise along its defined steps
4. Verify the sources and treatment yourself
5. Form your own judgement from there

# Changelog

## 9.0.0 | 2026-06-14

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

它给出的结论可以直接当投资依据吗？

### question.en

Can I act on its conclusions as investment guidance?

### answer.zh

不可以。仓库在最开头就明确写着：本项目仅供教育和信息用途，其中任何内容都不构成财务建议。做投资决定前请自行研究，并咨询有资质的财务顾问。把它的产出当作整理好的材料，不要当作建议。

### answer.en

No. The repository states at the very top that it is for educational and informational purposes only and that nothing in it constitutes financial advice. Do your own research and consult a qualified financial advisor before making investment decisions. Treat its output as organised material, never as a recommendation.

## Question 2

### question.zh

数据准确吗？

### question.en

How accurate is the data?

### answer.zh

技能负责的是按一致的方法取数和整理，数据本身来自它调用的外部来源，准确性和时效性取决于那些来源。涉及金额和日期的关键数字，建议回到原始出处核对一遍。

### answer.en

The skills handle fetching and organising consistently; the data itself comes from the external sources they call, so accuracy and freshness depend on those. For figures and dates that matter, check them against the original source.
