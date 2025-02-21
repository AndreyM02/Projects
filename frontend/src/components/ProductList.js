import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Product from './Product';
import { useNavigate } from 'react-router-dom';
// import ProductForm from './ProductForm';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  // Automatically fetch products when the component mounts
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
        const response = await axios.get('http://localhost:5000/api/products', config);
        // Update here: extract the products array from the response object
        setProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Failed to fetch products. Please try again later.');
      }
    };

    const token = localStorage.getItem('token');
        //  console.log("Token from localStorage:", token);
        if (token) {
          try {
            const decoded = jwtDecode(token);
            setUserInfo(decoded);
          } catch (err) {
            console.error('Failed to decode token:', err);
          }
        }

    fetchProducts();
  }, []);

  // Callback to add a new product
  // const handleAddProduct = (newProduct) => {
  //   setProducts(prevProducts => [...prevProducts, newProduct]);
  // };

    // Only allow modification (e.g., delete) if user is a seller or admin
  const canModify = userInfo && (userInfo.role === 'seller' || userInfo.role === 'admin');

  // Callback to delete a product
  const handleDeleteProduct = (id) => {
    setProducts(prevProducts => prevProducts.filter(product => product._id !== id));
  };

  const handleLogout = () => {
    // Remove the JWT from localStorage
    localStorage.removeItem('token');
    // Optionally, you can also clear any additional user data from your state management
    // Redirect the user to the login page or home page
    navigate('/login');
  };

  return (

<div className="product-management-container container py-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Product Management</h2>
        <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
      </div>
      {userInfo && (
        <p className="text-center">Profile: <strong>{userInfo.email}</strong></p>
      )}
      {products.length > 0 ? (
        <div className="scrollable-list">
          <div className="row">
            {products.map(product => (
              <div className="col-md-4 mb-4" key={product._id}>
                <Product 
                  product={product} 
                  onDelete={canModify ? handleDeleteProduct : null} 
                />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center">No products available.</p>
      )}
    </div>
  );
};

export default ProductList;