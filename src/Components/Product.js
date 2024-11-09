// Product.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../styles/Product.css';

function Product({ product }) {
  return (
    <Link to={`/product/${product.id}`} className="product-link"> {/* Link to the product detail page */}
      <div className="product-tile">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </div>
    </Link>
  );
}

export default Product;
