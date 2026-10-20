import { test, expect } from "@playwright/test";

for (const locale of ["en", "de"] as const) {
  for (const width of [1440, 390, 320]) {
    test(`recruiter hero ${locale} at ${width}px`, async ({
      page,
    }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(locale === "en" ? "/" : "/de/");
      const hero = page.locator(".hero");
      await expect(hero.locator(".student")).toContainText("ZHAW");
      await expect(hero.locator(".opportunity")).toContainText("60\u201380%");
      await expect(hero.locator(".opportunity")).toContainText(
        locale === "en" ? "Available immediately" : "Ab sofort verf\u00fcgbar",
      );
      await expect(hero.locator(".hero-cv")).toHaveAccessibleName(
        locale === "en" ? "Download CV" : "Lebenslauf herunterladen",
      );
      await expect(hero.locator(".hero-cv a")).toHaveCount(2);
      const portrait = await hero.locator(".portrait").boundingBox();
      for (const language of ["en", "de"]) {
        const cv = hero.locator(`.hero-cv a[hreflang="${language}"]`);
        await expect(cv).toHaveAccessibleName(
          locale === "en"
            ? `${language === "en" ? "English" : "German"} CV (PDF)`
            : `Lebenslauf ${language === "en" ? "Englisch" : "Deutsch"} (PDF)`,
        );
        await expect(cv).toHaveText(language === "en" ? "English" : "Deutsch");
        await expect(cv.locator("svg")).toHaveCount(1);
        const box = await cv.boundingBox();
        expect(box!.width).toBeGreaterThanOrEqual(44);
        expect(box!.height).toBeGreaterThanOrEqual(44);
        if (width < 700) expect(box!.y + box!.height).toBeLessThan(portrait!.y);
        await hero.locator('.actions a[href="#contact"]').focus();
        await page.keyboard.press("Tab");
        if (language === "de") await page.keyboard.press("Tab");
        await expect(cv).toBeFocused();
        await expect(cv).toHaveCSS("outline-style", "solid");
        await expect(cv).toHaveCSS("outline-width", "2px");
        await expect(cv).toHaveCSS("outline-color", "rgb(126, 223, 230)");
        const download = page.waitForEvent("download");
        await page.keyboard.press("Enter");
        expect(await (await download).failure()).toBeNull();
      }
      await page.evaluate(() => window.scrollTo(0, 0));
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({ path: testInfo.outputPath("hero.png") });
      if (width === 1440) {
        await page.evaluate(() => {
          document.documentElement.style.zoom = "2";
        });
        for (const control of await hero
          .locator(".actions a, .hero-cv a")
          .all()) {
          const bounds = await control.boundingBox();
          expect(bounds!.x).toBeGreaterThanOrEqual(0);
          expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(1440);
        }
      }
    });
  }
}
