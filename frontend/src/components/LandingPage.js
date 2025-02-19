// frontend/src/components/LandingPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';

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
        const response = await axios.get('http://localhost:5000/api/products', config);
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
      <header className="landing-header">
        <h1>Welcome to Our Handmade Goods Marketplace</h1>
        <p>Discover unique, handcrafted items made with love.</p>
        {userInfo && (
        <p>
          Profile <strong>{userInfo.email}</strong>
        </p>
      )}
        <div className="cta-buttons">
          <a href="/login" className="btn">Login</a>
          <a href="/register" className="btn">Register</a>
        </div>
      </header>

      <section className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.length > 0 ? (
            featuredProducts.map(product => (
              <div className="product-card" key={product._id}>
                <img src={product.imageUrl || 'https://via.placeholder.com/200'} alt={product.name} />
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <>
              {/* <div className="product-card">
                <img src="https://via.placeholder.com/200" alt="Handmade Mug" />
                <h3>Handmade Mug</h3>
                <p>$25.00</p>
              </div>
              <div className="product-card">
                <img src="https://via.placeholder.com/200" alt="Artisan Necklace" />
                <h3>Artisan Necklace</h3>
                <p>$40.00</p>
              </div>
              <div className="product-card">
                <img src="https://via.placeholder.com/200" alt="Woven Basket" />
                <h3>Woven Basket</h3>
                <p>$35.00</p>
              </div> */}
            </>
          )}
        </div>
      </section>

      <footer className="landing-footer">
        <p>&copy; 2025 Handmade Goods Marketplace. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;