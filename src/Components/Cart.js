// Cart.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const checkLoggedIn = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.id : null;
  };

  useEffect(() => {
    const userId = checkLoggedIn();
    if (!userId) {
      navigate('/login');
      return;
    }

    axios.get('https://8d05-2409-4088-9cb8-d2ac-41ba-69f4-c8-af2f.ngrok-free.app/user/add_to_cart/', {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        'user_id': userId
      }
    })
      .then(response => {
        setCartItems(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the cart items:', error);
        setError('Error fetching the cart items');
        setLoading(false);
      });
  }, [navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (cartItems.length === 0) {
    return <div>No items in cart</div>;
  }

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <p>{item.product_name}</p>
            <p>{item.quantity}</p>
            <p>${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Cart;
