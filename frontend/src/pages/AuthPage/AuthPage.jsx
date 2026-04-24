import React, { useState } from 'react';
import './AuthPage.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>{isLogin ? 'Log in' : 'Sign up'}</h2>
        <p>{isLogin ? 'Log in to your account.' : 'Create a new account.'}</p>
        
        <form className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Your Name" />
            </div>
          )}
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Email Address" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Password" />
          </div>
          
          <button type="submit" className="action-btn btn-event-details auth-submit">
            {isLogin ? 'Log in' : 'Sign up'}
          </button>
        </form>

        <p className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Don't have an account? Sign up" : "Already an account? Log in"}
        </p>
      </div>
    </div>
  );
};

export default AuthPage;