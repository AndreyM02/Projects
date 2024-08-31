import React from 'react';
import axios from 'axios';

const Product = ({ product, onDelete }) => {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${product._id}`);
      onDelete(product._id);
    } catch (error) {
      console.error('Failed to delete product:', error);
    }
  };

  return (
    <div>
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <img src={product.imageUrl} alt={product.name} style={{ width: '100px' }} />
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default Product;