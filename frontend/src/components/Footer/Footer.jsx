import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-wrap">
        <p>EventHub © 2026</p>
        <div className="footer-links">
          <Link to="/about">About</Link>

          <Link to="/contact">Contact</Link>
    
          <Link to="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
