// frontend/src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Adjust the URL if needed (assuming backend runs on port 5000)
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.post(`${apiUrl}/api/auth/register`, { email, password });
      // Store the token (for example, in localStorage) to use in protected routes
      localStorage.setItem('token', response.data.token);
      // Redirect to a protected page (e.g., your product management page)
      navigate('/');
    } catch (err) {
      console.error('Register failed:', err);
      setError(err.response?.data?.message || 'Register failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input 
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

    
        <div className="form-group">
          <label>Confirm Password:</label>
          <input 
            type="password"
            value={confirmPassword}
            onChange= { e => {setConfirmPassword(e.target.value)
                if (password !== e.target.value) {
                    setError('Password Mismatched');
                  }


            }}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering in...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;