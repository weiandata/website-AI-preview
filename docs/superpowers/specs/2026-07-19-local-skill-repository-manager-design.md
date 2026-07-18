# WEIAN DATA 本地 Skill 仓库管理器设计

## 目标

将当前写在 TypeScript 文件中的 Skill 内容迁移为一份 Markdown 对应一个 Skill 的内容仓库，并提供只在管理员 Mac 上运行的可视化管理器。管理员不需要编程即可新增、导入、导出、修改、精选和发布 Skill。

发布工作流固定为：

```text
本地管理器 → Markdown → GitHub main → Cloudflare Pages → 正式网站
```

本项目不建设热门搜索功能，不采集搜索次数，不使用 D1 或其他线上内容数据库。普通搜索和输入后的匹配建议继续保留。

## 已确认的产品决策

- 管理器仅由管理员在当前一台 Mac 上使用。
- 不提供线上 `/admin`、管理员账号或多人协作系统。
- 编辑界面展示全部 Skill 字段，不折叠为简化表单。
- Markdown 是 Skill 的唯一数据源，不同时维护 JSON 或 TypeScript 内容副本。
- 每个 Markdown 文件对应一个 Skill。
- 支持单个或批量导入 Markdown。
- 支持导出单个 Markdown 和全部 Skill 压缩包。
- 提供“仅保存”和“保存并发布”两个独立操作。
- 精选 Skill 完全由管理员指定并排序。
- GitHub 是内容版本记录与发布来源。
- Cloudflare Pages 监听 GitHub `main` 并发布静态网站。

## 仓库结构

```text
content/
├── skills/
│   ├── data-analysis-assistant.md
│   ├── github-workflow-helper.md
│   └── ...
└── skill-template.md

tools/
└── skill-manager/
    ├── 本地服务
    └── 管理界面

启动Skill管理器.command
```

生产构建只读取 `content/skills/*.md`。`tools/skill-manager` 和本地文件写入接口不进入正式网站运行环境。

## Markdown 数据规范

### 文件身份

- 文件名使用 `<slug>.md`。
- `slug` 是公开网址的一部分，发布后默认锁定。
- Skill 的内部 `id` 由 `slug` 派生，不要求管理员重复填写。
- `schemaVersion` 用于未来的数据迁移。
- `status: draft` 的 Skill 不进入任何公开页面、筛选数据或站点地图。

### 模板

````markdown
---
schemaVersion: 1
status: published
slug: example-skill
name: Example Skill
nameZh: 示例 Skill
category: data-analytics
tags:
  - Data Analysis
  - Automation
platforms:
  - ChatGPT
  - Claude
author: Example Author
version: 1.0.0
license: MIT
addedAt: 2026-07-19
updatedAt: 2026-07-19
githubUrl: https://github.com/example/example-skill
officialUrl: ""
downloadUrl: https://github.com/example/example-skill/archive/refs/heads/main.zip
featured: false
featuredRank: 0
verified: false
icon: chart
stars: 0
downloads: 0
---

# Description

## zh

用一至两句话说明这个 Skill 可以解决什么问题。

## en

Describe the problem this Skill solves in one or two sentences.

# Long Description

## zh

填写更完整的中文介绍、适用范围和限制。

## en

Provide a fuller English introduction, scope, and limitations.

# Features

## zh

- 核心功能一
- 核心功能二
- 核心功能三

## en

- Primary feature
- Secondary feature
- Additional feature

# Use Cases

## zh

- 使用场景一
- 使用场景二

## en

- First use case
- Second use case

# Installation

```bash
git clone https://github.com/example/example-skill.git
```

```bash
cd example-skill && npm install
```

# Usage

## zh

填写中文使用方法、输入要求和注意事项。

## en

Describe usage, input requirements, and important notes.

# Workflow

## zh

1. 准备输入材料
2. 检查运行条件
3. 执行主要任务
4. 复核输出结果

## en

