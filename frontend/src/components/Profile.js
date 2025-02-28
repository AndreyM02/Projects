// frontend/src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  // State for profile information
  const [userInfo, setUserInfo] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  // State for messages and loading
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // On mount, decode the token and optionally fetch additional profile data from backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserInfo(decoded);
        setName(decoded.name || '');
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    }

    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get('http://localhost:5000/api/auth/profile', config);
        // Assuming response.data returns { name, phone, address }
        setName(response.data.name || '');
        setPhone(response.data.phone || '');
        setAddress(response.data.address || '');
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    setError('');
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const payload = { name, phone, address };
      const response = await axios.put('http://localhost:5000/api/auth/profile', payload, config);
      setMessage(response.data.message || 'Profile updated successfully.');
    } catch (err) {
      console.error('Error updating profile:', err);
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setIsLoading(false);
    }
  };


  const handleLogout = () => {
    // Remove the JWT from localStorage
    localStorage.removeItem('token');
    // Optionally, you can also clear any additional user data from your state management
    // Redirect the user to the login page or home page
    navigate('/login');
  };

  return (
    <div className="profile-container container my-5">
  <div className="d-flex justify-content-between align-items-center mb-4">
    <h2>My Profile</h2>
    <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
  </div>

  {message && <div className="alert alert-success">{message}</div>}
  {error && <div className="alert alert-danger">{error}</div>}

  <form onSubmit={handleSubmit}>
    <div className="mb-3">
      <label className="form-label">Email (read-only)</label>
      <input 
        type="email" 
        className="form-control" 
        value={userInfo.email || ''} 
        readOnly 
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Name</label>
      <input 
        type="text" 
        className="form-control" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Phone</label>
      <input 
        type="text" 
        className="form-control" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
    </div>
    <div className="mb-3">
      <label className="form-label">Address</label>
      <textarea 
        className="form-control" 
        value={address} 
        onChange={(e) => setAddress(e.target.value)} 
        rows="3" 
      />
    </div>
    <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
      {isLoading ? 'Updating...' : 'Update Profile'}
    </button>
  </form>
  
  <div className="mt-3 text-center">
    <Link to="/change-password" className="btn btn-link">Change Password</Link>
  </div>
</div>

    

  );
};

export default Profile;