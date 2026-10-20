import { auditProjectContrast } from "./project-contrast";
import { test, expect, type Page } from "@playwright/test";
async function revealAllListProjects(page: Page) {
  const button = page.getByRole("button", {
    name: /^(Show all \d+ projects|Alle \d+ Projekte anzeigen)$/,
  });
  if (await button.isVisible()) await button.click();
}

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
    "LDAP and Active Directory",
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

test("header stays accessible and anchor headings stay below it", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Experience", exact: true }).click();
  await expect(page).toHaveURL(/#experience$/);
  if (!isMobile)
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
    await expect(page.locator(".project-deck button")).toHaveCount(7);
    await expect(page.locator(".project-scanner img")).toHaveCount(0);
    await expect(page.locator(".skill-card")).toHaveCount(5);
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
            ? "PHP intranet modernization"
            : "Modernisierung eines PHP-Intranets"
          : i === 1
            ? "SpinWheels"
            : route === "/"
              ? "Developer portfolio"
              : "Entwicklerportfolio",
      );
      await expect(page.locator(".scanner-status")).toHaveText(
        route === "/" ? "Scan complete" : "Scan abgeschlossen",
      );
      if (i === 1)
        await expect(page.locator(".scanner-details")).toContainText(
          route === "/" ? "breadth-first search" : "Breitensuche",
        );
    }
    await page.locator(".docked-token").click();
    await expect(page.locator(".docked-token")).toHaveCount(0);
    if ((page.viewportSize()?.width ?? 0) > 850)
      await expect(page.locator(".scanner-empty")).toBeVisible();
    else await expect(page.locator(".scanner-empty")).toBeHidden();
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
  await expect(page.locator(".scanner-details")).toContainText("MoveStrategy");
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
  await expect(page.locator(".scanner-reveal")).toContainText("MoveStrategy");
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
  await expect(page.locator(".scanner-reveal")).toContainText("MoveStrategy");
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
  if ((page.viewportSize()?.width ?? 0) > 850)
    expect(dock!.height).toBeCloseTo(before!.height, 0);
  else
    await expect
      .poll(
        async () => (await page.locator(".docked-token").boundingBox())!.height,
      )
      .toBeLessThan(170);
  await page
    .locator(".project-deck button[data-project-id=mission-life]")
    .click();
  const returning = page.locator(
    '.tray-flight-layer button[data-project-id="php"]',
  );
  await expect(returning).toBeVisible();
  expect(
    await returning.evaluate((el) =>
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
    await expect(deck).toHaveCount(7);
    expect(
      (await page.locator(".scanner-layout").boundingBox())!.height,
    ).toBeLessThan(400);
    for (const index of [5, 6]) {
      const face = await deck.nth(index).evaluate((el) => ({
        width: el.clientWidth,
        height: el.clientHeight,
        titleSize: getComputedStyle(el.querySelector(".token-title")!).fontSize,
      }));
      await deck.nth(index).click();
      await expect(page.locator(".scanner-reveal h3")).toHaveText(
        index === 5 ? "Mission-Life" : "Mission-Chess",
      );
      const scanned = await page.locator(".docked-token").evaluate((el) => ({
        width: el.clientWidth,
        height: el.clientHeight,
        titleSize: getComputedStyle(el.querySelector(".token-title")!).fontSize,
      }));
      if ((page.viewportSize()?.width ?? 0) > 850)
        expect(scanned).toEqual(face);
      else {
        expect(scanned.width).toBe(face.width);
        expect(scanned.height).toBeLessThan(170);
      }
      await expect(page.locator(".scanner-reveal")).toContainText(
        index === 5 ? "JavaFX" : "Swing",
      );
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("featured development projects lead and PHP and ITSM have separate details", async ({
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
      "spinwheels",
      "portfolio",
      "products",
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
      route === "/"
        ? "GLPI IT service management"
        : "GLPI IT-Service-Management",
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
    await expect(
      page.locator('.hero-cv a[hreflang="' + locale + '"]'),
    ).toHaveAttribute("href", "/cv/bruno-pinto-cv-" + locale + ".pdf");
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
          getComputedStyle(el.querySelector("p.project-description")!).fontSize,
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
        await card.scrollIntoViewIfNeeded();
        const box = await card.boundingBox();
        expect(box!.x).toBeGreaterThanOrEqual(0);
        expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      }
    }
  }
});

test("mobile scanner settles compact header above readable details after scanning", async ({
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
      await expect(
        page.locator(".project-deck button[data-project-id=php]"),
      ).toBeFocused();
    }
  }
});

test("mobile header hides scrolling down and returns scrolling up or using the keyboard", async ({
  page,
  isMobile,
}) => {
  await page.goto("/");
  const header = page.locator(".site-header");
  await page.evaluate(() => window.scrollTo({ top: 900, behavior: "instant" }));
  if (isMobile) {
    await expect
      .poll(async () =>
        Math.round(
          (await header.boundingBox())!.y +
            (await header.boundingBox())!.height,
        ),
      )
      .toBeLessThanOrEqual(0);
    await page.evaluate(() =>
      window.scrollTo({ top: 600, behavior: "instant" }),
    );
    await expect
      .poll(async () => Math.round((await header.boundingBox())!.y))
      .toBe(0);
    await page.evaluate(() =>
      window.scrollTo({ top: 1000, behavior: "instant" }),
    );
    await expect(header).toHaveAttribute("data-scroll-hidden", "true");
    await page.keyboard.press("Tab");
    await page.locator(".wordmark").focus();
    await expect
      .poll(async () => Math.round((await header.boundingBox())!.y))
      .toBe(0);
    await page
      .locator(".wordmark")
      .evaluate((el) => (el as HTMLElement).blur());
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await expect
      .poll(async () => Math.round((await header.boundingBox())!.y))
      .toBe(0);
  } else {
    await expect
      .poll(async () => Math.round((await header.boundingBox())!.y))
      .toBe(0);
  }
});

