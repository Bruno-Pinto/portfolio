import { expect, test } from "@playwright/test";

for (const route of ["/", "/de/"]) {
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    test(`project picker follows the mobile header on ${route} with ${reducedMotion} motion`, async ({
      page,
      isMobile,
    }) => {
      test.skip(!isMobile, "Exercises the mobile sticky project picker.");
      await page.emulateMedia({ reducedMotion });
      await page.goto(route);
      await page
        .locator('.project-deck button[data-project-id="spinwheels"]')
        .click();
      await expect(page.locator(".scanner-feedback")).toHaveAttribute(
        "data-phase",
        "ready",
      );
      await expect
        .poll(async () =>
          Math.round((await page.locator(".scanner-pad").boundingBox())!.y),
        )
        .toBe(
          await page.evaluate(() =>
            parseFloat(
              getComputedStyle(document.documentElement).scrollPaddingTop,
            ),
          ),
        );

      const header = page.locator(".site-header");
      const picker = page.locator(".scanner-project-picker");
      const readingPosition = await page
        .locator(".scanner-details")
        .evaluate(
          (element) =>
            element.getBoundingClientRect().top + window.scrollY + 300,
        );
      await page.evaluate(
        (top) => window.scrollTo({ top, behavior: "instant" }),
        readingPosition,
      );
      await expect(header).toHaveAttribute("data-scroll-hidden", "true");
      await expect
        .poll(async () => Math.round((await picker.boundingBox())!.y))
        .toBe(12);

      await page.evaluate(() =>
        window.scrollBy({ top: -80, behavior: "instant" }),
      );
      await expect(header).toHaveAttribute("data-scroll-hidden", "false");
      await expect
        .poll(async () => Math.round((await picker.boundingBox())!.y))
        .toBe(Math.round((await header.boundingBox())!.height + 12));

      await page.evaluate(() =>
        window.scrollBy({ top: 80, behavior: "instant" }),
      );
      await expect(header).toHaveAttribute("data-scroll-hidden", "true");
      await page.keyboard.press("Tab");
      await page
        .locator(".wordmark")
        .evaluate((element: HTMLElement) =>
          element.focus({ preventScroll: true }),
        );
      await expect
        .poll(async () => Math.round((await header.boundingBox())!.y))
        .toBe(0);
      await expect
        .poll(async () => Math.round((await picker.boundingBox())!.y))
        .toBe(Math.round((await header.boundingBox())!.height + 12));

      await page
        .locator(".wordmark")
        .evaluate((element: HTMLElement) => element.blur());
      await page.evaluate(() =>
        window.scrollBy({ top: 80, behavior: "instant" }),
      );
      await expect(header).toHaveAttribute("data-scroll-hidden", "true");
      await page.setViewportSize({ width: 701, height: 844 });
      await expect
        .poll(async () => Math.round((await header.boundingBox())!.y))
        .toBe(0);
      // Resizing reflows the details, so restore a reading position inside them.
      await page.locator(".scanner-details").evaluate((element) =>
        window.scrollTo({
          top: element.getBoundingClientRect().top + window.scrollY + 200,
          behavior: "instant",
        }),
      );
      await expect
        .poll(async () => Math.round((await picker.boundingBox())!.y))
        .toBe(Math.round((await header.boundingBox())!.height + 12));
      await page.setViewportSize({ width: 851, height: 844 });
      await expect(picker).toBeHidden();
    });
  }
}
