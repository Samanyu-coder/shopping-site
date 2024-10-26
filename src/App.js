// App.js
import React from 'react';
import Navbar from './Components/Navbar';
import ProductList from './Components/ProductList';
import Footer from './Components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <ProductList />
      <Footer />
    </div>
  );
}

export default App;
