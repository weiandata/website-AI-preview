import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import { LanguageProvider } from "@/components/language/language-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { getPublishedSkills } from "@/lib/skills/repository";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/",
}));

describe("application shell", () => {
  it("introduces the WEIAN DATA Skill library", async () => {
    window.localStorage.setItem("weian-locale", "zh");
    render(
      <LanguageProvider>
        {await Home()}
      </LanguageProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /给你的 AI装上专业技能/i }),
    ).toBeInTheDocument();
  });

  it("renders the approved video hero and preserved discovery content", async () => {
    window.localStorage.setItem("weian-locale", "zh");
    const { container } = render(
      <LanguageProvider>
        {await Home()}
      </LanguageProvider>,
    );

    const video = container.querySelector("video");
    expect(video).toHaveAttribute("autoplay");
    expect(video).toHaveProperty("muted", true);
    expect(video).toHaveAttribute("loop");
    expect(video).toHaveAttribute("playsinline");
    expect(video?.querySelector("source")).toHaveAttribute(
      "src",
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4",
    );
    expect(screen.getByRole("link", { name: /看看能装哪些技能/i })).toHaveAttribute(
      "href",
      "/skills",
    );
    expect(screen.getByRole("combobox", { name: "搜索 Skill" })).toBeInTheDocument();
    expect(container.querySelectorAll(".category-card")).toHaveLength(8);
    // How many Skills are featured is an editorial decision that changes; the
    // contract is that each one renders as a toned card.
    const featuredCount = (await getPublishedSkills()).filter(
      (skill) => skill.featured,
    ).length;
    expect(container.querySelectorAll(".featured-skill[data-tone]")).toHaveLength(
      featuredCount,
    );
    expect(container.querySelectorAll(".category-card-footer")).toHaveLength(8);
    expect(screen.getByRole("link", { name: /查看全部更新/ })).toHaveAttribute(
      "href",
      "/skills?period=30d&sort=added",
    );
    fireEvent.focus(screen.getByRole("combobox", { name: "搜索 Skill" }));
    expect(container.querySelector(".popular-searches")).not.toBeInTheDocument();
    expect(container.querySelector(".popular-search-term")).not.toBeInTheDocument();
    expect(container.querySelector(".hero-search kbd")).not.toBeInTheDocument();
    expect(container.querySelector(".hero-search > button")).not.toBeInTheDocument();
    expect(screen.queryByText(/一起完善开源 Skill 生态/)).not.toBeInTheDocument();
  });

  it("closes the loop with install guidance for first-time visitors", async () => {
    window.localStorage.setItem("weian-locale", "zh");
    const { container } = render(
      <LanguageProvider>
        {await Home()}
      </LanguageProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /下载之后，怎么让 AI 用起来/ }),
    ).toBeInTheDocument();
    // Three install steps and the tips that follow them.
    expect(container.querySelectorAll(".start-step")).toHaveLength(3);
    expect(container.querySelectorAll(".start-tips li")).toHaveLength(4);
    // The guidance must stay the last thing on the page, after the listings.
    const sections = [...container.querySelectorAll(".recent-section, .getting-started")];
    expect(sections.at(-1)).toHaveClass("getting-started");
  });

  it("uses official brand lockups and excludes submission navigation", () => {
    window.localStorage.setItem("weian-locale", "zh");
    const { container } = render(
      <LanguageProvider>
        <SiteHeader />
        <SiteFooter />
      </LanguageProvider>,
    );

    const logos = screen.getAllByRole("img", { name: "WEIAN DATA TECH" });
    expect(logos[0]).toHaveAttribute("src", "/brand/weian-logo-reversed.svg");
    expect(logos[1]).toHaveAttribute("src", "/brand/weian-logo-primary.svg");
    expect(screen.queryByRole("link", { name: /提交|submit/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "搜索" })).toHaveAttribute(
      "href",
      "/#home-search",
    );
    expect(container.querySelector(".header-actions .github-button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "GitHub" })).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "分类" })).not.toBeInTheDocument();
    expect(container.querySelector(".nav-skills-group > a")).toHaveAttribute("href", "/skills");
    expect(
      container.querySelector('.nav-dropdown summary[aria-label="显示 Skill 分类"]'),
    ).toBeInTheDocument();
    expect(container.querySelector("#home-search")).not.toBeInTheDocument();
  });

  it("marks the home search target and removes the values section", async () => {
    window.localStorage.setItem("weian-locale", "zh");
    const { container } = render(
      <LanguageProvider>
        {await Home()}
      </LanguageProvider>,
    );

    expect(container.querySelector("#home-search")).toBeInTheDocument();
    expect(container.querySelector(".values-section")).not.toBeInTheDocument();
  });
});
