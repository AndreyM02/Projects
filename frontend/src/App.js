
import './App.css';

import React from 'react';
// import Home from './components/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import ProductList from './components/ProductList';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProductList />} />
        {/* Add more routes (e.g., protected routes) as needed */}
      </Routes>
    </BrowserRouter>
  );
}



export default App;
