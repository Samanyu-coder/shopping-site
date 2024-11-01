// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
          <li>
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <hr />
          <li>
              <Link to="/login" onClick={closeMenu}>
                SignUp/Login
              </Link>
            </li>
            <hr />
            <li>
              <Link to="/wishlist" onClick={closeMenu}>
                Wishlist
              </Link>
            </li>
            <hr />
            <li>
              <Link to="/profile" onClick={closeMenu}>
                View Profile
              </Link>
            </li>
            <hr />
            <li>
              <Link to="/orders" onClick={closeMenu}>
                Orders
              </Link>
            </li>
            {/* <hr /> */}
            {/* <hr /> */}
            {/* <li>
              <Link to="/Login" onClick={closeMenu}>
                Login
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
