import { Express, Request, Response } from 'express';
import { createUserHandler, loginHandler } from './controller/user.controller';
import validateRequest from './middlewares/validateRequests';
import { loginSchema } from './schemas/login.schema';
import { createUserSchema } from './schemas/user.schema';
//import { extractToken } from './middlewares/identifyUser';

export default function(app: Express){
    app.get('/ping', (req: Request, res: Response) => res.status(200).json({message: 'pong'}));

    // User routes
    app.post('/users', validateRequest(createUserSchema), createUserHandler);
    app.post('/users/login', validateRequest(loginSchema), loginHandler);

    

    // Review routes
    //app.get('/reviews', extractToken, getUserReviewsHandler);
    //app.post('/reviews', extractToken, validateRequest(createReviewSchema), createReviewHandler);
    //app.delete('/reviews/:reviewId', extractToken, deleteReviewHandler);
    //app.patch('/reviews/:reviewId', extractToken, validateRequest(updateReviewSchema), updateReviewHandler);

}