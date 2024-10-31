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
    <Link to={`/product/${product.id}`} className="product-link"> {/* Link to the product detail page */}
      <div className="product-tile">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        <div className="wishlist-button" onClick={toggleWishlist}>
          <img src={wishlistIcon} alt="wishlist" className={isWishlisted ? 'wishlisted' : ''} />
        </div>
      </div>
    </Link>
  );
}

export default Product;
