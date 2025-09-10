import { test, expect } from '@playwright/test';

test('test1', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await page.getByRole('heading', { name: 'Playwright enables reliable' }).locator('span').click();
  await page.getByRole('heading', { name: 'Playwright enables reliable' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('link', { name: 'Disney+ Hotstar' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('img', { name: 'Disney+ Hotstar' }).click();
  await expect(page1.getByRole('heading')).toContainText('Seems like we are not here yet');
});