// Product.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link
import '../styles/Product.css';
import wishlistIcon from '../Images/wishlist-icon.png';  // Add wishlist icon

function Product({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="product-tile">
      <Link to={`/product/${product.id}`}> {/* Link to the product detail page */}
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </Link>
      <div className="wishlist-button" onClick={toggleWishlist}>
        <img src={wishlistIcon} alt="wishlist" className={isWishlisted ? 'wishlisted' : ''} />
      </div>
    </div>
  );
}

export default Product;
