// backend/models/Cart.js
const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    default: 1,
    min: 1
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Cart = mongoose.model('Cart', cartItemSchema);

module.exports = Cart;