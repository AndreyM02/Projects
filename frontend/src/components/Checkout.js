// frontend/src/components/Checkout.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingAddress, setShippingAddress] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: ''
  });
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [isPlacing, setIsPlacing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('http://localhost:5000/api/cart', config);
        setCartItems(response.data);
        const computedTotal = response.data.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
        setTotal(computedTotal);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError('Failed to fetch cart items.');
      }
    };

    fetchCart();
  }, []);

  const handleChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setIsPlacing(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.post('http://localhost:5000/api/orders', { shippingAddress }, config);
      alert('Order placed successfully!');
      navigate('/orders'); // Navigate to order confirmation or history page
    } catch (err) {
      console.error('Error placing order:', err);
      setError('Failed to place order. Please try again.');
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="checkout-container container my-5">
      <h2 className="mb-4">Checkout</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="row">
        <div className="col-md-6">
          <h4>Shipping Information</h4>
          <form onSubmit={handlePlaceOrder}>
            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                name="name" 
                value={shippingAddress.name} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Address</label>
              <input 
                type="text" 
                className="form-control" 
                name="address" 
                value={shippingAddress.address} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">City</label>
              <input 
                type="text" 
                className="form-control" 
                name="city" 
                value={shippingAddress.city} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Postal Code</label>
              <input 
                type="text" 
                className="form-control" 
                name="postalCode" 
                value={shippingAddress.postalCode} 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Country</label>
              <input 
                type="text" 
                className="form-control" 
                name="country" 
                value={shippingAddress.country} 
                onChange={handleChange} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary w-100" disabled={isPlacing}>
              {isPlacing ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>
        <div className="col-md-6">
          <h4>Order Summary</h4>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map(item => (
                <div key={item._id} className="order-item d-flex justify-content-between my-2">
                  <span>{item.product.name} (x{item.quantity})</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <hr />
              <h5>Total: ${total.toFixed(2)}</h5>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;