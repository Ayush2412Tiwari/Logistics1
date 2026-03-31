// tests/MockAPIS/auth_api.js

// ✅ Login Mock
async function mockLogin(page, statusCode) {
  await page.route('**/api/login', async (route) => {

    if (statusCode === 200) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          token: "fake-token"
        })
      });
    } else {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({
          success: false,
          message: "Invalid credentials"
        })
      });
    }

  });
}

// ✅ Get Me Mock
async function mockGetMe(page) {
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
}

// ✅ Register Mock (Error case)
async function mockRegister(page) {
  await page.route('**/api/auth/register', async (route) => {
    await route.fulfill({
      status: 400,
      contentType: 'application/json',
      body: JSON.stringify({
        success: false,
        message: 'User already exists'
      }),
    });
  });
}

// ✅ Logout Mock
async function mockLogout(page) {
  await page.route('**/api/auth/logout', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        message: 'Logged out successfully',
      }),
    });
  });
}

// ✅ Export all
module.exports = {
  mockLogin,
  mockGetMe,
  mockRegister,
  mockLogout
};