test("list view exposes project evidence and timeline links without scanning", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/de/"]) {
    const english = route === "/";
    await page.goto(route);
    const listButton = page.getByRole("button", {
      name: english ? "List view" : "Listenansicht",
      exact: true,
    });
    await listButton.focus();
    await page.keyboard.press("Enter");
    await expect(listButton).toHaveAttribute("aria-pressed", "true");
    await expect(page.locator(".scanner-frame")).toBeHidden();
    await revealAllListProjects(page);
    await expect(page.locator(".project-list-item")).toHaveCount(7);
    expect(
      await page
        .locator(".project-list-group")
        .first()
        .locator(".project-list-item")
        .evaluateAll((items) =>
          items.map((i) => i.getAttribute("data-list-project")),
        ),
    ).toEqual(["php", "spinwheels", "portfolio"]);
    const php = page.locator('[data-list-project="php"]');
    await expect(php).toContainText(
      english ? "PHP 5-era code to PHP 8" : "PHP-5-Code auf PHP 8",
    );
    await expect(php).toContainText(
      english
        ? "Centralized database access"
        : "Datenbankzugriffe zentralisiert",
    );
    for (const [id, repo] of [
      ["portfolio", "portfolio"],
      ["mission-life", "Mission-Life"],
      ["mission-chess", "Mission-Chess"],
    ]) {
      await expect(
        page.locator('[data-list-project="' + id + '"] a'),
      ).toHaveAttribute("href", "https://github.com/Bruno-Pinto/" + repo);
    }
    await page.locator(".job [data-project-target=php]").first().click();
    await expect(php).toBeFocused();
    await expect(php.locator("details")).toHaveAttribute("open", "");
    await expect(listButton).toHaveAttribute("aria-pressed", "true");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page
      .getByRole("button", {
        name: english ? "Scanner view" : "Scanner-Ansicht",
        exact: true,
      })
      .click();
    await page
      .locator(".project-deck button[data-project-id=portfolio]")
      .click();
    await expect(page.locator(".scanner-reveal a")).toHaveAttribute(
      "href",
      "https://github.com/Bruno-Pinto/portfolio",
    );
    await listButton.click();
    await page
      .getByRole("button", {
        name: english ? "Scanner view" : "Scanner-Ansicht",
        exact: true,
      })
      .click();
    await expect(page.locator(".docked-token")).toHaveAttribute(
      "data-project-id",
      "portfolio",
    );
    await expect(page.locator(".scanner-details")).toHaveAttribute(
      "aria-busy",
      "false",
    );
  }
});

