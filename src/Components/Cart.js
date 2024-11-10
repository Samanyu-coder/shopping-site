import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setOrderId } from '../Components/localStorageUtils';
import '../styles/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
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
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/user/get_cart/${userId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      })
      .then((response) => {
        const cartData = response.data.cart;
        if (cartData.viewCart) {
          setCartItems(Object.values(cartData).filter((item) => typeof item === 'object'));
          setTotalPrice(response.data.total_price);
        } else {
          setCartItems([]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching the cart items:', error);
        setError('Error fetching the cart items');
        setLoading(false);
      });
  }, [navigate]);

  const handleQuantityChange = (itemId, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, cart_quantity: quantity } : item
      )
    );
  };

  const handleUpdateCart = async (itemId) => {
    const userId = isLoggedIn();
    const item = cartItems.find((item) => item.id === itemId);
    if (!item) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/user/update_cart/${userId}/`,
        {
          cart: { [itemId]: item.cart_quantity },
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      if (response.status === 200) {
        setTotalPrice(response.data.total_price);
        alert('Cart updated successfully');
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      alert('Error updating cart');
    }
  };

  const handleConfirmCart = async () => {
    const userId = isLoggedIn();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/order/create_order/${userId}/`,
        {
          payment_method: 'cod', // default to COD initially
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      if (response.status === 200) {
        const orderId = response.data.id;
        setOrderId(orderId);
        setOrderConfirmed(true);
        alert('Cart confirmed. You can proceed to checkout.');
      }
    } catch (error) {
      console.error('Error confirming cart:', error);
      alert('Error confirming cart');
    }
  };

  const handleCheckout = () => {
    if (orderConfirmed) {
      const paymentMethod = window.confirm("Choose Payment Method:\n\nPress OK for 'By Card'\nPress Cancel for 'By COD'");
      if (paymentMethod) {
        navigate('/payment');
      } else {
        handlePayment('cod');
      }
    }
  };

  const handlePayment = async (paymentMethod) => {
    const userId = isLoggedIn();
    const orderId = localStorage.getItem('order_id');
    if (!orderId) {
      alert('Order ID not found. Please confirm your cart again.');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/order/create_order/${userId}/`,
        {
          payment_method: paymentMethod,
          address: '', // optionally pass the address or use the default
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      if (paymentMethod === 'cod') {
        alert('Payment successful by COD. Thank you for your order!');
      } else {
        alert('Payment successful by Card. Thank you for your order!');
      }
      navigate('/orders');
    } catch (error) {
      console.error('Error processing payment:', error);
      alert('Error processing payment');
    }
  };

  const handleClearCart = async () => {
    const userId = isLoggedIn();
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/user/clear_cart/${userId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });
      if (response.status === 200) {
        setCartItems([]);
        setTotalPrice(0);
        alert('Cart cleared successfully.');
      }
    } catch (error) {
      console.error('Error clearing the cart:', error);
      alert('Error clearing the cart');
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    const userId = isLoggedIn();
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/user/remove_from_cart/${userId}/${itemId}/`,
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      );
      if (response.status === 200) {
        setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
        setTotalPrice((prevTotal) => prevTotal - response.data.removed_price);
        alert('Item removed from cart.');
      }
    } catch (error) {
      console.error('Error removing item from cart:', error);
      alert('Error removing item from cart');
    }
  };

  return (
    <div className="cart">
      <h2>Shopping Cart</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {cartItems.length === 0 ? (
            <div>No items in cart</div>
          ) : (
            <>
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index}>
                    <p>{item.name}</p>
                    <p>Quantity: 
                      <select
                        value={item.cart_quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      >
                        {[...Array(10).keys()].map((qty) => (
                          <option key={qty} value={qty + 1}>{qty + 1}</option>
                        ))}
                      </select>
                      <button onClick={() => handleUpdateCart(item.id)}>Update</button>
                    </p>
                    <p>Price: ${item.price}</p>
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
              <h3>Total Price: ${totalPrice}</h3>
              <button onClick={handleClearCart}>Clear Cart</button>
              <button onClick={handleConfirmCart} className="confirm-cart-button">Confirm Cart</button>
              <button onClick={handleCheckout} className="checkout-button" disabled={!orderConfirmed}>Checkout</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
