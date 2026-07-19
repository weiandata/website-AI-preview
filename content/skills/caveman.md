---
schemaVersion: 1
status: draft
slug: caveman
name: Caveman
nameZh: Caveman 输出精简技能
category: development
tags:
  - Token Optimization
  - Output Style
  - Cost Saving
platforms:
  - Claude Code
  - Codex
  - Gemini
  - Cursor
  - Windsurf
  - Cline
author: JuliusBrussee
version: 1.9.1
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-07-03'
githubUrl: 'https://github.com/JuliusBrussee/caveman'
officialUrl: 'https://caveman.so/'
downloadUrl: 'https://github.com/JuliusBrussee/caveman/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 90627
downloads: 0
---
# Description

## zh

让编程代理去掉客套和铺垫，用极简语气回答，据仓库测算可减少约 65% 的输出 token，代码和命令保持原样不变。

## en

Makes a coding agent drop filler and answer in terse phrasing, cutting output tokens by around 65% per the repository's own figure, while leaving code, commands, and errors byte-for-byte intact.

# Long Description

## zh

代理的回答里往往有大量解释性铺垫：先复述你的问题，再讲一遍背景，最后才给出结论。Caveman 把这些去掉，只留下判断和事实。关键在于它区分了「话」和「东西」——自然语言部分被压到最短，而代码块、终端命令和报错信息原样保留，不做任何改写。这样省下来的是纯粹的冗余，不影响你能不能复制粘贴。仓库提供多档精简强度，可以按自己的接受程度选择。

## en

Agent replies often carry a lot of preamble: restating your question, recapping context, and only then reaching the point. Caveman strips that back to the judgement and the facts. The important part is the distinction it draws between prose and artefacts: natural language is compressed hard, while code blocks, terminal commands, and error messages are preserved byte-for-byte. What you save is pure redundancy, and anything you need to copy still works. The repository offers several intensity levels to suit your tolerance.

# Features

## zh

- 据仓库测算减少约 65% 的输出 token
- 代码、命令和报错原样保留，不做改写
- 提供多档精简强度可选
- 支持 30 种以上的代理环境
- 安装一次后长期生效，不需要每次提醒

## en

- Cuts output tokens by around 65% per the repository's own measurement
- Leaves code, commands, and errors byte-for-byte unchanged
- Ships several intensity levels to choose from
- Works with more than 30 agent harnesses
- Install once and it keeps applying, with no need to re-prompt

# Use Cases

## zh

- 按 token 计费，希望压低长期使用成本
- 已经熟悉领域，不需要代理反复解释背景
- 上下文窗口紧张，想把空间留给代码而不是散文
- 长会话中希望回答更密、翻页更少

## en

- Paying per token and wanting to bring long-run cost down
- Already knowing the domain and not needing background re-explained
- Tight context windows where space should go to code, not prose
- Long sessions where denser answers mean less scrolling

# Installation

```bash
npx skills add JuliusBrussee/caveman -g
```

# Usage

## zh

安装后即刻生效，代理的自然语言部分会自动变短，你不需要在每次提问时特别说明。如果觉得太简略或不够简略，可以按仓库说明切换精简档位。需要完整解释时，照常要求代理展开即可。

## en

It takes effect as soon as it is installed; the agent's prose shortens on its own with no need to ask each time. If the result is too terse or not terse enough, switch levels as documented in the repository. When you do want a full explanation, just ask for one as usual.

# Workflow

## zh

1. 在你的代理环境中安装技能
2. 正常提问，观察回答的精简程度
3. 按需要调整精简档位
4. 需要详细说明时，明确要求代理展开
5. 对照账单或用量确认节省效果

## en

1. Install the skill into your agent harness
2. Ask questions as usual and see how terse the replies become
3. Adjust the intensity level if needed
4. Ask explicitly for detail when you want a full explanation
5. Check your usage or billing to confirm the saving

# Changelog

## 1.9.1 | 2026-07-03

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

回答变短会不会导致代码被截断或改写？

### question.en

Does the shorter output risk truncating or rewriting code?

### answer.zh

不会。仓库明确说明代码、命令和报错信息按字节原样保留，被压缩的只有自然语言部分。

### answer.en

No. The repository states that code, commands, and errors are kept byte-for-byte exact; only the natural-language portion is compressed.

## Question 2

### question.zh

65% 这个数字是怎么来的？

### question.en

Where does the 65% figure come from?

### answer.zh

这是仓库自己给出的测算结果，README 中附有对照示例和基准测试章节。实际效果取决于你的问题类型——解释性问题省得多，纯代码输出省得少。

### answer.en

It is the repository's own measurement, with before/after examples and a benchmarks section in the README. Real savings depend on your question mix: explanatory answers save more, code-heavy ones less.
