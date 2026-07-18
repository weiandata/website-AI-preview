import { describe, expect, it } from "vitest";
import { resolveSiteConfig } from "@/lib/site-config";

describe("site configuration", () => {
  it("uses production-safe WEIAN DATA defaults", () => {
    expect(resolveSiteConfig({})).toEqual({
      url: "https://skills.weiandata.com",
      contactEmail: "contact@weiandata.com",
    });
  });

  it("normalizes valid deployment overrides and rejects invalid values", () => {
    expect(
      resolveSiteConfig({
        NEXT_PUBLIC_SITE_URL: "https://skills.example.org/",
        NEXT_PUBLIC_CONTACT_EMAIL: "skills@example.org",
      }),
    ).toEqual({
      url: "https://skills.example.org",
      contactEmail: "skills@example.org",
    });

    expect(() =>
      resolveSiteConfig({ NEXT_PUBLIC_SITE_URL: "not-a-url" }),
    ).toThrow("NEXT_PUBLIC_SITE_URL");
    expect(() =>
      resolveSiteConfig({ NEXT_PUBLIC_CONTACT_EMAIL: "not-an-email" }),
    ).toThrow("NEXT_PUBLIC_CONTACT_EMAIL");
  });
});
