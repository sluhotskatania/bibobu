import { OrdersCollection } from '../models/order.js';

export const addOrder = async (orderData) => {
  const newOrder = await OrdersCollection.create(orderData);

  return newOrder;
};
