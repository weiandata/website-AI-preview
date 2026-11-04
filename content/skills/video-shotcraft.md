---
schemaVersion: 1
status: published
slug: video-shotcraft
name: video-shotcraft
nameZh: Video Shotcraft 产品宣传片
category: content-creation
tags: [Video, Remotion, Product Promo]
platforms: [Claude Code, Codex]
author: Vincentwei1021
version: TODO
license: Apache-2.0
addedAt: '2026-11-04'
updatedAt: '2026-10-29'
githubUrl: 'https://github.com/Vincentwei1021/video-shotcraft'
officialUrl: ''
downloadUrl: 'https://github.com/Vincentwei1021/video-shotcraft/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: writing
stars: 16840
---
# Description

## zh

让代理用你的真实页面和 Remotion 制作可继续编辑的产品宣传片。

## en

Has agents make editable product promos from your real pages with Remotion.

# Long Description

## zh

告诉代理为产品做宣传片，它会截取真实页面，从调校好的镜头库中选择镜头，编排分镜，用 Remotion 制作动画，按节拍剪辑并加入音效，逐帧检查后交付 MP4。它不是视频生成模型，画面都由代码绘制，所以清晰、贴合品牌，也可以继续修改。仓库提供 124 张镜头卡和 150 个镜头，还支持导出剪映草稿。

## en

Ask the agent for a product promo and it captures your real pages, picks from a library of tuned shots, storyboards the film, animates with Remotion, cuts to the beat, adds sound, checks each frame, and delivers an MP4. It is not a video generation model: every frame is drawn by code, so results stay sharp, on-brand, and editable. The repository offers 124 cards and 150 shots and can export JianYing drafts.

# Features

## zh

- 124 张镜头卡和 150 个镜头
- 截取真实页面作为素材
- 按节拍剪辑并配音效
- 浏览器内继续编辑
- 导出可编辑的剪映草稿

## en

- 124 cards and 150 shots
- Captures real pages as footage
- Cuts to the beat with sound design
- Continued editing in a browser
- Exports editable JianYing drafts

# Use Cases

## zh

- 为软件产品制作上线宣传片
- 用现有界面做功能演示
- 需要能继续修改的视频工程

## en

- Making a launch promo for a software product
- Building a feature demo from existing screens
- Needing a video project that stays editable

# Installation

```bash
npx skills add Vincentwei1021/video-shotcraft
```

# Usage

## zh

安装后让 Claude Code 或 Codex 为你的产品做宣传片，并提供页面和文案。交付后可以在 Motion Workbench 继续编辑，或导出到剪映。使用的音乐和图片请确认授权。

## en

After installing, ask Claude Code or Codex for a promo and provide your pages and copy. Once delivered, keep editing in Motion Workbench or export to JianYing. Confirm rights for any music and images you use.

# Workflow

## zh

1. 提供产品页面和文案
2. 由代理选择镜头并编排分镜
3. 用 Remotion 制作动画
4. 按节拍剪辑并加音效
5. 检查 MP4 后继续编辑或导出

## en

1. Provide product pages and copy
2. Let the agent pick shots and storyboard
3. Animate with Remotion
4. Cut to the beat and add sound
5. Check the MP4, then edit or export

# Changelog

## TODO | 2026-10-29

### zh

仓库未发布带版本号的 Release，此处记录最近一次更新日期。请查看提交历史了解变更。

### en

The repository publishes no versioned releases; this records the most recent update date. See the commit history for changes.

# FAQ

## Question 1

### question.zh

它是 AI 视频生成工具吗？

### question.en

Is it an AI video generator?

### answer.zh

不是。README 明确说每一帧都由代码根据你的截图和文案绘制。

### answer.en

No. The README says every frame is drawn by code from your own screenshots and copy.

## Question 2

### question.zh

支持剪映吗？

### question.en

Does it support JianYing?

### answer.zh

支持。成片可以导出为可编辑的剪映草稿，包含分镜片段、字幕和音频轨道。

### answer.en

Yes. The final film can export as an editable JianYing draft with clips, captions, and audio tracks.
