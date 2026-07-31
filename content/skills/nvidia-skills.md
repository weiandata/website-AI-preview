---
schemaVersion: 1
status: published
slug: nvidia-skills
name: NVIDIA Skills
nameZh: NVIDIA 产品技能
category: development
tags: [NVIDIA, CUDA, Robotics]
platforms: [Claude Code, Codex]
author: NVIDIA
version: TODO
license: Apache-2.0
addedAt: '2026-07-31'
updatedAt: '2026-07-30'
githubUrl: 'https://github.com/NVIDIA/skills'
officialUrl: 'https://docs.nvidia.com/skills'
downloadUrl: 'https://github.com/NVIDIA/skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 2746
---
# Description

## zh

NVIDIA 产品的代理技能合集，覆盖物理 AI、机器人、仿真、CUDA 与 RAG 工作流。

## en

Agent skills for NVIDIA products across Physical AI, robotics, simulation, CUDA, and RAG workflows.

# Long Description

## zh

仓库提供从环境准备到端到端任务执行的产品指导，适用于支持 Agent Skills 的编码代理。 核对硬件、驱动和版本兼容性；运行 GPU、容器或云命令前确认成本、权限和目标环境。

## en

The repository provides product guidance from environment setup through end-to-end tasks for Agent Skills-compatible coding agents. Verify hardware, driver, and version compatibility; confirm cost, permissions, and target environment before GPU, container, or cloud commands.

# Features

## zh

- 覆盖多类 NVIDIA 产品
- 提供端到端技术工作流

## en

- Covers multiple NVIDIA product areas
- Provides end-to-end technical workflows

# Use Cases

## zh

- 配置 CUDA 或仿真工作流
- 构建机器人与 RAG 原型

## en

- Configure CUDA or simulation workflows
- Build robotics and RAG prototypes

# Installation

```bash
npx skills add NVIDIA/skills
```

# Usage

## zh

先在非生产环境选择与任务匹配的技能，提供明确输入和边界。核对硬件、驱动和版本兼容性；运行 GPU、容器或云命令前确认成本、权限和目标环境。

## en

Start in a non-production environment with the task-specific skill and explicit inputs and boundaries. Verify hardware, driver, and version compatibility; confirm cost, permissions, and target environment before GPU, container, or cloud commands.

# Workflow

## zh

1. 选择与任务匹配的技能
2. 检查输入、权限和预期输出
3. 审阅结果后再应用或发布

## en

1. Select the skill that matches the task
2. Check inputs, permissions, and expected outputs
3. Review results before applying or publishing

# Changelog

## TODO | 2026-07-30

### zh

仓库没有版本化 Release；此处记录最近更新时间。

### en

The repository has no versioned release; this records its latest update.

# FAQ

## Question 1

### question.zh

可以不经审查直接应用技能输出吗？

### question.en

Can the skill output be applied without review?

### answer.zh

不应。核对硬件、驱动和版本兼容性；运行 GPU、容器或云命令前确认成本、权限和目标环境。

### answer.en

No. Verify hardware, driver, and version compatibility; confirm cost, permissions, and target environment before GPU, container, or cloud commands.