1. Prepare the input
2. Check the requirements
3. Run the main task
4. Review the output

# Changelog

## 1.0.0 | 2026-07-19

### zh

首次发布。

### en

Initial release.

# FAQ

## Question 1

### question.zh

这个 Skill 适合哪些用户？

### question.en

Who is this Skill for?

### answer.zh

填写中文回答。

### answer.en

Provide the English answer.
````

### 构建校验

每次保存和生产构建都执行相同的模式校验：

- 必填字段完整。
- 文件名、`slug` 和公开路径一致。
- `slug` 在仓库中唯一。
- `schemaVersion` 是受支持的版本。
- `status` 只能是 `draft` 或 `published`。
- 分类只能使用现有八个分类之一。
- 图标只能从网站支持的图标集合选择。
- 日期采用 `YYYY-MM-DD`。
- URL 必须是有效的 HTTP(S) URL或空值。
- 版本号、列表和中英文段落格式正确。
- `featuredRank` 是非负整数。
- Markdown 标题结构完整且顺序明确。

任意已发布文件校验失败时，生产构建失败，Cloudflare 继续保留上一版成功部署。

## 精选 Skill

精选由两个字段控制：

- `featured` 决定是否进入精选集合。
- `featuredRank` 决定展示顺序，数值较小者优先。

管理器提供精选开关和拖动排序。拖动完成后重新计算排名并写回 Markdown。首页不会根据下载量、星标或算法替换管理员选择。

## 本地管理器

### 运行边界

- 通过根目录的 `启动Skill管理器.command` 启动。
- 本地服务只监听 `127.0.0.1`。
- 页面仅在本机浏览器打开。
- 管理器不随生产网站部署。
- 不建立登录、云端会话或远程文件写入接口。

### 页面结构

- 左栏：Skill 列表、搜索、分类和发布状态筛选。
- 中栏：全部字段的完整长表单。
- 右栏：网站卡片与详情内容实时预览。
- 顶部操作：新建、复制、导入 Markdown、导出。
- 底部操作：“仅保存”和“保存并发布”。

### 导入

- 支持选择一个或多个 `.md` 文件。
- 导入先解析和校验，再显示将新增、更新或冲突的条目。
- 同 slug 文件不会静默覆盖，管理员必须明确选择覆盖或取消。
- 无效文件列出字段名称、Markdown 区域和错误原因。
- 导入成功后仍需点击保存，避免选择文件即修改仓库。

### 导出

- 单个 Skill 导出为标准 Markdown。
- 全部导出为包含 `content/skills` 和模板的压缩包。
- 导出文件可以重新导入同版本管理器。

### 仅保存

1. 校验表单和生成的 Markdown。
2. 显示本次修改摘要。
3. 写入同目录临时文件。
4. 原子替换目标 Markdown。
5. 不执行 Git 命令。
6. 本地网站预览刷新。

### 保存并发布

1. 执行“仅保存”的全部步骤。
2. 检查 Git 仓库、当前分支和远程地址。
3. 检查远程 `main` 是否领先；如果领先则停止，不强制覆盖。
4. 只暂存本次改变的 `content/skills/*.md`，不执行 `git add .`。
5. 使用内容操作生成提交信息，例如 `content: update GitHub workflow helper`。
6. 提交并 push 到 GitHub `main`。
7. 显示 GitHub 已接收，Cloudflare 正在发布。

## Git 安全策略

- 管理器绝不提交 `src`、配置文件或其他代码修改。
- 工作区存在非内容改动时仍可保存，但发布前明确提示。
- 内容文件存在未解决冲突时禁止发布。
- 远程领先时禁止强制 push，提供“关闭管理器后先同步仓库”的说明。
- push 失败不回滚已经安全写入的 Markdown。
- 不执行 `reset --hard`、强制 push 或自动删除分支。
- 每次发布形成独立 Git 提交，方便从 GitHub 回退。

## 网站数据流

