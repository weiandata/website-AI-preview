# Agent 填写说明书：从 GitHub 主页整理一个 Skill

这份文档写给 AI agent。任务是：给定一个 Skill 的 GitHub 仓库地址，产出一个可以直接导入 Skill 管理器的 Markdown 文件。

模板在 [skill-import-template.md](skill-import-template.md)。复制它，按下面的规则逐字段替换。

---

## 1. 三条铁律

**不知道就不要填。** 仓库里没写的信息，不要从相似项目推测，不要从项目名猜测。填不出来的字段留 `TODO`，并在交付时单独列出来告诉管理员。一个标着 TODO 的字段可以几秒钟补上；一个编造的字段会一直挂在网站上。

**`featured`、`featuredRank`、`verified` 永远填 `false` / `0` / `false`。** 这三项是管理员的编辑决定，不是仓库的属性，agent 不得代为判断。

**`status` 永远填 `draft`。** 草稿不会出现在网站任何位置。管理员审核后自己改成 `published`。

---

## 2. 信息去哪里找

| 位置 | 能拿到什么 |
| --- | --- |
| 仓库右上 About 栏 | 一句话简介、官网地址、Topics、许可证、Stars |
| README | 名称、功能、安装、用法、支持的平台 |
| Releases / Tags | 版本号、发布日期、下载包地址 |
| LICENSE 文件 | 准确的许可证类型 |
| `package.json` 等清单文件 | 版本号、作者 |
| 最近一次提交的日期 | `updatedAt` 的依据 |

README 是主要来源。About 栏和 Releases 比 README 正文更可靠，因为它们是结构化字段，不容易过时。

---

## 3. 字段填写规则

| 字段 | 怎么填 | 常见错误 |
| --- | --- | --- |
| `schemaVersion` | 固定 `1` | — |
| `status` | 固定 `draft` | 直接填 `published` |
| `slug` | 仓库名转小写，非字母数字改成连字符。只允许 `a-z`、`0-9`、`-`，不能以连字符开头结尾 | 保留大写或下划线 |
| `name` | README 标题或 About 里的正式英文名 | 填成 `owner/repo` 这种仓库路径 |
| `nameZh` | 项目有官方中文名就用官方的；没有就意译。**不能留空** | 音译（把 Focus Planner 写成「福克斯普兰纳」）；直接照抄英文名 |
| `category` | 从第 4 节的八个值里选一个 | 自造分类名 |
| `tags` | 2–6 个，来自 Topics 和 README，用展示写法（`Data Analysis` 而不是 `data-analysis`） | 写成一整句话；堆二十个 |
| `platforms` | **只填 README 明确说支持的**，例如 `Claude`、`ChatGPT`、`Codex`、`Cursor` | 看到是 AI 工具就默认写上 ChatGPT 和 Claude |
| `author` | 仓库所有者的显示名，或 README 里声明的作者/组织 | 填 GitHub 用户 ID 而非显示名（两者不同时以 README 声明为准） |
| `version` | 最新 Release 的 tag，去掉开头的 `v`。没有 Release 就用清单文件里的版本 | 保留 `v` 前缀 |
| `license` | 用 About 栏显示的名称，如 `MIT`、`Apache-2.0`。仓库没有许可证时填 `Unlicensed` 并在交付说明里指出 | 看到有 LICENSE 文件就默认写 MIT |
| `addedAt` | 你整理这份资料的当天日期，严格 `YYYY-MM-DD`，月日补零 | 填成项目的创建日期；用 `/` 分隔；月日只写一位 |
| `updatedAt` | 仓库最近一次实质更新的日期。判断不了就填当天 | 填成未来日期 |
| `githubUrl` | 仓库主页完整地址 | 填成某个子页面或 raw 文件地址 |
| `officialUrl` | 官网。没有就填 `""` | 没有官网时填仓库地址凑数 |
| `downloadUrl` | Release 的下载包地址，或 `https://github.com/<owner>/<repo>/archive/refs/heads/main.zip`。没有就填 `""` | 填一个拼出来但打不开的地址 |
| `featured` | 固定 `false`，**不能写 `no`**（YAML 里那是字符串） | 写成 `no` 或 `"false"` |
| `featuredRank` | 固定 `0` | — |
| `verified` | 固定 `false`，同上 | 写成 `no` 或 `"false"` |
| `icon` | 从第 4 节的八个值里选一个，通常与 `category` 呼应 | 自造图标名 |
| `stars` | 仓库当前 star 数，**整数**。`1.2k` 要写成 `1200` | 直接写 `1.2k` |
| `downloads` | 只有在项目公布了真实下载量时才填，否则 `0` | 拿 star 数冒充下载量 |

