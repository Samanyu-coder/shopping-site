// Product.js
import React from 'react';
import '../styles/Product.css';

function Product({ product }) {
  return (
    <div className="product-tile">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
    </div>
  );
}

export default Product;
