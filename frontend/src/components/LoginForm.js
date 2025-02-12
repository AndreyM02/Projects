import React from 'react';
import PropTypes from 'prop-types';
import './Login.css';

const LoginForm = ({
  email,
  password,
  error,
  isLoading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => {
  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Please login to your account</p>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={onEmailChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={onPasswordChange}
              required
            />
          </div>
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="login-footer">
          <p>
            Don't have an account? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
};

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default LoginForm;