### 关于链接

管理员发布时，管理器会逐条打开 `githubUrl`、`officialUrl`、`downloadUrl` 和正文里的链接。**打不开的链接会直接拦住发布。**

所以：每个填进去的地址都要真的访问一次确认能打开。拿不准的地址，宁可留空（`""`）也不要写一个猜的。

---

## 4. 两个枚举字段的可选值

`category` 只能是这八个之一：

| 值 | 适用 |
| --- | --- |
| `development` | 写代码、审代码、调试、工程工作流 |
| `data-analytics` | 数据处理、统计、可视化 |
| `research-writing` | 研究、文献、学术与长文写作 |
| `content-creation` | 营销文案、社交媒体、创意内容 |
| `automation` | 任务编排、集成、批处理 |
| `image-design` | 图像生成与编辑、视觉设计 |
| `files-pdf` | 文档与文件处理、PDF 抽取 |
| `productivity` | 计划、笔记、个人效率 |

`icon` 只能是这八个之一：`analysis`、`automation`、`code`、`document`、`image`、`productivity`、`research`、`writing`。

一个 Skill 可能同时沾边多个分类，选**它主要解决的那一类**，剩下的用 `tags` 体现。

---

## 5. 正文结构是严格的

正文的标题**必须逐字一致**，多一个、少一个、写错大小写都会导致导入失败。九个一级标题缺一不可：

```text
# Description        中英文各一段文字
# Long Description   中英文各一段文字
# Features           中英文各一个无序列表
# Use Cases          中英文各一个无序列表
# Installation       只能放 bash 代码块，不能有任何文字
# Usage              中英文各一段文字
# Workflow           中英文各一个有序列表
# Changelog          至少一条版本记录
# FAQ                至少一个问答
```

顺序本身不影响导入，但请照这个顺序写：管理器保存时会统一重排成这个顺序，保持一致能让日后的比对更干净。

文字段和列表段的写法：一级标题下面**只能**有 `## zh` 和 `## en` 两个二级标题，两者都不能为空。

Changelog 每条记录的标题格式是 `## 版本号 | YYYY-MM-DD`，下面用 `### zh` 和 `### en`：

```markdown
# Changelog

## 1.2.0 | 2026-07-19

### zh

新增批量处理。

### en

Added batch processing.
```

FAQ 每个问答的标题随意（模板用 `## Question 1`），但下面**必须**是这四个三级标题，一个都不能少：

```markdown
# FAQ

## Question 1

### question.zh

中文问题？

### question.en

English question?

### answer.zh

中文回答。

### answer.en

English answer.
```

Installation 里只能是 bash 代码块，每条命令一个块，**不能夹带说明文字**——说明文字放到 Usage 里：

````markdown
# Installation

```bash
npx some-skill
```
````

---

## 6. 中英文两种语言都要写

每个双语段落里，中文和英文要说**同一件事**，不是各写各的。

- 不要把英文原文直接粘过来当中文
- 不要在中文里保留没必要的英文术语，除非那是通用叫法（如 CLI、API）
- 命令、代码、参数名不翻译

**不要大段照抄 README。** 用自己的话概括。安装命令是例外——那是事实，必须原样复制，不能改写。

---

## 7. 文件名

文件名必须是 `<slug>.md`，和 frontmatter 里的 `slug` 完全一致。

`slug: pdf-document-toolkit` 就必须存成 `pdf-document-toolkit.md`。不一致会直接导入失败。

---

## 8. 交付前自检

