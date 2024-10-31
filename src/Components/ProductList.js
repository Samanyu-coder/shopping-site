// ProductList.js
import React, { useEffect, useState } from 'react';
import Product from './Product';
import axios from 'axios';
import '../styles/ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/product/list/?format=json', {
      headers: {
        'Content-Type': 'application/json',
        'ngrok-skip-browser-warning': 'true'
      }
    })
      .then(response => {
        console.log('Full API response:', response); // Log the entire response object
        console.log('API response data:', response.data); // Log response data

        const data = response.data;
        if (Array.isArray(data)) {
          setProducts(data);
        } else if (data && typeof data === 'object') {
          const productsArray = data.products || Object.values(data);
          console.log('Extracted products:', productsArray);

          if (Array.isArray(productsArray)) {
            setProducts(productsArray);
          } else {
            setError('Extracted data is not an array');
          }
        } else {
          setError('Data format is not supported');
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching the products:', error);
        setError('Error fetching the products');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <div className="product-list">
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;
