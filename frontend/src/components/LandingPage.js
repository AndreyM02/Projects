// frontend/src/components/LandingPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import ProductCatalog from './ProductCatalog';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
//import { useNavigate } from 'react-router-dom';

import './LandingPage.css';

const LandingPage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
   const [userInfo, setUserInfo] = useState(null);
//   const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
         // Retrieve token from localStorage
         const token = localStorage.getItem('token');
         const config = {
           headers: {
             Authorization: `Bearer ${token}`,
           },
         };
        // Adjust this URL as needed (if your GET /api/products endpoint is protected,
        // you might need to attach a token or create an endpoint that returns public/featured products)
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/api/public/products`);
        // For example, select the first 3 products as "featured"
        setFeaturedProducts(response.data.products.slice(0, 3));
      } catch (error) {
        console.error('Error fetching products:', error);
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

    fetchFeaturedProducts();
  }, []);



return (


  <div className="landing-container">
  {/* Navigation Bar */}
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link className="navbar-brand" to="/">Menswear Marketplace</Link>
      <div className="navbar-right ms-auto">
        {userInfo ? (
          <Link className="btn btn-outline-light me-2" to="/profile">
            {userInfo.name ? userInfo.name : userInfo.email}
          </Link>
        ) : (
          <Link className="btn btn-outline-light me-2" to="/login">Login</Link>
        )}
        <Link className="btn btn-outline-light" to="/cart">
          <i className="bi bi-cart-fill"></i> Cart
        </Link>
      </div>
    </div>
  </nav>

  {/* Hero Section */}
  <header 
    className="landing-header" 
    style={{ backgroundImage: "url('/images/DALL·E 2025-03-03 14.55.36.jpg')" }}
  >
    <div className="hero-overlay"></div>
    <div className="hero-content container text-center text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
      <h1 className="display-4">Welcome to Our Men's wear Store</h1>
      <p className="lead">Discover stylish, premium apparel designed for today's man.</p>
      {/* "Shop Now" button scrolls down to the product list section */}
      <a href="#full-product-list" className="btn btn-dark btn-lg mt-3">Shop Now</a>
    </div>
  </header>

  {/* Featured Products Section */}
  {/* <section className="py-5 featured-products">
    <div className="container">
      <h2 className="mb-4 text-center">Featured Products</h2>
      <div className="product-grid">
      

        <div className = "row">

        {featuredProducts.length > 0 ? (
          featuredProducts.map(product => (
            <div className="col-md-4 mb-4" key={product._id}>
              <img 
                src={product.imageUrl || 'https://via.placeholder.com/200'} 
                alt={product.name} 
              />
              <h5>{product.name}</h5>
              <p>${product.price.toFixed(2)}</p>
            </div>
          ))
        ) : (
          <p className="text-center">No featured products available.</p>
        )}

        </div>
      
      </div>
    </div>
  </section> */}


{/* Featured Products Section */}
<section className="py-5 featured-products">
  <div className="container">
    <h2 className="mb-4 text-center">Featured Products</h2>
    <div className="featured-products-wrapper">
      {featuredProducts.length > 0 ? (
        featuredProducts.map(product => (
          <div className="featured-product-card" key={product._id}>
            <div className="card h-100">
              <img 
                src={product.imageUrl || 'https://via.placeholder.com/400x300'} 
                className="card-img-top" 
                alt={product.name} 
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">${product.price.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center">No featured products available.</p>
      )}
    </div>
  </div>
</section>

  {/* Full Product List Section */}
  <section className="py-5 full-product-list" id="full-product-list">
    <div className="container">
      <ProductCatalog />
    </div>
  </section>

  {/* Footer */}
  <footer className="bg-dark text-white text-center py-3 landing-footer">
    <div className="container">
      <small>&copy; 2025 Menswear Store. All rights reserved.</small>
    </div>
  </footer>
</div>
);
};

export default LandingPage;