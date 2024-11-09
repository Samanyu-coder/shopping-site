import React, { useEffect, useState } from 'react';
import '../styles/ViewOrders.css';

const ViewOrders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        setError('User ID not found');
        return;
      }

      try {
        const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/order/get_all_orders/2/`);
        
        if (!response.ok) {
          const text = await response.text();
          console.error("Error response:", text);
          throw new Error(`Failed to fetch orders: ${response.status}`);
        }

        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to fetch orders. Please try again later.');
      }
    };

    fetchOrders();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={order.id} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ddd" }}>
              <h3>Order #{order.id}</h3>
              <p><strong>Status:</strong> {order.order_status}</p>
              <p><strong>Payment Status:</strong> {order.payment_status ? "Paid" : "Pending"}</p>
              <p><strong>Payment Method:</strong> {order.payment_method}</p>
              <p><strong>Total Price:</strong> ${order.total_price}</p>
              <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <p><strong>Last Updated:</strong> {new Date(order.updated_at).toLocaleString()}</p>

              <h4>Order Items</h4>
              <ul>
                {order.order_items.map((item, itemIndex) => (
                  <li key={itemIndex} style={{ marginBottom: "10px" }}>
                    <p><strong>Product Name:</strong> {item.product_name}</p>
                    <p><strong>Quantity:</strong> {item.quantity}</p>
                    <p><strong>Item Total Price:</strong> ${item.total_price}</p>
                    {item.product_image_path ? (
                      <img
                        src={item.product_image_path}
                        alt={item.product_name}
                        style={{ width: "100px", height: "auto" }}
                      />
                    ) : (
                      <p><em>No image available</em></p>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default ViewOrders;
