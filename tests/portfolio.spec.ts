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
  const details = page.locator("details").first();
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
