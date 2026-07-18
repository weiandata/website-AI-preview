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

test("skill detail presents guidance, provenance, safe actions, and related Skills", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"], {
    origin: "http://127.0.0.1:3000",
  });
  await page.goto("/skills/data-analysis-assistant");

  await expect(page.getByRole("heading", { name: "数据分析助手" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "安装方式" })).toBeVisible();
  await expect(page.locator("script[type='application/ld+json']")).toHaveCount(2);
  await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();

  await page.getByRole("button", { name: "复制" }).first().click();
  await expect(page.getByRole("button", { name: "已复制" }).first()).toBeVisible();

  await page.getByRole("button", { name: "下载 Skill" }).first().click();
  await expect(
    page.getByRole("dialog", { name: "即将前往第三方下载页面" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "取消" }).last().click();

  await expect(page.getByRole("heading", { name: "相关 Skills" })).toBeVisible();
  await expect(page.locator(".related-skills .skill-card")).toHaveCount(3);

  await page.goto("/skills/not-a-real-skill");
  await expect(page.getByRole("heading", { name: /未找到 Skill/ })).toBeVisible();
});
