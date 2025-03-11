// // frontend/src/components/CheckoutButton.js
// import React from 'react';
// import axios from 'axios';
// import { useStripe } from '@stripe/react-stripe-js';



// const CheckoutButton = () => {
//   const handleCheckout = async () => {
//     try {
//       // Call your backend endpoint to create a Checkout Session
//       const response = await axios.post('http://localhost:5000/api/stripe/create-checkout-session');
//       //console.log(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY)
//       const sessionId = response.data.id;

//       // Redirect to Stripe Checkout using the session ID.
//       // You can use Stripe.js to redirect:
//       const stripePublicKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
//       console.log(stripePublicKey);
//       // if (!stripePublicKey) {
//       //   console.error('Stripe publishable key is not defined!');
//       // }
//          const stripe = useStripe();
//          console.log(stripe);
//     //   const stripe = await window.Stripe(process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY); // Replace with your test publishable key
//       // const { error } = await stripe.redirectToCheckout({ sessionId });
//     //   if (error) {
//     //     console.error('Stripe checkout error:', error);
//     //   }
//     } catch (err) {
//        console.error('Error creating checkout session:', err);
//       }
//   };

//   return (
//     <button onClick={handleCheckout} className="btn btn-primary">
//       Checkout
//     </button>
//   );
// };

// export default CheckoutButton;




// frontend/src/components/CheckoutButton.js
import React from 'react';
import axios from 'axios';
import { useStripe } from '@stripe/react-stripe-js';

const CheckoutButton = ({ amount }) => {
  const stripe = useStripe();

  const handleCheckout = async () => {
    try {
      if (!stripe) {
        console.error('Stripe has not loaded yet.');
        return;
      }
      // console.log(shippingAddress);
      // console.log(amount);
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const apiUrl = process.env.REACT_APP_API_URL;
      // Call the backend to create a Checkout Session with shipping info and total (converted to cents)
      const response = await axios.post(`${apiUrl}/api/stripe/create-checkout-session`, {
        // shippingAddress,
        amount: amount * 100, // converting dollars to cents
      }, config);
      const sessionId = response.data.id;
      
      // Redirect to Stripe Checkout using the session ID
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        console.error('Stripe checkout error:', error);
      }
    } catch (err) {
      console.error('Error creating checkout session:', err);
    }
  };

  return (
    <button onClick={handleCheckout} className="btn btn-outline-dark">
      Checkout
    </button>
  );
};

export default CheckoutButton;