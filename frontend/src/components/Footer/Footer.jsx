import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-wrap">
        <p>EventHub © 2026</p>
        <div className="footer-links">
          <a href="#">About</a>
          <span>|</span>
          <a href="#">Contact</a>
          <span>|</span>
          <a href="#">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;