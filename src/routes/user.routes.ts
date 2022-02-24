import express from 'express';
import { createUserHandler, loginHandler } from '../controllers/user.controller';
import { validateRequest } from '../middlewares/validateRequests';
import { loginSchema } from '../data/validation-schemas/login.schema';
import { createUserSchema } from '../data/validation-schemas/user.schema';

export const usersRouter = express.Router();

usersRouter.get('/', validateRequest(createUserSchema), createUserHandler);
usersRouter.post('/login', validateRequest(loginSchema), loginHandler);
