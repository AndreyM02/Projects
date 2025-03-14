
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import React from 'react';
// import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Register from './components/Register';
import ChangePassword from './components/ChangePassword';
import ProductForm from './components/ProductForm';
import ProductAssignment from './components/ProductAssignment';
import AdminDashboard from './components/AdminDashboard';
import UserManagement from './components/UserManagement'; 
import LandingPage from './components/LandingPage';
import ShoppingCart from './components/ShoppingCart';
import Checkout from './components/Checkout';
import Orders from './components/Orders';
import Profile from './components/Profile';
// import CheckoutButton from './components/CheckoutButton';
import CheckoutPage from './components/CheckoutPage';
import SuccessPage from './components/SuccessPage';
import CancelPage from './components/CancelPage';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add-product" element={<ProductForm />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/product-assignment" element={<ProductAssignment />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/profile" element={<Profile />} />
        {/* <Route path="/checkout-button" element={<CheckoutButton />} /> */}
        <Route path="/checkout-page" element={<CheckoutPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/cancel" element={<CancelPage />} />
        
        {/* Add more routes (e.g., protected routes) as needed */}
      </Routes>
    </BrowserRouter>
  );
}



export default App;
