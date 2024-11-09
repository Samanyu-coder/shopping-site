// ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductDetail.css';
import wishlistIcon from '../Images/wishlist-icon.png';

function ProductDetail() {
  const { id } = useParams(); // Get the product ID from the URL
  // const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [reviews, setReviews] = useState([]); // Initialize as an empty array

  const getUserId = () => {
    const user = localStorage.getItem('user_id');
    return user ? user : 0; // Default user ID is 0 if not logged in
  };

  const userId = getUserId();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/detail/${id}/?format=json`, {
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

    axios.get(`${process.env.REACT_APP_API_BASE_URL}/product/get_review/${id}/`, {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then(response => {
        if (Array.isArray(response.data)) {
          setReviews(response.data);
        } else {
          setReviews([]); // Set an empty array if the response is not an array
        }
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
        setReviews([]);
      });
  }, [id]);

  const handleAddToWishlist = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/user/add_to_wishlist/${userId}/${id}`);
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

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/add_to_cart/`, {
        user_id: userId,
        product_id: id,
      });
      if (response.status === 200) {
        alert('Added to cart');
      } else {
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Error adding to cart');
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
    <>
      <div className="wishlist-container">
        <div className="wishlist-button" onClick={handleAddToWishlist}>
          <img src={wishlistIcon} alt="wishlist" />
          {isWishlisted && <span>Added to Wishlist</span>}
        </div>
      </div>
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
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <div className="reviews-section">
              <h3>Reviews</h3>
              {reviews.length > 0 ? (
                <ul>
                  {reviews.map((review, index) => (
                    <li key={index}>
                      <p>{review.comment}</p>
                      <p><strong>Rating:</strong> {review.rating}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No reviews available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
