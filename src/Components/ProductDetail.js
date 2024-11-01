// ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductDetail.css';
import wishlistIcon from '../Images/wishlist-icon.png';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const getUserId = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user ? user.id : 0;
  };

  const userId = getUserId();

  useEffect(() => {
    axios.get(`https://16eb-2405-201-8006-7041-c36-da4c-1720-8a3.ngrok-free.app/product/detail/${id}/?format=json`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then(response => {
        console.log('Full API response:', response); // Log the full response
        setProduct(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the product details:', error);
        setError('Error fetching the product details');
        setLoading(false);
      });
  }, [id]);

  const handleAddToWishlist = async () => {
    if (!userId) {
      navigate('/login');
      return;
    }
    try {
      const response = await axios.post('https://16eb-2405-201-8006-7041-c36-da4c-1720-8a3.ngrok-free.app/add_to_wishlist', {
        user_id: userId,
        product_id: id
      });
      if (response.status === 200) {
        setIsWishlisted(true);
        alert('Added to wishlist');
      } else {
        throw new Error('Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Error adding to wishlist');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const stockStatusStyle = {
    color: product.available ? 'green' : 'red'
  };

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        {product.image_path ? (
          <img src={product.image_path} alt={product.name} />
        ) : (
          <div className="image-placeholder">Image not available</div>
        )}
        <div className="product-info">
          <h2>{product.name}</h2>
          <p className="product-price">${product.price}</p>
          <div className="product-description">
            <h3>Description</h3>
            <p>{product.description}</p>
          </div>
          <p className="stock-status" style={stockStatusStyle}>
            {product.available ? 'In Stock' : 'Out of Stock'}
          </p>
          <div className="wishlist-button" onClick={handleAddToWishlist}>
            <img src={wishlistIcon} alt="wishlist" />
            {isWishlisted && <span>Added to Wishlist</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
