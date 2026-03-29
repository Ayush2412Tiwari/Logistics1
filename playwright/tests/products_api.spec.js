const { test, expect } = require('@playwright/test');

test('Access products page without login', async ({ page }) => {

  


  await page.goto('http://localhost:5173/');
  await page.fill("#login-email","ayushdec24@gmail.com")
  await page.fill("#login-password","12345678")
  await page.click("#login-submit-btn")

  await page.waitForTimeout(3000)

  //await expect(page.locator('text=Product 1')).toBeVisible();
});