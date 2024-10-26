// Navbar.js
import React from 'react';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="menu-icon">
        <img src="menu-icon.png" alt="menu" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="cart-icon">
        <img src="cart-icon.png" alt="cart" />
      </div>
    </nav>
  );
}

export default Navbar;
