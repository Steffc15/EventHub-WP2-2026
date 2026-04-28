import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="nav-wrap">
        <h1 className="logo">EventHub</h1>

        <nav className="main-nav">
          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/reservations">Reservations</Link>

          <Link to="/login">Log in</Link>
          <Link to="/signup">Sign up</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
