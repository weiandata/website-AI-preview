import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AboutContent } from "@/components/about/about-content";
import { LanguageProvider } from "@/components/language/language-provider";
import { SkillDetail } from "@/components/skills/skill-detail";
import { skills } from "@/data/skills";

vi.mock("next/navigation", () => ({ usePathname: () => "/about" }));

describe("editorial detail and about pages", () => {
  it("uses GitHub as the project page and aligns every on-page anchor", () => {
    window.localStorage.setItem("weian-locale", "zh");
    const { container } = render(
      <LanguageProvider>
        <SkillDetail skill={skills[0]} />
      </LanguageProvider>,
    );

    expect(screen.getByRole("link", { name: "查看 GitHub" })).toHaveAttribute(
      "href",
      skills[0].githubUrl,
    );
    expect(
      screen.queryByRole("link", { name: /访问项目主页|Visit project site/ }),
    ).not.toBeInTheDocument();
    for (const id of ["overview", "features", "installation", "usage"]) {
      expect(container.querySelector(`#${id}`)).toHaveClass("detail-anchor-section");
      expect(container.querySelector(`.detail-on-page-nav a[href="#${id}"]`))
        .toBeInTheDocument();
    }
  });

  it("keeps company guidance without inviting Skill submissions", () => {
    window.localStorage.setItem("weian-locale", "zh");
    const { container } = render(
      <LanguageProvider>
        <AboutContent />
      </LanguageProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "让优质开源资源更容易被使用" }),
    ).toBeInTheDocument();
    expect(container.querySelector(".about-editorial-hero")).toBeInTheDocument();
    expect(container.querySelector(".about-content-grid")).toBeInTheDocument();
    expect(container.querySelector(".about-compact-overview")).toBeInTheDocument();
    expect(container.querySelector(".about-compact-usage")).toBeInTheDocument();
    expect(container.querySelector(".about-compact-bottom")).toBeInTheDocument();
    expect(container.querySelectorAll(".about-principle-card")).toHaveLength(4);
    expect(container.querySelector(".about-legal-compact")).toBeInTheDocument();
    expect(container.querySelectorAll(".about-usage-step")).toHaveLength(3);
    expect(container.querySelector(".about-mark")).not.toBeInTheDocument();
    expect(screen.queryByText(/欢迎推荐项目/)).not.toBeInTheDocument();
    expect(screen.getByText(/报告失效链接/)).toBeInTheDocument();
  });
});
