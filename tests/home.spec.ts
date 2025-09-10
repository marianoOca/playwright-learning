import { test, expect } from "@playwright/test";

test.describe("Home page with no auth", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  test("visual test", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page-no-auth.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });

  test("check sign in", async ({ page }) => {
    // Ensure the sing-in link is present
    // This is an alternative if getByTestId() does not work (because it looks for data-test instead of data-testid)
    //  await expect(page.locator('[data-test="nav-sign-in"]')).toHaveText("Sign in");
    await expect(page.getByTestId("nav-sign-in")).toHaveText("Sign in");
  });

  test("validate page title", async ({ page }) => {
    // Check the title of the page
    await expect(page).toHaveTitle(
      "Practice Software Testing - Toolshop - v5.0"
    );
  });

  test("grid loads with 9 items", async ({ page }) => {
    // Check the count of items displayed
    const productGrid = page.locator(".col-md-9");
    await expect(productGrid.getByRole("link")).toHaveCount(9);
    expect(await productGrid.getByRole("link").count()).toBe(9);
  });

  test("search for Thor Hammer", async ({ page }) => {
    // Search for Thor Hammer and check the result
    const productGrid = page.locator(".col-md-9");
    await page.getByPlaceholder("Search").fill("Thor Hammer");
    await page.getByTestId("search-submit").click();
    await expect(productGrid.getByRole("link")).toHaveCount(1);
    await expect(page.getByAltText("Thor Hammer")).toBeVisible();
  });
});

test.describe("Home page customer 01 auth", () => {
  test.use({ storageState: ".auth/customer01.json" });
  test.beforeEach(async ({ page }) => {
    await page.goto("https://practicesoftwaretesting.com/");
  });

  // update snapshoots: npx playwright test --update-snapshots
  test("visual test authorized", async ({ page }) => {
    await page.waitForLoadState("networkidle");
    await expect(page).toHaveScreenshot("home-page-customer01.png", {
      mask: [page.getByTitle("Practice Software Testing - Toolshop")],
    });
  });

  test("check customer 01 is signed in", async ({ page }) => {
    await expect(page.getByTestId("nav-sign-in")).not.toBeVisible();
    await expect(page.getByTestId("nav-menu")).toContainText("Jane Doe");
  });
});
