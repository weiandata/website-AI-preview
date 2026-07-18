import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { LanguageProvider } from "@/components/language/language-provider";
import { SubmitSkillForm } from "@/components/submit/submit-skill-form";

function renderForm() {
  return render(
    <LanguageProvider>
      <SubmitSkillForm />
    </LanguageProvider>,
  );
}

describe("SubmitSkillForm", () => {
  beforeEach(() => {
    window.localStorage.setItem("weian-locale", "zh");
  });

  it("shows accessible inline errors for an empty submission", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.click(screen.getByRole("button", { name: "提交推荐" }));

    expect(screen.getByRole("alert")).toHaveTextContent("请检查表单中的必填项");
    expect(screen.getByText("请输入 Skill 名称")).toBeInTheDocument();
  });

  it("shows an honest client-only confirmation for valid data", async () => {
    const user = userEvent.setup();
    renderForm();

    await user.type(screen.getByLabelText("Skill 名称"), "Open Review Helper");
    await user.type(
      screen.getByLabelText("GitHub 或项目地址"),
      "https://example.com/open-review-helper",
    );
    await user.type(screen.getByLabelText("简短介绍"), "用于检查开源项目贡献。" );
    await user.selectOptions(screen.getByLabelText("分类"), "development");
    await user.click(screen.getByLabelText("GitHub"));
    await user.selectOptions(screen.getByLabelText("许可证"), "MIT");
    await user.type(screen.getByLabelText("提交人姓名"), "Lin Wei");
    await user.type(screen.getByLabelText("提交人邮箱"), "lin@example.com");
    await user.click(screen.getByRole("button", { name: "提交推荐" }));

    expect(
      await screen.findByRole("heading", { name: "推荐信息已准备完成" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/当前演示不会将数据发送到服务器/)).toBeInTheDocument();
  });
});
