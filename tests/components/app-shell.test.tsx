import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import { LanguageProvider } from "@/components/language/language-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
  usePathname: () => "/",
}));

describe("application shell", () => {
  it("introduces the WEIAN DATA Skill library", () => {
    window.localStorage.setItem("weian-locale", "zh");
    render(
      <LanguageProvider>
        <Home />
      </LanguageProvider>,
    );

    expect(
      screen.getByRole("heading", { name: /发现真正好用的开源 AI Skills/i }),
    ).toBeInTheDocument();
  });

  it("renders the approved video hero and preserved discovery content", () => {
    window.localStorage.setItem("weian-locale", "zh");
    const { container } = render(
      <LanguageProvider>
        <Home />
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
    expect(screen.getByRole("link", { name: /浏览全部 Skills/i })).toHaveAttribute(
      "href",
      "/skills",
    );
    expect(screen.getByRole("combobox", { name: "搜索 Skill" })).toBeInTheDocument();
    expect(container.querySelectorAll(".category-card")).toHaveLength(8);
    expect(screen.queryByText(/一起完善开源 Skill 生态/)).not.toBeInTheDocument();
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
    expect(logos[1]).toHaveAttribute("src", "/brand/weian-logo-reversed.svg");
    expect(screen.queryByRole("link", { name: /提交|submit/i })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "搜索" })).toHaveAttribute(
      "href",
      "/#home-search",
    );
    expect(container.querySelector(".header-actions .github-button")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "分类" })).not.toBeInTheDocument();
    expect(container.querySelector("#home-search")).not.toBeInTheDocument();
  });

  it("marks the home search target and removes the values section", () => {
    window.localStorage.setItem("weian-locale", "zh");
    const { container } = render(
      <LanguageProvider>
        <Home />
      </LanguageProvider>,
    );

    expect(container.querySelector("#home-search")).toBeInTheDocument();
    expect(container.querySelector(".values-section")).not.toBeInTheDocument();
  });
});
