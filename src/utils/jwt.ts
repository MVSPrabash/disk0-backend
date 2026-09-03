import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { TokenPayload } from '../modules/auth/types.js';

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

const verifyRefreshToken = (refreshToken: string): TokenPayload => {
  const payload = jwt.verify(refreshToken, env.refreshTokenSecret);

  if (
    typeof payload !== 'object' || 
    payload === null ||
    typeof payload.sub !== 'string'
  ) {
    throw new Error('Invalid refresh token payload');
  }

  return {
    sub: payload.sub,
  };
};

const verifyAccessToken = (accessToken: string): TokenPayload => {
  const payload = jwt.verify(accessToken, env.accessTokenSecret);

  if (
    typeof payload !== 'object' || 
    payload === null ||
    typeof payload.sub !== 'string'
  ) {
    throw new Error('Invalid access token payload');
  }

  return {
    sub: payload.sub,
  };
};

export {
  generateRefreshToken,
  generateAccessToken,
  verifyRefreshToken,
  verifyAccessToken,
}
