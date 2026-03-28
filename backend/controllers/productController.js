  const Product = require('../models/Product');
  const fs = require('fs');
  const path = require('path');

  // @desc    Get all products (with search, filter, pagination)
  // @route   GET /api/products
  exports.getProducts = async (req, res) => {
    try {
      const { search, category, page = 1, limit = 12 } = req.query;
      const query = { createdBy: req.user._id };

      // Search by name
      if (search) {
        query.name = { $regex: search, $options: 'i' };
      }

      // Filter by category
      if (category && category !== 'All') {
        query.category = category;
      }

      const pageNum = parseInt(page, 10);
      const limitNum = parseInt(limit, 10);
      const skip = (pageNum - 1) * limitNum;

      const [products, total] = await Promise.all([
        Product.find(query)
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limitNum)
          .populate('createdBy', 'name email'),
        Product.countDocuments(query),
      ]);

      res.status(200).json({
        success: true,
        products,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          pages: Math.ceil(total / limitNum),
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  // @desc    Create product
  // @route   POST /api/products
  exports.createProduct = async (req, res) => {
    try {
      const { name, category, description, price } = req.body;
      let imageUrl = '';

      if (req.file) {
        imageUrl = `/uploads/${req.file.filename}`;
      }

      const product = await Product.create({
        name,
        category,
        description,
        price: parseFloat(price),
        imageUrl,
        createdBy: req.user._id,
      });

      const populated = await product.populate('createdBy', 'name email');

      res.status(201).json({
        success: true,
        product: populated,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((e) => e.message);
        return res.status(400).json({ success: false, message: messages[0] });
      }
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  // @desc    Update product
  // @route   PUT /api/products/:id
  exports.updateProduct = async (req, res) => {
    try {
      let product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      // Check ownership
      if (product.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this product',
        });
      }

      const updateData = { ...req.body };
      if (updateData.price) {
        updateData.price = parseFloat(updateData.price);
      }

      // Handle new image upload
      if (req.file) {
        // Delete old image if exists
        if (product.imageUrl) {
          const oldImagePath = path.join(__dirname, '..', product.imageUrl);
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        }
        updateData.imageUrl = `/uploads/${req.file.filename}`;
      }

      product = await Product.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      }).populate('createdBy', 'name email');

      res.status(200).json({
        success: true,
        product,
      });
    } catch (error) {
      if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((e) => e.message);
        return res.status(400).json({ success: false, message: messages[0] });
      }
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  // @desc    Delete product
  // @route   DELETE /api/products/:id
  exports.deleteProduct = async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      // Check ownership
      if (product.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this product',
        });
      }

      // Delete image if exists
      if (product.imageUrl) {
        const imagePath = path.join(__dirname, '..', product.imageUrl);
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      }

      await Product.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };

  // @desc    Bulk delete products
  // @route   DELETE /api/products/bulk-delete
  exports.bulkDeleteProducts = async (req, res) => {
    try {
      const { ids } = req.body;

      if (!ids || !Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Please provide product IDs to delete',
        });
      }

      // Get products to delete their images
      const products = await Product.find({
        _id: { $in: ids },
        createdBy: req.user._id,
      });

      // Delete images
      products.forEach((product) => {
        if (product.imageUrl) {
          const imagePath = path.join(__dirname, '..', product.imageUrl);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
        }
      });

      const result = await Product.deleteMany({
        _id: { $in: ids },
        createdBy: req.user._id,
      });

      res.status(200).json({
        success: true,
        message: `${result.deletedCount} product(s) deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  };
