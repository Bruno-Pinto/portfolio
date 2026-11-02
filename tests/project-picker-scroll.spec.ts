import { expect, test } from "@playwright/test";

for (const route of ["/", "/de/"]) {
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    test(`project picker follows the mobile header on ${route} with ${reducedMotion} motion`, async ({
      page,
    }) => {
      await page.setViewportSize({ width: 390, height: 844 });
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

test("project picker stays inside a panned mobile visual viewport", async ({
  page,
  isMobile,
}) => {
  test.skip(!isMobile, "Mobile emulation allows the visual viewport to pan.");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator('.project-deck button[data-project-id="php"]').click();
  await expect(page.locator(".scanner-feedback")).toHaveAttribute(
    "data-phase",
    "ready",
  );
  await page.locator(".scanner-details").evaluate((element) =>
    window.scrollTo({
      top: element.getBoundingClientRect().top + window.scrollY + 150,
      behavior: "instant",
    }),
  );
  await expect(page.locator(".site-header")).toHaveAttribute(
    "data-scroll-hidden",
    "true",
  );

  await page.emulateMedia({ reducedMotion: "no-preference" });
  const session = await page.context().newCDPSession(page);
  await session.send("Emulation.setPageScaleFactor", { pageScaleFactor: 1.5 });
  await session.send("Input.synthesizeScrollGesture", {
    x: 100,
    y: 200,
    yDistance: -80,
    speed: 300,
    gestureSourceType: "mouse",
  });
  await expect
    .poll(() => page.evaluate(() => window.visualViewport!.offsetTop))
    .toBeGreaterThan(0);
  const picker = page.locator(".scanner-project-picker");
  await expect
    .poll(() =>
      picker.evaluate((element) =>
        Math.round(
          element.getBoundingClientRect().top -
            window.visualViewport!.offsetTop,
        ),
      ),
    )
    .toBe(12);
  expect(
    await picker.evaluate(
      (element) =>
        element.getBoundingClientRect().bottom -
          window.visualViewport!.offsetTop <=
        window.visualViewport!.height,
    ),
  ).toBe(true);

  await session.send("Emulation.setPageScaleFactor", { pageScaleFactor: 1 });
  await expect
    .poll(async () => Math.round((await picker.boundingBox())!.y))
    .toBe(12);
});
