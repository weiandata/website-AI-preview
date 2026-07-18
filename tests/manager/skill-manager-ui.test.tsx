import { readFile } from "node:fs/promises";
import path from "node:path";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { parseSkillMarkdown } from "@/lib/skills/markdown";
import type { SkillDocument } from "@/lib/skills/schema";
import { App } from "../../tools/skill-manager/src/App";
import * as api from "../../tools/skill-manager/src/api";

vi.mock("../../tools/skill-manager/src/api", () => ({
  listSkills: vi.fn(),
  validateMarkdown: vi.fn(),
  serializeSkill: vi.fn(),
  saveSkill: vi.fn(),
  deleteSkill: vi.fn(),
  getTemplate: vi.fn(),
  previewPublish: vi.fn(),
  publishSkills: vi.fn(),
  retryPublishPush: vi.fn(),
}));

let document: SkillDocument;
let secondDocument: SkillDocument;
let thirdDocument: SkillDocument;

/** The repository list only; keeps featured-order controls out of these lookups. */
function skillList() {
  return within(screen.getByRole("group", { name: "Skill 列表" }));
}

async function findSkillEntry(name: RegExp) {
  return await skillList().findByRole("button", { name });
}

function skillEntry(name: RegExp) {
  return skillList().getByRole("button", { name });
}

function querySkillEntry(name: RegExp) {
  return skillList().queryByRole("button", { name });
}

