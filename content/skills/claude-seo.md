---
schemaVersion: 1
status: published
slug: claude-seo
name: Claude SEO
nameZh: SEO 分析技能
category: content-creation
tags:
  - SEO
  - Content Audit
  - Schema.org
  - Marketing
platforms:
  - Claude Code
author: AgriciDaniel
version: 2.2.0
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-07-06'
githubUrl: 'https://github.com/AgriciDaniel/claude-seo'
officialUrl: ''
downloadUrl: 'https://github.com/AgriciDaniel/claude-seo/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: true
icon: writing
stars: 11769
downloads: 0
---
# Description

## zh

对网站做 SEO 体检，覆盖技术、内容质量、结构化数据和本地化等方面，输出一份排好优先级、每条都可验证的改进清单。

## en

Audits a site's SEO across technical health, content quality, structured data, and localisation, producing a prioritised action plan where every recommendation can be tested.

# Long Description

## zh

SEO 建议最容易流于空泛——「提升内容质量」「优化关键词」听着都对，但没法验证也没法排期。这个技能的做法不同：每条建议都附带它依据的观察、与其他项的依赖关系、一个「怎样才算这条判断错了」的检验方式，以及一个可以先行观察的指标。也就是说，你能判断它说得对不对，而不是只能选择信或不信。覆盖面包括技术 SEO、内容质量、Schema.org 结构化标记、面向 AI 搜索的优化、本地和跨境场景等，依据来自谷歌的一手文档。做整站体检时它会并行派出多个专项代理，把原本要花几小时的工作压到几分钟。

## en

SEO advice tends toward the unfalsifiable — "improve content quality", "optimise keywords" — which sounds right but cannot be scheduled or checked. This skill works differently: each recommendation carries the observation it rests on, its dependencies, an explicit test for how you would know it was wrong, and a leading indicator to watch. You can judge whether it is correct rather than simply believing it. Coverage spans technical SEO, content quality, Schema.org markup, optimisation for AI-driven search, and local and international cases, grounded in Google's own primary documentation. A full site audit dispatches specialist agents in parallel, compressing hours of work into minutes.

# Features

## zh

- 每条建议附带依据、依赖关系和可证伪的检验方式
- 覆盖技术 SEO、内容质量、结构化数据与本地化
- 面向 AI 搜索的优化，依据谷歌一手指南
- 整站体检并行执行，大幅缩短耗时
- 输出按优先级排序的行动清单

## en

- Every recommendation carries its evidence, dependencies, and a falsifiable test
- Covers technical SEO, content quality, structured data, and localisation
- Optimises for AI-driven search, grounded in Google's own guidance
- Runs full-site audits in parallel, cutting the time substantially
- Produces a prioritised action plan

# Use Cases

## zh

- 网站流量下滑，需要系统排查原因
- 上线前想确认技术层面没有明显问题
- 内容做了不少但搜索表现一般，想知道差在哪
- 需要补齐结构化数据标记

## en

- Traffic has dropped and you need a systematic look at why
- Confirming there are no obvious technical problems before launch
- Plenty of content but weak search performance, and you want to know why
- Filling in missing structured-data markup

# Installation

```bash
npx skills add AgriciDaniel/claude-seo -g
```

# Usage

## zh

安装后指定要检查的站点或页面，选择做整站体检还是单项检查。产出是一份带优先级的清单，每条都写明依据和验证方式，可以按顺序排期处理。建议从高优先级项开始，改完后用它给出的指标观察效果。

## en

Once installed, point it at the site or page and choose a full audit or a specific check. The output is a prioritised list where each item states its evidence and how to verify it, so you can schedule the work in order. Start at the top, then watch the indicator it names to see whether the change landed.

# Workflow

## zh

1. 安装技能
2. 指定要检查的站点或页面
3. 选择整站体检或单项检查
4. 按优先级处理清单上的问题
5. 用它给出的先行指标观察改动效果

## en

1. Install the skill
2. Point it at the site or page
3. Choose a full audit or a targeted check
4. Work down the prioritised list
5. Watch the leading indicator it names to see if the change worked

# Changelog

## 2.2.0 | 2026-07-06

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

这个仓库有两个版本，该用哪个？

### question.en

There are two versions of this repository — which one should I use?

### answer.zh

本站收录的是公开开源版本，采用 MIT 许可证，有公开发布版本，不需要任何会员资格，适合大多数人。另有一个面向付费社区的私有镜像，提供功能的早期访问，需要成为该社区成员。

### answer.en

This entry points at the public open-source version: MIT licensed, publicly released, and requiring no membership, which suits most people. A separate private mirror offers early access to upcoming features but requires joining the author's paid community.

## Question 2

### question.zh

它的建议靠谱吗？

### question.en

How trustworthy are its recommendations?

### answer.zh

它的设计特点是每条建议都能被检验：附带依据的观察、依赖关系，以及一个明确的「怎样算这条判断错了」。所以你不必凭感觉相信，可以按它给出的方式验证。依据本身来自谷歌的一手公开文档。

### answer.en

Its distinguishing feature is that each recommendation is checkable: it carries the observation behind it, its dependencies, and an explicit test for how you would know it was wrong. You need not take it on faith — you can verify it the way it describes. The underlying guidance comes from Google's own public documentation.