test("switching to list view during a scan does not leave the scanner waiting", async ({
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
  await page.getByRole("button", { name: "List view", exact: true }).click();
  await expect(page.locator(".project-list")).toBeVisible();
  await page.getByRole("button", { name: "Scanner view", exact: true }).click();
  await expect(page.locator(".scanner-reveal h3")).toHaveText("SpinWheels");
});

test("skills prioritize development and open project evidence in either view", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/de/"]) {
    const english = route === "/";
    await page.goto(route);
    expect(await page.locator(".skill-card h3").allTextContents()).toEqual(
      english
        ? [
            "Backend",
            "Web frontend",
            "Desktop & testing",
            "Tooling & deployment",
            "Additional experience",
          ]
        : [
            "Backend",
            "Web-Frontend",
            "Desktop & Tests",
            "Werkzeuge & Deployment",
            "Weitere Erfahrung",
          ],
    );
    await expect(page.locator(".skill-frontend")).toContainText(
      english ? "Currently learning" : "lerne ich gerade",
    );
    await page.locator(".skill-backend a[data-project-target=php]").click();
    await expect(page.locator(".docked-token")).toHaveAttribute(
      "data-project-id",
      "php",
    );
    await expect(page.locator(".scanner-details")).toHaveAttribute(
      "aria-busy",
      "false",
    );
    await page
      .getByRole("button", {
        name: english ? "List view" : "Listenansicht",
        exact: true,
      })
      .click();
    await page.locator(".skill-frontend a").click();
    const portfolio = page.locator('[data-list-project="portfolio"]');
    await expect(portfolio).toBeFocused();
    await expect(portfolio.locator("details")).toHaveAttribute("open", "");
    await expect(page.locator(".scanner-frame")).toBeHidden();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("skills fill their cards with legacy grid styles and icons keep intrinsic dimensions", async ({
  page,
}) => {
  for (const width of [320, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/de/"]) {
      await page.goto(route);
      // Reproduce the old two-column card rule seen in the reported screenshot.
      await page.addStyleTag({
        content:
          ".skill-card { display: grid !important; grid-template-columns: 36px minmax(0, 1fr) !important; }",
      });
      const widths = await page.locator(".skill-card").evaluateAll((cards) =>
        cards.map((card) => {
          const style = getComputedStyle(card);
          return {
            available:
              card.clientWidth -
              parseFloat(style.paddingLeft) -
              parseFloat(style.paddingRight),
            content: card.querySelector(".skill-body")!.getBoundingClientRect()
              .width,
          };
        }),
      );
      for (const size of widths)
        expect(size.content).toBeGreaterThanOrEqual(size.available - 1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      // SVG defaults must remain small if a stylesheet is unavailable.
      await page.evaluate(() => {
        for (const sheet of document.styleSheets) sheet.disabled = true;
      });
      const sizes = await page
        .locator(".hero-links svg, .contact-section svg")
        .evaluateAll((icons) =>
          icons.map((icon) => ({
            width: icon.getBoundingClientRect().width,
            height: icon.getBoundingClientRect().height,
          })),
        );
      expect(sizes.length).toBeGreaterThanOrEqual(8);
      for (const size of sizes) {
        expect(size.width).toBeCloseTo(16, 2);
        expect(size.height).toBeCloseTo(16, 2);
      }
    }
  }
});

test("skills and personal about are separate, localized and use local logos", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/de/"]) {
    const english = route === "/";
    await page.goto(route);
    expect(
      await page
        .locator("main > section[id]")
        .evaluateAll((sections) => sections.map((s) => s.id)),
    ).toEqual(["experience", "work", "skills", "about", "contact"]);
    await expect(page.locator(".site-header nav a")).toHaveCount(5);
    await expect(page.locator("#about .skill-card")).toHaveCount(0);
    await expect(page.locator("#skills .skill-card")).toHaveCount(5);
    await expect(page.locator("#about")).toContainText("Portugal");
    await expect(page.locator("#about")).toContainText(
      english ? "guitar" : "Gitarre",
    );
    await expect(page.locator("#about img")).toHaveAttribute(
      "src",
      "/images/bruno-at-desk.png",
    );
    await expect(page.locator(".hero img")).toHaveAttribute(
      "src",
      "/images/portrait-new.jpg",
    );
    await expect(page.locator("#about .about-panel")).toHaveCount(5);
    expect(
      await page
        .locator("#skills, #about")
        .evaluateAll((sections) =>
          sections.every((section) => !section.innerHTML.includes("undefined")),
        ),
    ).toBe(true);
    const logos = page.locator("#skills img");
    expect(await logos.count()).toBeGreaterThan(12);
    await logos.evaluateAll((images) =>
      images.forEach((img) => {
        if (img instanceof HTMLImageElement) img.loading = "eager";
      }),
    );
    await expect
      .poll(() =>
        logos.evaluateAll((images) =>
          images.every(
            (img) =>
              img instanceof HTMLImageElement &&
              img.complete &&
              img.naturalWidth > 0,
          ),
        ),
      )
      .toBe(true);
    for (const href of ["#skills", "#about"]) {
      const link = page.locator('.site-header nav a[href="' + href + '"]');
      await link.focus();
      await page.keyboard.press("Enter");
      await expect(page).toHaveURL(new RegExp(href + "$"));
      await expect(link).toHaveAttribute("aria-current", "location");
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("personal map respects reduced motion and small-screen layout", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#about");
  await page.locator(".about-map").scrollIntoViewIfNeeded();
  await expect(page.locator(".about-map")).toHaveAttribute(
    "data-active",
    "true",
  );
  for (const panel of await page.locator(".about-panel").all()) {
    expect(await panel.evaluate((e) => getComputedStyle(e).animationName)).toBe(
      "none",
    );
  }
  if (isMobile) {
    for (const line of await page.locator(".about-connections").all()) {
      await expect(line).toBeHidden();
    }
  } else {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    expect(
      await page
        .locator(".about-panel")
        .first()
        .evaluate((e) => getComputedStyle(e).animationName),
    ).toBe("none");
    const photoFrame = page.locator("[data-about-portrait] img").locator("..");
    expect(
      await photoFrame.evaluate(
        (e) => getComputedStyle(e, "::after").animationIterationCount,
      ),
    ).toBe("1");
  }
});

test("footer top link returns to the document start", async ({ page }) => {
  for (const route of ["/", "/de/"]) {
    await page.goto(route);
    const link = page.locator('footer a[href="#top"]');
    await link.scrollIntoViewIfNeeded();
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(500);
    await link.click();
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeLessThan(2);
    await expect(page.locator("#hero-title")).toBeInViewport();
  }
});

test("identity map connectors meet photo and topic anchors after resize", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/de/"]) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(route + "#about");
    await expect(page.locator("[data-connect-to]")).toHaveCount(5);
    for (const width of [1440, 1200]) {
      await page.setViewportSize({ width, height: 1000 });
      await expect
        .poll(async () =>
          page.locator(".about-connections").evaluate((svg) => {
            const bounds = svg.getBoundingClientRect();
            return Array.from(
              svg.querySelectorAll<SVGPathElement>("path"),
            ).every((path) => {
              if (!path.getAttribute("d")) return false;
              const id = path.dataset.connectTo;
              const start = document
                .querySelector('[data-profile-anchor="' + id + '"]')!
                .getBoundingClientRect();
              const end = document
                .querySelector('[data-panel="' + id + '"] [data-node-anchor]')!
                .getBoundingClientRect();
              const first = path.getPointAtLength(0),
                last = path.getPointAtLength(path.getTotalLength());
              return (
                Math.abs(first.x + bounds.left - start.left - start.width / 2) <
                  1 &&
                Math.abs(first.y + bounds.top - start.top - start.height / 2) <
                  1 &&
                Math.abs(last.x + bounds.left - end.left - end.width / 2) < 1 &&
                Math.abs(last.y + bounds.top - end.top - end.height / 2) < 1
              );
            });
          }),
        )
        .toBe(true);
    }
    expect(
      await page.locator(".about-connections").evaluate((svg) => {
        const bounds = svg.getBoundingClientRect();
        const text = Array.from(
          document.querySelectorAll(
            "#about .about-panel p, #about .about-panel h3, #about figcaption",
          ),
        ).flatMap((node) => {
          const range = document.createRange();
          range.selectNodeContents(node);
          return Array.from(range.getClientRects());
        });
        return Array.from(svg.querySelectorAll<SVGPathElement>("path")).every(
          (path) => {
            for (let length = 0; length <= path.getTotalLength(); length += 3) {
              const point = path.getPointAtLength(length),
                x = point.x + bounds.left,
                y = point.y + bounds.top;
              if (
                text.some(
                  (box) =>
                    x > box.left &&
                    x < box.right &&
                    y > box.top &&
                    y < box.bottom,
                )
              )
                return false;
            }
            return true;
          },
        );
      }),
    ).toBe(true);
    const panel = page.locator('[data-panel="background"]');
    const path = page.locator('[data-connect-to="background"]');
    const rest = await path.evaluate((node) => getComputedStyle(node).stroke);
    await panel.hover();
    expect(
      await path.evaluate((node) => getComputedStyle(node).stroke),
    ).not.toBe(rest);
    await expect(page.locator("#about .about-panel[tabindex]")).toHaveCount(0);
    await page.setViewportSize({ width: 768, height: 1000 });
    await expect(page.locator(".about-connections")).toBeHidden();
  }
});

test("section hierarchy and full-height hero stay consistent across languages", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/de/"]) {
    await page.goto(route);
    const headings = await page.locator("main h2").evaluateAll((elements) =>
      elements.map((e) => {
        const s = getComputedStyle(e);
        return [s.color, s.fontSize, s.fontWeight, s.lineHeight].join("|");
      }),
    );
    expect(headings).toHaveLength(5);
    expect(new Set(headings).size).toBe(1);
    expect(
      await page
        .locator(".hero")
        .evaluate(
          (e) =>
            e.getBoundingClientRect().height +
              document.querySelector(".site-header")!.getBoundingClientRect()
                .height >=
            innerHeight - 1,
        ),
    ).toBe(true);
    await expect(page.locator(".hero-focus, .hero-wayfinding")).toHaveCount(0);
    for (const link of await page.locator(".hero-links a, .cv-note a").all()) {
      const frame = await link.evaluate((e) => ({
        height: e.getBoundingClientRect().height,
        border: getComputedStyle(e).borderTopWidth,
      }));
      expect(frame.height).toBeGreaterThanOrEqual(48);
      expect(frame.border).toBe("1px");
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("approved contributions are equivalent in scanner and list views", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/de/"]) {
    const english = route === "/";
    await page.goto(route);
    const snapshots: { id: string; text: string[] }[] = [];
    const cases = [
      {
        id: "php",
        terms: [
          "PHP 8",
          "LDAP",
          "GitLab",
          english ? "public files" : "Öffentliche Dateien",
          english ? "production" : "produktiv",
        ],
      },
      {
        id: "spinwheels",
        terms: [
          english ? "breadth-first search" : "Breitensuche",
          "FXML",
          "MoveStrategy",
          english ? "controlled mistakes" : "gezielte Fehler",
        ],
      },
      {
        id: "products",
        terms: [
          "Rocketlaunch",
          "Kork Tech",
          "Xano",
          english ? "content management" : "Content-Management",
          english ? "user acquisition" : "Nutzergewinnung",
        ],
      },
      {
        id: "itsm",
        terms: [
          "GLPI",
          "Docker",
          "HTTPS",
          "TLS",
          "LDAPS",
          "SMTP",
          english ? "ticketing workflows" : "Ticket-Workflows",
        ],
      },
    ];
    for (const project of cases) {
      await page
        .locator('.project-deck button[data-project-id="' + project.id + '"]')
        .click();
      const scanner = page.locator(".scanner-reveal");
      await expect(scanner).toBeVisible();
      for (const term of project.terms)
        await expect(scanner).toContainText(new RegExp(term, "i"));
      if (project.id === "spinwheels") {
        await expect(
          scanner.getByRole("heading", {
            name: english ? "Application features" : "Funktionen der Anwendung",
            exact: true,
          }),
        ).toBeVisible();
      }
      await expect(
        scanner.getByRole("heading", {
          name: english ? "My contributions" : "Meine Beiträge",
          exact: true,
        }),
      ).toBeVisible();
      snapshots.push({
        id: project.id,
        text: await scanner.locator("p, li").allTextContents(),
      });
    }
    await page
      .getByRole("button", {
        name: english ? "List view" : "Listenansicht",
        exact: true,
      })
      .click();
    await revealAllListProjects(page);
    for (const snapshot of snapshots) {
      const item = page.locator('[data-list-project="' + snapshot.id + '"]');
      await item.locator("summary").click();
      for (const paragraph of snapshot.text)
        await expect(item).toContainText(paragraph);
      await expect(
        item.getByRole("heading", {
          name: english ? "Key contributions" : "Meine Beiträge",
          exact: true,
        }),
      ).toBeVisible();
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("calm list cards disclose all projects accessibly without keyword highlighting", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/de/"]) {
    const english = route === "/";
    await page.goto(route);
    await page
      .getByRole("button", {
        name: english ? "List view" : "Listenansicht",
        exact: true,
      })
      .click();
    await revealAllListProjects(page);
    const cards = page.locator(".project-list-item");
    await expect(cards).toHaveCount(7);
    for (const card of await cards.all()) {
      const trigger = card.locator("summary");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await expect(card.locator(".project-expanded")).toBeHidden();
      const highlights = card.locator(".project-key-contributions li");
      expect(await highlights.count()).toBeGreaterThanOrEqual(2);
      expect(await highlights.count()).toBeLessThanOrEqual(2);
      for (const highlight of await highlights.all())
        await expect(highlight).toBeVisible();
      const target = await trigger.getAttribute("aria-controls");
      expect(target).toBeTruthy();
      await trigger.focus();
      await trigger.press("Enter");
      await expect(trigger).toHaveAttribute("aria-expanded", "true");
      await expect(card.locator('[id="' + target + '"]')).toBeVisible();
      expect(
        await trigger.evaluate((e) => getComputedStyle(e).outlineStyle),
      ).not.toBe("none");
      await trigger.press("Space");
      await expect(trigger).toHaveAttribute("aria-expanded", "false");
      await expect(card.locator(".project-expanded")).toBeHidden();
    }
    await expect(page.locator("#work .technical-term")).toHaveCount(0);
    await expect(page.locator("#work")).not.toContainText("[[");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("list show-all is independent of project disclosures and restores focus on collapse", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const order = [
    "php",
    "spinwheels",
    "portfolio",
    "products",
    "itsm",
    "mission-life",
    "mission-chess",
  ];
  for (const route of ["/", "/de/"]) {
    const english = route === "/";
    await page.goto(route);
    await expect(page.locator(".project-deck button")).toHaveCount(7);
    await page
      .getByRole("button", {
        name: english ? "List view" : "Listenansicht",
        exact: true,
      })
      .click();
    const control = page.locator(".project-list-toggle button");
    await expect(control).toHaveText(
      english ? "Show all 7 projects" : "Alle 7 Projekte anzeigen",
    );
    await expect(control).toHaveAttribute("aria-expanded", "false");
    expect(
      await page
        .locator(".project-list-item:visible")
        .evaluateAll((items) =>
          items.map((item) => (item as HTMLElement).dataset.listProject),
        ),
    ).toEqual(order.slice(0, 3));
    const first = page.locator('[data-list-project="php"] details');
    await first.locator("summary").click();
    await control.focus();
    await control.press("Enter");
    await expect(control).toHaveAttribute("aria-expanded", "true");
    expect(
      await page
        .locator(".project-list-item:visible")
        .evaluateAll((items) =>
          items.map((item) => (item as HTMLElement).dataset.listProject),
        ),
    ).toEqual(order);
    const last = page.locator('[data-list-project="mission-chess"] details');
    await last.locator("summary").click();
    await last.locator("summary").focus();
    // Programmatic activation deliberately keeps focus inside the part being hidden.
    await control.evaluate((button: HTMLButtonElement) => button.click());
    await expect(control).toBeFocused();
    await expect(control).toBeInViewport();
    await expect(page.locator(".project-list-item:visible")).toHaveCount(3);
    await expect(first).toHaveAttribute("open", "");
    for (let iteration = 0; iteration < 2; iteration++) {
      await control.press("Space");
      await expect(page.locator(".project-list-item:visible")).toHaveCount(7);
      await expect(last).toHaveAttribute("open", "");
      await control.scrollIntoViewIfNeeded();
      const before = await control.evaluate(
        (element) => element.getBoundingClientRect().top,
      );
      await control.click();
      await expect(page.locator(".project-list-item:visible")).toHaveCount(3);
      await expect(control).toBeInViewport();
      await expect
        .poll(() =>
          control
            .evaluate((element) => element.getBoundingClientRect().top)
            .then((top) => Math.abs(top - before)),
        )
        .toBeLessThan(12);
    }
    await page.locator(".job [data-project-target=itsm]").first().click();
    await expect(control).toHaveAttribute("aria-expanded", "true");
    await expect(page.locator('[data-list-project="itsm"]')).toBeFocused();
    await expect(
      page.locator('[data-list-project="itsm"] details'),
    ).toHaveAttribute("open", "");
    await page
      .getByRole("button", {
        name: english ? "Scanner view" : "Scanner-Ansicht",
        exact: true,
      })
      .click();
    await expect(page.locator(".project-deck button")).toHaveCount(7);
    await page
      .locator('.project-deck button[data-project-id="mission-chess"]')
      .focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".scanner-reveal h3")).toHaveText(
      "Mission-Chess",
    );
  }
});

test("scanner hand keeps seven upright cards with a swipe rail on small screens", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".project-deck button")).toHaveCount(7);
  const desktop = (page.viewportSize()?.width ?? 0) >= 1200;
  const geometry = await page
    .locator(".project-deck button")
    .evaluateAll((cards) =>
      cards.map((card) => {
        const box = card.getBoundingClientRect();
        return {
          left: box.left,
          right: box.right,
          width: box.width,
          height: box.height,
        };
      }),
    );
  if (desktop) {
    for (let index = 1; index < geometry.length; index++)
      expect(geometry[index].left).toBeLessThan(geometry[index - 1].right);
    await page.locator(".project-deck button").first().focus();
    expect(
      await page
        .locator(".project-slot")
        .first()
        .evaluate((element) => getComputedStyle(element).zIndex),
    ).toBe("30");
  } else {
    expect(
      await page
        .locator(".project-deck")
        .evaluate((element) => element.scrollWidth > element.clientWidth),
    ).toBe(true);
    const next = page.getByRole("button", {
      name: "Next projects",
      exact: true,
    });
    await next.click();
    await expect
      .poll(() =>
        page.locator(".project-deck").evaluate((element) => element.scrollLeft),
      )
      .toBeGreaterThan(0);
  }
  await page.locator(".project-deck button").last().focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".scanner-reveal h3")).toHaveText("Mission-Chess");
  await expect(page.locator("#work .technical-term")).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
});

