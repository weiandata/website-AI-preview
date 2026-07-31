---
schemaVersion: 1
status: published
slug: prompt-master
name: Prompt Master
nameZh: 提示词生成技能
category: productivity
tags: [Prompt Engineering, Context, AI Tools]
platforms: [Claude Code]
author: Nidhin JS
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-06-10'
githubUrl: 'https://github.com/nidhinjs/prompt-master'
officialUrl: ''
downloadUrl: 'https://github.com/nidhinjs/prompt-master/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: productivity
stars: 10897
---
# Description

## zh

为不同 AI 工具生成结构化提示词的 Claude 技能，强调完整上下文与减少无效尝试。

## en

A Claude skill that creates structured prompts for different AI tools with complete context and fewer wasted attempts.

# Long Description

## zh

技能根据目标工具、任务和约束组织提示词，适合跨图像、文本或代码模型迁移需求。提示词只能改善输入质量，不能保证模型事实正确或输出安全。

## en

The skill organizes prompts around the target tool, task, and constraints for work across image, text, or coding models. Better prompts do not guarantee factual accuracy or safe output.

# Features

## zh

- 按目标工具定制提示结构
- 保留任务上下文和约束

## en

- Tailors prompt structure to the target tool
- Preserves task context and constraints

# Use Cases

## zh

- 为图像或视频模型准备提示词
- 将复杂需求整理成编码代理任务

## en

- Prepare prompts for image or video models
- Turn complex requirements into a coding-agent task

# Installation

```bash
npx skills add nidhinjs/prompt-master
```

# Usage

## zh

说明目标工具、输入材料、期望格式和禁止事项。先用小样验证提示效果，再投入高成本生成。

## en

State the target tool, source material, desired format, and exclusions. Test on a small sample before costly generation.

# Workflow

## zh

1. 明确模型与目标
2. 生成结构化提示词
3. 小样测试后迭代

## en

1. Identify the model and goal
2. Generate a structured prompt
3. Test a sample and iterate

# Changelog

## TODO | 2026-06-10

### zh

仓库没有版本化 Release；此处记录最近更新时间。

### en

The repository has no versioned release; this records its latest update.

# FAQ

## Question 1

### question.zh

更好的提示词能保证正确结果吗？

### question.en

Does a better prompt guarantee correct output?

### answer.zh

不能。仍需检查事实、版权、安全和是否符合任务要求。

### answer.en

No. Facts, rights, safety, and task fit still require verification.
