import mongoose from 'mongoose';
import { Order } from '../data/models/Order';
import { log } from '../shared/helpers/logger';
import { OrderSchema } from '../data/entities/Order';

export const addOrder = async (orders: Order[]) => {
  const OrderModel = mongoose.model('Order', OrderSchema);
  try {
    return OrderModel.insertMany(orders);
  } catch (error) {
    log.error(error);
    return error;
  }
};
