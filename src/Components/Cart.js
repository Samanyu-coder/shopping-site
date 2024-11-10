import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setOrderId } from '../Components/localStorageUtils'; // Import the utility function
import '../styles/Cart.css';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderConfirmed, setOrderConfirmed] = useState(false); // Track if order is confirmed
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

  const handleConfirmCart = async () => {
    const userId = isLoggedIn();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/order/create_order/${userId}/`, {
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
      });
      if (response.status === 200) {
        const orderId = response.data.id;
        setOrderId(orderId); // Store order ID in local storage
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
        // If "By Card" is chosen, navigate to the payment page
        navigate('/payment');
      } else {
        // If "By COD" is chosen, hit the payment API with empty credentials
        const orderId = localStorage.getItem('order_id');
        if (orderId) {
          axios
            .post(`${process.env.REACT_APP_API_BASE_URL}/payment/make_payment/${orderId}/`, {
              cardNumber: '',
              cardExpiry: '',
              cardCVV: '',
            })
            .then((response) => {
              alert('Payment successful by COD. Thank you for your order!');
              navigate('/orders'); // Redirect to orders page after successful COD payment
            })
            .catch((error) => {
              console.error('Error processing COD payment:', error);
              alert('Payment successful by COD. Thank you for your order!');
            });
        } else {
          alert('Order ID not found. Please confirm your cart again.');
        }
      }
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
                    <p>Quantity: {item.cart_quantity}</p>
                    <p>Price: ${item.price}</p>
                    <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                  </li>
                ))}
              </ul>
              <h3>Total Price: ${totalPrice}</h3>
              <button onClick={handleClearCart}>Clear Cart</button>
              <button onClick={handleConfirmCart} className="confirm-cart-button">
                Confirm Cart
              </button>
              <button onClick={handleCheckout} className="checkout-button" disabled={!orderConfirmed}>
                Checkout
              </button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;