test("deck layers, fixed faces and featured foil survive repeated flights", async ({
  page,
}) => {
  test.setTimeout(90000);
  for (const route of ["/", "/de/"]) {
    await page.goto(route);
    const cards = page.locator(".project-deck button");
    const desktop = (page.viewportSize()?.width ?? 0) >= 1200;
    await expect(cards).toHaveCount(7);
    expect(
      await cards.evaluateAll((nodes) =>
        nodes
          .filter((n) => n.dataset.featured === "true")
          .map((n) => n.dataset.projectId),
      ),
    ).toEqual(["php", "spinwheels", "portfolio"]);
    for (let i = 0; i < 7; i++) {
      const card = cards.nth(i);
      if (desktop) {
        await page.locator(".project-view-controls button").first().focus();
        await card.hover({ position: { x: 12, y: 20 } });
        await expect
          .poll(() =>
            card.evaluate((n) => getComputedStyle(n.parentElement!).zIndex),
          )
          .toBe("30");
        await page.mouse.move(0, 0);
        await expect
          .poll(() =>
            card.evaluate((n) => getComputedStyle(n.parentElement!).zIndex),
          )
          .toBe(String(i + 1));
      }
      await card.focus();
      await expect
        .poll(() =>
          card.evaluate((n) => getComputedStyle(n.parentElement!).zIndex),
        )
        .toBe(desktop ? "30" : String(i + 1));
      expect(
        await card.evaluate((n) =>
          Array.from(n.children).every(
            (child) =>
              child.getBoundingClientRect().bottom <=
              n.getBoundingClientRect().bottom,
          ),
        ),
      ).toBe(true);
    }
    await page.locator(".project-view-controls button").first().focus();
    expect(
      await page
        .locator(".project-slot")
        .evaluateAll((nodes) => nodes.map((n) => getComputedStyle(n).zIndex)),
    ).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
    await expect
      .poll(() =>
        cards.evaluateAll((nodes) =>
          nodes.every((card) => getComputedStyle(card).scale === "none"),
        ),
      )
      .toBe(true);
    const boxes = await cards.evaluateAll((nodes) =>
      nodes.map((n) => ({
        width: n.getBoundingClientRect().width,
        height: n.getBoundingClientRect().height,
        top: n.getBoundingClientRect().top,
      })),
    );
    for (const box of boxes) {
      expect(box.width).toBeCloseTo(boxes[0].width);
      expect(box.height).toBeCloseTo(boxes[0].height);
      expect(box.top).toBeCloseTo(boxes[0].top);
    }
    // Switch directly, then return; repeat with a different resting position.
    for (const index of [0, 4, 1]) {
      await cards.nth(index).focus();
      await page.keyboard.press("Enter");
      await expect(page.locator(".scanner-feedback")).toHaveAttribute(
        "data-phase",
        "ready",
      );
    }
    await page.locator(".docked-token").focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".tray-flight-layer")).toHaveCount(0);
    await expect(page.locator("[data-tray-flight]")).toHaveCount(0);
    await page.locator(".project-view-controls button").first().focus();
    expect(
      await page
        .locator(".project-slot")
        .evaluateAll((nodes) => nodes.map((n) => getComputedStyle(n).zIndex)),
    ).toEqual(["1", "2", "3", "4", "5", "6", "7"]);
    expect(
      await cards.evaluateAll((nodes) =>
        nodes.every(
          (n) => !n.style.transform && !n.style.translate && !n.style.zIndex,
        ),
      ),
    ).toBe(true);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("connected deck has featured-only resting sheen and readable spacing", async ({
  page,
}) => {
  for (const route of ["/", "/de/"]) {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(route);
    await expect(page.locator(".deck-heading")).toHaveCount(0);
    const gap = await page
      .locator(".project-deck")
      .evaluate(
        (deck) =>
          deck.getBoundingClientRect().top -
          document.querySelector(".scanner-frame")!.getBoundingClientRect()
            .bottom,
      );
    expect(Math.abs(gap)).toBeLessThan(2);
    const finishes = await page
      .locator(".project-deck .project-token")
      .evaluateAll((cards) =>
        cards.map((card) => ({
          featured: card.getAttribute("data-featured"),
          animation: getComputedStyle(card, "::after").animationName,
        })),
      );
    expect(
      finishes.filter((card) => card.animation === "featured-card-sheen"),
    ).toHaveLength(3);
    expect(
      finishes
        .filter((card) => card.featured !== "true")
        .every((card) => card.animation === "none"),
    ).toBe(true);
    if ((page.viewportSize()?.width ?? 0) >= 1200) {
      const cards = page.locator(".project-deck button");
      const first = await cards.first().boundingBox(),
        second = await cards.nth(1).boundingBox();
      expect(second!.x - first!.x).toBeGreaterThanOrEqual(190);
      await cards.first().focus();
      await expect
        .poll(() =>
          cards.nth(1).evaluate((card) => getComputedStyle(card).filter),
        )
        .toBe("brightness(0.78)");
      expect(
        await cards.first().evaluate((card) => getComputedStyle(card).filter),
      ).toBe("none");
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    expect(
      await page
        .locator('.project-deck [data-featured="true"].project-token')
        .first()
        .evaluate((card) => getComputedStyle(card, "::after").animationName),
    ).toBe("none");
  }
});

test("desktop deck drags over cards without scanning and still accepts clicks", async ({
  page,
  isMobile,
}) => {
  test.skip(isMobile, "Native touch scrolling is preserved on mobile");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/de/"]) {
    await page.goto(route);
    const rail = page.locator(".project-deck");
    await rail.scrollIntoViewIfNeeded();
    const card = await rail.locator("button").nth(2).boundingBox();
    const x = card!.x + 20,
      y = card!.y + 60;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x - 170, y, { steps: 12 });
    await expect(rail).toHaveAttribute("data-dragging", "true");
    await expect
      .poll(() => rail.evaluate((el) => el.scrollLeft))
      .toBeGreaterThan(100);
    await page.mouse.up();
    await expect(rail).not.toHaveAttribute("data-dragging");
    await expect(page.locator(".scanner-feedback")).toHaveAttribute(
      "data-phase",
      "idle",
    );
    const before = await rail.evaluate((el) => el.scrollLeft);
    const box = await rail.boundingBox();
    await page.mouse.move(box!.x + 40, y);
    await page.mouse.down();
    await page.mouse.move(box!.x + 250, y, { steps: 12 });
    await page.mouse.up();
    await expect
      .poll(() => rail.evaluate((el) => el.scrollLeft))
      .toBeLessThan(before);
    await expect(page.locator(".docked-token")).toHaveCount(0);
    // Cancellation releases the grab without trapping subsequent interaction.
    await rail.dispatchEvent("pointerdown", {
      pointerType: "mouse",
      pointerId: 99,
      button: 0,
      isPrimary: true,
      clientX: 300,
    });
    await rail.dispatchEvent("pointercancel", { pointerId: 99 });
    await expect(rail).not.toHaveAttribute("data-dragging");
    await rail
      .locator("button")
      .first()
      .click({ position: { x: 20, y: 60 } });
    await expect(page.locator(".docked-token")).toHaveAttribute(
      "data-project-id",
      "php",
    );
    await page.locator(".docked-token").focus();
    await page.keyboard.press("Enter");
    await expect(page.locator(".docked-token")).toHaveCount(0);
  }
});

