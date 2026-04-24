import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <div className="logo">EventHub</div>
        <nav className="main-nav">
          <a href="/">Home</a>
          <a href="/events">Events</a>
          <a href="/reservations">Reservations</a>
          <a href="/auth" className="nav-active">Log in/Sign up</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;