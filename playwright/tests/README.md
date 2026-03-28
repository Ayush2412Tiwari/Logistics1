# Playwright Mock APIs for Product Controller

This package provides comprehensive Playwright mock APIs for all product controller endpoints, including search, filtering, pagination, CRUD operations, and bulk actions.

## Installation

```bash
npm install --save-dev @playwright/test
```

## Features

✅ **GET /api/products** - Get all products with search, filter, and pagination
✅ **POST /api/products** - Create a new product
✅ **PUT /api/products/:id** - Update an existing product
✅ **DELETE /api/products/:id** - Delete a single product
✅ **DELETE /api/products/bulk-delete** - Bulk delete multiple products

### Additional Features:
- Search by product name (case-insensitive)
- Filter by category
- Pagination support
- Validation error handling
- 404 error handling
- Mock data management utilities

## Quick Start

```javascript
const { test } = require('@playwright/test');
const { setupProductMockAPIs, resetMockData } = require('./product-mocks');

test('my test', async ({ page }) => {
  // Setup mock APIs
  await setupProductMockAPIs(page);
  
  // Navigate to your app
  await page.goto('http://localhost:3000');
  
  // Your test code here...
});
```

## API Reference

### Main Functions

#### `setupProductMockAPIs(page)`

Sets up all mock API routes for product operations.

```javascript
await setupProductMockAPIs(page);
```

#### `resetMockData()`

Resets the mock data store to its initial state. Call this in `beforeEach` to ensure test isolation.

```javascript
test.beforeEach(() => {
  resetMockData();
});
```

#### `getMockProducts()`

Returns the current array of mock products. Useful for assertions.

```javascript
const products = getMockProducts();
console.log(products.length); // Current number of products
```

#### `setMockProducts(newProducts)`

Replaces the mock products with a custom array. Useful for setting up specific test scenarios.

```javascript
setMockProducts([
  {
    _id: 'custom-id',
    name: 'Custom Product',
    category: 'Test',
    price: 99.99,
    // ... other fields
  }
]);
```

## Usage Examples

### Example 1: Testing Product List with Pagination

```javascript
test('should paginate products correctly', async ({ page }) => {
  await setupProductMockAPIs(page);
  await page.goto('http://localhost:3000/products');
  
  // Request page 1
  const response = await page.request.get('/api/products?page=1&limit=10');
  const data = await response.json();
  
  expect(data.products.length).toBeLessThanOrEqual(10);
  expect(data.pagination.page).toBe(1);
});
```

### Example 2: Testing Search Functionality

```javascript
test('should search products by name', async ({ page }) => {
  await setupProductMockAPIs(page);
  
  const response = await page.request.get('/api/products?search=headphones');
  const data = await response.json();
  
  expect(data.products.length).toBeGreaterThan(0);
  data.products.forEach(product => {
    expect(product.name.toLowerCase()).toContain('headphones');
  });
});
```

### Example 3: Testing Product Creation

```javascript
test('should create a new product', async ({ page }) => {
  await setupProductMockAPIs(page);
  
  const newProduct = {
    name: 'Gaming Laptop',
    category: 'Electronics',
    description: 'High-performance gaming laptop',
    price: 1299.99
  };
  
  const response = await page.request.post('/api/products', {
    data: newProduct
  });
  const data = await response.json();
  
  expect(response.status()).toBe(201);
  expect(data.success).toBe(true);
  expect(data.product.name).toBe(newProduct.name);
  
  // Verify product was added to store
  const products = getMockProducts();
  expect(products[0].name).toBe(newProduct.name);
});
```

### Example 4: Testing Product Update

```javascript
test('should update a product', async ({ page }) => {
  await setupProductMockAPIs(page);
  
  const products = getMockProducts();
  const productId = products[0]._id;
  
  const updateData = {
    name: 'Updated Product Name',
    price: 149.99
  };
  
  const response = await page.request.put(`/api/products/${productId}`, {
    data: updateData
  });
  const data = await response.json();
  
  expect(response.status()).toBe(200);
  expect(data.product.name).toBe(updateData.name);
  expect(data.product.price).toBe(updateData.price);
});
```

### Example 5: Testing Product Deletion

```javascript
test('should delete a product', async ({ page }) => {
  await setupProductMockAPIs(page);
  
  const products = getMockProducts();
  const productId = products[0]._id;
  const initialCount = products.length;
  
  const response = await page.request.delete(`/api/products/${productId}`);
  const data = await response.json();
  
  expect(response.status()).toBe(200);
  expect(data.success).toBe(true);
  
  // Verify deletion
  const updatedProducts = getMockProducts();
  expect(updatedProducts.length).toBe(initialCount - 1);
});
```

### Example 6: Testing Bulk Delete

```javascript
test('should bulk delete products', async ({ page }) => {
  await setupProductMockAPIs(page);
  
  const products = getMockProducts();
  const idsToDelete = [products[0]._id, products[1]._id];
  
  const response = await page.request.delete('/api/products/bulk-delete', {
    data: { ids: idsToDelete }
  });
  const data = await response.json();
  
  expect(response.status()).toBe(200);
  expect(data.deletedCount).toBe(2);
  
  // Verify products were deleted
  const updatedProducts = getMockProducts();
  expect(updatedProducts.length).toBe(products.length - 2);
});
```

