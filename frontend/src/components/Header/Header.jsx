import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('reservations');
    navigate('/login');
    window.location.reload();
  };

  return (
    <header className="site-header">
      <div className="nav-wrap">
        <h1 className="logo">
          <Link to="/">EventHub</Link>
        </h1>

        <nav className="main-nav">
          <Link to="/">Home</Link>

          {user && (
            <>
              <Link to="/events">Events</Link>
              <Link to="/reservations">Reservations</Link>
            </>
          )}

          {!user ? (
            <>
              <Link to="/login">Log in</Link>
              <Link to="/signup">Sign up</Link>
            </>
          ) : (
            <button className="logout-btn" onClick={handleLogout}>
              Log out
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;