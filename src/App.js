// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import ProductDetail from './Components/ProductDetail';
import Wishlist from './Components/Wishlist';
import LoginRegister from './Components/LoginRegister';
import SearchResults from './Components/SearchResults';
import Cart from './Components/Cart';
import Footer from './Components/Footer';
import ProfileSettings from './Components/ProfileSettings';
import PaymentForm from './Components/PaymentForm';
import ViewOrders from './Components/ViewOrders';

// Initialize Stripe with your publishable key
const stripePromise = loadStripe('pk_test_51QH8ZvKNo5SzSfyaU7OFa34fOQb3Ib3XYzIuq7WDz4AUDrJvUTfJUKz716avTN44CGZnSwwZjhOfU4oCLjqDQFhK00AP8iPYdO');

function App() {
  const orderId = '4'; // Replace with actual order ID

  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<LoginRegister />} />
            <Route path="/profile" element={<ProfileSettings />} />
            <Route path="/orders" element={<ViewOrders />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/payment"
              element={
                <Elements stripe={stripePromise}>
                  <PaymentForm orderId={orderId} />
                </Elements>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
