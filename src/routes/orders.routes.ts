import express from 'express';
import { modifyOrderReport, createOrderObject, getOrderPDF } from '../controllers/orders.controller';
import { OrderSchema } from '../data/validation-schemas/order.schema';
import { validateRequest } from '../middlewares/validateRequests';

export const ordersRouter = express.Router();

ordersRouter.get('/pdf/:id', getOrderPDF);
ordersRouter.post('/excel', createOrderObject);
ordersRouter.put('/:id', validateRequest(OrderSchema), modifyOrderReport);
// ordersRouter.get('/pdf');
