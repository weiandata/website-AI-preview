---
schemaVersion: 1
status: published
slug: trailofbits-skills
name: Trail of Bits Skills
nameZh: Trail of Bits 安全技能
category: development
tags:
  - Security
  - Code Audit
  - Vulnerability Research
  - Secure Development
platforms:
  - Claude Code
  - Codex
author: Trail of Bits
version: TODO
license: CC-BY-SA-4.0
addedAt: '2026-07-31'
updatedAt: '2026-11-02'
githubUrl: 'https://github.com/trailofbits/skills'
officialUrl: ''
downloadUrl: 'https://github.com/trailofbits/skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 7993
---
# Description

## zh

Trail of Bits 发布的安全技能合集，为代码代理提供审计、漏洞研究和安全工程任务的专业工作流。

## en

A security skill collection from Trail of Bits that gives coding agents professional workflows for audits, vulnerability research, and secure engineering.

# Long Description

## zh

该仓库把安全研究团队的工作方法整理为可安装技能，适用于检查代码、分析潜在漏洞和改进安全开发过程。它可通过 Claude Code 与 Codex 插件市场接入。技能能够提高审查的系统性，但不能代替专业安全评估；高风险结论应由有经验的人员复现，并在授权范围内测试。

## en

The repository turns a security research team's methods into installable skills for code inspection, potential-vulnerability analysis, and secure development. It integrates through Claude Code and Codex marketplaces. The skills make reviews more systematic but do not replace a professional assessment; experienced reviewers should reproduce high-risk findings and test only within authorized scope.

# Features

## zh

- 来自专业安全研究团队的公开技能
- 覆盖审计、漏洞研究与安全工程
- 可通过 Claude Code 和 Codex 市场安装
- 强调可复核的分析过程

## en

- Public skills from a professional security research team
- Covers audits, vulnerability research, and secure engineering
- Installable through Claude Code and Codex marketplaces
- Encourages a reviewable analysis process

# Use Cases

## zh

- 在代码审查中系统寻找安全风险
- 为漏洞研究准备检查步骤和证据
- 把安全要求纳入开发与发布流程

## en

- Search systematically for security risks during code review
- Prepare checks and evidence for vulnerability research
- Incorporate security requirements into development and release workflows

# Installation

```bash
codex plugin marketplace add trailofbits/skills
```

```bash
/plugin marketplace add trailofbits/skills
```

# Usage

## zh

安装所需技能后，明确仓库范围、威胁模型、允许执行的测试和期望报告格式。对发现逐项保存证据、复现步骤和影响判断；不要在未授权系统上执行攻击性测试。

## en

After installing the relevant skill, define repository scope, threat model, permitted tests, and report format. Preserve evidence, reproduction steps, and impact reasoning for each finding, and never run offensive tests against systems without authorization.

# Workflow

## zh

1. 安装对应安全技能
2. 确认授权范围和威胁模型
3. 执行静态或动态检查
4. 复现并分级发现
5. 由安全人员复核报告

## en

1. Install the relevant security skill
2. Confirm authorization scope and threat model
3. Run static or dynamic checks
4. Reproduce and triage findings
5. Have a security reviewer validate the report

# Changelog

## TODO | 2026-11-02

### zh

仓库尚未发布带版本号的 Release；此处记录最近更新时间，具体变更请查看提交历史。

### en

The repository has no versioned release yet; this records its latest update date. See the commit history for details.

# FAQ

## Question 1

### question.zh

它能代替正式的安全审计吗？

### question.en

Can it replace a formal security audit?

### answer.zh

不能。它能提供专业工作流和检查思路，但结论仍需人工复现、风险判断和授权范围内的验证。

### answer.en

No. It provides professional workflows and checks, but findings still require human reproduction, risk judgment, and validation within an authorized scope.
