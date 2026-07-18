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

test("skill library keeps filters shareable and supports every result state", async ({
  page,
}) => {
  await page.goto(
    "/skills?category=data-analytics&platform=Python&sort=updated",
  );

  await expect(page.getByRole("heading", { name: "开源 Skill 库" })).toBeVisible();
  await expect(page.locator(".library-result-count")).toContainText("1");
  await expect(page.getByText("数据分析助手")).toBeVisible();
  await expect(page.locator("[data-filter-chip]")) .toHaveCount(2);

  await page.getByRole("button", { name: "清除筛选" }).click();
  await expect(page).toHaveURL("/skills");
  await expect(page.locator(".library-result-count")).toContainText("8");

  await page.getByRole("searchbox", { name: "搜索 Skill 库" }).fill("no-match-term");
  await expect(page.getByRole("heading", { name: "没有找到匹配的 Skill" })).toBeVisible();

  await page.getByRole("button", { name: "清除筛选" }).click();
  await page.getByRole("button", { name: "列表视图" }).click();
  await expect(page.locator(".skill-list-row")).toHaveCount(6);
  await page.getByRole("button", { name: "加载更多" }).click();
  await expect(page.locator(".skill-list-row")).toHaveCount(8);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "筛选" }).click();
  await expect(page.getByRole("dialog", { name: "筛选" })).toBeVisible();
});
