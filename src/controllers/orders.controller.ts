import { Request, Response } from 'express';

export async const createOrderReport = (req: Request, res: Response) => {
    try {        
        const requestData: Order = req.body;
        makePdf(requestData);
    }
};
