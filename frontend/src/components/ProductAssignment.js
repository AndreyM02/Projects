// frontend/src/components/ProductAssignment.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductAssignment = () => {
  const [products, setProducts] = useState([]);
  const [sellerEmails, setSellerEmails] = useState({});

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.get(`${apiUrl}/api/products`, config);
      setProducts(response.data.products || []);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch products.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSellerEmailChange = (productId, value) => {
    setSellerEmails(prev => ({ ...prev, [productId]: value }));
  };

  const assignProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const sellerEmail = sellerEmails[productId];
      const apiUrl = process.env.REACT_APP_API_URL;
      if (!sellerEmail) {
        alert('Please enter a seller email.');
        return;
      }
      await axios.put(`${apiUrl}/api/products/${productId}/assign`, { sellerEmail }, config);
      alert('Product assigned successfully.');
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Failed to assign product.');
    }
  };

  return (
    <div className="product-assignment">
      <h3>Product Assignment</h3>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Current Seller</th>
            <th>New Seller Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {products.map((product, index) => (
    <tr key={product._id ? product._id.toString() : index}>
      <td>{product.name}</td>
      <td>{product.seller ? product.seller.email : 'Not assigned'}</td>
      <td>
        <input
          type="text"
          value={sellerEmails[product._id] || ''}
          onChange={(e) => handleSellerEmailChange(product._id, e.target.value)}
          placeholder="Enter seller email"
        />
      </td>
      <td>
        <button onClick={() => assignProduct(product._id)}>Assign Seller</button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

export default ProductAssignment;