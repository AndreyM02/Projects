const express = require('express');
const Product = require('../models/Product');
const { body, validationResult } = require('express-validator'); // For input validation

const router = express.Router();

// Middleware for error handling
const asyncHandler = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Input validation rules
const productValidationRules = [
    body('name').optional().notEmpty().withMessage('Name must not be empty'),
    body('price').optional().isFloat({ min: 0 }).withMessage('Price must be a positive number'),
    body('category').optional().notEmpty().withMessage('Category must not be empty'),
];

// GET all products with pagination
router.get(
    '/',
    asyncHandler(async (req, res) => {
        const { page = 1, limit = 10 } = req.query;

        const products = await Product.find()
            .limit(limit * 1) // Convert to number
            .skip((page - 1) * limit)
            .lean();

        const count = await Product.countDocuments();

        res.json({
            products,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
        });
    })
);

// GET a single product by ID
router.get(
    '/:id',
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id).lean();
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    })
);

// POST a new product
router.post(
    '/',
    productValidationRules, // Validation rules
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const product = new Product(req.body);
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    })
);

// PUT (update) a product by ID
router.put(
    '/:id',
    productValidationRules, // Validation rules
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });
        res.json(updatedProduct);
    })
);

// DELETE a product by ID
router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json({ message: 'Product deleted successfully' });
    })
);

module.exports = router;