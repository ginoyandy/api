import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import User from '../data/entities/User';

export const extractToken = async (req: Request | any, res: Response, next: NextFunction) => {
  try {
    const authorization = req.get('authorization');

    if (!authorization) { return res.status(401).json({ error: true, message: 'Invalid token' }); }

    const token = authorization && authorization.toLowerCase().startsWith('bearer')
      ? authorization.substring(7)
      : null;

    type DecodedToken = {
      id: string;
      username: string;
      email: string;
      date: string;
    };

    if (token != null) {
      const SECRET_TOKEN = process.env.SECRET_TOKEN as string;
      let decodedToken = await verify(token, SECRET_TOKEN);
      decodedToken = decodedToken as DecodedToken;

      if (decodedToken == null || decodedToken.id == null) { return res.status(401).json({ error: true, message: 'Invalid token' }); }

      const user = await User.findById(decodedToken.id);
      if (user == null) { return res.status(401).json({ error: true, message: 'Invalid token' }); }

      req.userId = decodedToken.id;
      return next();
    }
    return res.status(401).json({ error: true, message: 'No token provided' });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: true, message: 'Invalid token' });
  }
};
