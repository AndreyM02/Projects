// frontend/src/components/ShoppingCart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShoppingCart.css';


const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.get('http://localhost:5000/api/cart', config);
      setCartItems(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch cart items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

//   const updateQuantity = async (id, newQuantity) => {
//     try {
//       const token = localStorage.getItem('token');
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const response = await axios.put(`http://localhost:5000/api/cart/${id}`, { quantity: newQuantity }, config);
//       setCartItems(cartItems.map(item => item._id === id ? response.data : item));
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update quantity.');
//     }
//   };

const updateQuantity = async (id, newQuantity) => {
    if (isNaN(newQuantity) || newQuantity < 1) {
      alert('Quantity must be at least 1.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put(`http://localhost:5000/api/cart/${id}`, { quantity: newQuantity }, config);
    //   setCartItems(prevItems => prevItems.map(item => item._id === id ? response.data : item));
      fetchCart();
    } catch (err) {
      console.error(err);
      alert('Failed to update quantity.');
    }
  };

  const removeItem = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/cart/${id}`, config);
      setCartItems(cartItems.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to remove item.');
    }
  };

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      {loading && <p>Loading cart...</p>}
      {error && <p className="error-message">{error}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item._id}>
                <td>{item.product.name}</td>
                <td>${item.product.price}</td>
                <td>
                <input
  type="number"
  min="1"
  value={item.quantity}
  onChange={(e) => {
    const newQty = parseInt(e.target.value, 10);
    updateQuantity(item._id, newQty);
  }}
/>
                </td>
                <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => removeItem(item._id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Optionally, display total cost */}
      {cartItems.length > 0 && (
        <h3>
          Total: $
          {cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}
        </h3>
      )}
    </div>
  );
};

export default ShoppingCart;