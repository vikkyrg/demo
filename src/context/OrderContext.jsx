import React, { createContext, useContext, useEffect, useState } from 'react';
import { reserveInventory } from '../data/inventory';

const OrderContext = createContext();
const ORDERS_KEY = 'buildmart_orders';

const readOrders = () => {
  try {
    const savedOrders = JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
    return Array.isArray(savedOrders)
      ? savedOrders.filter((order) => Array.isArray(order.products) && order.deliveryAddress)
      : [];
  } catch (error) {
    console.error('Unable to read saved orders.', error);
    return [];
  }
};

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(readOrders);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (error) {
      console.error('Unable to save orders.', error);
    }
  }, [orders]);

  const placeOrder = (orderDetails) => {
    if (!orderDetails.items?.length) throw new Error('Your cart is empty.');

    reserveInventory(orderDetails.items);
    const newOrder = {
      orderId: `BM-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`,
      createdAt: new Date().toISOString(),
      orderStatus: 'Order Placed',
      paymentMethod: orderDetails.paymentMethod,
      deliveryAddress: orderDetails.deliveryAddress,
      products: orderDetails.items.map((item) => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        image: item.image,
        unit: item.unit,
        price: item.price,
        quantity: item.quantity,
      })),
      subtotal: orderDetails.subtotal,
      discount: orderDetails.discount || 0,
      deliveryCharge: orderDetails.deliveryCharge || 0,
      totalAmount: orderDetails.totalAmount,
    };

    setOrders((previousOrders) => [newOrder, ...previousOrders]);
    setCurrentOrder(newOrder);
    return newOrder;
  };

  const getOrderById = (id) => orders.find((order) => order.orderId === id) || null;

  return (
    <OrderContext.Provider value={{ orders, currentOrder, setCurrentOrder, placeOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
export default OrderContext;
