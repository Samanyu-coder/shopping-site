// PaymentForm.js
import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import '../styles/PaymentForm.css'; // Import the CSS

const PaymentForm = ({ orderId }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: card,
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/payment/make_payment/${orderId}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment_method_id: paymentMethod.id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Payment successful!');
      } else {
        setErrorMessage(data.error || 'Payment failed. Please try again.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="payment-form">
      <CardElement id="card-element" />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button type="submit" disabled={!stripe} className="pay-button">Pay</button>
    </form>
  );
};

export default PaymentForm;
