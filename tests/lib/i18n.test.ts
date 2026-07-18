import { describe, expect, it } from "vitest";
import { localize, translate } from "@/lib/i18n";

describe("localization", () => {
  it("returns the requested localized field", () => {
    expect(localize({ zh: "数据分析", en: "Data Analytics" }, "en")).toBe(
      "Data Analytics",
    );
  });

  it("returns translated interface labels", () => {
    expect(translate("nav.skills", "zh")).toBe("Skill 库");
    expect(translate("nav.skills", "en")).toBe("Skills");
  });
});
