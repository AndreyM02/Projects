
import './App.css';

import React from 'react';
// import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Register from './components/Register';
import Profile from './components/Profile';
import ProductForm from './components/ProductForm';
import ProductAssignment from './components/ProductAssignment';
import AdminDashboard from './components/AdminDashboard';
import UserManagement from './components/UserManagement';
import LandingPage from './components/LandingPage';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import Orders from './components/Orders';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/change-password" element={<Profile />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/product-assignment" element={<ProductAssignment />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        
        {/* Add more routes (e.g., protected routes) as needed */}
      </Routes>
    </BrowserRouter>
  );
}



export default App;
