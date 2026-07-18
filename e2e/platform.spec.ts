import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => {
    window.localStorage.setItem("weian-locale", "zh");
  });
  await page.reload();
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
    "/skills/",
  );
  await expect(page.locator(".header-actions .github-button")).toHaveCount(0);
  await expect(page.locator(".nav-skills-group > a")).toHaveAttribute("href", "/skills/");
  if ((page.viewportSize()?.width ?? 0) > 980) {
    await page.locator('.nav-dropdown summary[aria-label="显示 Skill 分类"]').click();
    await expect(page.locator(".nav-dropdown .dropdown-panel")).toBeVisible();
  }
  await expect(page.locator(".featured-skill")).toHaveCount(6);
  // Featured order is administrator-controlled through featuredRank in Markdown.
  await expect(page.locator(".featured-skill")).toContainText([
    "数据分析助手",
    "研究写作助手",
    "GitHub 工作流助手",
    "PDF 文档工具箱",
    "工作流自动化工具包",
    "专注规划助手",
  ]);
  await page.getByRole("link", { name: "搜索" }).click();
  await expect(page).toHaveURL(/#home-search$/);
  await expect(page.locator("#home-search")).toBeInViewport();

  await expect(page.getByRole("link", { name: "查看全部更新" })).toHaveAttribute(
    "href",
    "/skills/?period=30d&sort=added",
  );
  await page.getByRole("combobox", { name: "搜索 Skill" }).focus();
  await expect(page.locator(".hero-search kbd")).toHaveCount(0);
  await expect(page.locator(".hero-search > button")).toHaveCount(0);
  await expect(page.locator(".popular-searches")).toHaveCount(0);
  await expect(page.locator(".popular-search-term")).toHaveCount(0);
  await page.getByRole("combobox", { name: "搜索 Skill" }).fill("PDF");
  await expect(page.getByRole("option")).toHaveCount(1);
  await page.getByRole("combobox", { name: "搜索 Skill" }).fill("");

  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: /Discover practical open-source AI Skills/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "中", exact: true }).click();

  await page
    .getByRole("combobox", { name: "搜索 Skill" })
    .fill("PDF");
  await page.getByRole("combobox", { name: "搜索 Skill" }).press("Enter");
  await expect(page).toHaveURL(/\/skills\/\?q=PDF/);

  await page.goto("/");
  await expect(page.locator(".category-card")).toHaveCount(8);
  for (const card of await page.locator(".category-card").all()) {
    const countBox = await card.locator(".category-count").boundingBox();
    const arrowBox = await card.locator(".category-card-footer svg").boundingBox();
    expect(countBox && arrowBox && countBox.x + countBox.width <= arrowBox.x).toBe(true);
  }
  await expect(page.getByRole("link", { name: "联系我们" })).toBeVisible();
  await expect(page.getByRole("link", { name: "隐私政策" })).toBeVisible();
  await expect(page.locator(".footer-column").first().getByRole("link")).toHaveCount(2);
  await expect(page.getByRole("link", { name: "GitHub", exact: true })).toHaveCount(0);
  await expect(page.getByText("© 2026 WEIAN DATA。保留所有权利。"))
    .toBeVisible();
  await page.goto("/about#usage");
  await expect(page.locator("#usage")).toBeVisible();

  const categoriesResponse = await page.goto("/categories");
  expect(categoriesResponse?.status()).toBe(404);
});

test("skill library keeps filters shareable and supports every result state", async ({
  page,
}) => {
  await page.goto(
    "/skills?category=data-analytics&platform=Python&sort=updated",
  );

  await expect(page.getByRole("heading", { name: "开源 Skill 库" })).toBeVisible();
  await expect(page.locator(".header-actions .github-button")).toHaveCount(0);
  await expect(page.locator(".sort-control select")).not.toHaveCSS(
    "background-color",
    "rgb(0, 0, 0)",
  );
  await expect(page.locator(".library-result-count")).toContainText("1");
  await expect(page.locator(".library-results .skill-card h3", { hasText: "数据分析助手" }))
    .toBeVisible();
  await expect(page.locator("[data-filter-chip]")) .toHaveCount(2);

  await page.getByRole("button", { name: "清除筛选" }).click();
  await expect(page).toHaveURL("/skills/");
  await expect(page.locator(".library-result-count")).toContainText("8");

  const firstCard = page.locator(".skill-card .skill-item-link").first();
  const destination = await firstCard.getAttribute("href");
  await firstCard.click();
  await expect(page).toHaveURL(new RegExp(`${destination}$`));
  await page.goto("/skills");

  await page.getByRole("searchbox", { name: "搜索 Skill 库" }).fill("no-match-term");
  await expect(page.getByRole("heading", { name: "没有找到匹配的 Skill" })).toBeVisible();

  await page.getByRole("button", { name: "清除筛选" }).click();
  await page.getByRole("button", { name: "列表视图" }).click();
  await expect(page.locator(".skill-list-row")).toHaveCount(6);
  await expect(page.locator(".skill-list-row h3").first()).toBeVisible();
  await expect(page.locator(".skill-list-eyebrow").first()).toBeVisible();
  await page.getByRole("button", { name: "加载更多" }).click();
  await expect(page.locator(".skill-list-row")).toHaveCount(8);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "筛选" }).click();
  await expect(page.getByRole("dialog", { name: "筛选" })).toBeVisible();
  await page.getByRole("button", { name: "取消" }).click();
  await expect(page.getByRole("button", { name: "筛选" })).toBeFocused();
});

