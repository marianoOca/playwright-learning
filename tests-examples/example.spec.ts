import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

// para correr sólo este test: npx playwright test tests/example.spec.ts:13
// o más fácil usamos el tag: npx playwright test --grep @first
// o todos menos ese: npx playwright test --grep-invert @first
test("get started link", { tag: "@first" }, async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
