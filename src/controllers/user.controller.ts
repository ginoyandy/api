import { Request, Response } from 'express';
import { log } from '../shared/helpers/logger';
import { createUser, loginUser } from '../services/user.service';

export const createUserHandler = async (req:Request, res:Response): Promise<Response> => {
  try {
    const user = await createUser(req.body);
    const token = await loginUser({
      username: req.body.username,
      password: req.body.password,
    });
    return res.status(200).json({
      username: user.username,
      email: user.email,
      token,
    });
  } catch (e) {
    log.error(e);
    return res.status(400).json({
      message: e,
    });
  }
};

export const loginHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const token = await loginUser({
      username: req.body.username,
      password: req.body.password,
    });

    return res.status(200).json({
      error: false,
      token,
    });
  } catch (e) {
    log.error(e);
    return res.status(400).json({
      message: e,
    });
  }
};
