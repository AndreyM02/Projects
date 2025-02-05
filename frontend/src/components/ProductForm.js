import React, { useState } from 'react';
import axios from 'axios';



const ProductForm = ({ onAdd }) => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    category: ''
  });

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
  
    try {
      const response = await axios.post('http://localhost:5000/api/products', product);
      onAdd(response.data);
      setProduct({ name: '', description: '', price: '', imageUrl: '', category: '' });
    } catch (error) {
      console.error('Error adding product:', error);
      setError('Failed to add product. Please check your input.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
      <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
      <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
      <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="Image URL" />
      <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={loading}>{loading ? 'Adding...' : 'Add Product'}</button>
    </form>
  );

  // return (
  //   <form onSubmit={handleSubmit}>
  //     <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Name" required />
  //     <input type="text" name="description" value={product.description} onChange={handleChange} placeholder="Description" required />
  //     <input type="number" name="price" value={product.price} onChange={handleChange} placeholder="Price" required />
  //     <input type="text" name="imageUrl" value={product.imageUrl} onChange={handleChange} placeholder="Image URL" />
  //     <input type="text" name="category" value={product.category} onChange={handleChange} placeholder="Category" required />
  //     <button type="submit">Add Product</button>
  //   </form>
  // );
};

export default ProductForm;