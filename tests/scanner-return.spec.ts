import { expect, test } from "@playwright/test";

for (const scenario of [
  {
    name: "English desktop",
    route: "/",
    width: 1440,
    height: 900,
    mobile: false,
  },
  {
    name: "German mobile",
    route: "/de/",
    width: 390,
    height: 844,
    mobile: true,
  },
]) {
  test.describe(scenario.name, () => {
    test.beforeEach(async ({ page, isMobile }) => {
      test.skip(isMobile !== scenario.mobile);
      await page.setViewportSize({
        width: scenario.width,
        height: scenario.height,
      });
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(scenario.route);
      await page.locator(".project-deck button").first().click();
      await expect(page.locator(".scanner-feedback")).toHaveAttribute(
        "data-phase",
        "ready",
      );
    });

    test("return flight respects subsequent Contact navigation", async ({
      page,
    }) => {
      await page.locator(".docked-token").click();
      await expect(page.locator(".tray-flight-layer")).toHaveCount(1);
      // Activate the real anchor without Playwright scrolling it into view first.
      await page
        .locator('.site-header a[href="#contact"]')
        .evaluate((link: HTMLAnchorElement) => link.click());
      await expect(page).toHaveURL(/#contact$/);
      await expect(page.locator(".tray-flight-layer")).toHaveCount(0);
      await expect(page.locator("#contact h2")).toBeInViewport();
      await expect(
        page.locator(".project-deck button").first(),
      ).not.toBeFocused();
    });

    test("ordinary return restores source focus after flight", async ({
      page,
    }) => {
      await page.locator(".docked-token").click();
      await expect(page.locator(".tray-flight-layer")).toHaveCount(0);
      await expect(page.locator(".project-deck button").first()).toBeFocused();
      await expect(
        page.locator(".project-deck button").first(),
      ).toBeInViewport();
    });

    test("return interrupted by project or view switch leaves no stale flight", async ({
      page,
    }) => {
      await page.locator(".docked-token").click();
      await page
        .locator(".project-deck button")
        .nth(1)
        .evaluate((card: HTMLButtonElement) => card.click());
      await expect(page.locator(".scanner-feedback")).toHaveAttribute(
        "data-phase",
        "ready",
      );
      await expect(page.locator(".docked-token")).toHaveAttribute(
        "data-project-id",
        "spinwheels",
      );
      await expect(page.locator(".docked-token")).toBeFocused();
      await page.locator(".docked-token").click();
      const list = page.locator(".project-view-controls button").nth(1);
      await list.click();
      await expect(page.locator(".tray-flight-layer")).toHaveCount(0);
      await expect(list).toBeFocused();
    });
  });
}

test("Nginx and Xano wordmarks preserve intrinsic aspect ratios", async ({
  page,
}) => {
  await page.goto("/");
  for (const [file, ratio] of [
    ["nginx", 128 / 34],
    ["xano", 81 / 19],
  ] as const) {
    const image = page.locator(`img[src="/images/technologies/${file}.svg"]`);
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        image.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
    const size = await image.boundingBox();
    expect(size!.width / size!.height).toBeCloseTo(ratio, 2);
  }
});
