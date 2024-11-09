import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import menu from '../Images/menu.png';
import cart from '../Images/cart.png';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/search', { state: { query: searchQuery } });
    }
  };

  const checkLoggedIn = () => {
    const user = localStorage.getItem('user_id');
    return user ? user : null;
  };

  const handleCartClick = () => {
    const userId = checkLoggedIn();
    if (userId) {
      navigate('/cart');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="menu-icon" onClick={toggleMenu}>
          <img src={menu} alt="menu" />
        </div>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            required
          />
          <button type="submit" className="search-button custom-search-button">→</button>
        </form>
        <div className="cart-icon" onClick={handleCartClick}>
          <img src={cart} alt="cart" />
        </div>
      </nav>
      <div className={`side-menu ${isOpen ? 'open' : ''}`} onClick={closeMenu}>
        <div className="menu-content" onClick={(e) => e.stopPropagation()}>
          <ul>
            <li>
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
            <hr />
            <li>
              <Link to="/login" onClick={closeMenu}>SignUp/Login</Link>
            </li>
            <hr />
            <li>
              <Link to="/wishlist" onClick={closeMenu}>Wishlist</Link>
            </li>
            <hr />
            <li>
              <Link to="/profile" onClick={closeMenu}>View Profile</Link>
            </li>
            <hr />
            <li>
              <Link to="/orders" onClick={closeMenu}>Orders</Link>
            </li>
            <hr />
            <li>
              <Link to="/payment" onClick={closeMenu}>
                Payment
              </Link>
            </li>
            <hr />
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
