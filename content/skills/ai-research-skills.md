---
schemaVersion: 1
status: published
slug: ai-research-skills
name: AI Research Skills
nameZh: AI 研究工程技能
category: research-writing
tags: [AI Research, Model Architecture, Evaluation]
platforms: [Claude Code, Codex, Gemini CLI]
author: Orchestra Research
version: 1.7.2
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-10-11'
githubUrl: 'https://github.com/Orchestra-Research/AI-Research-SKILLs'
officialUrl: 'http://orchestra-research.com'
downloadUrl: 'https://github.com/Orchestra-Research/AI-Research-SKILLs/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: research
stars: 14254
---
# Description

## zh

AI 研究与工程技能库，覆盖模型架构、分词、训练、评估和自动化研究流程。

## en

An AI research and engineering library covering model architecture, tokenization, training, evaluation, and automated research workflows.

# Long Description

## zh

仓库包含多个框架与研究主题的可复用技能，帮助代理搭建实验和理解技术选择。实验结论仍需固定环境、记录随机种子、保存配置并进行统计与人工复核。

## en

The repository contains reusable skills across frameworks and research topics to help agents build experiments and reason about choices. Conclusions still need controlled environments, recorded seeds, saved configurations, and statistical and human review.

# Features

## zh

- 覆盖 AI 研究全栈主题
- 包含多种模型与工具框架

## en

- Covers full-stack AI research topics
- Includes multiple model and tooling frameworks

# Use Cases

## zh

- 搭建模型训练或评估实验
- 比较架构与分词方案

## en

- Build a model training or evaluation experiment
- Compare architectures and tokenization choices

# Installation

```bash
npx skills add Orchestra-Research/AI-Research-SKILLs
```

# Usage

## zh

提供研究假设、数据、算力预算和成功指标。保存环境与配置，重复运行关键实验并报告不确定性。

## en

Provide the hypothesis, data, compute budget, and success metrics. Save environment and configuration, repeat key experiments, and report uncertainty.

# Workflow

## zh

1. 定义假设与基线
2. 选择技能并运行实验
3. 重复验证并记录结果

## en

1. Define the hypothesis and baseline
2. Select skills and run experiments
3. Repeat validation and record results

# Changelog

## 1.7.2 | 2026-06-16

### zh

对应仓库发布的 1.7.2 版本。

### en

Matches the repository's 1.7.2 release.

# FAQ

## Question 1

### question.zh

一次实验就足以得出结论吗？

### question.en

Is one experimental run enough for a conclusion?

### answer.zh

通常不够。应固定环境、记录随机性并重复关键实验，必要时报告置信区间。

### answer.en

Usually not. Control the environment, record randomness, repeat key experiments, and report uncertainty when appropriate.
