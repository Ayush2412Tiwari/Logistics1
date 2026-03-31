const { test, expect } = require('@playwright/test');
const { AuthPage } = require('./Pages/AuthPage');

const {
  mockLogin,
  mockGetMe,
  mockRegister,
  mockLogout
} = require('./MockAPIS/auth_api');


// ✅ LOGIN TEST
test('Login - success', async ({ page }) => {

  const auth = new AuthPage(page);

  await mockLogin(page);
  await auth.gotoHome();

  await auth.login('ayushdec24@gmail.com', '12345678');

  await expect(auth.loginBtn).not.toBeVisible();
});


// ✅ GET ME TEST
test('Get me', async ({ page }) => {

  const auth = new AuthPage(page);

  await mockGetMe(page);
  await auth.gotoHome();

  await expect(auth.loginBtn).not.toBeVisible();
});


// ✅ REGISTER TEST
test('Register User', async ({ page }) => {

  const auth = new AuthPage(page);

  await mockRegister(page);
  await auth.gotoLogin();

  await auth.register('Ayush', 'ayushdec24@gmail.com', '12345678');
});


// ✅ LOGOUT TEST
test('Access Logout', async ({ page }) => {

  const auth = new AuthPage(page);

  await mockLogout(page);
  await auth.gotoHome();

  await auth.login('ayushdec24@gmail.com', '12345678');

  await auth.logout();
});