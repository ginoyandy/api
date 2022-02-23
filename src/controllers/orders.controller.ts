import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
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

export const createOrderObject = async (req: any, res: Response): Promise<Response> => {
  const file = req.files?.fileName.data;
  const workbook = XLSX.read(file);
  const jsa = XLSX.utils.sheet_to_json(workbook.Sheets['02_12_2021-Quiroga']);
  console.log(jsa);
  return res.status(200).json({ message: 'ok' });
};
