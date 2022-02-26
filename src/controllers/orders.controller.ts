import { Request, Response } from 'express';
import fs from 'fs';
import { Order } from '../data/models/Order';
import { log } from '../shared/helpers/logger';
import { createOrderBody, getPDF, modifyOrder } from '../services/orders.service';
import { tempCleaner } from '../shared/helpers/temp';

export const modifyOrderReport = async (req: Request, res: Response): Promise<Response> => {
  try {
    const requestData: Order = req.body;
    const { id } = req.params;
    return await modifyOrder(requestData, id)
      .then((result) => res.status(200).json(result));
  } catch (e) {
    return res.status(400).json(e);
  }
};

export const createOrderObject = async (req: any, res: Response): Promise<Response> => {
  try {
    const file = req.files?.fileName.data;
    return await createOrderBody(file)
      .then((result) => res.status(200).json(result))
      .catch((error) => res.status(400).json(error));
  } catch (e) {
    return res.status(400).json(e);
  }
};

export const getOrderPDF = async (req: Request, res: Response): Promise<any> => {
  try {
    const { id } = req.params;
    return await getPDF(id)
      .then((result) => {
        const filePath = `temp/${result}`;
        if (fs.existsSync(filePath)) {
          res.contentType('application/pdf');
          fs.createReadStream(filePath).pipe(res);
        } else {
          res.status(500);
          log.error('File not found');
          res.send('File not found');
        }
        tempCleaner();
      });
  } catch (e) {
    return res.status(400).json(e);
  }
};