- [ ] 文件名等于 `slug` 加 `.md`
- [ ] `status` 是 `draft`，`featured`/`verified` 是 `false`，`featuredRank` 是 `0`
- [ ] `category` 和 `icon` 都在允许的取值里
- [ ] `stars`、`downloads`、`featuredRank` 都是整数，没有 `k` 这种后缀
- [ ] 三个布尔字段写的是 `true` / `false`，不是 `yes` / `no`，也没有引号
- [ ] 两个日期都是 `YYYY-MM-DD`（月日补零、用连字符），且不是未来
- [ ] 每个填了的链接都实际打开确认过
- [ ] 九个一级标题齐全、拼写逐字一致
- [ ] 每个双语段落的 `zh` 和 `en` 都非空
- [ ] Installation 里只有 bash 代码块
- [ ] Changelog 标题是 `版本号 | YYYY-MM-DD`
- [ ] FAQ 每条都有四个 `question.*` / `answer.*`
- [ ] 所有拿不准的字段已列成清单交给管理员

排版细节（空行、缩进）不用操心——管理器保存时会自动修好。但标题结构不会自动修，那是你的责任。

这份清单走一遍，比让管理员导入一次再把报错发回来快得多。即使导入失败了也不要紧：管理器会一次列全所有问题（见第 9 节），一轮就能改完。

---

## 9. 导入失败时怎么办

**管理器会一次列出这个文件的全部问题**，不是只报第一个。每条都写明三件事：位置（第几行 / 哪个区块 / 哪个字段）、哪里不对、以及具体的修改方法。

所以正确的做法是：把列表从上到下一次改完，再导入一次。不要改一处试一次。

管理员可以点面板左下角的「复制报错详情」，把整份清单复制成纯文本发给你。拿到之后按条改完再交回去，一轮就能结束。

### 两个容易误判的现象

**标题拼错会同时产生两条报错。** 比如把 `# Use Cases` 写成 `# Use Case`，你会看到：

```text
区块「Use Case」：unknown top-level section "Use Case"
区块「Use Cases」：missing top-level section "Use Cases"
```

这是**同一个错误**的两面，改掉那一个标题两条就都消失了。不要当成两处去改。

**frontmatter 的报错文字是英文的**（来自 schema 校验），但后面跟的「修改方法」是中文的。以修改方法为准。

### 常见报错对照

| 报错 | 原因 |
| --- | --- |
| `slug "x" does not match filename "y"` | 文件名和 `slug` 不一致 |
| `Invalid ISO date` | 日期写成了 `2024/01/05` 之类，必须是 `2024-01-05` |
| `Invalid input: expected boolean, received string` | 布尔字段写成了 `yes` / `no` / `"true"`，见下方说明 |
| `missing top-level section "..."` | 少了某个一级标题 |
| `unknown top-level section "..."` | 多了一个不该有的一级标题，或标题拼错 |
| `localized section requires exactly zh and en` | 缺 `## zh` 或 `## en`，或多了别的二级标题 |
| `localized text cannot be empty` | 某个语言下面没有内容 |
| `expected an ordered zh list` | Workflow 用了 `-` 而不是 `1.` |
| `expected an unordered zh list` | Features 或 Use Cases 用了编号 |
| `Installation must contain only fenced code blocks` | Installation 里混了说明文字 |
| `Installation requires non-empty bash blocks` | 代码块没标 `bash`，或是空的 |
| `invalid changelog heading` | Changelog 标题不是 `版本号 \| YYYY-MM-DD` |
| `FAQ entry requires question.zh, ...` | FAQ 四个三级标题不齐 |
| `Invalid option: expected one of ...` | `category` 或 `icon` 填了不存在的值 |

### YAML 的两个坑

**布尔值只能写 `true` / `false`。** YAML 里的 `yes`、`no`、`on`、`off` 会被当成**字符串**，`featured: yes` 一定报错。同理不要加引号，`featured: "false"` 也是字符串。

**日期不要加引号，格式只能是 `YYYY-MM-DD`。** `2026/07/19`、`07-19-2026`、`2026-7-9` 都会被拒绝，月和日不足两位要补零。

---

## 10. 交给管理员之后

管理员会在 Skill 管理器里点「导入 Markdown」选中你产出的文件，检查内容，把 `status` 改成 `published`，再决定是否精选和核验，最后点「保存并发布」。

完整的管理员操作说明见 [skill-manager-guide.md](skill-manager-guide.md)。
