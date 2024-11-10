// localStorageUtils.js
export const setOrderId = (orderId) => {
    localStorage.setItem('order_id', orderId);
  };
  
  export const getOrderId = () => {
    return localStorage.getItem('order_id');
  };
  