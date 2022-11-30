import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';

const { NODE_ENV, JWT_SECRET } = process.env;

export const auth = (req, res, next) => {
  const { authorization = '' } = req.headers;
  if (!authorization) {
    next(new UnauthorizedError('Необходима авторизация'));
  } else {
    const token = authorization.replace(/^Bearer*\s*/i, '');
    try {
      const decoded = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
      req.user = { _id: decoded._id };
      next();
    } catch (err) {
      next(new UnauthorizedError('Необходима авторизация'));
    }
  }
};
