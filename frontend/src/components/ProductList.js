import React, { useEffect, useState } from 'react';
import Product from './Product';
import axios from 'axios';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        console.log('API Response:', response.data); // 🔍 Log to debug
        setProducts(Array.isArray(response.data) ? response.data : []); // ✅ Ensure it's an array
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to fetch products. Please try again later.');
      }
    };
    fetchProducts();
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(product => product._id !== id));
  };

  return (
    <div>
      <ProductForm onAdd={handleAddProduct} />
      {products.map(product => (
        <Product key={product._id} product={product} onDelete={handleDeleteProduct} />
      ))}
    </div>
  );
};

export default ProductList;