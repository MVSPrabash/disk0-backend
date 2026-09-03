import type { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../errors/UnauthorizedError.js';
import { verifyAccessToken } from '../utils/jwt.js';
import { TokenPayload } from '../modules/auth/types.js';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders) {
    return next(new UnauthorizedError('Authentication Required'));
  }

  const [schema, token] = authHeaders.split(' ');

  if (schema !== 'Bearer' || !token) {
    return next(new UnauthorizedError('Invalid authentication token'));
  }

  try {
    const payload: TokenPayload = verifyAccessToken(token);

    req.user = {
      id: payload.sub,
    }

    next();
  } catch (err) {
    next(new UnauthorizedError('Invalid or expired token'));
  }
};

export default authenticate;
