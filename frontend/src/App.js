
import './App.css';

import React from 'react';
// import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';
import Register from './components/Register';
import Profile from './components/Profile';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProductList />} />
        <Route path="/change-password" element={<Profile />} />
        {/* Add more routes (e.g., protected routes) as needed */}
      </Routes>
    </BrowserRouter>
  );
}



export default App;
