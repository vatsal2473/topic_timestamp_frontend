import React from 'react';
import favicon from '../assets/favicon.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={favicon} alt="logo" className="navbar-logo" />
      </div>
      <div className="navbar-right">
      <a href='https://scribe-vd.vercel.app/'>
        <button className="navbar-back-button">Back</button>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
