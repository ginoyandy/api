import express from 'express';
import { createOrderReport } from '../controllers/orders.controller';
import { validateRequest } from '../middlewares/validateRequests';
import { Order } from '../data/models/order.model';

export const ordersRouter = express.Router();

ordersRouter.get('/'); // --> Excel a BODY
ordersRouter.post('/', validateRequest(Order), createOrderReport); // --> Genera el pdf --> retorna un id del pdf generado.
ordersRouter.get('/pdf/{id}'); // --> Get un pdf by id
ordersRouter.get('/pdf');
