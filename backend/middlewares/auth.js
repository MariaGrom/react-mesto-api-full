import jwt from 'jsonwebtoken';
import { UnauthorizedError } from '../errors/UnauthorizedError.js';

const { NODE_ENV, JWT_SECRET } = process.env;

export const auth = (req, res, next) => {
  const { authorization = '' } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
   return next(new UnauthorizedError('Необходима авторизация'));
  } 

    const token = authorization.replace(/^Bearer*\s*/i, '');
    let payload;

    try {
      payload = jwt.verify(
        token,
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret'
        );
    } catch (err) {
      next(new UnauthorizedError('Необходима авторизация'));
    }
  req.user = payload;
  return next();
};
