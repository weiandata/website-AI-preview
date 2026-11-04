---
schemaVersion: 1
status: published
slug: hashicorp-agent-skills
name: HashiCorp Agent Skills
nameZh: HashiCorp 智能体技能
category: development
tags:
  - Terraform
  - HCP Terraform
  - Infrastructure as Code
  - HashiCorp
platforms:
  - Claude Code
  - Codex
  - Cursor
  - OpenCode
  - GitHub Copilot
author: HashiCorp
version: 1.0.0
license: MPL-2.0
addedAt: '2026-07-31'
updatedAt: '2026-11-04'
githubUrl: 'https://github.com/hashicorp/agent-skills'
officialUrl: ''
downloadUrl: 'https://github.com/hashicorp/agent-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 911
---
# Description

## zh

HashiCorp 官方技能合集，帮助编码代理按照 Terraform 与 HCP Terraform 的实践生成、审查和操作基础设施代码。

## en

HashiCorp's official skill collection helps coding agents generate, review, and operate infrastructure code using Terraform and HCP Terraform practices.

# Long Description

## zh

仓库将 Terraform 风格、模块生成和 HCP Terraform 工作流等知识封装成可安装技能。用户可以从具体技能路径安装单项能力，也可以通过支持的插件市场接入。它能减少代理生成不一致基础设施代码的概率，但计划和应用资源前仍应执行格式化、验证、计划审阅及组织自身的安全审批。

## en

The repository packages Terraform style, module generation, HCP Terraform workflows, and related knowledge as installable skills. Users can install an individual skill from its path or use a supported plugin marketplace. It helps reduce inconsistent infrastructure code, but formatting, validation, plan review, and organization-specific security approvals remain necessary before applying resources.

# Features

## zh

- HashiCorp 官方维护的 Terraform 专项知识
- 可按路径安装单个技能
- 覆盖代码生成、风格和云端工作流
- 适配多种主流编码代理

## en

- Official HashiCorp guidance for Terraform tasks
- Supports installing an individual skill by path
- Covers generation, style, and cloud workflows
- Works across several major coding agents

# Use Cases

## zh

- 生成符合团队约定的 Terraform 配置
- 审查模块结构和代码风格
- 为 HCP Terraform 工作流提供操作上下文

## en

- Generate Terraform configuration that follows team conventions
- Review module structure and code style
- Supply operational context for HCP Terraform workflows

# Installation

```bash
npx skills add hashicorp/agent-skills/terraform/code-generation/skills/terraform-style-guide
```

# Usage

## zh

安装与任务最相关的技能后，提供 Terraform 版本、云提供商、模块边界和组织约束。将输出先交给 `terraform fmt`、验证与计划检查，确认资源差异后再进入应用流程。

## en

After installing the most relevant skill, provide the Terraform version, cloud provider, module boundary, and organizational constraints. Run formatting, validation, and plan checks on the output, and inspect resource changes before any apply workflow.

# Workflow

## zh

1. 选择并安装 Terraform 技能
2. 提供版本、提供商和模块上下文
3. 让代理生成或审查配置
4. 执行格式化、验证和计划
5. 审批后再应用基础设施变更

## en

1. Select and install a Terraform skill
2. Provide version, provider, and module context
3. Ask the agent to generate or review configuration
4. Run formatting, validation, and planning
5. Apply infrastructure changes only after approval

# Changelog

## 1.0.0 | 2026-08-04

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

技能会替我安全地应用 Terraform 变更吗？

### question.en

Will the skills safely apply Terraform changes for me?

### answer.zh

不会自动替代审查。技能提供生成和操作指导，实际变更仍应经过 `terraform plan`、权限控制和团队审批。

### answer.en

They do not replace review. The skills provide generation and operational guidance; real changes should still pass `terraform plan`, access controls, and team approval.
