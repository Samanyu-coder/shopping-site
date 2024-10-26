// Product.js
import React, { useState } from 'react';
import '../styles/Product.css';
import wishlistIcon from '../Images/wishlist-icon.png';  // Add wishlist icon

function Product({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="product-tile">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.price}</p>
      <div className="wishlist-button" onClick={toggleWishlist}>
        <img src={wishlistIcon} alt="wishlist" className={isWishlisted ? 'wishlisted' : ''} />
      </div>
    </div>
  );
}

export default Product;
