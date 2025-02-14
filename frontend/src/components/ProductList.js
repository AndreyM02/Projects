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
         console.log("Token from localStorage:", token);
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
    <div className="product-management-container">
      <h2>Product Management</h2>

      {userInfo && (
        <p>
          Profile <strong>{userInfo.email}</strong>
        </p>
      )}
      
      {/* ProductForm is used to add a new product */}
      {/* <ProductForm onAdd={handleAddProduct} /> */}

      {/* Display the list of products */}
      {products.length > 0 ? (
        <div className="scrollable-list">
        <div className="product-list">
          {products.map(product => (
            <Product 
              key={product._id} 
              product={product} 
              onDelete={handleDeleteProduct} 
            />
          ))}
        </div>
      </div>
      ) : (
        <p>No products available.</p>
      )}
      <div className="logout-button">
            <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
  );
};

export default ProductList;