test("project category identity and computed text contrast remain consistent", async ({
  page,
}, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const measurements: { state: string; minimum: number }[] = [];
  async function audit(state: string) {
    const results = await auditProjectContrast(page);
    expect(results.length).toBeGreaterThan(10);
    const failures = results.filter((result) => result.ratio < result.required);
    expect(failures, state).toEqual([]);
    measurements.push({
      state,
      minimum: Math.min(...results.map((result) => result.ratio)),
    });
  }
  for (const route of ["/", "/de/"]) {
    await page.goto(route);
    const kinds = [
      "professional",
      "university",
      "personal",
      "professional",
      "infrastructure",
      "personal",
      "personal",
    ];
    expect(
      await page
        .locator(".project-deck button")
        .evaluateAll((cards) =>
          cards.map((card) => card.getAttribute("data-project-kind")),
        ),
    ).toEqual(kinds);
    const categoryColors = await page
      .locator(".project-deck .token-top > span:last-child")
      .evaluateAll((labels) =>
        labels.map((label) => getComputedStyle(label).color),
      );
    await audit(route + " resting deck");
    for (let i = 0; i < 7; i++) {
      const card = page.locator(".project-deck button").nth(i);
      await card.focus();
      await audit(route + " focused card " + i);
      await page.keyboard.press("Enter");
      await expect(page.locator(".scanner-reveal")).toBeVisible();
      await expect(page.locator(".scanner-details")).toHaveAttribute(
        "data-project-kind",
        kinds[i],
      );
      await expect(page.locator(".docked-token")).toHaveAttribute(
        "data-project-kind",
        kinds[i],
      );
      await expect(page.locator(".scanner-reveal > .eyebrow")).toHaveCSS(
        "color",
        categoryColors[i],
      );
      await audit(route + " scanner " + i);
    }
    await page
      .getByRole("button", {
        name: route === "/" ? "List view" : "Listenansicht",
        exact: true,
      })
      .click();
    await revealAllListProjects(page);
    expect(
      await page
        .locator(".project-list-item")
        .evaluateAll((cards) =>
          cards.map((card) => card.getAttribute("data-project-kind")),
        ),
    ).toEqual(kinds);
    expect(
      await page
        .locator(".project-list-heading .eyebrow")
        .evaluateAll((labels) =>
          labels.map((label) => getComputedStyle(label).color),
        ),
    ).toEqual(categoryColors);
    await audit(route + " collapsed list");
    for (const summary of await page
      .locator(".project-disclosure summary")
      .all()) {
      await summary.focus();
      await summary.press("Enter");
    }
    await audit(route + " expanded list with focus");
    const summary = page.locator(".project-disclosure summary").first();
    await summary.hover();
    await audit(route + " disclosure hover");
    const link = page
      .locator(".project-list-item .project-source-link")
      .first();
    await link.hover();
    await audit(route + " source hover");
    await link.focus();
    await audit(route + " source focus");
  }
  console.log(
    "Minimum measured project contrast (" +
      testInfo.project.name +
      "): " +
      Math.min(...measurements.map((entry) => entry.minimum)).toFixed(2) +
      ":1",
  );
  await testInfo.attach("computed-project-contrast", {
    body: JSON.stringify(measurements, null, 2),
    contentType: "application/json",
  });
});

