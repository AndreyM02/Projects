import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Product from './Product';
import ProductForm from './ProductForm';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  // Automatically fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        // Update here: extract the products array from the response object
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to fetch products. Please try again later.');
      }
    };

    fetchProducts();
  }, []);

  // Callback to add a new product
  const handleAddProduct = (newProduct) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  // Callback to delete a product
  const handleDeleteProduct = (id) => {
    setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
  };

  return (
    <div>
      <h2>Product Management</h2>
      
      {/* ProductForm is used to add a new product */}
      <ProductForm onAdd={handleAddProduct} />

      {/* Display the list of products */}
      {products.length > 0 ? (
        <div className="product-list">
          {products.map(product => (
            <Product 
              key={product._id} 
              product={product} 
              onDelete={handleDeleteProduct} 
            />
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}
    </div>
  );
};

export default ProductList;