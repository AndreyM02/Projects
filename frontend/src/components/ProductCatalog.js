

// frontend/src/components/ProductCatalog.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCatalogItem from './ProductCatalogItem'; // A variant of Product for buyers
import './ProductCatalog.css';

const ProductCatalog = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {

         // Retrieve token from localStorage
         const token = localStorage.getItem('token');
         const config = {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         };
        const response = await axios.get('http://localhost:5000/api/public/products', config);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="product-catalog-container container py-5">
      <h2 className="text-center mb-4">Our Products</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map(product => (
            <div className="col-md-4 mb-4" key={product._id}>
              <ProductCatalogItem product={product} />
            </div>
          ))
        ) : (
          <p className="text-center">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;