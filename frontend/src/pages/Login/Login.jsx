import React from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Log in</h2>
        <p>Log in to your account.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Email Address" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Password" />
          </div>

          <button className="auth-submit" type="submit">
            Log in
          </button>
        </form>

        <p className="auth-toggle" onClick={() => navigate('/signup')}>
          Don't have an account? Sign up
        </p>
      </div>
    </div>
  );
};

export default Login;
