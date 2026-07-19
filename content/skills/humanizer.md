---
schemaVersion: 1
status: published
slug: humanizer
name: Humanizer
nameZh: AI 味去除
category: content-creation
tags:
  - Writing
  - Editing
  - Tone
platforms:
  - Claude Code
  - Codex
  - Cursor
author: blader
version: TODO
license: MIT
addedAt: 2026-07-19
updatedAt: 2026-06-29
githubUrl: https://github.com/blader/humanizer
officialUrl: ""
downloadUrl: https://github.com/blader/humanizer/archive/refs/heads/main.zip
featured: false
featuredRank: 0
verified: false
icon: writing
stars: 29845
downloads: 0
---

# Description

## zh

去掉文字里一眼能看出是 AI 写的那些痕迹，让语气读起来更像人写的自然表达。

## en

Strips the tell-tale signs of AI-generated writing from text so the result reads as something a person would actually write.

# Long Description

## zh

AI 写出来的文字有一些很固定的毛病：爱用「不仅仅是……更是……」这类对仗句式，喜欢在结尾升华一下，形容词堆得过密，段落节奏均匀得不自然。读的人未必说得出哪里不对，但一眼就觉得不是人写的。这个技能专门处理这类痕迹，把过度修饰和套路句式拿掉，把语气调回正常说话的样子。它本身就是一份纯 Markdown 说明，不依赖任何运行环境，所以凡是支持技能式指令的工具都能用。仓库还提供了一次装进所有支持环境的命令。

## en

AI writing has a recognisable set of habits: fondness for "not just X, but Y" constructions, a compulsion to end on an uplifting note, adjectives packed too densely, and paragraphs that fall into an unnaturally even rhythm. Readers may not name what is off, but they can tell. This skill targets exactly those tells, removing the over-decoration and formulaic constructions and pulling the tone back toward how people actually write. It is plain Markdown with no runtime dependency, so it works in any harness that supports skill-style instructions, and the repository offers a command to install it into every supported one at once.

# Features

## zh

- 针对 AI 写作的固定套路做修改，而不是泛泛地「改得更好」
- 纯 Markdown 编写，不依赖特定运行环境
- 支持一次装进所有兼容的代理环境
- 可用命令更新已安装的版本
- 处理的是语气和句式，不改变原意

## en

- Targets the specific habits of AI writing rather than vaguely "improving" text
- Written as plain Markdown with no runtime dependency
- Can install into every supported harness in one command
- Updatable in place with a single command
- Works on tone and phrasing without changing what you meant

# Use Cases

## zh

- 用 AI 起草的文章要发出去，想先去掉机器感
- 邮件或对外沟通希望读起来自然一点
- 写作时想避开那些一眼能认出的套路句式
- 团队内容需要统一成更接近口语的语气

## en

- Publishing something drafted with AI and wanting the machine feel gone first
- Emails or outward communication that should read naturally
- Avoiding the constructions readers immediately recognise as AI
- Bringing team content toward a more spoken, natural register

# Installation

```bash
npx skills add blader/humanizer
```

```bash
npx skills add blader/humanizer --agent '*'
```

# Usage

## zh

装好之后，把要修改的文字交给 AI 并说明要去掉 AI 感即可。它会调整句式和语气，但不改变你要表达的内容。如果对结果不满意，可以具体说明哪里还是别扭，让它再来一遍。已安装的版本可以用更新命令保持最新。

## en

Once installed, hand over the text and ask for the AI feel removed. It adjusts phrasing and tone without changing what you meant. If the result still reads oddly, say which part and let it pass again. An existing install can be kept current with the update command.

# Workflow

## zh

1. 安装技能，可选择装进所有支持的环境
2. 把 AI 起草的文字交给它
3. 让它去掉套路句式与过度修饰
4. 通读一遍，指出仍然别扭的地方
5. 确认原意没有被改动

## en

1. Install the skill, optionally into every supported harness
2. Hand over the AI-drafted text
3. Ask it to remove formulaic phrasing and over-decoration
4. Read it through and point out what still feels off
5. Confirm your original meaning survived intact

# Changelog

## TODO | 2026-06-29

### zh

仓库未发布带版本号的 Release，此处记录最近一次更新日期。请查看提交历史了解变更。

### en

The repository publishes no versioned releases; this records the most recent update date. See the commit history for changes.

# FAQ

## Question 1

### question.zh

它会不会改掉我想表达的意思？

### question.en

Will it change what I meant to say?

### answer.zh

它处理的是句式和语气层面的问题——去掉套路结构、削减过度修饰、调整节奏，内容本身应当保持不变。改完通读一遍仍是必要的，尤其是涉及数字、名称和承诺的句子。

### answer.en

It works at the level of phrasing and tone — removing formulaic structures, thinning over-decoration, adjusting rhythm — and your content should survive unchanged. Reading it through afterwards is still worth doing, especially for sentences carrying figures, names, or commitments.

## Question 2

### question.zh

能用来规避 AI 检测吗？

### question.en

Can it be used to evade AI detection?

### answer.zh

它的用途是让文字读起来更自然，而不是为了骗过检测工具。如果场合要求披露内容由 AI 协助完成——比如学术提交或某些平台的规定——请照实说明，改写语气并不改变这个事实。

### answer.en

Its purpose is readable, natural prose, not defeating detectors. Where disclosure is required — academic submissions, or platforms that ask — say so plainly; rewriting the tone does not change the fact.
