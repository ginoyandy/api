import express from 'express';
import { createUserHandler, loginHandler } from '../controller/user.controller';
import validateRequest from '../middlewares/validateRequests';
import { loginSchema } from '../schemas/login.schema';
import { createUserSchema } from '../schemas/user.schema';

export const usersRouter = express.Router();

usersRouter.get('/', validateRequest(createUserSchema), createUserHandler);
usersRouter.post('/login', validateRequest(loginSchema), loginHandler);