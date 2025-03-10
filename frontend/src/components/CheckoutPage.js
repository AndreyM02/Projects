// // CheckoutPage.js
// // import React from 'react';
// // import axios from 'axios';
// // import { loadStripe } from '@stripe/stripe-js';
// // import { Elements } from '@stripe/react-stripe-js';
// // import CheckoutButton from './CheckoutButton';

// // // Initialize Stripe with your publishable key
// // const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// // const CheckoutPage = () => {
// //   return (
// //     <div className="container my-5">
// //       <h2>Checkout</h2>
// //       <Elements stripe={stripePromise}>
// //         <CheckoutButton />
// //       </Elements>
// //     </div>
// //   );
// // }; 

// // export default CheckoutPage;





// // frontend/src/components/CheckoutPage.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements } from '@stripe/react-stripe-js';
// import CheckoutButton from './CheckoutButton';
// import { useNavigate } from 'react-router-dom';
// import './Checkout.css';

// // Load Stripe using your publishable key from env (for Create React App, it must be prefixed with REACT_APP_)
// const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

// const CheckoutPage = () => {
//   // const [shippingAddress, setShippingAddress] = useState({
//   //   name: '',
//   //   address: '',
//   //   city: '',
//   //   postalCode: '',
//   //   country: ''
//   // });
//   const [total, setTotal] = useState(0);
//   const [error, setError] = useState('');
//   const [isProcessing, setIsProcessing] = useState(false);
//   const navigate = useNavigate();

//   // Fetch cart items and compute total (assumes product.price is in dollars)
//   useEffect(() => {
//     const fetchCart = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         const config = { headers: { Authorization: `Bearer ${token}` } };
//         const apiUrl = process.env.REACT_APP_API_URL;
//         const response = await axios.get(`${apiUrl}/api/cart`, config);
//         // Calculate total from the cart items:
//         const computedTotal = response.data.reduce(
//           (acc, item) => acc + (item.product.price * item.quantity),
//           0
//         );
//         setTotal(computedTotal);
//       } catch (err) {
//         console.error('Error fetching cart:', err);
//         setError('Failed to fetch cart items.');
//       }
//     };
//     fetchCart();
//   }, []);

//   // const handleShippingChange = (e) => {
//   //   setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
//   // };

//   return (
//     <Elements stripe={stripePromise}>
//       {/* <div className="checkout-container container my-5">
//         <h2 className="mb-4">Checkout</h2>
//         {error && <div className="alert alert-danger">{error}</div>}
//         <form>
//           <h4>Shipping Information</h4>
//           <div className="mb-3">
//             <label className="form-label">Full Name</label>
//             <input 
//               type="text" 
//               name="name"
//               className="form-control" 
//               value={shippingAddress.name} 
//               onChange={handleShippingChange} 
//               required 
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Address</label>
//             <input 
//               type="text" 
//               name="address"
//               className="form-control" 
//               value={shippingAddress.address} 
//               onChange={handleShippingChange} 
//               required 
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">City</label>
//             <input 
//               type="text" 
//               name="city"
//               className="form-control" 
//               value={shippingAddress.city} 
//               onChange={handleShippingChange} 
//               required 
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Postal Code</label>
//             <input 
//               type="text" 
//               name="postalCode"
//               className="form-control" 
//               value={shippingAddress.postalCode} 
//               onChange={handleShippingChange} 
//               required 
//             />
//           </div>
//           <div className="mb-3">
//             <label className="form-label">Country</label>
//             <input 
//               type="text" 
//               name="country"
//               className="form-control" 
//               value={shippingAddress.country} 
//               onChange={handleShippingChange} 
//               required 
//             />
//           </div>
//         </form> */}
//         {/* CheckoutButton receives shippingAddress and total as props */}
//         {/* <CheckoutButton shippingAddress={shippingAddress} amount={total} /> */}
//         <CheckoutButton  amount={total} />
       
//       {/* </div> */}
//     </Elements>
//   );
// };

// export default CheckoutPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

// Load Stripe using your publishable key from env
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY);

const CheckoutPage = () => {
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
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  // Fetch cart items and compute total
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/cart`, config);
        setCartItems(response.data);
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

  const handleShippingChange = (e) => {
    setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
  };

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const apiUrl = process.env.REACT_APP_API_URL;
      // Prepare payload: shippingAddress (as an object or JSON string, depending on your backend) and total amount in cents
      const payload = {
        // If your backend expects shippingAddress as JSON, you can do:
        shippingAddress: JSON.stringify(shippingAddress),
        amount: Math.round(total * 100) // Convert dollars to cents
      };
      const response = await axios.post(`${apiUrl}/api/stripe/create-checkout-session`, payload, config);
      const sessionId = response.data.id;
      // Redirect to Stripe Checkout
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Stripe checkout error:', error);
        setError(error.message);
      }
    } catch (err) {
      console.error('Error initiating checkout:', err);
      setError('Failed to initiate checkout.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <div className="checkout-container container my-5">
        <h2 className="mb-4">Checkout</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleCheckout}>
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
          <div className="mb-3">
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
          <button type="submit" className="btn btn-primary w-100" disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Proceed to Payment'}
          </button>
        </form>
      </div>
    </Elements>
  );
};

export default CheckoutPage;