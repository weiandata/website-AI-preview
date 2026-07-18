import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { DownloadDialog } from "@/components/skills/download-dialog";
import { LanguageProvider } from "@/components/language/language-provider";
import { loadTestSkills } from "../helpers/load-test-skills";
import type { Skill } from "@/types/content";

let skills: Skill[];

function renderDialog(skill = skills[0]) {
  return render(
    <LanguageProvider>
      <DownloadDialog skill={skill} />
    </LanguageProvider>,
  );
}

describe("DownloadDialog", () => {
  beforeAll(async () => {
    skills = await loadTestSkills();
  });
  beforeEach(() => {
    window.localStorage.setItem("weian-locale", "zh");
  });

  it("requires confirmation before opening a third-party download", async () => {
    const user = userEvent.setup();
    const open = vi.spyOn(window, "open").mockImplementation(() => null);
    renderDialog();

    await user.click(screen.getByRole("button", { name: "下载" }));
    expect(open).not.toHaveBeenCalled();
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "继续下载" }));
    expect(open).toHaveBeenCalledWith(
      skills[0].downloadUrl,
      "_blank",
      "noopener,noreferrer",
    );
  });

  it("closes on Escape and restores focus to the trigger", async () => {
    const user = userEvent.setup();
    renderDialog();
    const trigger = screen.getByRole("button", { name: "下载" });

    await user.click(trigger);
    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("disables downloads without a destination", () => {
    renderDialog({ ...skills[0], downloadUrl: undefined });

    expect(screen.getByRole("button", { name: "下载" })).toBeDisabled();
  });
});
