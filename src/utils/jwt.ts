import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const generateRefreshToken = (id: string) => {
  return jwt.sign(
    { sub: id },
    env.refreshTokenSecret,
    { expiresIn: env.refreshTokenExpiresIn }
  );
};

const generateAccessToken = (id: string) => {
  return jwt.sign(
    { sub: id },
    env.accessTokenSecret,
    { expiresIn: env.accessTokenExpiresIn }
  );
};

export {
  generateRefreshToken,
  generateAccessToken,
}
