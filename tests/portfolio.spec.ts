import { test, expect } from "@playwright/test";
test("language switch renders localized document and navigation", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Software Developer",
  );
  await page.getByRole("link", { name: "DE", exact: true }).click();
  await expect(page).toHaveURL(/\/de\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Softwareentwickler",
  );
  await page.getByRole("link", { name: "Projekte", exact: true }).click();
  await expect(page).toHaveURL(/#work$/);
  await expect(page.locator("#work")).toBeInViewport();
  await page.getByRole("link", { name: "EN", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
});
test("project detail is accessible and page fits viewport", async ({
  page,
}) => {
  await page.goto("/");
  await page.locator(".project-deck button[data-project-id=php]").click();
  await expect(page.locator(".scanner-details")).toContainText(
    "SQL database queries",
  );
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await expect(
    page.getByRole("link", { name: "bpintodasilva@gmail.com" }),
  ).toHaveAttribute("href", "mailto:bpintodasilva@gmail.com");
});
test("keyboard skip link reaches main content", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
});

test("featured work and portrait load in both languages without overflow", async ({
  page,
}) => {
  for (const route of ["/", "/de/"]) {
    await page.goto(route);
    await expect(
      page.getByRole("button", {
        name:
          route === "/"
            ? "Scan project: SpinWheels"
            : "Projekt scannen: SpinWheels",
        exact: true,
      }),
    ).toBeVisible();
    const portrait = page.getByRole("img", {
      name: "Bruno Pinto da Silva",
      exact: true,
    });
    await expect(portrait).toBeVisible();
    expect(
      await portrait.evaluate(
        (img) =>
          img instanceof HTMLImageElement &&
          img.complete &&
          img.naturalWidth > 0,
      ),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("header stays visible and anchor headings stay below it", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Experience", exact: true }).click();
  await expect(page).toHaveURL(/#experience$/);
  await expect
    .poll(async () =>
      page
        .locator(".site-header")
        .evaluate((el) => Math.round(el.getBoundingClientRect().top)),
    )
    .toBe(0);
  await expect
    .poll(async () =>
      page
        .locator("#experience-title")
        .evaluate(
          (el) =>
            el.getBoundingClientRect().top -
            document.querySelector(".site-header")!.getBoundingClientRect()
              .bottom,
        ),
    )
    .toBeGreaterThanOrEqual(0);
  await expect(
    page.getByRole("link", { name: "Projects", exact: true }),
  ).toBeVisible();
});
test("experience is chronological and skills include examples", async ({
  page,
}) => {
  for (const route of ["/", "/de/"]) {
    await page.goto(route);
    const companies = await page.locator(".job h3").allTextContents();
    expect(companies).toEqual([
      route === "/"
        ? "University of Zurich · Institute of Medical Microbiology"
        : "Universität Zürich · Institut für Medizinische Mikrobiologie",
      "IKAMED Institute AG",
      "Rocketlaunch",
      "Kork Tech AG",
    ]);
    await expect(page.locator(".project-deck button")).toHaveCount(6);
    await expect(page.locator(".project-scanner img")).toHaveCount(0);
    await expect(page.locator(".skill-card")).toHaveCount(6);
    await expect(
      page.locator(".skill-card").filter({ hasText: "TypeScript" }),
    ).toContainText(route === "/" ? "Currently learning" : "lerne ich");
  }
});

test("experience comes before projects and navigation marks the current section", async ({
  page,
}) => {
  await page.goto("/");
  expect(
    await page
      .locator("#experience")
      .evaluate((el) =>
        Boolean(
          el.compareDocumentPosition(document.getElementById("work")!) &
          Node.DOCUMENT_POSITION_FOLLOWING,
        ),
      ),
  ).toBe(true);
  await expect(
    page.getByRole("navigation").first().getByRole("link").first(),
  ).toHaveText("Experience");
  await page
    .getByRole("navigation")
    .first()
    .getByRole("link", { name: "Experience", exact: true })
    .click();
  await expect(
    page
      .getByRole("navigation")
      .first()
      .getByRole("link", { name: "Experience", exact: true }),
  ).toHaveAttribute("aria-current", "location");
  await page
    .getByRole("navigation")
    .first()
    .getByRole("link", { name: "Projects", exact: true })
    .click();
  await expect(
    page
      .getByRole("navigation")
      .first()
      .getByRole("link", { name: "Projects", exact: true }),
  ).toHaveAttribute("aria-current", "location");
});

test("cards move into scanner, switch and return with keyboard support", async ({
  page,
}) => {
  for (const route of ["/", "/de/"]) {
    await page.goto(route);
    const deck = page.locator(".project-deck button");
    for (let i = 0; i < 3; i++) {
      await deck.nth(i).focus();
      await deck.nth(i).press(i % 2 === 0 ? "Enter" : "Space");
      await expect(deck.nth(i)).toHaveAttribute("aria-pressed", "true");
      await expect(page.locator(".docked-token")).toHaveCount(1);
      await expect(page.locator(".scanner-details h3")).toHaveText(
        i === 0
          ? route === "/"
            ? "PHP intranet development"
            : "Weiterentwicklung eines PHP-Intranets"
          : i === 1
            ? route === "/"
              ? "Applications and a marketplace"
              : "Anwendungen und ein Marktplatz"
            : "SpinWheels",
      );
      await expect(page.locator(".scanner-status")).toHaveText(
        route === "/" ? "Scan complete" : "Scan abgeschlossen",
      );
      if (i === 2)
        await expect(page.locator(".scanner-details")).toContainText(
          route === "/" ? "breadth-first search" : "Breitensuche",
        );
    }
    await page.locator(".docked-token").click();
    await expect(page.locator(".docked-token")).toHaveCount(0);
    await expect(page.locator(".scanner-empty")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});
test("reduced motion shows project immediately without animation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page
    .locator(".project-deck button[data-project-id=spinwheels]")
    .click();
  await expect(page.locator(".scanner-status")).toHaveText("Scan complete");
  expect(
    await page
      .locator(".docked-token")
      .evaluate((el) => el.getAnimations().length),
  ).toBe(0);
  await expect(page.locator(".scanner-details")).toContainText(
    "Movement strategies",
  );
});

test("red scan sweeps down and back before details are revealed", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator(".project-deck button[data-project-id=spinwheels]")
    .click();
  const pad = page.locator(".scanner-pad");
  await expect(pad).toHaveAttribute("data-phase", "scanning");
  await expect(page.getByRole("progressbar")).toBeVisible();
  await expect(page.locator(".scanner-details")).toHaveAttribute(
    "aria-busy",
    "true",
  );
  await expect(page.locator(".scanner-reveal")).toHaveCount(0);
  const sweep = await page.locator(".scanner-beam").evaluate((el) => {
    const animation = el.getAnimations()[0];
    animation.pause();
    const duration = Number(animation.effect!.getTiming().duration);
    animation.currentTime = duration / 2;
    const bottom = new DOMMatrix(getComputedStyle(el).transform).m42;
    animation.currentTime = duration * 0.9;
    const returning = new DOMMatrix(getComputedStyle(el).transform).m42;
    const color = getComputedStyle(el).backgroundColor;
    animation.play();
    return { bottom, returning, color };
  });
  expect(sweep.bottom).toBeGreaterThan(250);
  expect(sweep.returning).toBeLessThan(sweep.bottom);
  expect(sweep.color).toBe("rgb(255, 64, 88)");
  await expect(pad).toHaveAttribute("data-phase", "ready");
  await expect(page.getByRole("progressbar")).toHaveAttribute(
    "aria-valuenow",
    "100",
  );
  await expect(page.locator(".scanner-details")).toHaveAttribute(
    "aria-busy",
    "false",
  );
  await expect(page.locator(".scanner-reveal")).toContainText(
    "Movement strategies",
  );
});

test("enabling reduced motion during scanning reveals details immediately", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator(".project-deck button[data-project-id=spinwheels]")
    .click();
  await expect(page.locator(".scanner-pad")).toHaveAttribute(
    "data-phase",
    "scanning",
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator(".scanner-status")).toHaveText("Scan complete");
  await expect(page.locator(".scanner-reveal")).toContainText(
    "Movement strategies",
  );
});

test("replacement animates the outgoing card and preserves card dimensions", async ({
  page,
}) => {
  await page.goto("/");
  const first = page.locator(".project-deck button").first();
  const before = await first.boundingBox();
  await first.click();
  await expect(page.locator(".scanner-status")).toHaveText("Scan complete");
  const dock = await page.locator(".docked-token").boundingBox();
  expect(dock!.width).toBeCloseTo(before!.width, 0);
  expect(dock!.height).toBeCloseTo(before!.height, 0);
  await page
    .locator(".project-deck button[data-project-id=mission-life]")
    .click();
  expect(
    await first.evaluate((el) =>
      el.getAnimations().some((animation) => animation.playState === "running"),
    ),
  ).toBe(true);
  await expect(page.locator(".scanner-status")).toHaveText("Scan complete");
  await expect(page.locator(".scanner-reveal h3")).toHaveText("Mission-Life");
  await expect(first).toHaveAttribute("aria-pressed", "false");
});
test("Mission projects have localized details and matching card appearance", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/de/"]) {
    await page.goto(route);
    const deck = page.locator(".project-deck button");
    await expect(deck).toHaveCount(6);
    expect(
      (await page.locator(".scanner-layout").boundingBox())!.height,
    ).toBeGreaterThanOrEqual(560);
    for (const index of [4, 5]) {
      const face = await deck.nth(index).evaluate((el) => ({
        width: el.clientWidth,
        height: el.clientHeight,
        titleSize: getComputedStyle(el.querySelector(".token-title")!).fontSize,
      }));
      await deck.nth(index).click();
      await expect(page.locator(".scanner-reveal h3")).toHaveText(
        index === 4 ? "Mission-Life" : "Mission-Chess",
      );
      const scanned = await page.locator(".docked-token").evaluate((el) => ({
        width: el.clientWidth,
        height: el.clientHeight,
        titleSize: getComputedStyle(el.querySelector(".token-title")!).fontSize,
      }));
      expect(scanned).toEqual(face);
      await expect(page.locator(".scanner-reveal")).toContainText(
        index === 4 ? "JavaFX" : "Swing",
      );
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("professional projects lead and PHP and ITSM have separate details", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/de/"]) {
    await page.goto(route);
    expect(
      await page
        .locator(".project-deck button")
        .evaluateAll((cards) =>
          cards.map((card) => card.getAttribute("data-project-id")),
        ),
    ).toEqual([
      "php",
      "products",
      "spinwheels",
      "itsm",
      "mission-life",
      "mission-chess",
    ]);
    await page.locator(".project-deck button[data-project-id=php]").click();
    await expect(page.locator(".scanner-reveal")).toContainText("GitLab");
    await expect(page.locator(".scanner-reveal")).not.toContainText(
      route === "/" ? "ticketing" : "Ticketsystem",
    );
    await page.locator(".project-deck button[data-project-id=itsm]").click();
    await expect(page.locator(".scanner-reveal h3")).toHaveText(
      route === "/" ? "Central ticketing system" : "Zentrales Ticketsystem",
    );
    await expect(page.locator(".docked-token .token-tags")).not.toContainText(
      "PHP",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("approved CVs download as PDFs and binary search is removed", async ({
  page,
  request,
}) => {
  for (const locale of ["en", "de"]) {
    await page.goto(locale === "en" ? "/" : "/de/");
    await expect(page.locator(".hero-links a[download]")).toHaveAttribute(
      "href",
      "/cv/bruno-pinto-cv-" + locale + ".pdf",
    );
    for (const language of ["en", "de"]) {
      const href = "/cv/bruno-pinto-cv-" + language + ".pdf";
      const response = await request.get(href);
      expect(response.ok()).toBe(true);
      expect(response.headers()["content-type"]).toContain("application/pdf");
      expect((await response.body()).subarray(0, 5).toString()).toBe("%PDF-");
      const [download] = await Promise.all([
        page.waitForEvent("download"),
        page.locator('.cv-note a[href="' + href + '"]').click(),
      ]);
      expect(download.suggestedFilename()).toBe(
        "bruno-pinto-cv-" + language + ".pdf",
      );
      expect(await download.failure()).toBeNull();
    }
    await expect(page.locator(".lab-section")).toHaveCount(0);
  }
});

test("experience links open matching projects without toggling them closed", async ({
  page,
}) => {
  for (const route of ["/", "/de/"]) {
    await page.goto(route);
    const jobs = page.locator(".timeline .job");
    await expect(jobs.nth(0).locator("[data-project-target]")).toHaveCount(2);
    await expect(jobs.nth(1).locator("[data-project-target]")).toHaveCount(0);
    for (const [job, id] of [
      [0, "php"],
      [0, "itsm"],
      [2, "products"],
      [3, "products"],
    ] as const) {
      const link = jobs.nth(job).locator('[data-project-target="' + id + '"]');
      const title = (await link.innerText()).replace("↗", "").trim();
      await link.focus();
      await page.keyboard.press("Enter");
      await expect(page.locator(".docked-token")).toHaveAttribute(
        "data-project-id",
        id,
      );
      await expect(page.locator(".scanner-details")).toHaveAttribute(
        "aria-busy",
        "false",
      );
      await expect(page.locator(".docked-token")).toBeFocused();
      await expect(page.locator(".scanner-reveal h3")).toHaveText(title);
      await expect(page).toHaveURL(/#work$/);
    }
  }
});

test("narrow screens keep scanner details in the page flow and cards within the viewport", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    for (const route of ["/", "/de/"]) {
      await page.goto(route);
      await page
        .locator(".project-deck button[data-project-id=products]")
        .click();
      const details = page.locator(".scanner-details");
      await expect(details).toHaveAttribute("aria-busy", "false");
      const metrics = await details.evaluate((el) => ({
        height: el.clientHeight,
        content: el.scrollHeight,
        overflow: getComputedStyle(el).overflowY,
        fontSize: parseFloat(
          getComputedStyle(el.querySelector("p.muted")!).fontSize,
        ),
      }));
      expect(metrics.overflow).toBe("visible");
      expect(metrics.content).toBeLessThanOrEqual(metrics.height + 1);
      expect(metrics.fontSize).toBeGreaterThanOrEqual(16);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      for (const card of await page
        .locator(".project-deck button,.docked-token")
        .all()) {
        const box = await card.boundingBox();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      }
    }
  }
});

test("mobile scanner scrolls to revealed details after scanning", async ({
  page,
  isMobile,
}) => {
  test.skip(
    !isMobile,
    "Only the stacked mobile scanner should scroll to details.",
  );
  for (const reducedMotion of ["no-preference", "reduce"] as const) {
    await page.emulateMedia({ reducedMotion });
    for (const route of ["/", "/de/"]) {
      await page.goto(route);
      await page.locator(".project-deck button[data-project-id=php]").click();
      const details = page.locator(".scanner-details");
      if (reducedMotion === "no-preference") {
        await expect(page.locator(".scanner-pad")).toHaveAttribute(
          "data-phase",
          "scanning",
        );
        expect((await details.boundingBox())!.y).toBeGreaterThan(300);
      }
      await expect(details).toHaveAttribute("aria-busy", "false");
      await expect
        .poll(async () => Math.round((await details.boundingBox())!.y))
        .toBe(
          await page.evaluate(() =>
            parseFloat(
              getComputedStyle(document.documentElement).scrollPaddingTop,
            ),
          ),
        );
      const header = await page.locator(".site-header").boundingBox();
      expect((await details.boundingBox())!.y).toBeGreaterThanOrEqual(
        header!.y + header!.height,
      );
      await expect(page.locator(".scanner-reveal h3")).toBeInViewport();
      // Clearing the scanner does not scroll back to the now-empty details.
      await page.locator(".docked-token").click();
      await expect(page.locator(".scanner-pad")).toHaveAttribute(
        "data-phase",
        "idle",
      );
      expect((await details.boundingBox())!.y).toBeGreaterThan(300);
    }
  }
});
