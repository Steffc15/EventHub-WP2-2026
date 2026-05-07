import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';
import { toast } from 'react-toastify';
const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Cont creat cu succes!');
        navigate('/login');
      } else {
        toast.error(data);
      }
    } catch (error) {
      console.error(error);
      toast.error('Eroare la server!');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Sign up</h2>
        <p>Create a new account.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

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