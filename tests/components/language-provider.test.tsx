import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import {
  LanguageProvider,
  useLanguage,
} from "@/components/language/language-provider";

function LanguageConsumer() {
  const { locale, setLocale, t } = useLanguage();
  return (
    <div>
      <p>{locale}</p>
      <p>{t("nav.skills")}</p>
      <button type="button" onClick={() => setLocale(locale === "zh" ? "en" : "zh")}>
        Switch
      </button>
    </div>
  );
}

describe("LanguageProvider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "zh-CN";
    window.history.replaceState({}, "", "/skills?q=PDF");
    Object.defineProperty(window.navigator, "languages", {
      configurable: true,
      value: ["zh-CN", "en"],
    });
  });

  it("uses Chinese by default", () => {
    render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>,
    );

    expect(screen.getByText("zh")).toBeInTheDocument();
    expect(screen.getByText("Skill 库")).toBeInTheDocument();
  });

  it("restores a stored English preference", async () => {
    window.localStorage.setItem("weian-locale", "en");
    render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>,
    );

    await waitFor(() => expect(screen.getByText("en")).toBeInTheDocument());
    expect(document.documentElement.lang).toBe("en");
  });

  it("persists changes without changing the current route", async () => {
    const user = userEvent.setup();
    render(
      <LanguageProvider>
        <LanguageConsumer />
      </LanguageProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Switch" }));

    expect(window.localStorage.getItem("weian-locale")).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    expect(window.location.pathname + window.location.search).toBe("/skills?q=PDF");
  });
});
