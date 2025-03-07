// CheckoutPage.js
// import React from 'react';
// import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutButton from './CheckoutButton';

// // Initialize Stripe with your publishable key
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// const CheckoutPage = () => {
//   return (
//     <div className="container my-5">
//       <h2>Checkout</h2>
//       <Elements stripe={stripePromise}>
//         <CheckoutButton />
//       </Elements>
//     </div>
//   );
// }; 

// export default CheckoutPage;





// frontend/src/components/CheckoutPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutButton from './CheckoutButton';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

// Load Stripe using your publishable key from env (for Create React App, it must be prefixed with REACT_APP_)
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
  // const [shippingAddress, setShippingAddress] = useState({
  //   name: '',
  //   address: '',
  //   city: '',
  //   postalCode: '',
  //   country: ''
  // });
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Fetch cart items and compute total (assumes product.price is in dollars)
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/cart`, config);
        // Calculate total from the cart items:
        const computedTotal = response.data.reduce(
          (acc, item) => acc + (item.product.price * item.quantity),
          0
        );
        setTotal(computedTotal);
      } catch (err) {
        console.error('Error fetching cart:', err);
        setError('Failed to fetch cart items.');
      }
    };
    fetchCart();
  }, []);

  // const handleShippingChange = (e) => {
  //   setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  // };

  return (
    <Elements stripe={stripePromise}>
      {/* <div className="checkout-container container my-5">
        <h2 className="mb-4">Checkout</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form>
          <h4>Shipping Information</h4>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              name="name"
              className="form-control" 
              value={shippingAddress.name} 
              onChange={handleShippingChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input 
              type="text" 
              name="address"
              className="form-control" 
              value={shippingAddress.address} 
              onChange={handleShippingChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">City</label>
            <input 
              type="text" 
              name="city"
              className="form-control" 
              value={shippingAddress.city} 
              onChange={handleShippingChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Postal Code</label>
            <input 
              type="text" 
              name="postalCode"
              className="form-control" 
              value={shippingAddress.postalCode} 
              onChange={handleShippingChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Country</label>
            <input 
              type="text" 
              name="country"
              className="form-control" 
              value={shippingAddress.country} 
              onChange={handleShippingChange} 
              required 
            />
          </div>
        </form> */}
        {/* CheckoutButton receives shippingAddress and total as props */}
        {/* <CheckoutButton shippingAddress={shippingAddress} amount={total} /> */}
        <CheckoutButton  amount={total} />
       
      {/* </div> */}
    </Elements>
  );
};

export default CheckoutPage;