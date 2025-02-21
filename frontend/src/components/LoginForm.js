import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    <div className="card login-card shadow">
      <div className="card-body">
        <h2 className="card-title text-center mb-4">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="mb-3 input-group">
            <label className="form-label">Email:</label>
            <input
              type="email"
              className="form-control custom-input"
              value={email}
              onChange={onEmailChange}
              required
            />
          </div>
          <div className="mb-3 input-group">
            <label className="form-label">Password:</label>
            <input
              type="password"
              className="form-control custom-input"
              value={password}
              onChange={onPasswordChange}
              required
            />
          </div>
          <button type="submit" className="btn login-btn w-100" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className="login-footer text-center mt-3">
          <Link to="/register">Don't have an account? Register</Link>
        </div>
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