import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AboutContent } from "@/components/about/about-content";
import { LanguageProvider } from "@/components/language/language-provider";

vi.mock("next/navigation", () => ({ usePathname: () => "/about" }));

describe("editorial detail and about pages", () => {
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
    expect(screen.queryByText(/欢迎推荐项目/)).not.toBeInTheDocument();
    expect(screen.getByText(/报告失效链接/)).toBeInTheDocument();
  });
});
