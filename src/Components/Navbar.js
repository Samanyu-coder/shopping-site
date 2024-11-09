// Navbar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
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
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL}/search`, // Use environment variable
          { query: searchQuery },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        // Navigate to the search results page with the search results
        navigate('/search', { state: { results: response.data } });
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    }
  };

  const checkLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.id : null;
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch(e);
              }
            }}
            required
          />
          {searchQuery && (
            <button type="submit" className="search-button custom-search-button">→</button>
          )}
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
