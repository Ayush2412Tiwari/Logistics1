const { test, expect } = require('@playwright/test');
const {
  mockGetProducts,
  mockCreateProduct,
  mockUpdateProduct,
  mockDeleteProduct
} = require('./MockAPIS/product_api');


// ✅ GET PRODUCTS
test('Access all products', async ({ page }) => {

  await mockGetProducts(page);

  await page.goto('http://localhost:5173/');
  await page.fill("#login-email","ayushdec24@gmail.com");
  await page.fill("#login-password","12345678");
  await page.click("#login-submit-btn");

  await page.fill("//input[@placeholder='Filter inventory...']", "phone");
});


// ✅ CREATE
test('Create Product', async ({ page }) => {

  await mockCreateProduct(page);

  await page.goto('http://localhost:5173/');
  await page.fill("#login-email","ayushdec24@gmail.com");
  await page.fill("#login-password","12345678");
  await page.click("#login-submit-btn");

  await page.click("//button[contains(text(),'Add Product')]");

  await page.fill("//input[@placeholder='e.g. Cisco C9200L Router']", "Dell Laptop");
  await page.locator("//select[@name]").selectOption("Electronics");
  await page.fill("//input[@name='price']", "20000");
  await page.click("//button[contains(text(),'Create')]");
});


// ✅ UPDATE
test('Update Product', async ({ page }) => {

  await mockUpdateProduct(page);

  await page.goto('http://localhost:5173/');
  await page.fill("#login-email","ayushdec24@gmail.com");
  await page.fill("#login-password","12345678");
  await page.click("#login-submit-btn");

  await page.click("(//button)[9]");
  await page.click("//button[text()='Save Changes']");
});


// ✅ DELETE
test('Delete Product', async ({ page }) => {

  await mockDeleteProduct(page);

  await page.goto('http://localhost:5173/');
  await page.fill("#login-email","ayushdec24@gmail.com");
  await page.fill("#login-password","12345678");
  await page.click("#login-submit-btn");

  await page.click("(//button)[10]");
  await page.click("//button[@id='confirm-modal-delete-btn']");
});