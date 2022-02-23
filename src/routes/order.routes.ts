import express, { Request, Response } from 'express';
import { Order } from '../models/order.model';
import { makePdf } from '../services/pdf.service';

export const ordersRouter = express.Router();

ordersRouter.get('/'); // --> Excel a BODY
ordersRouter.post('/', (req: Request, res: Response) => {
  const requestData: Order = req.body;
  makePdf(requestData);
  res.json({ ok: 'ok' });
}); // --> Genera el pdf --> retorna un id del pdf generado.
ordersRouter.get('/pdf/{id}'); // --> Get un pdf by id
ordersRouter.get('/pdf');
