import { Request, Response } from 'express';
import { Order } from '../data/models/Order';
import { log } from '../shared/helpers/logger';
import { createOrderBody } from '../services/orders.service';
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

export const createOrderObject = async (req: any, res: Response): Promise<Response> => {
  try {
    const file = req.files?.fileName.data;
    return await createOrderBody(file)
      .then((result) => res.status(200).json(result));
  } catch (e) {
    return res.status(200).json(e);
  }
};
