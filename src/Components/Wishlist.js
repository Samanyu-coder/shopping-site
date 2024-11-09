// Wishlist.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Wishlist.css';
import Product from './Product';

function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const checkLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.id : null;
  };

  const userId = checkLoggedIn();

  useEffect(() => {
    if (!userId) {
      navigate('/login'); // Redirect to login if not logged in
      return;
    }

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/get_wishlist`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'user_id': userId
      }
    })
      .then(response => {
        setWishlist(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the wishlist:', error);
        setError('Error fetching the wishlist');
        setLoading(false);
      });
  }, [userId, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (wishlist.length === 0) {
    return <div>No items in wishlist</div>;
  }

  return (
    <div className="wishlist">
      {wishlist.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default Wishlist;
