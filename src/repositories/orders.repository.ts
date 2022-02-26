import mongoose from 'mongoose';
import { Order } from '../data/models/Order';
import { log } from '../shared/helpers/logger';
import { OrderSchema } from '../data/entities/Order';

export const addOrder = async (orders: Order[]) => {
  const OrderModel = mongoose.model('Order', OrderSchema);
  try {
    return await OrderModel.insertMany(orders);
  } catch (error) {
    log.error(error);
    throw Error(error);
  }
};

export const getOrderById = async (id: string) => {
  const OrderModel = mongoose.model('Order', OrderSchema);
  try {
    return await OrderModel.findById(id);
  } catch (error) {
    log.error(error);
    return error;
  }
};

export const modifyExistentOrder = async (order: Order, orderId: string) => {
  const OrderModel = mongoose.model('Order', OrderSchema);
  try {
    return await OrderModel.findByIdAndUpdate(orderId, order);
  } catch (error) {
    log.error(error);
    throw Error(error);
  }
};
