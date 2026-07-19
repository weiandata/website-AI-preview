---
schemaVersion: 1
status: published
slug: word-format-skill
name: word-format-skill
nameZh: Word 排版复刻
category: files-pdf
tags:
  - Word
  - Typography
  - macOS
platforms:
  - Claude Code
author: yeap531
version: TODO
license: Apache-2.0
addedAt: 2026-07-19
updatedAt: 2026-04-27
githubUrl: https://github.com/yeap531/word-format-skill
officialUrl: ""
downloadUrl: https://github.com/yeap531/word-format-skill/archive/refs/heads/main.zip
featured: false
featuredRank: 0
verified: false
icon: document
stars: 217
downloads: 0
---

# Description

## zh

把一份参考 Word 文档的排版样式，视觉一致地复刻到新内容上，包括字体、字号、缩进、行距、页面设置、样式表和页眉页脚。仅支持 macOS。

## en

Replicates a reference Word document's formatting onto new content — fonts, sizes, indentation, line spacing, page setup, styles, and headers and footers. macOS only.

# Long Description

## zh

让 AI 写 Word 文档时，最麻烦的往往不是内容而是排版：把 AI 输出的 Markdown 或纯文本粘进 Word，字体、字号、缩进总会乱掉，要一处处调回来。这个技能没有让 AI 凭空生成 HTML 或 OOXML，而是让 Word 自己把参考文档导出成带内联样式的筛选后网页——所有样式都写在每个标签上——然后 AI 只在这份「原件」上改文字，样式标签原样不动。改完由浏览器渲染成富文本进剪贴板，再粘回 Word。这样排版来自真实的参考文档，而不是模型的猜测。代价是它依赖 macOS 上的 Word、浏览器和系统事件做界面自动化，因此只能在 macOS 上工作。

## en

When an AI writes a Word document, the pain is rarely the content — it is the formatting. Paste Markdown or plain text into Word and the fonts, sizes, and indentation all drift, leaving you to fix them one by one. This skill avoids having the AI invent HTML or OOXML. Instead it has Word itself export the reference document as filtered HTML with inline styles, so every tag carries its own formatting; the AI then edits only the text within that original, leaving the style attributes untouched. The result is rendered as rich text through a browser, into the clipboard, and back into Word. The formatting therefore comes from a real reference document rather than a model's guess. The trade-off is that it drives Word, a browser, and System Events through UI automation, so it runs on macOS only.

# Features

## zh

- 排版取自真实参考文档，而不是模型生成
- 覆盖字体、字号、缩进、行距、对齐等细节
- 同时复刻页面设置、样式表、主题与页眉页脚
- AI 只改文字，样式标签原样保留
- 流程透明，每一步都可查看中间产物

## en

- Formatting comes from a real reference document, not model output
- Covers fonts, sizes, indentation, line spacing, and alignment
- Also replicates page setup, styles, theme, and headers and footers
- The AI edits only text while style attributes stay untouched
- A transparent pipeline whose intermediate files you can inspect

# Use Cases

## zh

- 公司有固定格式的报告模板，内容每次不同
- 需要按学校或期刊要求的格式提交文档
- 手上有一份排版满意的旧文档，想套用到新内容
- 反复被 Word 排版问题消耗时间

## en

- A company report template with fixed formatting but changing content
- Submitting documents that must follow a school or journal's format
- Having an old document whose layout you like and wanting to reuse it
- Losing time repeatedly to Word formatting

# Installation

```bash
git clone https://github.com/yeap531/word-format-skill.git
```

# Usage

## zh

准备一份排版符合要求的参考 .docx，把它和新内容一起交给技能。它会驱动 Word 导出带内联样式的网页，让 AI 在其上替换文字，再渲染回 Word。整个过程需要本机装有 Microsoft Word，且只能在 macOS 上运行。

## en

Prepare a reference .docx whose formatting is what you want, and hand it over along with the new content. The skill drives Word to export inline-styled HTML, has the AI swap the text within it, and renders the result back into Word. It requires Microsoft Word installed locally and runs only on macOS.

# Workflow

## zh

1. 准备一份排版合格的参考 .docx
2. 确认本机为 macOS 且已安装 Microsoft Word
3. 让技能把参考文档导出为带内联样式的网页
4. 由 AI 在原件上替换成新内容
5. 渲染回 Word 并保存

## en

1. Prepare a reference .docx with the formatting you want
2. Confirm you are on macOS with Microsoft Word installed
3. Let the skill export the reference as inline-styled HTML
4. Have the AI replace the text within that original
5. Render back into Word and save

# Changelog

## TODO | 2026-04-27

### zh

仓库未发布带版本号的 Release，此处记录最近一次更新日期。请查看提交历史了解变更。

### en

The repository publishes no versioned releases; this records the most recent update date. See the commit history for changes.

# FAQ

## Question 1

### question.zh

Windows 或 Linux 能用吗？

### question.en

Does it work on Windows or Linux?

### answer.zh

不能。仓库明确说明它仅在 macOS 工作，因为实现依赖 Microsoft Word、浏览器和 System Events 的界面自动化。其他系统上没有对应机制。

### answer.en

No. The repository states it works on macOS only, because the implementation drives Microsoft Word, a browser, and System Events through UI automation. There is no equivalent path on other systems.

## Question 2

### question.zh

为什么不让 AI 直接生成 Word 文件？

### question.en

Why not just have the AI generate the Word file directly?

### answer.zh

因为模型凭空生成的 HTML 或 OOXML 很难准确还原排版，结果常常走样。这个技能让 Word 自己导出真实样式作为基准，AI 只替换文字，所以排版来自参考文档本身而不是模型的推测。

### answer.en

Because HTML or OOXML invented by a model rarely reproduces formatting faithfully, and the result usually drifts. This skill has Word export the real styling as the baseline and limits the AI to swapping text, so the layout comes from the reference document rather than a guess.
