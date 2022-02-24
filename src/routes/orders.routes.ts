import express from 'express';
import { createOrderReport, createOrderObject } from '../controllers/orders.controller';
import { OrderSchema } from '../data/validation-schemas/order.schema';
import { validateRequest } from '../middlewares/validateRequests';

export const ordersRouter = express.Router();

ordersRouter.get('/pdf/:id');
ordersRouter.post('/excel', createOrderObject); // --> Excel a BODY --> Guardar el body en mongo --> Cargar el excel a dropbox --> return Booleano de si se subio a dropbox o no. Orders array
ordersRouter.put('/:id', validateRequest(OrderSchema), createOrderReport); // Order id corregida insertada en mongo --> retorna un id del order insertado.
// ordersRouter.get('/pdf');
