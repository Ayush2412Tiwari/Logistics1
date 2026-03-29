// tests/MockAPIS/product_api.js

// ✅ GET PRODUCTS
async function mockGetProducts(page) {
  await page.route('**/api/products**', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        products: [
          {
            _id: "1",
            name: "Smartphone Charger",
            category: "Electronics",
            description: "Fast charging USB-C adapter",
            price: 799
          },
          {
            _id: "2",
            name: "Wireless Headphones",
            category: "Electronics",
            description: "Noise cancelling bluetooth headphones",
            price: 2999
          }
        ],
        pagination: {
          page: 1,
          limit: 10,
          total: 2,
          pages: 1
        }
      }),
    });
  });
}


// ✅ CREATE PRODUCT
async function mockCreateProduct(page) {
  await page.route('**/api/products', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          product: {
            _id: "mock-id-1",
            name: "Dell Laptop",
            category: "Electronics",
            price: 20000
          }
        }),
      });
    } else {
      route.continue();
    }
  });
}


// ✅ UPDATE PRODUCT
async function mockUpdateProduct(page) {
  await page.route('**/api/products/*', async (route) => {
    if (route.request().method() === 'PUT') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          product: {
            _id: "1",
            name: "Apple Laptop Pro",
            price: 12000
          }
        }),
      });
    } else {
      route.continue();
    }
  });
}


// ✅ DELETE PRODUCT
async function mockDeleteProduct(page) {
  await page.route('**/api/products/*', async (route) => {
    if (route.request().method() === 'DELETE') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          message: "Product deleted successfully"
        }),
      });
    } else {
      route.continue();
    }
  });
}


// ✅ EXPORT
module.exports = {
  mockGetProducts,
  mockCreateProduct,
  mockUpdateProduct,
  mockDeleteProduct
};