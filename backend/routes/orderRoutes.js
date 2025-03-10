// backend/routes/orderRoutes.js
const express = require('express');
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);
const authMiddleware = require('../middleware/authMiddleware');
const Order = require('../models/Order');
const Cart = require('../models/Cart'); // optionally, to clear the cart after order creation
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const router = express.Router();


// GET orders for the logged-in user
router.get('/', authMiddleware, asyncHandler(async (req, res) => {
    try {
      // Find orders that belong to the logged-in user
      const orders = await Order.find({ user: req.user.userId })
        .populate('items.product', 'name price imageUrl') // populate product details in each order item
        .lean();
      res.json({ orders });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }));

// POST create an order from checkout data
router.post('/', authMiddleware, asyncHandler(async (req, res) => {
  const { shippingAddress } = req.body;

  // Fetch cart items (populating product details)
  const cartItems = await Cart.find({ user: req.user.userId }).populate('product', 'price name');
  if (!cartItems.length) {
    return res.status(400).json({ message: 'Your cart is empty.' });
  }

  // Build order items with product details
  const orderItems = cartItems.map(item => ({
    product: item.product._id,
    productName: item.product.name, // Store the product name at the time of order
    quantity: item.quantity,
    price: item.product.price
  }));

  const totalPrice = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const order = new Order({
    user: req.user.userId,
    items: orderItems,
    shippingAddress,
    totalPrice
  });

  const createdOrder = await order.save();

  // Optionally, clear the user's cart after order creation
  await Cart.deleteMany({ user: req.user.userId });

  res.status(201).json(createdOrder);
}));


// New route: Finalize Order after payment verification using sessionId
router.post('/finalize', authMiddleware, asyncHandler(async (req, res) => {
  const { sessionId } = req.body;
  if (!sessionId) {
    return res.status(400).json({ message: 'Session ID is required.' });
  }

  // Retrieve the Stripe Checkout session to verify payment status
  const session = await stripe.checkout.sessions.retrieve(sessionId);
  if (session.payment_status !== 'paid') {
    return res.status(400).json({ message: 'Payment not completed.' });
  }

  // Fetch the user's cart items (populating product details)
  const cartItems = await Cart.find({ user: req.user.userId }).populate('product', 'name price');
  if (!cartItems.length) {
    return res.status(400).json({ message: 'Your cart is empty.' });
  }

  // Build order items with product details stored for persistence
  const orderItems = cartItems.map(item => ({
    product: item.product._id,
    productName: item.product.name,
    quantity: item.quantity,
    price: item.product.price
  }));

  // Calculate total price
  const totalPrice = orderItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  // Use shipping information from Stripe's session customer_details if available, 
  // otherwise provide default values or retrieve from user profile.
  const shippingAddress = {
    name: session.metadata.shipping_name || 'Unknown',
    address: session.metadata.shipping_address || 'N/A',
    city: session.metadata.shipping_city || 'N/A',
    postalCode: session.metadata.shipping_postalCode || 'N/A',
    country: session.metadata.shipping_country || 'N/A'
  };

  // Create the order in the database
  const order = new Order({
    user: req.user.userId,
    items: orderItems,
    shippingAddress,
    totalPrice,
    orderStatus: 'Processing'
  });

  const createdOrder = await order.save();

  // Clear the user's cart after order creation
  await Cart.deleteMany({ user: req.user.userId });

  res.status(201).json(createdOrder);
}));


module.exports = router;