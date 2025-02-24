// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
// import './Profile.css';

// const Profile = () => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [currentPassword, setCurrentPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmNewPassword, setConfirmNewPassword] = useState('');
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   // Decode token to get current user info when the component mounts
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     console.log("Token from localStorage:", token);
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUserInfo(decoded);
//       } catch (err) {
//         console.error('Failed to decode token:', err);
//       }
//     }
//   }, []);

//   const handleChangePassword = async (e) => {
//     e.preventDefault();
//     setError('');
//     setMessage('');

//     // Validate that the new password matches its confirmation
//     if (newPassword !== confirmNewPassword) {
//       setError('New password and confirmation do not match.');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const token = localStorage.getItem('token');
//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       };

//       // Send the current and new password to the backend
//       const response = await axios.put(
//         'http://localhost:5000/api/auth/change-password',
//         { currentPassword, newPassword },
//         config
//       );

//       setMessage(response.data.message || 'Password updated successfully.');
//       // Clear form fields after successful update
//       setCurrentPassword('');
//       setNewPassword('');
//       setConfirmNewPassword('');
//     } catch (err) {
//       console.error('Error changing password:', err);
//       setError(err.response?.data?.message || 'Failed to change password.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="profile-container">
//       <h2>Change Password</h2>
      
//       {/* Display current user info if available */}
//       {userInfo && (
//         <p>
//           Changing password for: <strong>{userInfo.email}</strong>
//         </p>
//       )}
      
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {message && <p style={{ color: 'green' }}>{message}</p>}
      
//       <form onSubmit={handleChangePassword}>
//         <div className="form-group">
//           <label>Current Password:</label>
//           <input 
//             type="password"
//             value={currentPassword}
//             onChange={(e) => setCurrentPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>New Password:</label>
//           <input 
//             type="password"
//             value={newPassword}
//             onChange={(e) => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Confirm New Password:</label>
//           <input 
//             type="password"
//             value={confirmNewPassword}
//             onChange={(e) => setConfirmNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Updating...' : 'Update Password'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;



// frontend/src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './Profile.css';

const Profile = () => {
  // Profile info state
  const [userInfo, setUserInfo] = useState(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Password change state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // On mount, decode token and optionally fetch additional profile details from backend
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserInfo(decoded);
        setName(decoded.name || '');
        // You might also set other fields from the token if available
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    }
    
    // Optionally, fetch profile details from a backend endpoint
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

  // Handler to update general profile info
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);
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

  // Handler to change password
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
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const response = await axios.put(
        'http://localhost:5000/api/auth/change-password',
        { currentPassword, newPassword },
        config
      );
      setMessage(response.data.message || 'Password updated successfully.');
      // Clear password fields after successful update
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
    <div className="profile-container container my-5">
      <h2>My Profile</h2>
      
      {message && <div className="alert alert-success">{message}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Profile Information Section */}
      <form onSubmit={handleProfileUpdate} className="mb-5">
        <h4>Profile Information</h4>
        <div className="mb-3">
          <label className="form-label">Email (read-only)</label>
          <input type="email" className="form-control" value={userInfo ? userInfo.email : ''} readOnly />
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

      {/* Change Password Section */}
      <form onSubmit={handleChangePassword}>
        <h4>Change Password</h4>
        <div className="mb-3">
          <label className="form-label">Current Password:</label>
          <input 
            type="password"
            className="form-control"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">New Password:</label>
          <input 
            type="password"
            className="form-control"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Confirm New Password:</label>
          <input 
            type="password"
            className="form-control"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default Profile;