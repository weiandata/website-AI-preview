---
schemaVersion: 1
status: published
slug: ffmpeg-skill
name: ffmpeg-skill
nameZh: FFmpeg 视频编辑技能
category: content-creation
tags: [Video Editing, FFmpeg, MCP]
platforms: [Claude Code, Cursor, Codex]
author: kajisho5
version: 3.1.1
license: MIT
addedAt: '2026-11-04'
updatedAt: '2026-10-31'
githubUrl: 'https://github.com/kajisho5/ffmpeg-skill'
officialUrl: ''
downloadUrl: 'https://github.com/kajisho5/ffmpeg-skill/archive/refs/heads/main.zip'
featured: false
featuredRank: 0
verified: false
icon: writing
stars: 4495
---
# Description

## zh

让编程代理用本机 FFmpeg 编辑视频，并检查自己的输出。

## en

Lets coding agents edit video with local FFmpeg and check their own output.

# Long Description

## zh

它提供 42 个 FFmpeg 工具，有机器可读的调用约定，还带 MCP 服务器。视频在本机处理，不需要云服务或 API 密钥，脚本只依赖 Python 标准库。工具覆盖字幕、画幅裁切等常见操作，doctor 命令可检查机器上的组件是否齐全。使用前需要先单独安装 FFmpeg。

## en

It offers 42 FFmpeg tools with a machine-readable contract and an MCP server. Video is processed locally with no cloud service or API key, and scripts use only the Python standard library. Tools cover common tasks such as captions and aspect-ratio cropping, and a doctor command checks the machine's components. FFmpeg itself must be installed first.

# Features

## zh

- 42 个本地 FFmpeg 工具
- 机器可读的调用约定
- MCP 服务器
- doctor 环境检查
- 不需要云服务和 API 密钥

## en

- 42 local FFmpeg tools
- A machine-readable contract
- An MCP server
- A doctor environment check
- No cloud service or API key

# Use Cases

## zh

- 让代理给视频加字幕
- 把横屏素材裁成竖屏
- 批量处理本地视频素材

## en

- Having an agent caption a video
- Cropping landscape footage to vertical
- Batch processing local footage

# Installation

```bash
npx ffmpeg-skill
```

```bash
npx ffmpeg-skill doctor
```

# Usage

## zh

先安装 FFmpeg。默认命令安装到 Claude Code，加 --cursor、--codex 或 --all 可安装到其他工具。运行 doctor 确认环境后，直接告诉代理要怎么处理视频。请保留原始素材备份。

## en

Install FFmpeg first. The default command installs for Claude Code; add --cursor, --codex, or --all for other tools. Run doctor to confirm the setup, then tell the agent what to do with the video. Keep a backup of your originals.

# Workflow

## zh

1. 安装 FFmpeg
2. 安装技能
3. 运行 doctor 检查环境
4. 向代理描述编辑要求
5. 检查输出视频

## en

1. Install FFmpeg
2. Install the skill
3. Run doctor to check the setup
4. Describe the edit to the agent
5. Check the output video

# Changelog

## 3.1.1 | 2026-10-31

### zh

对应仓库当前发布的版本。完整变更请查看 GitHub Releases。

### en

Matches the release currently published in the repository. See GitHub Releases for the full history.

# FAQ

## Question 1

### question.zh

视频会上传到云端吗？

### question.en

Is video uploaded to the cloud?

### answer.zh

不会。README 说明它用本机 FFmpeg 处理，不需要云服务或 API 密钥。

### answer.en

No. The README says it uses local FFmpeg with no cloud service or API key.

## Question 2

### question.zh

需要单独安装 FFmpeg 吗？

### question.en

Do I need to install FFmpeg separately?

### answer.zh

需要。安装后可以运行 npx ffmpeg-skill doctor 检查是否齐全。

### answer.en

Yes. Afterwards, npx ffmpeg-skill doctor checks that everything is present.
