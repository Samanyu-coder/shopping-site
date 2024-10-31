// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import ProductDetail from './Components/ProductDetail'; // Import the ProductDetail component
import Footer from './Components/Footer';
import Wishlist from './Components/Wishlist';
import LoginRegister from './Components/LoginRegister';

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();

  // Check if the current route is '/login'
  const isLoginRoute = location.pathname === '/login';

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<LoginRegister />} />
      </Routes>
      {!isLoginRoute && <Footer />}
    </div>
  );
}
export default App;

