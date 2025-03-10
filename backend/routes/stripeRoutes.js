// backend/routes/stripeRoutes.js
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const asyncHandler = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

router.post('/create-checkout-session', asyncHandler(async (req, res) => {
  // Destructure dynamic data from req.body
  // const { shippingAddress, amount } = req.body;
  const { amount, shippingAddress } = req.body;

  const shippingData = typeof shippingAddress === 'string'
  ? JSON.parse(shippingAddress)
  : shippingAddress;
  
  if (!amount) {
    return res.status(400).json({ message: 'Amount is required' });
  }

  // Create a Checkout Session using the provided amount (in cents)
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [{
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Order Payment',
        },
        unit_amount: amount, // amount is now defined from req.body
      },
      quantity: 1,
    }],
    mode: 'payment',
    metadata: {
      shipping_name: shippingData.name,
      shipping_address: shippingData.address,
      shipping_city: shippingData.city,
      shipping_postalCode: shippingData.postalCode,
      shipping_country: shippingData.country
    },  
    success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.headers.origin}/cancel`,
  });

  res.json({ id: session.id });
}));

module.exports = router;