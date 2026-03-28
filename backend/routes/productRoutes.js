const express = require('express');
const router = express.Router();
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  bulkDeleteProducts,
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

// All product routes are protected
router.use(protect);

router.route('/').get(getProducts).post(upload.single('image'), createProduct);

// Bulk delete must be before /:id to avoid route conflict
router.delete('/bulk-delete', bulkDeleteProducts);

router
  .route('/:id')
  .put(upload.single('image'), updateProduct)
  .delete(deleteProduct);

module.exports = router;