test("skill detail presents guidance, provenance, safe actions, and related Skills", async ({
  page,
  context,
}) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"], {
    origin: "http://127.0.0.1:4175",
  });
  await page.goto("/skills/data-analysis-assistant");

  await expect(page.getByRole("heading", { name: "数据分析助手" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "安装方式" })).toBeVisible();
  await expect(page.locator("script[type='application/ld+json']")).toHaveCount(2);
  await expect(page.locator("link[hreflang='en']")).toHaveCount(0);
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
  await expect(page.locator(".copy-command-button").first()).not.toHaveCSS(
    "background-color",
    "rgb(0, 0, 0)",
  );
  await expect(page.locator(".workflow-steps")).toHaveCSS(
    "background-color",
    "rgb(248, 249, 248)",
  );
  expect(
    await page.locator(".changelog-list article").first().evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).paddingLeft),
    ),
  ).toBeGreaterThanOrEqual(20);
  for (const tag of await page.locator(".sidebar-tags div span").all()) {
    await expect(tag).not.toHaveCSS("background-color", "rgb(25, 30, 41)");
  }

  for (const id of ["overview", "features", "installation", "usage"]) {
    await page.locator(`.detail-on-page-nav a[href="#${id}"]`).click();
    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect.poll(async () => {
      const top = await page.locator(`#${id}`).evaluate((element) =>
        element.getBoundingClientRect().top,
      );
      return top >= 80 && top < 220;
    }).toBe(true);
  }

  await page.goto("/skills/not-a-real-skill");
  await expect(page.getByRole("heading", { name: /未找到 Skill/ })).toBeVisible();
});

test("global acceptance preserves state and supports mobile, motion, and offline use", async ({
  page,
  context,
}) => {
  await page.goto("/skills?q=PDF");
  await page.getByRole("button", { name: "EN", exact: true }).click();
  await expect(page.getByRole("heading", { name: "Open-Source Skill Library" })).toBeVisible();
  await expect(page).toHaveTitle("Open-Source Skill Library | WEIAN DATA");
  await expect(page).toHaveURL(/\/skills\?q=PDF/);
  await page.reload();
  await expect(page.getByRole("heading", { name: "Open-Source Skill Library" })).toBeVisible();

  await page.setViewportSize({ width: 390, height: 844 });
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);

  await page.getByRole("button", { name: "Open menu" }).click();
  await expect(page.getByRole("dialog", { name: "Navigation menu" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Navigation menu" })).toBeHidden();
  await expect(page.getByRole("button", { name: "Open menu" })).toBeFocused();

  await page.emulateMedia({ reducedMotion: "reduce" });
  expect(
    await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior),
  ).toBe("auto");

  await context.setOffline(true);
  await expect(page.getByRole("status")).toContainText("offline");
  await context.setOffline(false);
});

test("supported navigation state focuses search and filters featured Skills", async ({
  page,
}) => {
  await page.goto("/skills?featured=true&focus=search");

  const search = page.getByRole("searchbox", { name: "搜索 Skill 库" });
  await expect(search).toBeFocused();
  await expect(page.locator(".library-result-count")).toHaveText("6");
  await expect(page.locator(".library-search")).toHaveCSS(
    "border-color",
    "rgb(46, 134, 222)",
  );
});

test("about page stays compact and omits global GitHub actions", async ({ page }) => {
  await page.goto("/about");

  await expect(page.locator(".header-actions .github-button")).toHaveCount(0);
  await expect(page.locator(".about-compact-overview")).toBeVisible();
  await expect(page.locator(".about-compact-usage")).toBeVisible();
  await expect(page.locator(".about-compact-bottom")).toBeVisible();
  expect(await page.locator(".about-principle-card").count()).toBe(4);
});

test("a Skill without a published route returns 404", async ({ page }) => {
  // Draft Skills never generate a route, so any unbuilt slug must 404.
  const response = await page.goto("/skills/draft-fixture/");

  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { name: "未找到 Skill" })).toBeVisible();
  await expect(page.getByRole("link", { name: "返回 Skill 库" })).toBeVisible();
});

test("public Skill submission is not a route", async ({ page }) => {
  const response = await page.goto("/submit");

  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: /未找到 Skill|Skill not found/i }),
  ).toBeVisible();
});
