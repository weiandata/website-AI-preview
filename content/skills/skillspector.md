---
schemaVersion: 1
status: published
slug: skillspector
name: SkillSpector
nameZh: SkillSpector 技能安全扫描
category: development
tags: [Security, Skill Scanning, Prompt Injection]
platforms: [Pi, OpenCode]
author: NVIDIA
version: 2.13.3
license: Apache-2.0
addedAt: '2026-11-04'
updatedAt: '2026-11-04'
githubUrl: 'https://github.com/NVIDIA/SkillSpector'
officialUrl: 'https://docs.nvidia.com/skills/scanning-agent-skills'
downloadUrl: 'https://github.com/NVIDIA/SkillSpector/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: code
stars: 24298
---
# Description

## zh

在安装 Agent Skill 之前扫描它，检查漏洞、恶意模式、提示注入和数据外泄等风险。

## en

Scans Agent Skills before installation for vulnerabilities, malicious patterns, prompt injection, data exfiltration, and related risks.

# Long Description

## zh

技能通常以较高信任度运行，而审查很少。SkillSpector 用来回答“这个技能能不能放心安装”。它可以扫描 Git 仓库、网址、压缩包、目录或单个文件，先做快速静态分析，再按需用大模型做语义评估，给出 0 到 100 的风险分和建议。它是 NVIDIA 技能验证流程的一部分。扫描结果是判断依据之一，不能替代人工审查。

## en

Skills tend to run with high trust and little vetting. SkillSpector helps answer whether a skill is safe to install. It scans Git repositories, URLs, zip files, directories, or single files, using fast static analysis followed by optional LLM evaluation, then gives a 0 to 100 risk score with recommendations. It is part of NVIDIA's skill verification pipeline. Treat a scan as one input, not a replacement for human review.

# Features

## zh

- 71 种漏洞模式，覆盖 17 个类别
- 静态分析加可选的大模型语义评估
- 通过 OSV.dev 查询实时漏洞数据
- 输出终端、JSON、Markdown 和 SARIF 报告
- 基线机制抑制已确认的误报

## en

- 71 vulnerability patterns across 17 categories
- Static analysis plus optional LLM evaluation
- Live vulnerability lookups through OSV.dev
- Terminal, JSON, Markdown, and SARIF reports
- Baselines that suppress accepted false positives

# Use Cases

## zh

- 安装第三方技能前做安全检查
- 在持续集成中拦截高风险技能
- 审计团队已经安装的技能

## en

- Checking a third-party skill before installing it
- Blocking risky skills in continuous integration
- Auditing skills a team already uses

# Installation

```bash
uv tool install git+https://github.com/NVIDIA/skillspector.git
```

# Usage

## zh

安装后运行 skillspector scan 并传入技能路径。加 --no-llm 时只做静态分析。报告可输出为 SARIF 接入代码扫描流程。也可以作为 Pi 或 OpenCode 的扩展，在代理会话内扫描。

## en

After installing, run skillspector scan with a skill path. Adding --no-llm limits it to static analysis. SARIF output feeds code scanning pipelines. It is also available as a Pi or OpenCode extension for scanning inside agent sessions.

# Workflow

## zh

1. 安装命令行工具
2. 指定要扫描的技能
3. 阅读风险分和具体发现
4. 人工确认高风险项
5. 确认误报后写入基线

## en

1. Install the CLI
2. Point it at the skill to scan
3. Read the risk score and findings
4. Review high-risk items by hand
5. Record confirmed false positives in a baseline

# Changelog

## 2.13.3 | 2026-11-02

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

扫描通过就代表绝对安全吗？

### question.en

Does a clean scan prove a skill is safe?

### answer.zh

不代表。它能发现已知模式和风险，但结果仍应配合人工审查，尤其是有网络或文件权限的技能。

### answer.en

No. It finds known patterns and risks, but pair the result with human review, especially for skills with network or file access.

## Question 2

### question.zh

必须用大模型吗？

### question.en

Is an LLM required?

### answer.zh

不是。--no-llm 只运行静态分析，大模型语义评估是可选的第二阶段。

### answer.en

No. --no-llm runs static analysis only; LLM evaluation is an optional second stage.
