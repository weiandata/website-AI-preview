---
schemaVersion: 1
status: published
slug: applied-micro-skills
name: Applied Micro Skills
nameZh: 应用微观经济学技能
category: data-analytics
tags:
  - Economics
  - Causal Inference
  - Empirical Research
  - Data Analysis
platforms:
  - Claude Code
  - Codex
author: Kenneth Khoo
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-22'
githubUrl: 'https://github.com/kennethkhoocy/applied-micro-skills'
officialUrl: ''
downloadUrl: 'https://github.com/kennethkhoocy/applied-micro-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: analysis
stars: 54
---
# Description

## zh

面向应用微观经济学研究的技能合集，帮助代理规划实证分析、因果推断和可复现的研究工作流。

## en

A skill collection for applied microeconomics, helping agents plan empirical analysis, causal inference, and reproducible research workflows.

# Long Description

## zh

仓库把应用微观研究中常见的方法与步骤整理为 Claude Code 和 Codex 可使用的技能，可通过插件或复制到通用技能目录安装。它适合辅助研究设计、数据分析和结果检查，但不会替代识别策略的论证、数据质量审查和领域专家判断。任何定量结论都应保留代码、假设和稳健性检验。

## en

The repository turns common applied-micro methods and steps into skills usable by Claude Code and Codex, installed through a plugin or copied into a shared skills directory. It supports research design, data analysis, and result checking, but does not replace identification arguments, data-quality review, or domain expertise. Preserve code, assumptions, and robustness checks for every quantitative conclusion.

# Features

## zh

- 面向应用微观与实证研究
- 强调因果推断和研究设计
- 支持 Claude Code 与 Codex
- 可纳入可复现的数据分析流程

## en

- Focuses on applied microeconomics and empirical research
- Emphasizes causal inference and research design
- Supports Claude Code and Codex
- Fits reproducible data-analysis workflows

# Use Cases

## zh

- 规划实证研究的识别策略
- 检查回归设计与稳健性分析
- 整理从数据处理到结果报告的流程

## en

- Plan an identification strategy for an empirical study
- Review regression design and robustness analysis
- Organize the path from data preparation to result reporting

# Installation

```bash
git clone https://github.com/kennethkhoocy/applied-micro-skills.git
```

```bash
cp -R applied-micro-skills/skills/* ~/.agents/skills/
```

# Usage

## zh

安装后提供研究问题、数据结构、处理定义、识别假设和预期输出。要求代理区分描述性结果与因果结论，并记录每项转换、模型规格和稳健性检验。

## en

After installation, provide the research question, data structure, treatment definition, identification assumptions, and desired output. Require the agent to distinguish descriptive results from causal claims and record each transformation, model specification, and robustness check.

# Workflow

## zh

1. 安装应用微观技能
2. 明确研究问题和识别假设
3. 检查数据与变量定义
4. 执行主分析和稳健性检验
5. 复核结论与可复现材料

## en

1. Install the applied-micro skills
2. Define the research question and identification assumptions
3. Inspect data and variable definitions
4. Run the main analysis and robustness checks
5. Review conclusions and reproducibility materials

# Changelog

## TODO | 2026-07-22

### zh

仓库尚未发布带版本号的 Release；此处记录最近更新时间，具体变更请查看提交历史。

### en

The repository has no versioned release yet; this records its latest update date. See the commit history for details.

# FAQ

## Question 1

### question.zh

技能生成的回归结果可以直接写进论文吗？

### question.en

Can generated regression results go directly into a paper?

### answer.zh

不应直接使用。先确认数据处理、识别假设、模型规格和稳健性检验，并由研究者复现和解释结果。

### answer.en

They should not be used unchecked. Confirm data processing, identification assumptions, model specifications, and robustness checks, then have a researcher reproduce and interpret the results.