describe("local Skill manager UI", () => {
  beforeAll(async () => {
    const source = await readFile(
      path.join(process.cwd(), "content/skill-template.md"),
      "utf8",
    );
    document = parseSkillMarkdown(source, "example-skill.md");
    secondDocument = {
      ...structuredClone(document),
      id: "pdf-toolkit",
      slug: "pdf-toolkit",
      name: "PDF Toolkit",
      nameZh: "PDF 工具箱",
      category: "files-pdf",
      featured: true,
      featuredRank: 1,
    };
    thirdDocument = {
      ...structuredClone(document),
      id: "focus-planner",
      slug: "focus-planner",
      name: "Focus Planner",
      nameZh: "专注规划助手",
      category: "productivity",
      featured: true,
      featuredRank: 2,
    };
  });

  beforeEach(() => {
    vi.clearAllMocks();
    // The store reports absolute paths; the manager must show repository-relative ones.
    vi.mocked(api.listSkills).mockResolvedValue([
      { document, source: "example", path: "/repo/content/skills/example-skill.md" },
      {
        document: secondDocument,
        source: "pdf",
        path: "/repo/content/skills/pdf-toolkit.md",
      },
      {
        document: thirdDocument,
        source: "focus",
        path: "/repo/content/skills/focus-planner.md",
      },
    ]);
    vi.mocked(api.saveSkill).mockImplementation(async (saved) => ({
      document: saved,
      source: "saved",
      path: `content/skills/${saved.slug}.md`,
    }));
    vi.mocked(api.deleteSkill).mockResolvedValue(undefined);
    vi.mocked(api.getTemplate).mockResolvedValue("template");
    vi.mocked(api.validateMarkdown).mockImplementation(async (_source, fileName) => {
      if (fileName === "example-skill.md") return document;
      return {
        ...structuredClone(secondDocument),
        id: fileName.replace(/\.md$/, ""),
        slug: fileName.replace(/\.md$/, ""),
      };
    });
    vi.mocked(api.serializeSkill).mockResolvedValue("markdown");
    vi.mocked(api.previewPublish).mockResolvedValue({
      paths: ["content/skills/example-skill.md"],
      inspection: {
        branch: "main",
        remoteUrl: "git@github.com:weian/website.git",
        remoteAhead: 0,
        dirtyCodePaths: [],
        conflictedPaths: [],
      },
    });
    vi.mocked(api.publishSkills).mockResolvedValue({
      commit: "abc1234",
      pushed: true,
      message: "content: update example-skill",
    });
  });

  it("shows every metadata and body field in one form", async () => {
    render(<App />);
    await userEvent.click(
      await findSkillEntry(/示例 Skill/),
    );

    for (const label of [
      "状态",
      "Slug",
      "英文名称",
      "中文名称",
      "分类",
      "标签",
      "平台",
      "作者",
      "版本",
      "许可证",
      "加入日期",
      "更新日期",
      "GitHub",
      "官方网站",
      "下载地址",
      "精选",
      "精选顺序",
      "已核验",
      "图标",
      "Stars",
      "Downloads",
      "简短描述",
      "详细介绍",
      "核心功能",
      "适用场景",
      "安装方式",
      "使用说明",
      "示例工作流",
      "更新记录",
      "常见问题",
    ]) {
      expect(screen.getAllByText(label).length).toBeGreaterThan(0);
    }
  });

  it("filters the repository and reorders featured Skills", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.type(await screen.findByRole("searchbox", { name: "搜索 Skill" }), "PDF");
    expect(skillEntry(/PDF 工具箱/)).toBeInTheDocument();
    expect(querySkillEntry(/示例 Skill/)).not.toBeInTheDocument();

    await user.clear(screen.getByRole("searchbox", { name: "搜索 Skill" }));
    await user.click(skillEntry(/专注规划助手/));
    expect(screen.getByLabelText("精选顺序")).toHaveValue(2);

    await user.click(screen.getByRole("button", { name: "上移 专注规划助手" }));
    expect(screen.getByLabelText("精选顺序")).toHaveValue(1);
  });

  it("reorders featured Skills by pointer drag", async () => {
    render(<App />);
    const order = await screen.findByRole("list", { name: "精选排序" });
    expect(within(order).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
      expect.stringContaining("PDF 工具箱"),
      expect.stringContaining("专注规划助手"),
    ]);

    const items = within(order).getAllByRole("listitem");
    fireEvent.dragStart(items[1]);
    fireEvent.dragOver(items[0]);
    fireEvent.drop(items[0]);

    await waitFor(() => {
      expect(
        within(screen.getByRole("list", { name: "精选排序" }))
          .getAllByRole("listitem")
          .map((item) => item.textContent),
      ).toEqual([
        expect.stringContaining("专注规划助手"),
        expect.stringContaining("PDF 工具箱"),
      ]);
    });

    await userEvent.click(skillEntry(/PDF 工具箱/));
    expect(screen.getByLabelText("精选顺序")).toHaveValue(2);
  });

  it("shows featured state in the live preview", async () => {
    render(<App />);
    await userEvent.click(await findSkillEntry(/PDF 工具箱/));

    const preview = screen.getByRole("complementary", { name: "实时预览" });
    expect(within(preview).getByText("精选 · 第 1 位")).toBeInTheDocument();
  });

  it("summarizes new, updated, renamed, and deleted files before writing", async () => {
    const user = userEvent.setup();
    vi.spyOn(window, "confirm").mockReturnValue(true);
    render(<App />);

    await user.click(await findSkillEntry(/示例 Skill/));
    await user.type(screen.getByLabelText("英文名称"), "!");
    await user.click(screen.getByRole("button", { name: "复制" }));

    await user.click(skillEntry(/专注规划助手/));
    await user.clear(screen.getByLabelText("Slug"));
    await user.type(screen.getByLabelText("Slug"), "focus-planner-v2");

    await user.click(skillEntry(/PDF 工具箱/));
    await user.click(screen.getByRole("button", { name: "删除" }));

    await user.click(screen.getByRole("button", { name: "仅保存" }));

    const review = await screen.findByRole("dialog", { name: "确认保存修改" });
    expect(within(review).getByText("新增 1 个")).toBeInTheDocument();
    expect(within(review).getByText("content/skills/example-skill-copy.md")).toBeInTheDocument();
    expect(within(review).getByText("更新 1 个")).toBeInTheDocument();
    expect(within(review).getByText("content/skills/example-skill.md")).toBeInTheDocument();
    expect(within(review).getByText("改名 1 个")).toBeInTheDocument();
    expect(
      within(review).getByText(
        "content/skills/focus-planner.md → content/skills/focus-planner-v2.md",
      ),
    ).toBeInTheDocument();
    expect(within(review).getByText("删除 1 个")).toBeInTheDocument();
    expect(within(review).getByText("content/skills/pdf-toolkit.md")).toBeInTheDocument();
    expect(api.saveSkill).not.toHaveBeenCalled();
    expect(api.deleteSkill).not.toHaveBeenCalled();
  });

  it("saves an edit in place instead of creating a second file", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await findSkillEntry(/示例 Skill/));
    await user.type(screen.getByLabelText("英文名称"), "!");
    await user.click(screen.getByRole("button", { name: "仅保存" }));
    await user.click(
      within(await screen.findByRole("dialog", { name: "确认保存修改" })).getByRole(
        "button",
        { name: "确认保存" },
      ),
    );

    await waitFor(() => expect(api.saveSkill).toHaveBeenCalledTimes(1));
    // The store rejects a write as a duplicate unless it knows the slug on disk.
    expect(vi.mocked(api.saveSkill).mock.calls[0][1]).toBe("example-skill");
  });

  it("renames by telling the store which file to retire", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await findSkillEntry(/专注规划助手/));
    await user.clear(screen.getByLabelText("Slug"));
    await user.type(screen.getByLabelText("Slug"), "focus-planner-v2");
    await user.click(screen.getByRole("button", { name: "仅保存" }));

    const review = await screen.findByRole("dialog", { name: "确认保存修改" });
    await user.click(within(review).getByRole("checkbox"));
    await user.click(within(review).getByRole("button", { name: "确认保存" }));

    await waitFor(() => expect(api.saveSkill).toHaveBeenCalledTimes(1));
    const [saved, originalSlug] = vi.mocked(api.saveSkill).mock.calls[0];
    expect(saved.slug).toBe("focus-planner-v2");
    expect(originalSlug).toBe("focus-planner");
  });

  it("saves locally without touching Git when only saving", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await findSkillEntry(/示例 Skill/));
    await user.type(screen.getByLabelText("英文名称"), "!");
    await user.click(screen.getByRole("button", { name: "仅保存" }));
    await user.click(
      within(await screen.findByRole("dialog", { name: "确认保存修改" })).getByRole(
        "button",
        { name: "确认保存" },
      ),
    );

    await waitFor(() => expect(api.saveSkill).toHaveBeenCalled());
    expect(api.publishSkills).not.toHaveBeenCalled();
    expect(api.previewPublish).not.toHaveBeenCalled();
  });

  it("confirms the exact files and message before publishing", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(await findSkillEntry(/示例 Skill/));
    await user.type(screen.getByLabelText("英文名称"), "!");
    await user.click(screen.getByRole("button", { name: "保存并发布" }));
    await user.click(
      within(await screen.findByRole("dialog", { name: "确认保存修改" })).getByRole(
        "button",
        { name: "确认保存" },
      ),
    );

    const publish = await screen.findByRole("dialog", { name: "确认发布到 GitHub" });
    expect(within(publish).getByText("content/skills/example-skill.md")).toBeInTheDocument();
    expect(within(publish).getByLabelText("发布说明")).toHaveValue(
      "content: update example-skill",
    );
    expect(api.publishSkills).not.toHaveBeenCalled();

    await user.click(within(publish).getByRole("button", { name: "确认发布" }));

    await waitFor(() =>
      expect(screen.getByText("GitHub 已接收，Cloudflare 正在发布")).toBeInTheDocument(),
    );
  });

  it("warns about changes publishing will leave untouched", async () => {
    const user = userEvent.setup();
    vi.mocked(api.previewPublish).mockResolvedValue({
      paths: ["content/skills/example-skill.md"],
      inspection: {
        branch: "main",
        remoteUrl: "git@github.com:weian/website.git",
        remoteAhead: 0,
        dirtyCodePaths: ["src/app/page.tsx"],
        conflictedPaths: [],
      },
    });
    render(<App />);

    await user.click(await findSkillEntry(/示例 Skill/));
    await user.type(screen.getByLabelText("英文名称"), "!");
    await user.click(screen.getByRole("button", { name: "保存并发布" }));
    await user.click(
      within(await screen.findByRole("dialog", { name: "确认保存修改" })).getByRole(
        "button",
        { name: "确认保存" },
      ),
    );

    const publish = await screen.findByRole("dialog", { name: "确认发布到 GitHub" });
    expect(within(publish).getByText("src/app/page.tsx")).toBeInTheDocument();
    expect(within(publish).getByText(/不会被发布/)).toBeInTheDocument();
  });

  it("blocks publishing up front when the repository is not ready", async () => {
    const user = userEvent.setup();
    vi.mocked(api.previewPublish).mockResolvedValue({
      paths: ["content/skills/example-skill.md"],
      inspection: {
        branch: "codex/work-in-progress",
        remoteUrl: "git@github.com:weian/website.git",
        remoteAhead: 2,
        dirtyCodePaths: [],
        conflictedPaths: [],
      },
    });
    render(<App />);

    await user.click(await findSkillEntry(/示例 Skill/));
    await user.type(screen.getByLabelText("英文名称"), "!");
    await user.click(screen.getByRole("button", { name: "保存并发布" }));
    await user.click(
      within(await screen.findByRole("dialog", { name: "确认保存修改" })).getByRole(
        "button",
        { name: "确认保存" },
      ),
    );

    const publish = await screen.findByRole("dialog", { name: "确认发布到 GitHub" });
    expect(within(publish).getByText(/codex\/work-in-progress/)).toBeInTheDocument();
    expect(within(publish).getByText(/GitHub 上的 main 比本机新 2 个提交/)).toBeInTheDocument();
    expect(within(publish).getByRole("button", { name: "确认发布" })).toBeDisabled();
  });

  it("offers a retry and never claims success when push fails", async () => {
    const user = userEvent.setup();
    vi.mocked(api.publishSkills).mockResolvedValue({
      commit: "abc1234",
      pushed: false,
      message: "content: update example-skill",
      pushError: "Could not resolve host: github.com",
    });
    vi.mocked(api.retryPublishPush).mockResolvedValue({
      commit: "abc1234",
      pushed: true,
      message: "content: update example-skill",
    });
    render(<App />);

    await user.click(await findSkillEntry(/示例 Skill/));
    await user.type(screen.getByLabelText("英文名称"), "!");
    await user.click(screen.getByRole("button", { name: "保存并发布" }));
    await user.click(
      within(await screen.findByRole("dialog", { name: "确认保存修改" })).getByRole(
        "button",
        { name: "确认保存" },
      ),
    );
    await user.click(
      within(await screen.findByRole("dialog", { name: "确认发布到 GitHub" })).getByRole(
        "button",
        { name: "确认发布" },
      ),
    );

    await waitFor(() =>
      expect(screen.getByText("已保存，但 push 失败；可以重试发布")).toBeInTheDocument(),
    );
    expect(screen.queryByText("GitHub 已接收，Cloudflare 正在发布")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "重试发布" }));

    await waitFor(() =>
      expect(screen.getByText("GitHub 已接收，Cloudflare 正在发布")).toBeInTheDocument(),
    );
  });

  it("reports which files were saved when one write fails", async () => {
    const user = userEvent.setup();
    vi.mocked(api.saveSkill).mockImplementation(async (saved) => {
      if (saved.slug === "pdf-toolkit") throw new Error("磁盘写入失败");
      return {
        document: saved,
        source: "saved",
        path: `content/skills/${saved.slug}.md`,
      };
    });
    render(<App />);

    await user.click(await findSkillEntry(/示例 Skill/));
    await user.type(screen.getByLabelText("英文名称"), "!");
    await user.click(skillEntry(/PDF 工具箱/));
    await user.type(screen.getByLabelText("英文名称"), "!");

    await user.click(screen.getByRole("button", { name: "仅保存" }));
    await user.click(
      within(await screen.findByRole("dialog", { name: "确认保存修改" })).getByRole(
        "button",
        { name: "确认保存" },
      ),
    );

    const report = await screen.findByRole("dialog", { name: "保存结果" });
    expect(within(report).getByText("1 个已保存，1 个失败")).toBeInTheDocument();
    expect(within(report).getByText(/content\/skills\/example-skill\.md/)).toBeInTheDocument();
    expect(within(report).getByText(/磁盘写入失败/)).toBeInTheDocument();
  });

  it("reviews Markdown conflicts without writing files", async () => {
    const user = userEvent.setup();
    render(<App />);
    const file = new File(["markdown"], "example-skill.md", {
      type: "text/markdown",
    });

    await user.upload(await screen.findByLabelText("导入 Markdown"), file);

    expect(await screen.findByText("0 个新增，1 个冲突")).toBeInTheDocument();
    expect(api.saveSkill).not.toHaveBeenCalled();
  });

  it("queues a copied draft without saving it", async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(await findSkillEntry(/示例 Skill/));
    await user.click(screen.getByRole("button", { name: "复制" }));

    await waitFor(() => {
      expect(screen.getByLabelText("Slug")).toHaveValue("example-skill-copy");
      expect(screen.getByLabelText("状态")).toHaveValue("draft");
    });
    expect(api.saveSkill).not.toHaveBeenCalled();
  });
});
