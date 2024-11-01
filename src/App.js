// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import ProductDetail from './Components/ProductDetail';
import Wishlist from './Components/Wishlist';
import LoginRegister from './Components/LoginRegister';
import Footer from './Components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<ProductList />} /> {/* Default to ProductList */}
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<LoginRegister />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
