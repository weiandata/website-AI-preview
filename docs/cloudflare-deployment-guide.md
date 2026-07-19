# Cloudflare Pages 上线手册

这份手册带你把 WEIAN DATA Skills 网站首次部署到 Cloudflare Pages，并说明之后每次发布内容会发生什么。

## 发布链路

```text
你在 Mac 上用 Skill 管理器改内容
  → 提交并推送到 GitHub main
    → Cloudflare Pages 自动构建（npm run build）
      → 发布 out/ 目录里的静态文件
```

Cloudflare 只负责构建和分发静态文件。它不运行服务器、不连数据库、不保存你的内容，网站上也没有任何后台登录入口。

---

## 目录

1. [开始之前](#1-开始之前)
2. [最关键的一项设置](#2-最关键的一项设置)
3. [首次部署步骤](#3-首次部署步骤)
4. [环境变量](#4-环境变量)
5. [绑定自定义域名](#5-绑定自定义域名)
6. [上线后验收清单](#6-上线后验收清单)
7. [日常发布内容](#7-日常发布内容)
8. [出错了怎么办](#8-出错了怎么办)
9. [回滚](#9-回滚)
10. [必须知道的注意事项](#10-必须知道的注意事项)
11. [配置速查表](#11-配置速查表)

---

## 1. 开始之前

需要准备：

- 一个 Cloudflare 账号（免费版足够）
- GitHub 仓库 `weiandata/website-AI-preview` 的管理权限
- 域名（如果要用自己的域名；也可以先用 Cloudflare 送的 `*.pages.dev` 地址）

先在本机确认代码是好的。**不要跳过这一步**——本机构建失败，Cloudflare 上一定也失败：

```bash
npm install
npm run build
npm run test:static-output
```

预期看到：

```text
Verified 8 published Skill routes and 0 drafts.
```

本机完整构建大约 5 秒，产物 `out/` 约 2.8 MB、132 个文件。

---

## 2. 最关键的一项设置

> ### ⚠️ Build output directory 必须填 `out`
>
> 这是整个部署里唯一可能出安全问题的地方，请务必填对。

**原因**：这个仓库里除了网站，还有一个只在你本机运行的 Skill 管理器（`tools/skill-manager/`）。

- 填 `out` → Cloudflare 只发布 `out/` 里的 132 个静态文件。管理器代码**不在其中**，网站访客拿不到。
- 填空 / 填 `/` / 填 `.` → Cloudflare 会把**整个仓库根目录**当网站发布。届时任何人都能通过网址直接下载 `tools/skill-manager/` 下的全部源码。

**为什么管理器本来就进不了 `out/`**：它不是网站的页面，而是一个独立的本地 Node 程序，只在你执行 `npm run skill-manager` 时启动，并且写死只监听 `127.0.0.1:4174`（本机回环地址）——连你自己局域网内的其他设备都访问不到它。`npm run build` 根本不会碰它。

所以只要输出目录填 `out`，管理器就绝无可能上线。这一项填错则前功尽弃。

**自查方法**（任何时候都能做）：

```bash
npm run build
grep -rl "skill-manager\|GitPublisher\|api/publish\|4174" out/ || echo "干净：out/ 中无管理器痕迹"
```

---

## 3. 首次部署步骤

### 3.1 创建项目

1. 登录 Cloudflare Dashboard
2. 左侧选 **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
3. 授权 Cloudflare 访问 GitHub，选择仓库 `weiandata/website-AI-preview`
4. 点 **Begin setup**

### 3.2 填写构建配置

| 字段 | 填什么 | 说明 |
| --- | --- | --- |
| Project name | `weian-skills`（自定），只能小写字母、数字、连字符 | 决定默认网址 `weian-skills.pages.dev` |
| Production branch | `main` | **只能是 main**，管理器也只从 main 发布 |
| Framework preset | `Next.js (Static HTML Export)`，或直接选 `None` | 选 None 时下面两项手动填 |
| Build command | `npm run build` | |
| **Build output directory** | **`out`** | ⚠️ 见上一节，最关键 |
| Root directory | 留空（即仓库根目录） | |

### 3.3 添加环境变量（这一步不能省）

展开 **Environment variables (advanced)**，添加：

| 变量名 | 值 | 为什么必须加 |
| --- | --- | --- |
| `NODE_VERSION` | `20` | 本项目用 Next.js 16 + React 19，需要 Node 20 或更高。Cloudflare 默认版本可能过低导致构建失败 |
| `NEXT_PUBLIC_SITE_URL` | 你的正式域名，如 `https://skills.weiandata.com` | 决定 canonical 链接、sitemap、结构化数据里的网址 |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 如 `contact@weiandata.com` | 网站上所有联系方式入口 |

三项都填 **Production** 环境。详见[第 4 节](#4-环境变量)。

### 3.4 开始部署

点 **Save and Deploy**。首次构建约 1–3 分钟（要装依赖）。之后每次约 1–2 分钟。

构建日志里应该能看到：

```text
Route (app)
┌ ○ /
├ ○ /about
├ ○ /skills
└ ● /skills/[slug]
```

看到 **Success** 后，用 Cloudflare 给的 `*.pages.dev` 地址打开网站，先做[第 6 节的验收](#6-上线后验收清单)。

---

## 4. 环境变量

### 为什么必须设置 `NEXT_PUBLIC_SITE_URL`

代码里有一个默认值 `https://skills.weiandata.com`。**如果不设置这个变量，构建不会报错，但所有 SEO 链接都会指向这个默认域名。**

也就是说，假如你的网站实际部署在 `weian-skills.pages.dev`，而没设这个变量，那么：

- 每个页面的 canonical 标签指向 `skills.weiandata.com`
- `sitemap.xml` 里 8 个 Skill 页面的网址全指向 `skills.weiandata.com`
- `robots.txt` 里的 Sitemap 行也指向 `skills.weiandata.com`

搜索引擎会照着这些链接去抓一个可能还不存在的域名。网站看起来完全正常，问题只在搜索引擎那边——**这类错误最难自己发现**。

### 格式要求

代码会校验格式，写错会让**构建直接失败**（这是好事，比悄悄用错值强）：

- `NEXT_PUBLIC_SITE_URL` 必须是完整绝对网址，带 `https://`，**结尾不要加斜杠**
  - 正确：`https://skills.weiandata.com`
  - 错误：`skills.weiandata.com`、`https://skills.weiandata.com/`
- `NEXT_PUBLIC_CONTACT_EMAIL` 必须是合法邮箱格式

### 改了环境变量之后

Cloudflare **不会**自动重新构建。必须手动触发：Deployments → 最新一条 → **Retry deployment**。

---

## 5. 绑定自定义域名

1. Pages 项目 → **Custom domains** → **Set up a domain**
2. 输入域名，如 `skills.weiandata.com`
3. 域名在 Cloudflare 托管时会自动加好 DNS 记录；否则按提示去域名商处加 CNAME
4. 等待证书签发（通常几分钟，最长可能几小时）

**绑好域名后别忘了**：回到环境变量把 `NEXT_PUBLIC_SITE_URL` 改成正式域名，然后 **Retry deployment**。否则 sitemap 和 canonical 还停在旧地址。

---

## 6. 上线后验收清单

第一次部署完成后逐项确认：

### 功能

- [ ] 首页打开正常，精选区显示 6 个 Skill
- [ ] 精选顺序与你在管理器里设的一致（当前应为：数据分析助手、研究写作助手、GitHub 工作流助手、PDF 文档工具箱、工作流自动化工具包、专注规划助手）
- [ ] 搜索框输入 `PDF` 有匹配建议
- [ ] 点进任意 Skill 详情页正常
- [ ] 中 / EN 语言切换正常
- [ ] 手机上打开无横向滚动

### SEO 与配置

- [ ] 打开 `你的域名/sitemap.xml`，里面的网址是**你的正式域名**
- [ ] 打开 `你的域名/robots.txt`，Sitemap 行也是正式域名
- [ ] 页面源码里 canonical 标签指向正式域名

### 安全（重要）

- [ ] 访问 `你的域名/tools/skill-manager/server.ts` → 应该是 **404**
- [ ] 访问 `你的域名/package.json` → 应该是 **404**
- [ ] 访问 `你的域名/content/skills/pdf-document-toolkit.md` → 应该是 **404**

> 上面三项只要有任何一个能下载到内容，说明 **Build output directory 填错了**。立即改成 `out` 并重新部署。

---

## 7. 日常发布内容

配好之后，改内容不需要再碰 Cloudflare：

1. 确认本机仓库在 `main` 分支（管理器只从 main 发布，不在 main 会直接拒绝）
2. 双击 `启动Skill管理器.command`
3. 改完内容点 **保存并发布**
4. 管理器显示「GitHub 已接收，Cloudflare 正在发布」即为本地完成
5. 等 1–3 分钟，刷新网站确认
6. 收工时点右上角 **退出**，它会先确认没有漏发的内容，再停掉本机服务

管理器**不会**查询 Cloudflare 的构建进度，所以它只敢说「Cloudflare 正在发布」，绝不会说「已发布成功」。是否真的上线，以你打开网站看到的为准。

第一次实际发布时，建议先只改一处小地方（比如某个 Skill 的一句描述），把整条链路走通确认无误，再做批量修改。

---

## 8. 出错了怎么办

### 构建失败：内容格式错误

日志里出现类似：

```text
Error [SkillContentError]: pdf-document-toolkit.md: Invalid option:
expected one of "development"|"data-analytics"|...
  field: 'category'
```

**这是设计好的保护机制。** 内容不合规范时构建会失败，错误信息会精确指出**哪个文件、哪个字段**出错。

关键点：**构建失败时，线上网站保持原样不受影响**。Cloudflare 只在构建成功后才切换版本，坏内容不可能上线。

处理：在管理器里改正那个字段，重新发布即可。

### 构建失败：Node 版本过低

日志里出现 `requires Node.js version >= 20` 之类。

处理：确认环境变量 `NODE_VERSION` 设为 `20` 或更高，然后 Retry deployment。

### 构建失败：环境变量格式不对

日志里出现：

```text
NEXT_PUBLIC_SITE_URL must be a valid absolute URL
NEXT_PUBLIC_CONTACT_EMAIL must be a valid email address
```

处理：按[第 4 节格式要求](#格式要求)改正，Retry deployment。

### 管理器拒绝发布

发布窗口显示「现在还不能发布」时，按提示处理：

| 提示 | 处理 |
| --- | --- |
| 链接打不开（HTTP 404） | 窗口会指名是哪一条，回表单改掉再发 |
| 只能从 main 分支发布 | 把仓库切回 `main` |
| GitHub 上的 main 比本机新 N 个提交 | 先 `git pull` 同步再发布 |
| 仓库有未解决的冲突文件 | 先处理冲突 |

管理器宁可拒绝也不会强制覆盖别人的修改，这是刻意设计。

### GitHub 上的 Repository checks 红了

提交页面除了 Cloudflare 的部署状态，还有一项 **Repository checks**，校验仓库里所有 Markdown 的排版和链接。

**它和网站上线无关。** 只要 Cloudflare 那一项是绿的，网站就正常。管理器在保存和发布时已经跑过同样的两项检查，所以从管理器发布的内容正常不会让它变红。

### push 失败

显示「已保存，但 push 失败；可以重试发布」通常是网络问题。**你的修改已安全提交在本机，没有丢失**，网络恢复后点「重试发布」即可。

### 网站打开是旧内容

1. 确认 Cloudflare 上最新一次部署是 Success
2. 强制刷新浏览器（Mac 上 `Command + Shift + R`）
3. 如果用了 Cloudflare 缓存，去 Caching → **Purge Everything**

---

## 9. 回滚

### 方式一：Cloudflare 回滚（最快，约 10 秒）

Deployments → 找到之前正常的那次 → **⋯** → **Rollback to this deployment**

立即生效。但这只是把线上切回旧版本，**GitHub 上的内容还是新的**——下次任何一次推送都会把有问题的内容再带上线。适合应急止血。

### 方式二：改内容重新发布（推荐）

在管理器里把内容改回正确的样子，再发布一次。这才是真正的修复。

### 方式三：Git 回退（需要开发协助）

每次从管理器发布都是一个独立提交，且**只包含 `content/skills/*.md`**，不掺杂任何程序代码。所以按提交回退内容非常干净，不会影响网站功能。

---

## 10. 必须知道的注意事项

### 🔴 仓库是公开的

`weiandata/website-AI-preview` 目前是 **PUBLIC**。推送到 GitHub 的一切——包括完整提交历史——任何人都能查看。

已确认当前仓库中：没有 `.env`、密钥、令牌等敏感文件，历史中也从未出现过；管理器发布时用的是你 Mac 本机的 git 凭据，那些永远不进仓库。

但请长期保持这个习惯：

- 永远不要把密码、API Key、私钥写进任何文件
- 不要在文档里写本机绝对路径（会暴露用户名和目录结构）
- 需要私密配置就用 Cloudflare 环境变量，不要写进代码

如果希望源码不公开，可以在 GitHub 仓库 Settings 里改为 Private。Cloudflare Pages 对私有仓库同样支持，不影响部署。

### 🟡 预览部署也是公开网址

Cloudflare 默认会给**每个分支**的推送生成一个预览部署，网址形如 `abc123.weian-skills.pages.dev`，**无需密码即可访问**。

而本项目的 `robots.txt` 是 `Allow: /`，意味着这些预览地址理论上可能被搜索引擎收录，造成重复内容。

建议二选一：

- Settings → Builds & deployments → **Preview deployments** 设为 **None**（只构建 main），最省心
- 或保留预览，但心里清楚这些地址是公开可访问的

### 🟡 草稿 Skill 永远不会上线

状态设为 `草稿` 的 Skill 完全不会出现在网站上——不生成页面、不进搜索、不进 sitemap、不进结构化数据。构建日志里会显示：

```text
Verified 8 published Skill routes and 0 drafts.
```

这是安全的"暂存"方式：内容可以先写着，改到满意再切成"已发布"。

### 🟡 网址结尾带斜杠

项目配置了 `trailingSlash: true`，所有页面网址形如 `/skills/`、`/skills/pdf-document-toolkit/`。

对外分享链接时建议带上结尾斜杠，少一次跳转。

### 🟡 构建不跑测试

`npm run build` 只做构建，**不会跑单元测试**。内容格式错误会被构建拦下（因为构建时要解析 Markdown），但代码逻辑错误不会。

所以改代码时，请在本机先跑完整验证再推送：

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

纯改内容（只动 `content/skills/*.md`）时不必如此，管理器保存前已经校验过格式。

### 🟢 Cloudflare 不保存你的内容

Cloudflare 只是拿 GitHub 上的源码构建静态文件。它不编辑、不存储你的 Skill 内容，也没有任何后台管理界面。

**唯一的内容真实来源是 `content/skills/*.md`**，唯一的编辑入口是你 Mac 上的管理器。这也意味着：删掉 Cloudflare 项目不会丢失任何内容，重新连一次就能恢复。

---

## 11. 配置速查表

### Cloudflare Pages 构建配置

```text
Production branch:        main
Build command:            npm run build
Build output directory:   out          ← 最关键，填错会泄露管理器源码
Root directory:           （留空）
```

### 环境变量（Production）

```text
NODE_VERSION                20
NEXT_PUBLIC_SITE_URL        https://skills.weiandata.com     （不带结尾斜杠）
NEXT_PUBLIC_CONTACT_EMAIL   contact@weiandata.com
```

### 本机常用命令

```bash
npm run skill-manager      # 启动管理器 http://127.0.0.1:4174
npm run build              # 本机构建，产出 out/
npm run test:static-output # 校验生成的路由与草稿过滤
npm test                   # 全部单元测试
```

### 相关文档

- [Skill 管理器使用说明](skill-manager-guide.md) — 日常内容维护
- [README](../README.md) — 项目总览与开发说明
