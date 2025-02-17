const express = require('express');
const Product = require('../models/Product');
const User = require('../models/User');
const { body, validationResult } = require('express-validator'); // For input validation
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');


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
// router.get(
//     '/',
//     asyncHandler(async (req, res) => {
//         const { page = 1, limit = 10 } = req.query;

//         const products = await Product.find()
//             .limit(limit * 1) // Convert to number
//             .skip((page - 1) * limit)
//             .lean();

//         const count = await Product.countDocuments();

//         res.json({
//             products,
//             totalPages: Math.ceil(count / limit),
//             currentPage: Number(page),
//         });
//     })
// );

router.get('/', authMiddleware, async (req, res) => {
    try {
      // If the user is a seller, show only their products; 
      // if admin, show all; if buyer, perhaps show all available products.
      let query = {};
      if (req.user.role === 'seller') {
        query = { seller: req.user.userId };
      }
    //   const products = await Product.find(query).lean();
    const products = await Product.find(query)
  .populate('seller', 'email')
  .lean();
      const count = await Product.countDocuments(query);
      res.json({ products, total: count });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

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
    authMiddleware,
    roleMiddleware('seller', 'admin'), // Only sellers and admins can create products
    productValidationRules, // Validation rules
    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const sellerId = req.user.userId;
        const productData = { ...req.body, seller: sellerId };
        try{
            const product = new Product(productData);
            const newProduct = await product.save();

            res.status(201).json(newProduct);
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Server error' });
          }
       // const product = new Product(req.body);
        
        
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

// Endpoint for admins to reassign a product's seller by email
router.put(
    '/:id/assign',
    authMiddleware,
    roleMiddleware('admin'),
    async (req, res) => {
      const { sellerEmail } = req.body; // Expect sellerEmail in the request body
  
      if (!sellerEmail) {
        return res.status(400).json({ message: 'sellerEmail is required.' });
      }
  
      try {
        // Find the user by email
        const sellerUser = await User.findOne({ email: sellerEmail });
        if (!sellerUser) {
          return res.status(404).json({ message: 'Seller not found.' });
        }
        
        // Optionally, check if the found user has the role of 'seller'
        if (sellerUser.role !== 'seller' && sellerUser.role !== 'admin') {
          return res.status(403).json({ message: 'User is not eligible to be assigned as a seller.' });
        }
  
        // Update the product's seller field using the user's _id
        const updatedProduct = await Product.findByIdAndUpdate(
          req.params.id,
          { seller: sellerUser._id },
          { new: true }
        );
        if (!updatedProduct) {
          return res.status(404).json({ message: 'Product not found.' });
        }
  
        res.json(updatedProduct);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error.' });
      }
    }
  );
  
  module.exports = router; 




module.exports = router;