test("project footer action fills the card and supports row, touch and keyboard activation", async ({
  page,
  isMobile,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/de/"]) {
    await page.goto(route);
    const english = route === "/";
    await page
      .getByRole("button", {
        name: english ? "List view" : "Listenansicht",
        exact: true,
      })
      .click();
    const card = page.locator(".project-list-item").first();
    const trigger = card.locator("summary");
    await trigger.scrollIntoViewIfNeeded();
    const row = (await trigger.boundingBox())!;
    const content = (await card.locator(".project-list-copy").boundingBox())!;
    expect(row.width).toBeCloseTo(content.width, 0);
    expect(row.height).toBeGreaterThanOrEqual(56);
    await expect(trigger.locator(".disclosure-symbol")).toHaveText("+");
    // Activate empty row space, away from both label and icon.
    const position = { x: row.width * 0.7, y: row.height / 2 };
    if (isMobile) await trigger.tap({ position });
    else await trigger.click({ position });
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(trigger.locator("span").first()).toHaveText(
      english ? "Close details" : "Details schliessen",
    );
    await expect(trigger.locator(".disclosure-symbol")).toHaveText("\u00d7");
    await trigger.focus();
    await trigger.press("Space");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(trigger.locator(".disclosure-symbol")).toHaveText("+");
    await expect(trigger).toHaveCSS("outline-width", "3px");
    await page.mouse.move(0, 0);
    const rest = await trigger.evaluate(
      (node) => getComputedStyle(node).backgroundColor,
    );
    await trigger.hover();
    const hover = await trigger.evaluate(
      (node) => getComputedStyle(node).backgroundColor,
    );
    expect(hover).not.toBe(rest);
    await page.mouse.down();
    expect(
      await trigger.evaluate((node) => getComputedStyle(node).backgroundColor),
    ).not.toBe(hover);
    await page.mouse.up();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await trigger.focus();
    await trigger.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  }
});

