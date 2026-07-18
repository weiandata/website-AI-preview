import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Home from "@/app/page";
import { LanguageProvider } from "@/components/language/language-provider";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
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
});
