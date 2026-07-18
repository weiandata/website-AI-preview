import { describe, expect, it } from "vitest";
import sitemap from "@/app/sitemap";

describe("public sitemap", () => {
  it("does not expose a Skill submission route", () => {
    expect(sitemap().map((entry) => new URL(entry.url).pathname)).not.toContain(
      "/submit",
    );
  });

  it("does not expose the redundant Categories route", () => {
    expect(sitemap().map((entry) => new URL(entry.url).pathname)).not.toContain(
      "/categories",
    );
  });
});