test("profile identity map is readable, uncropped and localized at all target widths", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const width of [1440, 768, 390, 320, 720]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/de/"]) {
      await page.goto(route + "#about");
      const english = route === "/";
      await expect(page.locator("#about-title")).toHaveText(
        english ? "Beyond the code" : "Abseits des Codes",
      );
      await expect(page.locator("#about .about-panel")).toHaveCount(5);
      await expect(page.locator("#about")).toContainText(
        english ? "How I work" : "Wie ich arbeite",
      );
      for (const term of [
        "ZHAW",
        "2024",
        "2028",
        "ETH",
        "Portugal",
        english ? "guitar" : "Gitarre",
      ])
        await expect(page.locator("#about")).toContainText(term);
      const image = page.locator("#about img");
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          image.evaluate(
            (node) =>
              (node as HTMLImageElement).complete &&
              (node as HTMLImageElement).naturalWidth > 0,
          ),
        )
        .toBe(true);
      const geometry = await image.evaluate((node) => ({
        width: node.clientWidth,
        height: node.clientHeight,
        fit: getComputedStyle(node).objectFit,
        alt: node.getAttribute("alt"),
      }));
      expect(geometry.fit).toBe("contain");
      expect(geometry.width / geometry.height).toBeCloseTo(831 / 1039, 2);
      expect(geometry.alt).toContain("Bruno Pinto da Silva");
      await expect(
        page.locator("#about a, #about button, #about [tabindex]"),
      ).toHaveCount(0);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      const contrast = await auditProjectContrast(page, "#about");
      expect(
        contrast.filter((result) => result.ratio < result.required),
      ).toEqual([]);
      if (width <= 1050) {
        await expect(page.locator(".about-connections")).toBeHidden();
        const first = (await page
          .locator(".about-panel")
          .first()
          .boundingBox())!;
        const photo = (await image.boundingBox())!;
        expect(first.y).toBeGreaterThan(photo.y + photo.height);
      }
    }
  }
});

