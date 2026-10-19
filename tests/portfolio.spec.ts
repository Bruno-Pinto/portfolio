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
  const details = page.locator(".project details").first();
  await details.locator("summary").click();
  await expect(details).toHaveAttribute("open", "");
  await expect(details).toContainText("SQL database queries");
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
    await expect(page.getByRole("status")).toContainText(
      "Found: " + target + ".",
    );
  }
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await expect(page.getByRole("status")).toContainText("Choose a number");
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
      page.getByRole("heading", { name: "SpinWheels", exact: true }),
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
    page.getByRole("link", { name: "Work", exact: true }),
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
    await expect(page.locator(".project-grid > article")).toHaveCount(3);
    await expect(page.locator(".project-grid img")).toHaveCount(0);
    await expect(page.locator(".skill-card")).toHaveCount(6);
    await expect(
      page.locator(".skill-card").filter({ hasText: "TypeScript" }),
    ).toContainText(route === "/" ? "Currently learning" : "lerne ich");
  }
});
