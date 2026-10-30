import { expect, test } from "@playwright/test";

// Use the same public settings for the build and this test run.
const src = process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL?.trim();
const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID?.trim();
const domains =
  process.env.NEXT_PUBLIC_UMAMI_DOMAINS?.trim() ||
  "brunopinto.net,www.brunopinto.net";

test("analytics configuration covers both languages and nested pages", async ({
  page,
}) => {
  const requests: string[] = [];
  if (src) {
    await page.route(src, async (route) => {
      requests.push(route.request().url());
      // No real analytics are submitted during tests.
      await route.fulfill({ contentType: "application/javascript", body: "" });
    });
  }
  for (const path of [
    "/",
    "/de/",
    "/home-dashboard/",
    "/de/home-dashboard/",
    "/home-dashboard/privacy/",
    "/de/home-dashboard/privacy/",
  ]) {
    requests.length = 0;
    await page.goto(
      `${path}?utm_source=application&utm_medium=email&utm_campaign=role-01`,
      { waitUntil: "networkidle" },
    );
    const tracker = page.locator("script#portfolio-traffic-analytics");
    if (!src || !websiteId) {
      await expect(tracker).toHaveCount(0);
    } else {
      await expect(tracker).toHaveCount(1);
      await expect(tracker).toHaveAttribute("src", src);
      await expect(tracker).toHaveAttribute("data-website-id", websiteId);
      await expect(tracker).toHaveAttribute("data-domains", domains);
      await expect(tracker).toHaveAttribute("data-exclude-hash", "true");
      await expect(tracker).toHaveAttribute("data-do-not-track", "true");
      await expect(tracker).not.toHaveAttribute("data-exclude-search", "true");
      await expect.poll(() => requests.length).toBe(1);
    }
    expect(new URL(page.url()).searchParams.get("utm_campaign")).toBe(
      "role-01",
    );
  }
});

test("blocked analytics leaves language navigation and projects usable", async ({
  page,
}) => {
  if (src) await page.route(src, (route) => route.abort("blockedbyclient"));
  await page.goto(
    "/?utm_source=linkedin&utm_medium=social&utm_campaign=post-01",
  );
  await page.getByRole("link", { name: "DE", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "de");
  await page.locator(".project-deck button[data-project-id=php]").click();
  await expect(page.locator(".scanner-details")).toContainText("LDAP");
});
