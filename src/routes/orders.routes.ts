import express from 'express';
import { createOrderReport } from '../controllers/orders.controller';
import { OrderSchema } from '../data/schemas/order.schema';
import { validateRequest } from '../middlewares/validateRequests';

export const ordersRouter = express.Router();

ordersRouter.get('/'); // --> Excel a BODY
ordersRouter.post('/', validateRequest(OrderSchema), createOrderReport); // --> Genera el pdf --> retorna un id del pdf generado.
ordersRouter.get('/pdf/{id}'); // --> Get un pdf by id
ordersRouter.get('/pdf');
