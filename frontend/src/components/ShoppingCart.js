// // frontend/src/components/ShoppingCart.js
// import React, { useEffect, useState, useNavigate } from 'react';
// import axios from 'axios';
// import './ShoppingCart.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { Link } from 'react-router-dom';


// const ShoppingCart = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   //const navigate = useNavigate();

//   const fetchCart = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const response = await axios.get('http://localhost:5000/api/cart', config);
//       setCartItems(response.data);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to fetch cart items.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

// //   const updateQuantity = async (id, newQuantity) => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const config = { headers: { Authorization: `Bearer ${token}` } };
// //       const response = await axios.put(`http://localhost:5000/api/cart/${id}`, { quantity: newQuantity }, config);
// //       setCartItems(cartItems.map(item => item._id === id ? response.data : item));
// //     } catch (err) {
// //       console.error(err);
// //       alert('Failed to update quantity.');
// //     }
// //   };

// const updateQuantity = async (id, newQuantity) => {
//     if (isNaN(newQuantity) || newQuantity < 1) {
//       alert('Quantity must be at least 1.');
//       return;
//     }
//     try {
//       const token = localStorage.getItem('token');
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       const response = await axios.put(`http://localhost:5000/api/cart/${id}`, { quantity: newQuantity }, config);
//     //   setCartItems(prevItems => prevItems.map(item => item._id === id ? response.data : item));
//       fetchCart();
//     } catch (err) {
//       console.error(err);
//       alert('Failed to update quantity.');
//     }
//   };

//   const removeItem = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       const config = { headers: { Authorization: `Bearer ${token}` } };
//       await axios.delete(`http://localhost:5000/api/cart/${id}`, config);
//       setCartItems(cartItems.filter(item => item._id !== id));
//     } catch (err) {
//       console.error(err);
//       alert('Failed to remove item.');
//     }
//   };

//   return (
//     <div className="shopping-cart">
//       <h2>Your Shopping Cart</h2>
//       {loading && <p>Loading cart...</p>}
//       {error && <p className="error-message">{error}</p>}
//       {cartItems.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Product</th>
//               <th>Price</th>
//               <th>Quantity</th>
//               <th>Subtotal</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map(item => (
//               <tr key={item._id}>
//                 <td>{item.product.name}</td>
//                 <td>${item.product.price}</td>
//                 <td>
//                 <input
//   type="number"
//   min="1"
//   value={item.quantity}
//   onChange={(e) => {
//     const newQty = parseInt(e.target.value, 10);
//     updateQuantity(item._id, newQty);
//   }}
// />
//                 </td>
//                 <td>${(item.product.price * item.quantity).toFixed(2)}</td>
//                 <td>
//                   <button onClick={() => removeItem(item._id)}>Remove</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       {/* Optionally, display total cost */}
//       {cartItems.length > 0 && (
//         <h3>
//           Total: $
//           {cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2)}
//         </h3>
//       )}

//       {/* Optionally, add a checkout button */}
//       {cartItems.length > 0 && (
//        <Link className="btn btn-outline-dark me-2" to="/checkout-page">Checkout</Link>
//       )}
//     </div>
//   );
// };

// export default ShoppingCart;


// frontend/src/components/ShoppingCart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ShoppingCart.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';

// Import Stripe libraries and our CheckoutButton component
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutButton from './CheckoutButton';
import CheckoutPage from './CheckoutPage';

// Create a Stripe promise using your publishable key (make sure your env variable is set)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/cart`, config);
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

  const updateQuantity = async (id, newQuantity) => {
    if (isNaN(newQuantity) || newQuantity < 1) {
      alert('Quantity must be at least 1.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.put(`${apiUrl}/api/cart/${id}`, { quantity: newQuantity }, config);
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
      const apiUrl = process.env.REACT_APP_API_URL;
      await axios.delete(`${apiUrl}/api/cart/${id}`, config);
      setCartItems(cartItems.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to remove item.');
    }
  };

  // Calculate total cost from cart items
  const totalCost = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      {loading && <p>Loading cart...</p>}
      {error && <p className="error-message">{error}</p>}
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
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
          <h3>Total: ${totalCost.toFixed(2)}</h3>
          {/* Instead of a link, we wrap our CheckoutButton with Elements so it can use useStripe */}
          <div className="text-center mt-4">
            <Elements stripe={stripePromise}>
              {/* For demonstration, we pass a default shippingAddress. 
                  In production you might prompt the user for shipping details. */}
              <CheckoutPage
                // shippingAddress={{
                //   name: 'Test User',
                //   address: '123 Main St',
                //   city: 'Test City',
                //   postalCode: '12345',
                //   country: 'USA'
                // }}
                // Amount isn't used on the client now since the backend recalculates total from the cart.
                amount={totalCost}
              />
            </Elements>
          </div>
        </>
      )}
    </div>
  );
};

export default ShoppingCart;