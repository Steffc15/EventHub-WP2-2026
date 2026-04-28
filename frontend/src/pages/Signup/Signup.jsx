import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign up</h2>
        <p>Create a new account.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input type="text" placeholder="Your Name" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Email Address" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Password" />
          </div>

          <button className="auth-submit" type="submit">
            Sign up
          </button>
        </form>

        <p className="auth-toggle" onClick={() => navigate('/login')}>
          Already have an account? Log in
        </p>
      </div>
    </div>
  );
};

export default Signup;
