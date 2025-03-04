// frontend/src/components/SuccessPage.js
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get('session_id');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const finalizeOrder = async () => {
      try {
        // const token = localStorage.getItem('token');
        // const config = { headers: { Authorization: `Bearer ${token}` } };
        // Here, you could pass additional data if needed.
        // For now, we simply call the endpoint that creates the order.
        // const response = await axios.post('http://localhost:5000/api/orders', {
          // Optionally include shippingAddress if not already stored or associated with session.
        // }, config);
        // setMessage('Your order has been finalized successfully!');
        // Redirect to orders history after a delay.
        setTimeout(() => {
          navigate('/checkout');
        }, 3000);
      } catch (error) {
        console.error('Error finalizing order:', error);
        setMessage('There was an error finalizing your order.');
      }
    };

    if (sessionId) {
      finalizeOrder();
    }
  }, [sessionId, navigate]);

  return (
    <div className="container my-5">
      <h2>Payment Successful</h2>
      <p>{message ? message : 'Finalizing your order, please wait...'}</p>
    </div>
  );
};

export default SuccessPage;