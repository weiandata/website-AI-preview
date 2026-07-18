import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem("weian-locale", "zh");
  });
});

test("home discovery supports bilingual search and category exploration", async ({
  page,
}) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: /发现真正好用的开源 AI Skills/ }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "浏览全部 Skills" })).toHaveAttribute(
    "href",
    "/skills",
  );

  await page.getByRole("button", { name: "EN" }).click();
  await expect(
    page.getByRole("heading", { name: /Discover practical open-source AI Skills/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "中" }).click();

  await page
    .getByRole("combobox", { name: "搜索 Skill" })
    .fill("PDF");
  await page.getByRole("combobox", { name: "搜索 Skill" }).press("Enter");
  await expect(page).toHaveURL(/\/skills\?q=PDF/);

  await page.goto("/categories");
  await expect(page.getByRole("heading", { name: "Skill 分类" })).toBeVisible();
  await expect(page.locator(".category-card")).toHaveCount(8);
});
