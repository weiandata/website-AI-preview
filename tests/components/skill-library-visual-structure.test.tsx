import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { CategoriesPageContent } from "@/components/home/categories-page-content";
import { LanguageProvider } from "@/components/language/language-provider";

vi.mock("next/navigation", () => ({
  usePathname: () => "/categories",
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("editorial collection pages", () => {
  it("renders all category destinations in the editorial grid", () => {
    window.localStorage.setItem("weian-locale", "zh");
    const { container } = render(
      <LanguageProvider>
        <CategoriesPageContent />
      </LanguageProvider>,
    );

    expect(screen.getByRole("heading", { name: "Skill 分类" })).toBeInTheDocument();
    expect(container.querySelectorAll(".category-card")).toHaveLength(8);
    expect(container.querySelector(".page-hero-editorial")).toBeInTheDocument();
  });
});
