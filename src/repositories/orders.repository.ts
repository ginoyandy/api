import mongoose from 'mongoose';
import { Order } from '../data/models/Order';
import { log } from '../shared/helpers/logger';
import { OrderSchema } from '../data/entities/Order';

export const addOrder = async (orders: Order[]) => {
  // CODIGO NEGRERO 2.0 ULTRANASTY
  // ALGUN DIA MEJORAR
  const OrderModel = mongoose.model('Order', OrderSchema);
  const orderNumbers: string[] = [];
  orders.forEach((order) => orderNumbers.push(order.orderNumber));
  try {
    let insertError: any = null;
    await OrderModel.insertMany(orders, { ordered: false })
      .catch((error) => insertError = error);

    if (insertError) {
      // Ensable the return object.
      insertError.writeErrors.forEach((writeError: any) => {
        if (writeError.err.op) {
          delete writeError.err.op._id;
          OrderModel.findOneAndUpdate({ orderNumber: writeError.err.op.orderNumber }, writeError.err.op, { new: true })
            .catch((err: any) => {
              throw Error(err);
            });
        }
      });
    }
    return await OrderModel.find({ orderNumber: { $in: orderNumbers } });
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
    throw Error(error);
  }
};

export const modifyExistentOrder = async (order: any, orderId: string) => {
  const OrderModel = mongoose.model('Order', OrderSchema);
  try {
    delete order._id;
    return await OrderModel.findByIdAndUpdate(orderId, order, { new: true });
  } catch (error) {
    log.error(error);
    throw Error(error);
  }
};

export const getAll = async () => {
  const OrderModel = mongoose.model('Order', OrderSchema);
  try {
    return await OrderModel.find();
  } catch (error) {
    log.error(error);
    throw Error(error);
  }
};
