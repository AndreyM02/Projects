// backend/routes/cartRoutes.js
const express = require('express');
const Cart = require('../models/Cart');
const authMiddleware = require('../middleware/authMiddleware');
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const router = express.Router();

// GET cart items for the logged-in user (buyer)
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
  const cartItems = await Cart.find({ user: req.user.userId })
    .populate('product', 'name price imageUrl') // populate product details
    .lean();
  res.json(cartItems);
}));

router.get(
    '/:id', authMiddleware,
    asyncHandler(async (req, res) => {
        const cartItem = await Cart.findOne({ _id: req.params.id, user: req.user.userId }).lean();
        if (!cartItem) return res.status(404).json({ message: 'Cart not found' });
        res.json(cartItem);
    })
);

// POST add a new item to the cart
router.post('/', authMiddleware, asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId) {
    return res.status(400).json({ message: 'Product ID is required.' });
  }
  // Check if the item is already in the cart; if so, update quantity
  let cartItem = await Cart.findOne({ user: req.user.userId, product: productId });
  if (cartItem) {
    cartItem.quantity += quantity || 1;
    await cartItem.save();
  } else {
    cartItem = new Cart({
      user: req.user.userId,
      product: productId,
      quantity: quantity || 1
    });
    await cartItem.save();
  }
  res.status(201).json(cartItem);
}));

// PUT update quantity for a cart item
router.put('/:id', authMiddleware, asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const qty = Number(quantity);
    if (isNaN(qty) || qty < 1) {
    return res.status(400).json({ message: 'Quantity must be at least 1.' });
  }
  const updatedItem = await Cart.findOneAndUpdate(
    { _id: req.params.id, user: req.user.userId },
    { quantity },
    { new: true }
  );
  if (!updatedItem) {
    return res.status(404).json({ message: 'Cart item not found.' });
  }
  res.json(updatedItem);
}));

// DELETE remove an item from the cart
router.delete('/:id', authMiddleware, asyncHandler(async (req, res) => {
  const deletedItem = await Cart.findOneAndDelete({ _id: req.params.id, user: req.user.userId });
  if (!deletedItem) {
    return res.status(404).json({ message: 'Cart item not found.' });
  }
  res.json({ message: 'Item removed from cart.' });
}));

module.exports = router;