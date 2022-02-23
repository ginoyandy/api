import express, { Request, Response } from 'express';
import { Order } from '../model/order.model';
import { makePdf } from '../service/pdf.service';

export const ordersRouter = express.Router();

ordersRouter.get('/'); // --> Excel a BODY
ordersRouter.post('/', (req: Request, res: Response) => {
  const requestData: Order = req.body;
  makePdf(requestData);
  res.json({ ok: 'ok' });
}); // --> Genera el pdf
ordersRouter.get('/pdf/{id}'); // --> Get un pdf by id
ordersRouter.get('/pdf');
