// App.js
import React from 'react';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import Footer from './Components/Footer';
import Wishlist from './Components/Wishlist';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;