```text
content/skills/*.md
→ Markdown 解析器
→ Skill 类型与校验层
→ 公开 Skill 集合
→ 首页、Skill 库、详情页、筛选器和站点地图
→ Next.js 静态导出
→ Cloudflare Pages
```

- 所有消费者使用同一个解析入口。
- 解析结果保持现有 `Skill` 类型所需的字段形状。
- 搜索、筛选、排序和关联 Skill 逻辑继续使用统一集合。
- `draft` 在公开集合创建前被排除。
- 详情页仍通过 `generateStaticParams` 为已发布 Skill 生成静态路径。
- Sitemap 只包含已发布内容。

## 搜索调整

- 删除固定热门搜索数组和热门搜索按钮区域。
- 不采集、发送或保存搜索事件。
- 空搜索框聚焦时不显示热门词。
- 用户输入后继续展示现有匹配建议。
- 提交关键词后继续进入可分享的 `/skills?q=...` 结果页。

## Cloudflare Pages

项目调整为静态导出：

```text
生产分支：main
构建命令：npm run build
输出目录：out
```

GitHub 是唯一部署来源。Cloudflare Pages 只负责获取代码、构建和托管，不保存或修改 Skill 内容。非生产分支可以继续用于预览部署。

## 迁移

1. 为 Markdown 结构建立解析器、类型转换和校验器。
2. 将当前 `src/data/skills.ts` 中的 8 个 Skill 转换为 8 份 Markdown。
3. 对每个字段进行迁移前后深度比较。
4. 将网站消费者切换到 Markdown 生成的统一集合。
5. 验证首页、库、详情页、筛选、结构化数据和站点地图。
6. 删除旧的手工 Skill 内容数组，避免双数据源。
7. 添加正式模板和本地管理器。
8. 配置并验证 Cloudflare 静态输出。

## 错误处理

- Markdown 无法解析：显示文件名和具体语法位置。
- 字段无效：显示字段、收到的值和允许的格式。
- slug 冲突：禁止保存或构建。
- 修改已发布 slug：要求额外确认并说明旧链接失效风险。
- 文件写入失败：保留原文件，不留下半成品。
- Git 不可用：允许仅保存，禁用发布并给出安装或配置说明。
- GitHub 无法连接：保留本地内容，可稍后重试。
- Cloudflare 构建失败：上一版生产站点继续可用，通过部署日志定位错误。

## 测试与验收

### 数据层

- 模板可完整解析。
- 全部字段能在 Markdown 与 `Skill` 类型之间往返。
- 8 个现有 Skill 无损迁移。
- 缺失字段、错误标题、重复 slug 和未知分类被拒绝。
- `draft` 不进入公开集合。
- 精选开关与排序稳定。

### 管理器

- 新建、编辑、复制和删除流程。
- 单个与批量导入。
- 冲突预览和明确覆盖。
- 单个导出和全量压缩包导出。
- 原子写入失败不损坏原文件。
- 仅保存不执行 Git。
- 发布只暂存目标内容文件。
- 远程领先、冲突和 push 失败会安全停止。

### 网站

- 首页不再出现热门搜索区域。
- 输入后的搜索建议与结果页继续工作。
- 首页精选严格按照管理员排名。
- Skill 库、详情页和关联推荐内容一致。
- 草稿路径返回未找到。
- 站点地图和结构化数据正确。
- 桌面与移动端视觉回归通过。
- `npm test`、lint、类型检查、静态构建和 E2E 测试通过。

## 完成标准

- 管理员无需编辑代码即可维护全部 Skill 字段。
- 管理员可直接导入符合模板的 Markdown。
- 每个 Skill 在仓库中只有一份正式 Markdown 数据。
- 管理器可以安全地仅保存或保存并发布。
- Git 历史可以审查和回退每次内容修改。
- GitHub push 能触发 Cloudflare Pages 自动部署。
- 网站不包含热门搜索或搜索统计功能。
- 正式网站不暴露任何管理接口。
