// frontend/src/components/Orders.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Orders.css';
import { Link } from 'react-router-dom';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/orders`, config);
        // Depending on your response structure, adjust accordingly:
        setOrders(response.data.orders || response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="orders-container container my-5">
      <h2 className="mb-4">Your Orders</h2>
      {loading && <p>Loading orders...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="order-card card mb-4">
            <div className="card-body">
              <h5 className="card-title">Order ID: {order._id}</h5>
              <p className="card-text">
                <strong>Status:</strong> {order.orderStatus}
              </p>
              <p className="card-text">
                <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
              </p>
              <p className="card-text">
                <strong>Ordered on:</strong> {new Date(order.createdAt).toLocaleString()}
              </p>
              <h6>Items:</h6>
              {/* <ul className="list-group list-group-flush">
                {order.items.map(item => (
                  <li key={item.product._id} className="list-group-item">
                    {item.quantity} x {item.product.name} — ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul> */}

<ul className="list-group list-group-flush">
  {order.items.map((item, index) => (
    <li key={item.product ? item.product._id : index} className="list-group-item">
      {item.quantity} x {item.product ? item.product.name : 'Product Not Available'} — ${(item.price * item.quantity).toFixed(2)}
    </li>
  ))}
</ul>
              <h6 className="mt-3">Shipping Address:</h6>
              <p className="card-text">
                {order.shippingAddress.name}<br />
                {order.shippingAddress.address}, {order.shippingAddress.city}<br />
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
            </div>
          </div>
        ))
      )}
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-primary">Return to Home</Link>
      </div>
    </div>
  );
};

export default Orders;