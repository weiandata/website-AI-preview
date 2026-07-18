import { describe, expect, it } from "vitest";
import {
  emptySubmission,
  validateSubmission,
  type SkillSubmission,
} from "@/lib/submit-validation";

const validSubmission: SkillSubmission = {
  skillName: "Open Review Helper",
  sourceUrl: "https://example.com/open-review-helper",
  introduction: "Helps maintainers review open-source contributions.",
  category: "development",
  platforms: ["GitHub"],
  license: "MIT",
  submitterName: "Lin Wei",
  email: "lin@example.com",
  notes: "",
};

describe("submit validation", () => {
  it("reports every missing required field", () => {
    const errors = validateSubmission(emptySubmission, "zh");

    expect(errors.skillName).toBe("请输入 Skill 名称");
    expect(errors.sourceUrl).toBe("请输入项目地址");
    expect(errors.platforms).toBe("请至少选择一个支持平台");
  });

  it("rejects insecure source URLs and invalid email addresses", () => {
    const errors = validateSubmission(
      { ...validSubmission, sourceUrl: "http://example.com", email: "invalid" },
      "en",
    );

    expect(errors.sourceUrl).toBe("Use a valid HTTPS project URL");
    expect(errors.email).toBe("Enter a valid email address");
  });

  it("accepts a complete valid submission", () => {
    expect(validateSubmission(validSubmission, "en")).toEqual({});
  });
});
