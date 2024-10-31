// ProductDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProductDetail.css';

function ProductDetail() {
  const { id } = useParams(); // Get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
