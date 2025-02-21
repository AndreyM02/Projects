// backend/routes/publicProductRoutes.js
const express = require('express');
const Product = require('../models/Product');
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const router = express.Router();

// GET all products for public view (no authentication)
router.get('/', asyncHandler(async (req, res) => {
  try {
    // Return all products without any filtering.
    const products = await Product.find()
      .populate('seller', 'email')
      .lean();
    res.json({ products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
}));

module.exports = router;