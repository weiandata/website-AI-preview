---
schemaVersion: 1
status: published
slug: last30days
name: last30days
nameZh: 近期舆情研究
category: research-writing
tags:
  - Research
  - Web Search
  - Trend Analysis
platforms:
  - Claude Code
  - Codex
author: mvanhorn
version: 3.16.0
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-07-16'
githubUrl: 'https://github.com/mvanhorn/last30days-skill'
officialUrl: ''
downloadUrl: 'https://github.com/mvanhorn/last30days-skill/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: research
stars: 52715
---
# Description

## zh

围绕一个话题去搜真实用户的讨论，按点赞、投票这类真实反馈来排序，而不是按编辑推荐，适合了解某件事近期的真实风向。

## en

Researches a topic across places where real people discuss it, ranking by upvotes, likes, and money spent rather than editorial picks — useful for reading the recent, genuine mood around something.

# Long Description

## zh

想知道一个工具好不好用、一件事大家怎么看，官方介绍和媒体报道往往不够，真正有用的是用户自己的讨论。这个技能的思路是让 AI 去搜「人」而不是搜「编辑」——从社区讨论、视频评论、论坛回帖这类地方取材，并用点赞、投票这些真实反馈作为排序依据，而不是谁的排名买得高。它更适合回答「最近大家怎么说」这类有时效性的问题，而不是查证已经定论的事实。仓库以 Claude Code 插件市场的方式分发，装上后会自动更新。

## en

When you want to know whether a tool is any good or how people actually feel about something, official pages and press coverage rarely settle it — the useful signal is in what users themselves say. This skill's approach is to search people rather than editors: it draws on community discussion, video comments, and forum threads, and ranks by real feedback such as upvotes and likes rather than by who paid for placement. It suits time-sensitive questions like "what are people saying lately" better than verifying settled facts. It is distributed through the Claude Code plugin marketplace and updates itself once installed.

# Features

## zh

- 从真实用户讨论中取材，而不是编辑推荐的内容
- 按点赞、投票等真实反馈排序
- 聚焦近期动态，适合有时效性的问题
- 通过插件市场安装，自动保持更新
- 技能规格文档独立维护，行为可查

## en

- Draws on genuine user discussion rather than editorially selected content
- Ranks by real signals such as upvotes and likes
- Focuses on recent activity, suited to time-sensitive questions
- Installs through the plugin marketplace and keeps itself updated
- Maintains a separate skill spec so its behaviour is inspectable

# Use Cases

## zh

- 想知道某个工具或产品最近的真实口碑
- 调研一个话题近期有什么新说法
- 写文章前想了解读者关心的角度
- 判断某个技术方案现在是不是还流行

## en

- Gauging the recent, honest reputation of a tool or product
- Researching what has newly been said about a topic
- Understanding what readers care about before writing
- Judging whether an approach is still in favour

# Installation

```bash
/plugin marketplace add mvanhorn/last30days-skill
```

```bash
/plugin install last30days
```

# Usage

## zh

安装后给出你要了解的话题即可，它会去搜相关讨论并按真实反馈整理出结果。适合问「最近大家怎么评价 X」这类问题。要注意它反映的是讨论热度和用户情绪，不等于事实核查，涉及关键结论时仍需回到原始出处确认。

## en

Once installed, name the topic and it searches the relevant discussion, organising results by genuine feedback. It fits questions like "what are people saying about X lately". Remember it reflects discussion volume and sentiment rather than verified fact, so check the original sources before relying on any key conclusion.

# Workflow

## zh

1. 通过插件市场安装
2. 说明你想了解的话题
3. 让它检索并按真实反馈整理讨论
4. 查看它引用的来源
5. 关键结论回到原始出处核实

## en

1. Install through the plugin marketplace
2. Name the topic you want to understand
3. Let it search and organise discussion by genuine feedback
4. Look at the sources it cites
5. Verify any key conclusion against the original source

# Changelog

## 3.16.0 | 2026-07-16

### zh

对应仓库当前发布的版本，README 说明的是 v3 流程。完整变更请查看 GitHub Releases。

### en

Matches the release currently published; the README documents the v3 pipeline. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

它的结果可以当事实依据吗？

### question.en

Can I treat its results as fact?

### answer.zh

不建议。它反映的是一段时间内大家在讨论什么、对什么反应强烈，属于舆情信号而不是事实核查。作为了解风向的入口很好用，但涉及具体数字或结论时，应当回到它引用的原始来源确认。

### answer.en

Not directly. It reflects what people have been discussing and reacting to — a sentiment signal, not fact-checking. It is a good way in, but for specific figures or conclusions, go back to the sources it cites.

## Question 2

### question.zh

和普通的联网搜索有什么区别？

### question.en

How is it different from ordinary web search?

### answer.zh

普通搜索的排序受搜索引擎优化和推广位影响较大，靠前的常常是为排名而写的内容。这个技能取材于用户讨论，并用点赞、投票这类真实反馈排序，更接近真实使用者的声音。

### answer.en

Ordinary search rankings are heavily shaped by SEO and paid placement, so the top results are often written to rank. This skill draws on user discussion and ranks by signals like upvotes and likes, landing closer to what actual users say.
