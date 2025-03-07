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
        // Retrieve token if needed
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        
        // Send sessionId (and any other required details) to your backend to finalize the order
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/orders/finalize`,
          { sessionId },
          config
        );
        
        setMessage('Your order has been finalized successfully!');
        // Redirect to orders history after a delay
        setTimeout(() => {
          navigate('/orders');
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