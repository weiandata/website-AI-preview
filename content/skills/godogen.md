---
schemaVersion: 1
status: published
slug: godogen
name: Godogen
nameZh: 游戏自动开发技能
category: development
tags:
  - Game Development
  - Godot
  - Bevy
  - Asset Generation
platforms:
  - Claude Code
  - Codex
author: htdt
version: TODO
license: MIT
addedAt: '2026-07-19'
updatedAt: '2026-07-13'
githubUrl: 'https://github.com/htdt/godogen'
officialUrl: ''
downloadUrl: 'https://github.com/htdt/godogen/archive/refs/heads/master.zip'
featured: false
featuredRank: 0
verified: true
icon: code
stars: 4815
downloads: 0
---
# Description

## zh

描述一个游戏，代理负责搭建工程、生成美术资源、运行引擎，并以能跑起来的画面证明结果。支持 Godot、Bevy 和 Babylon.js。

## en

Describe a game and the agent builds it, generates the assets, runs the engine, and proves the result from the running game. Supports Godot, Bevy, and Babylon.js.

# Long Description

## zh

这个仓库本身不是游戏，而是生成游戏工程的源头：先发布出一个新的游戏仓库，选定引擎和代理环境，然后代理在那个仓库里按一份简短的引擎指南把游戏真正做出来。发布出来的仓库刻意保持轻薄，只有运行时清单、一页引擎指南和资源生成技能，其余脚手架由代理按指南自行重建。它的判断依据是运行中的游戏——一个可访问的地址或一段录屏，而不是「编译通过」，所以画面上的缺陷会驱动下一轮迭代。你可以全程盯着实时画面并在关键节点介入，也可以放手让它跑完，最后拿到一段十几二十秒的成果录像。

## en

The repository is not a game but the source of a generator that produces them: you publish into a fresh game repo, choosing engine and host agent, and the agent then works inside that repo to build the actual game from a short engine guide. A published repo is deliberately thin — a runtime manifest, a one-page engine guide, and the asset-generation skill — with the agent recreating the scaffold from the guide. It judges results from the running game, a live URL or a recorded clip, rather than from a clean compile, so visible defects drive the next iteration. You can watch live and steer at decision points, or leave the run unattended and collect a 15–20 second proof recording at the end.

# Features

## zh

- 支持 Godot 4、Bevy 和 Babylon.js 三种引擎
- 以运行中的画面而非编译结果作为判断依据
- 集成多个模型生成贴图、角色与三维资源
- 可选择全程盯着实时画面，或放手跑完拿录像
- 发布出的游戏仓库结构轻薄，便于接手继续开发

## en

- Targets three engines: Godot 4, Bevy, and Babylon.js
- Judges progress from the running game rather than a clean compile
- Integrates several models for textures, characters, and 3D assets
- Watch live and steer, or leave it unattended and collect a recording
- Publishes a thin game repo that stays easy to take over by hand

# Use Cases

## zh

- 想快速验证一个玩法点子，不打算先搭一套工程
- 学习某个引擎，需要一个能跑起来的完整样例
- 做游戏原型给别人看，需要可演示的画面
- 缺美术资源，希望连贴图和模型一起生成

## en

- Validating a gameplay idea without first standing up a project
- Learning an engine and wanting a complete, running example
- Building a prototype that needs something watchable to show
- Lacking art assets and wanting textures and models generated too

# Installation

```bash
git clone https://github.com/htdt/godogen.git
```

```bash
./publish.sh --engine godot --agent claude --out ~/my-game
```

# Usage

## zh

先克隆仓库，用 publish.sh 选定引擎和代理环境，发布出一个新的游戏仓库。之后在那个仓库里向代理描述你想要的游戏，它会搭工程、生成资源、运行引擎并自行迭代。你的介入程度由描述任务的方式决定：想全程参与就说明要盯着实时画面，想放手就直接交给它跑。

## en

Clone the repository, use publish.sh to pick an engine and host agent, and publish a fresh game repo. Then, inside that repo, describe the game you want; the agent scaffolds the project, generates assets, runs the engine, and iterates. How involved you are follows from how you frame the task: say you want to watch live, or simply hand it over and let the run finish.

# Workflow

## zh

1. 克隆仓库并准备好引擎与相关运行环境
2. 配置资源生成所需的 API 密钥
3. 用 publish.sh 选定引擎和代理环境，发布游戏仓库
4. 在新仓库里描述你想要的游戏
5. 盯着实时画面介入，或等待最后的成果录像

## en

1. Clone the repository and install the engine and its runtime prerequisites
2. Configure the API keys used for asset generation
3. Run publish.sh to choose engine and host agent and publish a game repo
4. Describe the game you want inside the new repo
5. Steer from the live view, or wait for the final proof recording

# Changelog

## TODO | 2026-07-13

### zh

仓库未发布带版本号的 Release，此处记录最近一次更新日期。请查看提交历史了解变更。

### en

The repository publishes no versioned releases; this records the most recent update date. See the commit history for changes.

# FAQ

## Question 1

### question.zh

需要准备哪些前置环境？

### question.en

What prerequisites does it need?

### answer.zh

按引擎不同：Godot 项目需要 .NET 版的 Godot 4，Bevy 需要 Rust 和 Cargo，Babylon.js 需要 Node.js 22.12 以上。另外需要 Python 3，以及用于资源生成的多个 API 密钥。仓库在 Ubuntu、Debian 和 macOS 上测试过。

### answer.en

It depends on the engine: Godot needs the .NET build of Godot 4, Bevy needs Rust and Cargo, and Babylon.js needs Node.js 22.12 or newer. Python 3 is also required, along with API keys for asset generation. The repository is tested on Ubuntu, Debian, and macOS.

## Question 2

### question.zh

生成出来的游戏能接着自己改吗？

### question.en

Can I keep developing the generated game by hand?

### answer.zh

可以。发布出来的是一个正常的游戏仓库，结构刻意保持简单——运行时清单、一页引擎指南和资源生成技能，其余是代理生成的常规工程文件，可以直接接手。

### answer.en

Yes. What you get is an ordinary game repository, kept deliberately simple: a runtime manifest, a one-page engine guide, and the asset-generation skill, with the rest being normal project files you can take over directly.
