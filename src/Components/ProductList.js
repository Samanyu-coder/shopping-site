// ProductList.js
import React from 'react';
import Product from './Product';
import '../styles/ProductList.css';

const products = [
  { id: 1, name: 'Product 1', price: '$10', image: 'image1.jpg' },
  { id: 2, name: 'Product 2', price: '$20', image: 'image2.jpg' },
  { id: 3, name: 'Product 3', price: '$30', image: 'image3.jpg' },
  { id: 4, name: 'Product 4', price: '$40', image: 'image4.jpg' },
  { id: 5, name: 'Product 5', price: '$50', image: 'image5.jpg' },
  { id: 6, name: 'Product 6', price: '$60', image: 'image6.jpg' }
];

function ProductList() {
  return (
    <div className="product-list">
      {products.map(product => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductList;

