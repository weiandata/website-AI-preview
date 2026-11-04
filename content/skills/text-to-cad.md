---
schemaVersion: 1
status: published
slug: text-to-cad
name: Text to CAD Skills
nameZh: 文本转 CAD 技能
category: image-design
tags: [CAD, CAM, G-code]
platforms: [Agent Skills]
author: Jake Read
version: 0.10.3
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-11-04'
githubUrl: 'https://github.com/earthtojake/text-to-cad'
officialUrl: 'https://www.cadskills.xyz'
downloadUrl: 'https://github.com/earthtojake/text-to-cad/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: image
stars: 25342
---
# Description

## zh

面向 CAD、CAE 与 CAM 的技能库，覆盖几何建模、DXF、G-code、SDF 和制造工作流。

## en

A CAD, CAE, and CAM skill library covering geometric modeling, DXF, G-code, SDF, and fabrication workflows.

# Long Description

## zh

仓库将多个设计与制造领域封装为独立技能，帮助代理从文本约束生成模型或加工材料。任何制造输出都必须检查单位、公差、材料、机床限制和安全要求。

## en

The repository packages design and fabrication domains as independent skills that turn textual constraints into models or machining artifacts. Manufacturing output requires checks for units, tolerances, material, machine limits, and safety.

# Features

## zh

- 覆盖多种 CAD 与制造格式
- 支持模型到加工的工作流

## en

- Covers several CAD and fabrication formats
- Supports model-to-manufacturing workflows

# Use Cases

## zh

- 从尺寸约束生成 CAD 模型
- 准备 DXF 或 G-code 初稿

## en

- Generate a CAD model from dimensions
- Prepare an initial DXF or G-code artifact

# Installation

```bash
npx skills add earthtojake/text-to-cad
```

# Usage

## zh

明确单位、材料、公差、设备和输出格式。先在模拟器或废料上验证加工路径，未经专业检查不要直接运行机床。

## en

State units, material, tolerances, equipment, and output format. Validate toolpaths in simulation or scrap material and never run machinery without professional checks.

# Workflow

## zh

1. 定义尺寸、单位和制造约束
2. 生成并检查模型
3. 模拟加工后再实际制造

## en

1. Define dimensions, units, and fabrication constraints
2. Generate and inspect the model
3. Simulate machining before fabrication

# Changelog

## 0.10.3 | 2026-11-03

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

生成的 G-code 可以直接上机吗？

### question.en

Can generated G-code run directly on a machine?

### answer.zh

不能直接使用。必须确认设备、材料、坐标系和安全边界，并先完成仿真。

### answer.en

Not directly. Confirm equipment, material, coordinate system, and safety boundaries and simulate first.
