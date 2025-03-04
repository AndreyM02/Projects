// frontend/src/components/ProductCatalogItem.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 import './ProductCatalogItem.css'; // optional custom styling

const ProductCatalogItem = ({ product }) => {
//   const navigate = useNavigate();

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.post('http://localhost:5000/api/cart', { productId: product._id, quantity: 1 }, config);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Failed to add product to cart:', error);
      alert('Failed to add product to cart.');
    }
  };

  return (
    <div className="card h-100">
      <img
        src={product.imageUrl || 'https://via.placeholder.com/200'}
        className="card-img-top"
        alt={product.name}
      />
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">${product.price.toFixed(2)}</p>
        {/* <p className ="card-text">{product.description}</p> */}
      </div>
      <div className="card-footer">
        <button className="btn btn-dark w-100" onClick={handleAddToCart}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCatalogItem;