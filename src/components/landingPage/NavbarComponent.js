import React, { useState } from 'react';
import './LandingPage.css';
import { Link } from 'react-router-dom';

const NavbarComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar">
      <div className="brand-1">
        <button className="toggle-btn" onClick={toggleMenu}>
          ☰
        </button>
        <span>StudyMaster</span>
      </div>
      <div className={`menu-1 ${isMenuOpen ? 'open' : ''}`}>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/feature">Feature</a>
        <a href="/pricing">Pricing</a>
        <a href="/faq">FAQ</a>
        <a href="/contact">Contact</a>
      </div>
      <Link to="/login">
        <button className="free-trial-btn">Start Now</button>
      </Link>
    </div>
  );
};

export default NavbarComponent;
