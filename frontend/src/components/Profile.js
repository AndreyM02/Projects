import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Profile.css';

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Decode token to get current user info when the component mounts
  useEffect(() => {
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
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    // Validate that the new password matches its confirmation
    if (newPassword !== confirmNewPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      // Send the current and new password to the backend
      const response = await axios.put(
        'http://localhost:5000/api/auth/change-password',
        { currentPassword, newPassword },
        config
      );

      setMessage(response.data.message || 'Password updated successfully.');
      // Clear form fields after successful update
      setCurrentPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
    } catch (err) {
      console.error('Error changing password:', err);
      setError(err.response?.data?.message || 'Failed to change password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <h2>Change Password</h2>
      
      {/* Display current user info if available */}
      {userInfo && (
        <p>
          Changing password for: <strong>{userInfo.email}</strong>
        </p>
      )}
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      
      <form onSubmit={handleChangePassword}>
        <div className="form-group">
          <label>Current Password:</label>
          <input 
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>New Password:</label>
          <input 
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm New Password:</label>
          <input 
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default Profile;