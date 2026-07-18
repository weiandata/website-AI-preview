import { describe, expect, it } from "vitest";
import { absoluteUrl, resolveSiteConfig } from "@/lib/site-config";

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

  it("matches the site's trailingSlash routing for page URLs", () => {
    // next.config.ts sets trailingSlash: true, so canonical page URLs end in "/".
    expect(absoluteUrl()).toBe("https://skills.weiandata.com/");
    expect(absoluteUrl("/skills")).toBe("https://skills.weiandata.com/skills/");
    expect(absoluteUrl("/skills/")).toBe("https://skills.weiandata.com/skills/");
    expect(absoluteUrl("/skills/pdf-document-toolkit")).toBe(
      "https://skills.weiandata.com/skills/pdf-document-toolkit/",
    );
  });

  it("leaves file routes without a trailing slash", () => {
    expect(absoluteUrl("/sitemap.xml")).toBe("https://skills.weiandata.com/sitemap.xml");
    expect(absoluteUrl("/robots.txt")).toBe("https://skills.weiandata.com/robots.txt");
    expect(absoluteUrl("/icon.svg")).toBe("https://skills.weiandata.com/icon.svg");
  });
});
