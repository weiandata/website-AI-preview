---
schemaVersion: 1
status: published
slug: supabase-agent-skills
name: Supabase Agent Skills
nameZh: Supabase 代理技能
category: development
tags: [Supabase, Postgres, Backend]
platforms: [Claude Code, Codex]
author: supabase
version: 0.1.7
license: MIT
addedAt: '2026-07-31'
updatedAt: '2026-07-30'
githubUrl: 'https://github.com/supabase/agent-skills'
officialUrl: 'https://supabase.com/docs/guides/getting-started/ai-skills'
downloadUrl: 'https://github.com/supabase/agent-skills/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 2457
---
# Description

## zh

Supabase 官方 Agent Skills，帮助代理正确使用数据库、认证和后端平台能力。

## en

Official Supabase Agent Skills for working with database, authentication, and backend-platform capabilities.

# Long Description

## zh

仓库提供面向 Supabase 开发的可调用指导，帮助编码代理采用推荐的项目和数据库模式。 迁移、删除和生产写入前必须备份并确认目标；保护服务密钥，并逐项审查 RLS 与权限。

## en

The repository provides callable Supabase development guidance so coding agents can use recommended project and database patterns. Back up and confirm targets before migrations, deletion, or production writes; protect service keys and review RLS and permissions explicitly.

# Features

## zh

- 覆盖 Supabase 开发模式
- 提供数据库与认证指导

## en

- Covers Supabase development patterns
- Provides database and authentication guidance

# Use Cases

## zh

- 实现 Supabase 后端功能
- 审查数据库和认证配置

## en

- Implement Supabase backend features
- Review database and auth configuration

# Installation

```bash
npx skills add supabase/agent-skills
```

# Usage

## zh

先在非生产环境选择与任务匹配的技能，提供明确输入和边界。迁移、删除和生产写入前必须备份并确认目标；保护服务密钥，并逐项审查 RLS 与权限。

## en

Start in a non-production environment with the task-specific skill and explicit inputs and boundaries. Back up and confirm targets before migrations, deletion, or production writes; protect service keys and review RLS and permissions explicitly.

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

## 0.1.7 | 2026-07-30

### zh

对应仓库发布的 0.1.7 版本。

### en

Matches the repository's 0.1.7 release.

# FAQ

## Question 1

### question.zh

可以不经审查直接应用技能输出吗？

### question.en

Can the skill output be applied without review?

### answer.zh

不应。迁移、删除和生产写入前必须备份并确认目标；保护服务密钥，并逐项审查 RLS 与权限。

### answer.en

No. Back up and confirm targets before migrations, deletion, or production writes; protect service keys and review RLS and permissions explicitly.