### Example 7: Testing Error Handling

```javascript
test('should return 404 for non-existent product', async ({ page }) => {
  await setupProductMockAPIs(page);
  
  const fakeId = 'non-existent-id';
  const response = await page.request.get(`/api/products/${fakeId}`);
  const data = await response.json();
  
  expect(response.status()).toBe(404);
  expect(data.success).toBe(false);
  expect(data.message).toBe('Product not found');
});
```

### Example 8: Testing with Custom Mock Data

```javascript
test('should work with custom product data', async ({ page }) => {
  // Set up custom products
  setMockProducts([
    {
      _id: 'test-1',
      name: 'Test Product 1',
      category: 'Testing',
      price: 10.00,
      createdBy: { _id: 'user-1', name: 'Tester', email: 'test@test.com' },
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      _id: 'test-2',
      name: 'Test Product 2',
      category: 'Testing',
      price: 20.00,
      createdBy: { _id: 'user-1', name: 'Tester', email: 'test@test.com' },
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
  
  await setupProductMockAPIs(page);
  
  const response = await page.request.get('/api/products?category=Testing');
  const data = await response.json();
  
  expect(data.products.length).toBe(2);
  expect(data.products[0].category).toBe('Testing');
});
```

### Example 9: UI Integration Test

```javascript
test('should display products in UI', async ({ page }) => {
  await setupProductMockAPIs(page);
  await page.goto('http://localhost:3000/products');
  
  // Wait for products to load
  await page.waitForSelector('.product-card');
  
  // Count product cards
  const productCount = await page.locator('.product-card').count();
  expect(productCount).toBeGreaterThan(0);
  
  // Verify first product details
  const firstProductName = await page.locator('.product-card').first()
    .locator('.product-name').textContent();
  expect(firstProductName).toBeTruthy();
});
```

### Example 10: Complete E2E Workflow

```javascript
test('complete product lifecycle', async ({ page }) => {
  resetMockData();
  await setupProductMockAPIs(page);
  
  // 1. List products
  const listResponse = await page.request.get('/api/products');
  const listData = await listResponse.json();
  const initialCount = listData.products.length;
  
  // 2. Create a product
  const createResponse = await page.request.post('/api/products', {
    data: {
      name: 'New Product',
      category: 'Test',
      price: 99.99
    }
  });
  const createData = await createResponse.json();
  const productId = createData.product._id;
  
  // 3. Verify product was created
  const afterCreateResponse = await page.request.get('/api/products');
  const afterCreateData = await afterCreateResponse.json();
  expect(afterCreateData.products.length).toBe(initialCount + 1);
  
  // 4. Update the product
  const updateResponse = await page.request.put(`/api/products/${productId}`, {
    data: { name: 'Updated Product', price: 149.99 }
  });
  const updateData = await updateResponse.json();
  expect(updateData.product.name).toBe('Updated Product');
  
  // 5. Delete the product
  await page.request.delete(`/api/products/${productId}`);
  
  // 6. Verify product was deleted
  const afterDeleteResponse = await page.request.get('/api/products');
  const afterDeleteData = await afterDeleteResponse.json();
  expect(afterDeleteData.products.length).toBe(initialCount);
});
```

## Mock Data Structure

The default mock data includes 3 products:

```javascript
{
  _id: '507f1f77bcf86cd799439011',
  name: 'Wireless Headphones',
  category: 'Electronics',
  description: 'High-quality wireless headphones with noise cancellation',
  price: 199.99,
  imageUrl: '/uploads/headphones.jpg',
  createdBy: {
    _id: '507f191e810c19729de860ea',
    name: 'John Doe',
    email: 'john@example.com'
  },
  createdAt: Date,
  updatedAt: Date
}
```

## Best Practices

1. **Always reset mock data between tests:**
   ```javascript
   test.beforeEach(() => {
     resetMockData();
   });
   ```

2. **Setup mocks before navigation:**
   ```javascript
   await setupProductMockAPIs(page);
   await page.goto('http://localhost:3000');
   ```

3. **Use helper functions for assertions:**
   ```javascript
   const products = getMockProducts();
   expect(products.length).toBe(expectedCount);
   ```

4. **Test both success and error scenarios:**
   ```javascript
   // Test success
   const validResponse = await page.request.post('/api/products', { data: validProduct });
   expect(validResponse.status()).toBe(201);
   
   // Test error
   const invalidResponse = await page.request.post('/api/products', { data: {} });
   expect(invalidResponse.status()).toBe(400);
   ```

## Error Responses

The mock APIs return consistent error responses:

- **400 Bad Request:** Invalid input or missing required fields
- **404 Not Found:** Product ID doesn't exist
- **500 Server Error:** Unexpected server error

Example error response:
```json
{
  "success": false,
  "message": "Product not found"
}
```

## Contributing

Feel free to extend the mock data or add additional test scenarios as needed for your application.

## License

MIT
