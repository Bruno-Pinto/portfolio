import { test, expect } from "@playwright/test";

for (const width of [1440, 768, 390, 320]) {
  for (const route of ["/", "/de/"]) {
    test(`onboarding stays pending until card activation ${width} ${route}`, async ({
      page,
      isMobile,
    }) => {
      test.skip(isMobile !== width < 768);
      await page.setViewportSize({ width, height: 900 });
      await page.goto(route);
      const deck = page.locator(".project-deck");
      const cards = deck.locator("button");
      const hint = page.locator(".deck-hint");
      await expect(hint).toBeHidden();
      await deck.scrollIntoViewIfNeeded();
      await expect(hint).toBeVisible();
      await expect(cards.first()).not.toBeFocused();
      await expect(page.locator(".scanner-feedback")).toHaveAttribute(
        "data-phase",
        "idle",
      );
      await expect(
        deck.locator('[data-highlighted="true"] button'),
      ).toHaveAttribute("data-project-id", "php");
      await expect(cards.first()).toHaveCSS("scale", "1.015");
      await expect(cards.nth(1)).toHaveCSS("filter", "brightness(0.78)");
      await expect(
        hint.locator(isMobile ? ".deck-hint-touch" : ".deck-hint-desktop"),
      ).toHaveText(
        route === "/"
          ? isMobile
            ? "Tap a card to scan it"
            : "Click a card to scan it"
          : isMobile
            ? "Tippe auf eine Karte, um sie zu scannen"
            : "Klicke auf eine Karte, um sie zu scannen",
      );
      await page.clock.install();
      await page.clock.fastForward(60_000);
      await expect(hint).toBeVisible();
      await hint.click();
      await expect(hint).toBeVisible();
      await page.locator(".scanner-instructions").click();
      await expect(hint).toBeVisible();
      if (!isMobile) {
        await cards.nth(1).hover();
        await expect(
          deck.locator('[data-highlighted="true"] button'),
        ).toHaveAttribute("data-project-id", "spinwheels");
        await expect(cards.first()).toHaveCSS("filter", "brightness(0.78)");
      }
      await cards.nth(1).focus();
      await expect(hint).toBeVisible();
      await expect(cards.nth(1)).toHaveAccessibleDescription(
        route === "/" ? /Enter or Space/ : /Enter oder Leertaste/,
      );
      const panel = (await hint.boundingBox())!;
      const card = (await cards.nth(1).boundingBox())!;
      const title = (await cards.nth(1).locator(".token-title").boundingBox())!;
      expect(panel.x).toBeGreaterThanOrEqual(0);
      expect(panel.x + panel.width).toBeLessThanOrEqual(width);
      expect(panel.y + panel.height).toBeLessThan(title.y);
      const pointer = await hint.evaluate((el) =>
        parseFloat(el.style.getPropertyValue("--hint-pointer")),
      );
      expect(panel.x + pointer).toBeGreaterThanOrEqual(
        Math.max(card.x, panel.x),
      );
      expect(panel.x + pointer).toBeLessThanOrEqual(
        Math.min(card.x + card.width, panel.x + panel.width),
      );
      await page.locator(".project-view-controls button").nth(1).click();
      await expect(hint).toBeHidden();
      await page.locator(".project-view-controls button").first().click();
      await expect(hint).toBeVisible();
      await page.locator("#contact").scrollIntoViewIfNeeded();
      await deck.scrollIntoViewIfNeeded();
      await expect(hint).toBeVisible();
      await expect(deck).toHaveAttribute("data-onboarding", "true");
      await page.reload();
      await deck.scrollIntoViewIfNeeded();
      await expect(hint).toBeVisible();
      // A real card activation is the only completion event.
      await cards.nth(1).focus();
      await page.keyboard.press("Enter");
      await expect(hint).toBeHidden();
      await expect(deck).toHaveAttribute("data-onboarding", "false");
      await expect(page.locator(".scanner-feedback")).toHaveAttribute(
        "data-phase",
        "ready",
      );
      await page.locator(".docked-token").click();
      await expect(page.locator(".tray-flight-layer")).toHaveCount(0);
      await expect(cards.nth(1)).toBeFocused();
      await expect(hint).toBeHidden();
      await page.locator(".project-view-controls button").nth(1).click();
      await page.locator(".project-view-controls button").first().click();
      await expect(hint).toBeHidden();
      await page.reload();
      await deck.scrollIntoViewIfNeeded();
      await expect(hint).toBeVisible();
      await expect(cards.first()).toHaveCSS("scale", "1.015");
      await expect(page.locator(".scanner-instructions")).toBeVisible();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    });
  }
}

test("refresh restores onboarding with reduced motion and unavailable storage", async ({
  browser,
}) => {
  for (const blockedStorage of [false, true]) {
    const context = await browser.newContext({ reducedMotion: "reduce" });
    const page = await context.newPage();
    if (blockedStorage)
      await page.addInitScript(() => {
        Storage.prototype.getItem = () => {
          throw new Error("Storage blocked");
        };
        Storage.prototype.setItem = () => {
          throw new Error("Storage blocked");
        };
      });
    if (!blockedStorage)
      await page.addInitScript(() =>
        sessionStorage.setItem("scanner-onboarding-complete", "true"),
      );
    await page.goto("/");
    const cards = page.locator(".project-deck button");
    const hint = page.locator(".deck-hint");
    await cards.first().scrollIntoViewIfNeeded();
    await expect(hint).toBeVisible();
    await expect(cards.first()).toHaveCSS("translate", "none");
    await expect(cards.first()).toHaveCSS("scale", "none");
    await expect(cards.first()).toHaveCSS("transition-duration", "0s");
    await cards.first().click();
    await expect(hint).toBeHidden();
    await expect(page.locator(".scanner-feedback")).toHaveAttribute(
      "data-phase",
      "ready",
    );
    await page.locator(".docked-token").click();
    await expect(cards.first()).toBeFocused();
    await expect(hint).toBeHidden();
    await page.reload();
    await cards.first().scrollIntoViewIfNeeded();
    await expect(hint).toBeVisible();
    await context.close();
  }
});
