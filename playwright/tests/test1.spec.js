const { test, expect } = require('@playwright/test');

test('Login - success (stable)', async ({ page }) => {

  //Mock LOGIN API
  await page.route('**/api/auth/login', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        user: {
          _id: '69c7dc1655a8e1b89e2a094d',
          name: 'Ayush',
          email: 'ayushdec24@gmail.com'
        }
      }),
    });
  });

  //Open app
  await page.goto('http://localhost:5173');

  //Fill login form
  await page.fill('#login-email', 'ayushdec24@gmail.com');
  await page.fill('#login-password', '12345678');
  await page.click("#login-submit-btn")

  // Login button should disappear after login
  await expect(page.locator('#login-submit-btn')).not.toBeVisible();

  await page.waitForTimeout(3000)
});

test('Get me',async({page})=>{
    await page.route('**/api/auth/me', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({
      success: true,
      user: {
        _id: "69c7dc1655a8e1b89e2a094d",
        name: "Ayush",
        email: "ayushdec24@gmail.com",
        createdAt: "2026-03-28T13:48:06.757Z"
      }
    }),
  });
});

  //Open app
  await page.goto('http://localhost:5173');

  // Login button should disappear after login
  await expect(page.locator('#login-submit-btn')).not.toBeVisible();

  await page.pause()
})

test('Register User',async({page})=>{

    await page.route('**/api/auth/register', async (route) => {
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        "name": "Ayush",
        "email": "ayushdec24@gmail.com",
        "password": "12345678"
    }),
    });
  });
  await page.goto("http://localhost:5173/login")
  await page.click("//button[text()='Sign Up']")
  await page.fill("#login-name",'Ayush')
  await page.fill("#login-email","ayushdec24@gmail.com")
  await page.fill("#login-password","12345678")

  await page.click("#login-submit-btn")


})