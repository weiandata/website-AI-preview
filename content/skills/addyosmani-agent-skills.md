---
schemaVersion: 1
status: draft
slug: addyosmani-agent-skills
name: Agent Skills
nameZh: 工程级开发技能集
category: development
tags:
  - Agent Skills
  - Engineering Workflow
  - Code Review
  - Web Performance
platforms:
  - Claude Code
author: Addy Osmani
version: 0.6.4
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-07-18'
githubUrl: 'https://github.com/addyosmani/agent-skills'
officialUrl: ''
downloadUrl: 'https://github.com/addyosmani/agent-skills/archive/refs/heads/main.zip'
featured: true
featuredRank: 0
verified: true
icon: code
stars: 79201
downloads: 0
---
# Description

## zh

把资深工程师的工作流、质量关卡和实践经验打包成技能，让 AI 代理在开发的每个阶段都按同一套标准执行。

## en

Packages the workflows, quality gates, and practices senior engineers rely on into skills, so an AI agent follows the same standard at every phase of development.

# Long Description

## zh

这套技能围绕软件交付的完整链路组织：定义、计划、构建、验证、评审、上线。每个阶段对应一个斜杠命令，命令会自动激活该阶段需要的技能。除了显式调用，技能也会按你正在做的事自动触发——设计接口时触发接口设计技能，写界面时触发前端工程技能。如果规格已经写好，可以用一次批准的方式让它连续跑完计划与实现：人不再需要在任务之间逐个点头，但每个任务仍然是测试驱动、单独提交，遇到失败或有风险的步骤会停下来。

## en

The skills are organised around the delivery lifecycle: define, plan, build, verify, review, ship. Each phase maps to a slash command that activates the right skills automatically. Beyond explicit commands, skills also fire based on what you are doing, so designing an API triggers the interface-design skill and building UI triggers the frontend engineering one. Once a spec exists, a single approval can carry planning and implementation through in one pass: you stop stepping between tasks, but each task stays test-driven and individually committed, and the run pauses on failures or risky steps.

# Features

## zh

- 八个斜杠命令覆盖从定义到上线的完整开发周期
- 技能按当前工作内容自动激活，无需手动选择
- 一次批准即可连续完成计划与实现，失败时自动暂停
- 每个任务测试驱动、单独提交，便于回溯
- 内置网页性能审计与代码简化两个专项流程

## en

- Eight slash commands spanning define through ship
- Skills activate automatically based on what you are working on
- One approval can carry plan and implementation through, pausing on failure
- Every task stays test-driven and individually committed for traceability
- Includes dedicated web-performance audit and code-simplification passes

# Use Cases

## zh

- 希望代理按固定的工程流程走，而不是每次凭感觉
- 需要在合并前有一道稳定的评审关卡
- 想审计网页性能并按测量结果决定优化方向
- 代码写得能跑但过于复杂，需要一轮简化

## en

- Wanting the agent to follow a fixed engineering process rather than improvising
- Needing a consistent review gate before merging
- Auditing web performance and optimising based on measurements
- Simplifying code that works but has grown more complex than it needs to be

# Installation

```bash
npx skills add addyosmani/agent-skills -g
```

# Usage

## zh

按开发阶段使用对应命令：用 /spec 明确要做什么，用 /plan 拆成小任务，用 /build 逐步实现，用 /test 证明它能跑，用 /review 在合并前把关，用 /ship 发布。规格写好后想少点手动步骤，可以用 /build auto 让它一次跑完计划和实现。

## en

Use the command that matches your phase: /spec to define what to build, /plan to break it into small tasks, /build to implement incrementally, /test to prove it works, /review to gate before merge, and /ship to release. When the spec exists and you want fewer manual steps, /build auto generates the plan and implements every task in one approved pass.

# Workflow

## zh

1. 用 /spec 把要做的事写清楚
2. 用 /plan 拆成小而完整的任务
3. 用 /build 逐个实现，或用 /build auto 连续跑完
4. 用 /test 补齐验证
5. 用 /review 把关，再用 /ship 发布

## en

1. Run /spec to state clearly what is being built
2. Run /plan to break it into small, atomic tasks
3. Run /build task by task, or /build auto for a continuous pass
4. Run /test to establish proof it works
5. Run /review as the gate, then /ship to release

# Changelog

## 0.6.4 | 2026-07-18

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

/build auto 会不会跳过验证直接把代码写完？

### question.en

Does /build auto skip verification and just write all the code?

### answer.zh

不会。它去掉的是任务之间需要人点头的环节，验证本身保留：每个任务仍然测试驱动、单独提交，遇到失败或有风险的步骤会停下来等你处理。

### answer.en

No. What it removes is the human stepping between tasks, not the verification. Each task remains test-driven and individually committed, and the run pauses on failures or risky steps.

## Question 2

### question.zh

必须记住这八个命令才能用吗？

### question.en

Do I have to memorise all eight commands?

### answer.zh

不必。命令是显式入口，但技能也会根据你正在做的事自动激活——设计接口时触发接口设计技能，做界面时触发前端工程技能。

### answer.en

No. The commands are an explicit entry point, but skills also activate on their own based on the task at hand, such as API design triggering the interface-design skill.
