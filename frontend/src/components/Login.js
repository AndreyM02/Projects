// frontend/src/components/Login.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Login = () => {
//   const navigate = useNavigate();
//   const [email, setEmail]       = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError]       = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setIsLoading(true);

//     try {
//       // Adjust the URL if needed (assuming backend runs on port 5000)
//       const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//       // Store the token (for example, in localStorage) to use in protected routes
//       localStorage.setItem('token', response.data.token);
//       // Redirect to a protected page (e.g., your product management page)
//       navigate('/');
//     } catch (err) {
//       console.error('Login failed:', err);
//       setError(err.response?.data?.message || 'Login failed. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email:</label>
//           <input 
//             type="email"
//             value={email}
//             onChange={e => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label>Password:</label>
//           <input 
//             type="password"
//             value={password}
//             onChange={e => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" disabled={isLoading}>
//           {isLoading ? 'Logging in...' : 'Login'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handler functions to update state
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      // Replace with your backend's login endpoint
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/');
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm
      email={email}
      password={password}
      error={error}
      isLoading={isLoading}
      onEmailChange={handleEmailChange}
      onPasswordChange={handlePasswordChange}
      onSubmit={handleSubmit}
    />
  );
};

export default Login;