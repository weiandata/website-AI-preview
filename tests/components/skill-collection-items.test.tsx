import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it } from "vitest";
import { LanguageProvider } from "@/components/language/language-provider";
import { SkillCard } from "@/components/skills/skill-card";
import { SkillListRow } from "@/components/skills/skill-list-row";
import { skills } from "@/data/skills";

function renderItem(item: ReactNode) {
  window.localStorage.setItem("weian-locale", "zh");
  return render(<LanguageProvider>{item}</LanguageProvider>);
}

describe("Skill collection items", () => {
  it.each([
    ["grid", <SkillCard key="grid" skill={skills[0]} />],
    ["list", <SkillListRow key="list" skill={skills[0]} />],
  ])("makes the complete %s item the only detail action", (_view, item) => {
    const { container } = renderItem(item);
    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(1);
    expect(links[0]).toHaveAttribute("href", `/skills/${skills[0].slug}`);
    expect(links[0]).toHaveClass("skill-item-link");
    expect(screen.queryByText("查看详情")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /下载/ })).not.toBeInTheDocument();
    expect(container.querySelector("article > .skill-item-link")).toBeInTheDocument();
  });
});
