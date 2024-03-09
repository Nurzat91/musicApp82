import {Request, Response, NextFunction} from 'express';
import {HydratedDocument} from 'mongoose';
import {UserFields} from '../types';
import User from '../models/User';

export interface RequestWithUser extends Request {
  user?: HydratedDocument<UserFields>;
}
const role = async (req: RequestWithUser, res: Response, next: NextFunction) => {

  const token = req.get('Authorization');

  const user = await User.findOne({token});

  if (user) {
    req.user = user;
  }

  return next();
};

export default role;