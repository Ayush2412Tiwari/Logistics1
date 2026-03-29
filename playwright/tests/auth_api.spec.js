const { test, expect } = require('@playwright/test');
const {
  mockLogin,
  mockGetMe,
  mockRegister,
  mockLogout
} = require('./MockAPIS/auth_api');


// ✅ LOGIN TEST
test('Login - success', async ({ page }) => {

  await mockLogin(page);

  await page.goto('http://localhost:5173');

  await page.fill('#login-email', 'ayushdec24@gmail.com');
  await page.fill('#login-password', '12345678');
  await page.click('#login-submit-btn');

  await expect(page.locator('#login-submit-btn')).not.toBeVisible();
});


// ✅ GET ME TEST
test('Get me', async ({ page }) => {

  await mockGetMe(page);

  await page.goto('http://localhost:5173');

  await expect(page.locator('#login-submit-btn')).not.toBeVisible();
});


// ✅ REGISTER TEST
test('Register User', async ({ page }) => {

  await mockRegister(page);

  await page.goto('http://localhost:5173/login');

  await page.click("//button[text()='Sign Up']");
  await page.fill('#login-name', 'Ayush');
  await page.fill('#login-email', 'ayushdec24@gmail.com');
  await page.fill('#login-password', '12345678');

  await page.click('#login-submit-btn');
});


// ✅ LOGOUT TEST
test('Access Logout', async ({ page }) => {

  await mockLogout(page);

  await page.goto('http://localhost:5173');

  await page.fill('#login-email', 'ayushdec24@gmail.com');
  await page.fill('#login-password', '12345678');
  await page.click('#login-submit-btn');

  await page.click("//span[text()='Logout']");
});