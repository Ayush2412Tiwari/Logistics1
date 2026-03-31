const { test, expect } = require('@playwright/test');
const { ProductPage } = require('./Pages/ProductPage');

const {
  mockGetProducts,
  mockCreateProduct,
  mockUpdateProduct,
  mockDeleteProduct
} = require('./MockAPIS/product_api');


// ✅ GET PRODUCTS
test('Access all products', async ({ page }) => {

  const product = new ProductPage(page);

  await mockGetProducts(page);

  await product.gotoHome();
  await product.login('ayushdec24@gmail.com', '12345678');

  await product.filterProduct('phone');
});


// ✅ CREATE PRODUCT
test('Create Product', async ({ page }) => {

  const product = new ProductPage(page);

  await mockCreateProduct(page);

  await product.gotoHome();
  await product.login('ayushdec24@gmail.com', '12345678');

  await product.openAddProduct();
  await product.createProduct('Dell Laptop', 'Electronics', '20000');
});


// ✅ UPDATE PRODUCT
test('Update Product', async ({ page }) => {

  const product = new ProductPage(page);

  await mockUpdateProduct(page);

  await product.gotoHome();
  await product.login('ayushdec24@gmail.com', '12345678');

  await product.updateProduct();
});


// ✅ DELETE PRODUCT
test('Delete Product', async ({ page }) => {

  const product = new ProductPage(page);

  await mockDeleteProduct(page);

  await product.gotoHome();
  await product.login('ayushdec24@gmail.com', '12345678');

  await product.deleteProduct();
});