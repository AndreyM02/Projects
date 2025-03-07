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
// import { jwtDecode } from 'jwt-decode';
import './ChangePassword.css';

const Profile = () => {
  // Profile info state
  // const [userInfo, setUserInfo] = useState(null);
  // const [name, setName] = useState('');
  // const [phone, setPhone] = useState('');
  // const [address, setAddress] = useState('');

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
       
      } catch (err) {
        console.error('Failed to decode token:', err);
      }
    }
    
  }, []);

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
      const apiUrl = process.env.REACT_APP_API_URL;
      const response = await axios.put(
      `${apiUrl}/api/auth/change-password`,
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