// frontend/src/components/CancelPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CancelPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container my-5">
      <h2>Payment Cancelled</h2>
      <p>Your payment has been cancelled. If you wish, you can try checking out again.</p>
      <button onClick={() => navigate('/checkout')} className="btn btn-secondary">
        Return to Checkout
      </button>
    </div>
  );
};

export default CancelPage;