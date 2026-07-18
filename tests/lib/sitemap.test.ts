import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("public sitemap", () => {
  it("does not expose a Skill submission route", async () => {
    expect((await sitemap()).map((entry) => new URL(entry.url).pathname)).not.toContain(
      "/submit",
    );
  });

  it("does not expose the redundant Categories route", async () => {
    expect((await sitemap()).map((entry) => new URL(entry.url).pathname)).not.toContain(
      "/categories",
    );
  });

  it("lists canonical trailing-slash URLs so no entry redirects", async () => {
    const urls = (await sitemap()).map((entry) => entry.url);

    expect(urls.length).toBeGreaterThan(3);
    for (const url of urls) {
      expect(url.endsWith("/"), `${url} should end with a slash`).toBe(true);
    }
    expect(urls).toContain("https://skills.weiandata.com/");
    expect(urls).toContain("https://skills.weiandata.com/skills/");
    expect(urls).toContain("https://skills.weiandata.com/about/");
    expect(urls).toContain("https://skills.weiandata.com/skills/data-analysis-assistant/");
  });
});
