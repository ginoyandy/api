import { Request, Response } from 'express';
import { log } from '../logger';
import { createUser, loginUser } from '../services/user.service';

export async function createUserHandler(req:Request, res:Response) {
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
    if (typeof e === 'string') {
      log.error(e);
      return res.status(400).json({
        error: true,
        message: e,
      });
    } if (e instanceof Error) {
      return res.status(400).json({
        error: true,
        message: e.message,
      });
    }
  }
}

export async function loginHandler(req: Request, res: Response) {
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
    if (typeof e === 'string') {
      log.error(e);
      return res.status(401).json({
        error: true,
        message: e,
      });
    } if (e instanceof Error) {
      return res.status(401).json({
        error: true,
        message: e.message,
      });
    }
  }
}
