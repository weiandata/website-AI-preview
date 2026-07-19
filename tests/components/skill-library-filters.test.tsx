import { render, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { LanguageProvider } from "@/components/language/language-provider";
import { SkillLibrary } from "@/components/skills/skill-library";
import { loadTestSkills } from "../helpers/load-test-skills";
import type { Skill } from "@/types/content";

const replace = vi.fn();
let search = "";

vi.mock("next/navigation", () => ({
  useRouter: () => ({ replace, push: vi.fn() }),
  usePathname: () => "/skills",
  useSearchParams: () => new URLSearchParams(search),
}));

let skills: Skill[];

function renderLibrary(query: string) {
  search = query;
  replace.mockClear();
  window.localStorage.setItem("weian-locale", "zh");
  return render(
    <LanguageProvider>
      <SkillLibrary skills={skills} />
    </LanguageProvider>,
  );
}

describe("Skill library filters", () => {
  beforeAll(async () => {
    skills = await loadTestSkills();
  });

  it("offers a way out of the featured filter arriving from the homepage", async () => {
    const user = userEvent.setup();
    // The homepage's "view all" link lands here, narrowing the library.
    const { container } = renderLibrary("featured=true");

    const chips = container.querySelector(".active-filters");
    expect(chips, "an active filter must be visible to be removable").not.toBeNull();
    const featuredChip = within(chips as HTMLElement).getByRole("button", {
      name: /精选/,
    });

    await user.click(featuredChip);

    // Removing it must drop `featured` from the query so the full library returns.
    const nextUrl = replace.mock.calls.at(-1)?.[0] as string;
    expect(nextUrl).not.toContain("featured");
  });

  it("keeps the clear-all control reachable when only featured is active", () => {
    const { container } = renderLibrary("featured=true");

    expect(
      within(container.querySelector(".active-filters") as HTMLElement).getByRole(
        "button",
        { name: /清除/ },
      ),
    ).toBeInTheDocument();
  });
});
