---
schemaVersion: 1
status: published
slug: planning-with-files
name: Planning with Files
nameZh: 文件式任务规划
category: automation
tags:
  - Planning
  - Context Recovery
  - Long Running Tasks
platforms:
  - Claude Code
  - Codex
  - Cursor
author: OthmanAdi
version: 3.7.0
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-07-18'
githubUrl: 'https://github.com/OthmanAdi/planning-with-files'
officialUrl: ''
downloadUrl: 'https://github.com/OthmanAdi/planning-with-files/archive/refs/heads/master.zip'
featured: false
featuredRank: 0
verified: true
icon: automation
stars: 25482
downloads: 0
---
# Description

## zh

把任务计划、发现和进度写进磁盘文件，让代理在上下文丢失、清空对话或崩溃之后还能接着干，而不是从头再来。

## en

Keeps the task plan, findings, and progress in files on disk so an agent survives context loss, a cleared conversation, or a crash and picks up where it left off.

# Long Description

## zh

长任务最容易在中途出问题：上下文满了、对话被清空、程序崩溃，之前想清楚的思路和已经做完的部分就都没了，只能重来。这个技能的做法是把状态落到磁盘上——任务计划、过程中的发现、当前进度各自成文件，随时可读可改。这样即使会话中断，新会话读一遍这几个文件就能接上，不需要你重新交代。v3 还加入了可选的自主模式和门控模式，其中有一道完成检查会拦住代理，直到计划里的事项真正做完，避免它中途宣布完成。它按通用技能标准编写，可以装进六十多种代理环境。

## en

Long tasks tend to break in the middle: context fills up, the conversation gets cleared, the process crashes — and the thinking you had settled plus the work already done vanish, leaving you to start over. This skill puts that state on disk instead, with the task plan, the findings gathered along the way, and current progress each in its own readable, editable file. When a session ends, the next one reads those files and continues without you re-explaining anything. Version 3 added optional autonomous and gated modes, including a completion gate that holds the agent until the plan is genuinely finished rather than letting it declare victory early. It follows the common skill standard and installs across more than sixty agent harnesses.

# Features

## zh

- 计划、发现与进度分别落到磁盘文件，可读可改
- 上下文丢失或崩溃后可以接着干，不必重来
- 可选的完成门控，防止任务没做完就收尾
- 支持六十多种代理环境
- 文件是纯文本，可纳入版本控制

## en

- Plan, findings, and progress each live in an editable file on disk
- Survives context loss or a crash and resumes rather than restarting
- Optional completion gate stops the agent finishing prematurely
- Installs across more than sixty agent harnesses
- Plain-text files, so they can go into version control

# Use Cases

## zh

- 任务要跨多个会话完成，不希望每次重新交代
- 代理跑长任务时经常中途走偏或提前收尾
- 想看清代理当前进行到哪一步
- 多人接手同一件事，需要共享的进度记录

## en

- Work spanning several sessions that should not need re-explaining each time
- Long agent runs that tend to drift or wrap up too early
- Wanting visibility into exactly where the agent has got to
- Handing work between people who need a shared record of progress

# Installation

```bash
npx skills add OthmanAdi/planning-with-files -g
```

# Usage

## zh

安装后交给代理一个较大的任务，它会先把计划写进文件，过程中随时更新发现与进度。会话中断后，新会话读这几个文件即可继续。你也可以直接打开文件查看或修改计划，因为它们就是普通的文本文件。需要更严格的收尾控制时，启用完成门控模式。

## en

Once installed, hand the agent a sizeable task and it writes the plan to a file first, updating findings and progress as it goes. If the session ends, the next one reads those files and continues. You can open and edit the plan yourself — they are ordinary text files. Turn on the completion gate when you want stricter control over when it finishes.

# Workflow

## zh

1. 安装技能
2. 交代任务，让它先写出计划文件
3. 让它执行并持续更新进度与发现
4. 中断后新会话读取文件继续
5. 需要时启用完成门控，确认计划真正做完

## en

1. Install the skill
2. Describe the task and let it write the plan file first
3. Let it work, updating progress and findings as it goes
4. After any interruption, a new session reads the files and continues
5. Enable the completion gate when you want the plan verified as finished

# Changelog

## 3.7.0 | 2026-07-18

### zh

对应仓库当前发布的版本。v3.0.0 引入了可选的自主模式、门控模式与完成检查。完整变更请查看 GitHub Releases。

### en

Matches the release currently published. v3.0.0 introduced the optional autonomous and gated modes and the completion gate. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

会在我的项目里留下额外文件吗？

### question.en

Does it leave extra files in my project?

### answer.zh

会。它的机制就是把计划、发现和进度写成文件保存在磁盘上，这正是它能在中断后接着干的原因。这些是普通文本文件，可以纳入版本控制，也可以在任务结束后删掉。

### answer.en

Yes — writing the plan, findings, and progress to disk is precisely how it survives interruption. They are ordinary text files, so you can commit them or delete them once the task is done.

## Question 2

### question.zh

启用自主模式安全吗？

### question.en

Is the autonomous mode safe to enable?

### answer.zh

自主模式和门控模式都是可选的，默认不启用，现有配置不受影响。自主模式适合你信任任务边界、愿意让它连续跑完的场景；涉及不可逆操作时，建议保留人工确认环节。

### answer.en

Both the autonomous and gated modes are opt-in and off by default, so existing setups are unaffected. Autonomous suits tasks whose boundaries you trust and want run through in one go; where actions are irreversible, keep a human checkpoint.
