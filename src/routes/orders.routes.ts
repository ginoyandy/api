import express from 'express';
import {
  modifyOrderReport, createOrderObject, getOrderPDF, getAllOrders,
} from '../controllers/orders.controller';
import { validateRequest } from '../middlewares/validateRequests';
import { OrderValidationSchema } from '../data/validation-schemas/order.schema';

export const ordersRouter = express.Router();

ordersRouter.get('/', getAllOrders);
ordersRouter.get('/pdf/:id', getOrderPDF);
ordersRouter.post('/excel', createOrderObject);
ordersRouter.put('/:id', validateRequest(OrderValidationSchema), modifyOrderReport);
