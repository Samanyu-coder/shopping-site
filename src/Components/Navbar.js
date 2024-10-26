// Navbar.js
import React, { useState } from 'react';
import '../styles/Navbar.css';
import menu from '../Images/menu.png';
import cart from '../Images/cart.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="menu-icon" onClick={toggleMenu}>
          <img src={menu} alt="menu" />
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="cart-icon">
          <img src={cart} alt="cart" />
        </div>
      </nav>
      <div className={`side-menu ${isOpen ? 'open' : ''}`} onClick={closeMenu}>
        <div className="menu-content" onClick={(e) => e.stopPropagation()}>
          <ul>
            <li>View Profile</li>
            <hr />
            <li>Wishlist</li>
            <hr />
            <li>Orders</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
