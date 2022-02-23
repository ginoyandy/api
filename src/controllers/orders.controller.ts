import { Request, Response } from 'express';
import { Order } from '../data/models/order.model';
import { log } from '../helpers/logger';
import { makePdf } from '../services/pdf.service';

export const createOrderReport = async (req: Request, res: Response): Promise<Response> => {
  try {
    const requestData: Order = req.body;
    makePdf(requestData);
    return res.status(200).json({
      message: 'ok',
    });
  } catch (e) {
    log.error(e);
    return res.status(400).json({
      message: e,
    });
  }
};
