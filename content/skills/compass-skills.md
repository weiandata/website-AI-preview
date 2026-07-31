---
schemaVersion: 1
status: published
slug: compass-skills
name: COMPASS Skills
nameZh: COMPASS 协作技能
category: productivity
tags:
  - Task Management
  - Session Handoff
  - Skill Engineering
  - Academic Writing
platforms:
  - Claude Code
  - Codex
  - OpenCode
  - OpenClaw
author: Dong Shuyan
version: 0.3.0
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-11'
githubUrl: 'https://github.com/dongshuyan/compass-skills'
officialUrl: ''
downloadUrl: 'https://github.com/dongshuyan/compass-skills/archive/refs/heads/master.zip'
featured: false
featuredRank: 0
verified: true
icon: productivity
stars: 672
---
# Description

## zh

一组本地协作与技能工程工具，帮助代理澄清任务、维护任务图、交接会话、管理用户偏好并从运行历史改进技能。

## en

A local collaboration and skill-engineering collection that helps agents clarify tasks, maintain task graphs, hand off sessions, manage user preferences, and improve skills from run history.

# Long Description

## zh

COMPASS 当前提供七个技能，涵盖任务澄清、任务森林、会话交接、用户画像、技能创建与升级，以及学术文本自然化。运行数据保存在本地，部分高风险修改要求明确批准。用户画像采用本地明文存储，因此不得写入密码、令牌、私钥、验证码或高度敏感的个人信息。

## en

COMPASS currently provides seven skills for task clarification, task forests, session handoff, user profiles, skill creation and upgrading, and academic prose humanization. Runtime data stays local, with explicit approval required for some high-risk changes. User profiles are stored as local plaintext, so never place passwords, tokens, private keys, verification codes, or highly sensitive personal data in them.

# Features

## zh

- 维护跨会话的任务结构和交接信息
- 以可审计方式保存协作偏好
- 从真实运行历史创建或升级技能
- 提供中英文学术文本自然化技能

## en

- Maintains task structure and handoff context across sessions
- Stores collaboration preferences in an auditable form
- Builds or upgrades skills from real run history
- Includes academic prose humanization for English and Chinese

# Use Cases

## zh

- 在复杂任务开始前澄清范围与验收条件
- 把长时间运行的工作保存为任务图
- 为新会话生成可直接粘贴的交接提示
- 从成功和失败记录中改进技能

## en

- Clarify scope and acceptance criteria before complex work
- Preserve long-running work as a task graph
- Generate a paste-ready handoff for a new session
- Improve skills from successful and failed run evidence

# Installation

```bash
npx skills add dongshuyan/compass-skills --skill '*' -a codex -a claude-code
```

# Usage

## zh

安装后直接调用所需技能，例如任务澄清、会话交接或任务森林。首次使用用户画像和任务存储功能时先查看保存路径与内容；不要写入凭据，并在技能升级提出修改后先审阅计划再批准应用。

## en

After installation, invoke the relevant skill for clarification, session handoff, or task-forest work. On first use of profiles or task storage, inspect the saved path and content; never store credentials, and review an upgrade plan before approving any changes it proposes.

# Workflow

## zh

1. 安装全部或所需 COMPASS 技能
2. 选择任务澄清、记录或交接能力
3. 检查本地存储范围与隐私边界
4. 运行技能并审阅生成的提案
5. 明确批准后才应用高风险修改

## en

1. Install all or selected COMPASS skills
2. Choose clarification, recording, or handoff capability
3. Check local storage scope and privacy boundaries
4. Run the skill and review generated proposals
5. Apply high-risk changes only after explicit approval

# Changelog

## 0.3.0 | 2026-06-21

### zh

对应仓库发布的 0.3.0 版本；后续提交活动记录在 GitHub 仓库中。

### en

Matches the repository's 0.3.0 release; subsequent activity is recorded in the GitHub repository.

# FAQ

## Question 1

### question.zh

可以把密钥保存在用户画像里吗？

### question.en

Can credentials be stored in the user profile?

### answer.zh

不可以。画像是本地明文文件，只应用于可审计的协作偏好，不能存放密码、令牌、私钥、验证码或高度敏感信息。

### answer.en

No. The profile is a local plaintext file intended for auditable collaboration preferences, not passwords, tokens, private keys, verification codes, or highly sensitive information.