test("profile remains usable with doubled text and without JavaScript", async ({
  page,
  browser,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/de/#about");
  await page.addStyleTag({ content: ":root { font-size: 200%; }" });
  await expect(page.locator(".about-panel")).toHaveCount(5);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  try {
    const plain = await context.newPage();
    await plain.goto("/#about");
    for (const topic of await plain.locator(".about-panel").all()) {
      await expect(topic).toBeVisible();
      expect(
        await topic.evaluate((node) => getComputedStyle(node).opacity),
      ).toBe("1");
    }
    await expect(plain.locator("#about img")).toHaveAttribute(
      "src",
      "/images/bruno-at-desk.png",
    );
  } finally {
    await context.close();
  }
});

test("scanner discovery, picker and completed layout work across target viewports", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 1366, height: 768 },
    { width: 768, height: 900 },
    { width: 390, height: 844 },
    { width: 320, height: 844 },
  ]) {
    await page.setViewportSize(viewport);
    for (const route of ["/", "/de/"]) {
      await page.goto(route + "#work");
      const picker = page.locator(".scanner-project-picker"),
        summary = picker.locator("summary");
      if (viewport.width > 850) {
        await expect(picker).toBeHidden();
        expect(
          (await page.locator(".project-deck").boundingBox())!.y,
        ).toBeLessThan(viewport.height);
        await page.locator(".project-deck button").first().click();
        await expect(page.locator(".scanner-feedback")).toHaveAttribute(
          "data-phase",
          "ready",
        );
        await expect(picker).toBeHidden();
        continue;
      }
      await expect(summary).toBeInViewport();
      expect(
        (await page.locator(".scanner-layout").boundingBox())!.height,
      ).toBeLessThan(400);
      if (viewport.width > 850)
        expect(
          (await page.locator(".project-deck").boundingBox())!.y,
        ).toBeLessThan(viewport.height);
      await summary.focus();
      await page.keyboard.press("Enter");
      await expect(picker).toHaveAttribute("open", "");
      await expect(picker.getByRole("button")).toHaveCount(7);
      expect(
        (await auditProjectContrast(page)).filter(
          (result) => result.ratio < result.required,
        ),
      ).toEqual([]);
      await page.keyboard.press("Escape");
      await expect(picker).not.toHaveAttribute("open");
      await expect(summary).toBeFocused();
      await summary.click();
      await picker.getByRole("button").first().click();
      await expect(picker).not.toHaveAttribute("open");
      await expect(page.locator(".scanner-feedback")).toHaveAttribute(
        "data-phase",
        "ready",
      );
      const details = page.locator(".scanner-details");
      const size = await details.evaluate((node) => ({
        height: node.clientHeight,
        content: node.scrollHeight,
        overflow: getComputedStyle(node).overflowY,
      }));
      expect(size.overflow).toBe("visible");
      expect(size.content).toBeLessThanOrEqual(size.height + 1);
      const dock = page.locator(".docked-token");
      expect((await dock.boundingBox())!.height).toBe(
        viewport.width <= 850 ? 148 : 420,
      );
      await expect(dock).toBeFocused();
      await expect(summary).toHaveText(
        route === "/"
          ? "Choose another project+"
          : "Anderes Projekt ausw\u00e4hlen+",
      );
      await summary.click();
      await picker.getByRole("button").last().click();
      await expect(page.locator(".scanner-reveal h3")).toHaveText(
        "Mission-Chess",
      );
      await dock.focus();
      await page.keyboard.press("Enter");
      await expect(
        page.locator('.project-deck button[data-project-id="mission-chess"]'),
      ).toBeFocused();
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
    }
  }
});

test("compact dock follows the full scan and survives selection, resize and view changes", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#work");
  const picker = page.locator(".scanner-project-picker");
  await picker.locator("summary").click();
  await picker.getByRole("button").first().click();
  await expect(page.locator(".scanner-pad")).toHaveAttribute(
    "data-phase",
    "scanning",
  );
  expect((await page.locator(".docked-token").boundingBox())!.height).toBe(420);
  await expect(page.locator(".scanner-beam")).toBeVisible();
  await expect
    .poll(
      async () => (await page.locator(".docked-token").boundingBox())!.height,
    )
    .toBe(148);
  await picker.locator("summary").click();
  await picker.getByRole("button").nth(1).click();
  await expect(page.locator(".tray-flight-layer")).toHaveCount(1);
  await expect(page.locator(".scanner-pad")).toHaveAttribute(
    "data-phase",
    "scanning",
  );
  expect((await page.locator(".docked-token").boundingBox())!.height).toBe(420);
  await page.setViewportSize({ width: 1440, height: 900 });
  await expect(page.locator(".scanner-pad")).toHaveAttribute(
    "data-phase",
    "ready",
  );
  expect((await page.locator(".docked-token").boundingBox())!.height).toBe(420);
  await page.setViewportSize({ width: 320, height: 844 });
  await expect
    .poll(
      async () => (await page.locator(".docked-token").boundingBox())!.height,
    )
    .toBe(148);
  await picker.locator("summary").click();
  await picker.getByRole("button").nth(2).click();
  await page.getByRole("button", { name: "List view", exact: true }).click();
  await expect(page.locator("#project-list-view")).toBeVisible();
  await page.getByRole("button", { name: "Scanner view", exact: true }).click();
  await expect(page.locator(".scanner-pad")).toHaveAttribute(
    "data-phase",
    "ready",
  );
  await expect(
    page.locator(".tray-flight-layer, [data-tray-flight]"),
  ).toHaveCount(0);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator(".docked-token").click();
  await expect(
    page.locator('.project-deck button[data-project-id="portfolio"]'),
  ).toBeFocused();
});

test("resting deck exposes complete titles inside each card's visible area", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/", "/de/"]) {
    await page.goto(route);
    const bounds = await page.locator(".project-slot").evaluateAll((slots) =>
      slots.map((slot) => ({
        visible: slot.getBoundingClientRect().right,
        title: slot.querySelector(".token-title")!.getBoundingClientRect()
          .right,
        number: slot.querySelector(".token-top > span")!.getBoundingClientRect()
          .right,
      })),
    );
    for (const box of bounds) {
      expect(box.title).toBeLessThanOrEqual(box.visible);
      expect(box.number).toBeLessThanOrEqual(box.visible);
    }
  }
});
