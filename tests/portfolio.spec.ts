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
  await page.locator(".project-deck button").nth(1).click();
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
test("binary search finds every target and resets", async ({ page }) => {
  await page.goto("/");
  await page.locator(".lab-disclosure > summary").click();
  for (let target = 1; target <= 16; target++) {
    await page.getByLabel("Number to find").selectOption(String(target));
    for (let step = 0; step < 5; step++) {
      if (await page.getByRole("button", { name: "Next step" }).isDisabled())
        break;
      await page.getByRole("button", { name: "Next step" }).click();
    }
    await expect(page.locator(".lab-status")).toContainText(
      "Found: " + target + ".",
    );
  }
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(page.locator(".lab-status")).toContainText("Choose a number");
  await expect(page.getByRole("button", { name: "Next step" })).toBeEnabled();
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
    await expect(page.locator(".lab-disclosure")).not.toHaveAttribute(
      "open",
      "",
    );
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
    await expect(page.locator(".project-deck button")).toHaveCount(3);
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
          ? "SpinWheels"
          : i === 1
            ? route === "/"
              ? "PHP intranet development"
              : "Weiterentwicklung eines PHP-Intranets"
            : route === "/"
              ? "Applications and a marketplace"
              : "Anwendungen und ein Marktplatz",
      );
      await expect(page.locator(".scanner-status")).toHaveText(
        route === "/" ? "Scan complete" : "Scan abgeschlossen",
      );
      if (i === 0)
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
  await page.locator(".project-deck button").first().click();
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
  await page.locator(".project-deck button").first().click();
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
  await page.locator(".project-deck button").first().click();
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
