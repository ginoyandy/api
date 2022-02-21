import { AnySchema, ValidationError } from 'yup';
import { Request, Response, NextFunction } from 'express';
import log from '../logger';


const validateRequest = (schema: AnySchema) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
    }, {abortEarly: false})
        .then( () => {return next();}) // Continue 
        .catch( err => {
            log.error(err);

            let message = '';

            err.inner.forEach( (e : ValidationError) => {
                message += e.message;
            });
            
            return res.status(400).json({
                error: true,
                message
            });
        });
};

export default validateRequest;