import express from 'express';
import { modifyOrderReport, createOrderObject, getOrderPDF } from '../controllers/orders.controller';

export const ordersRouter = express.Router();

ordersRouter.get('/pdf/:id', getOrderPDF);
ordersRouter.post('/excel', createOrderObject);
ordersRouter.put('/:id', modifyOrderReport);
// ordersRouter.get('/pdf');
