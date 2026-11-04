---
schemaVersion: 1
status: published
slug: computational-design-skills
name: Computational Design Skills
nameZh: 计算设计技能
category: image-design
tags:
  - Computational Design
  - Parametric Design
  - Architecture
  - CAD
platforms:
  - Claude Code
author: Abhinav Bwj
version: TODO
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-03-26'
githubUrl: 'https://github.com/Abhinavbwj/Claude-skills-for-Computational-Designers'
officialUrl: ''
downloadUrl: 'https://github.com/Abhinavbwj/Claude-skills-for-Computational-Designers/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: image
stars: 225
---
# Description

## zh

为计算设计师准备的 Claude 技能合集，辅助参数化设计、几何建模和建筑设计相关的技术工作流。

## en

A Claude skill collection for computational designers, supporting technical workflows in parametric design, geometric modeling, and architecture-related design.

# Long Description

## zh

该仓库把计算设计领域的专门知识整理为技能，可通过 `--plugin-dir` 直接加载或复制到项目中。它适合让代理理解设计软件、几何逻辑和脚本任务之间的联系。生成脚本和模型必须在目标软件版本中测试，同时检查几何容差、单位、性能和制造可行性。

## en

The repository packages specialist computational-design knowledge as skills loadable through `--plugin-dir` or copied into a project. It helps an agent connect design software, geometric logic, and scripting tasks. Test generated scripts and models in the target software version, checking tolerances, units, performance, and fabrication feasibility.

# Features

## zh

- 面向参数化与计算设计任务
- 涵盖几何、脚本和设计软件工作流
- 可作为本地 Claude Code 插件目录加载
- 适合建筑与设计技术人员

## en

- Targets parametric and computational-design tasks
- Covers geometry, scripting, and design-software workflows
- Loads as a local Claude Code plugin directory
- Suits architectural and design technologists

# Use Cases

## zh

- 编写或调试参数化设计脚本
- 把设计意图转成几何操作步骤
- 检查复杂模型的单位、容差与性能

## en

- Write or debug parametric-design scripts
- Translate design intent into geometric operations
- Check units, tolerances, and performance in complex models

# Installation

```bash
git clone https://github.com/Abhinavbwj/Claude-skills-for-Computational-Designers.git
```

```bash
claude --plugin-dir "./Claude-skills-for-Computational-Designers"
```

# Usage

## zh

提供目标软件及版本、模型单位、输入几何、设计约束和期望输出。先在小型样例上运行生成脚本，再扩展到完整模型，并保存可回退的版本。

## en

Provide the target software and version, model units, input geometry, design constraints, and expected output. Test generated scripts on a small sample before scaling to the full model, and preserve a version that can be restored.

# Workflow

## zh

1. 克隆并加载技能目录
2. 明确软件版本、单位和设计约束
3. 在小型几何样例上生成脚本
4. 检查容差、性能和结果
5. 备份后应用到完整模型

## en

1. Clone and load the skills directory
2. Define software version, units, and design constraints
3. Generate a script against a small geometry sample
4. Check tolerances, performance, and output
5. Back up before applying it to the full model

# Changelog

## TODO | 2026-03-26

### zh

仓库尚未发布带版本号的 Release；此处记录最近更新时间，具体变更请查看提交历史。

### en

The repository has no versioned release yet; this records its latest update date. See the commit history for details.

# FAQ

## Question 1

### question.zh

生成脚本可以直接用于大型模型吗？

### question.en

Can generated scripts be run directly on a large model?

### answer.zh

不建议。先用小型样例检查单位、容差、算法复杂度和软件版本兼容性，再备份并应用到完整模型。

### answer.en

It is not recommended. Test units, tolerances, algorithmic complexity, and software-version compatibility on a small sample, then back up before using the full model.
