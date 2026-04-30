import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Login reușit!');
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/');
      } else {
        alert(data);
      }
    } catch (error) {
      console.error(error);
      alert('Eroare la server!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Log in</h2>
        <p>Log in to your account.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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