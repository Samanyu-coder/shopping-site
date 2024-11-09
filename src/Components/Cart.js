// Cart.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const isLoggedIn = () => {
    const user = localStorage.getItem('user_id');
    return user ? user : null;
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    const userId = isLoggedIn();
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/get_cart/${userId}/`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true',
      }
    })
      .then(response => {
        const cartData = response.data.cart;
        if (cartData.viewCart) {
          setCartItems(Object.values(cartData).filter(item => typeof item === 'object'));
          setTotalPrice(response.data.total_price);
        } else {
          setCartItems([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the cart items:', error);
        setError('Error fetching the cart items');
        setLoading(false);
      });
  }, [navigate]);

  const handleRemoveFromCart = async (productId) => {
    const userId = isLoggedIn();
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/user/remove_from_cart/${userId}/${productId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        }
      });
      if (response.status === 200) {
        setCartItems(cartItems.filter(item => item.id !== productId));
        alert('Product removed from cart');
      } else {
        throw new Error('Failed to remove product from cart');
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
      alert('Error removing product from cart');
    }
  };

  const handleClearCart = async () => {
    const userId = isLoggedIn();
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/user/clear_cart/${userId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        }
      });
      if (response.status === 200) {
        setCartItems([]);
        setTotalPrice(0);
        alert('Cart cleared successfully');
      } else {
        throw new Error('Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      alert('Error clearing cart');
    }
  };

  const handleCheckout = () => {
    navigate('/payment', { state: { orderId: 4 } });  // replace 4 with actual order ID if available
  };

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
            <p>{item.name}</p>
            <p>Quantity: {item.cart_quantity}</p>
            <p>Price: ${item.price}</p>
            <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Total Price: ${totalPrice}</h3>
      <button onClick={handleClearCart}>Clear Cart</button>
      <button onClick={handleCheckout} className="checkout-button">Checkout</button>
    </div>
  );
}

export default Cart;
