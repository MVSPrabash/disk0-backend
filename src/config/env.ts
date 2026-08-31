import 'dotenv/config'

const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

const accessTokenExpiresIn = Number(process.env.ACCESS_TOKEN_EXPIRES_IN);
const refreshTokenExpiresIn  = Number(process.env.REFRESH_TOKEN_EXPIRES_IN);

const frontendHost = process.env.FRONTEND_HOST;

if (!port) throw new Error('PORT not set');
if (!databaseUrl) throw new Error('DATABASE_URL not set');

if (!accessTokenSecret) throw new Error('Access token secret key not set');
if (!refreshTokenSecret) throw new Error('Refresh token secret key not set');
if (!accessTokenExpiresIn) throw new Error('Access Token expiration variable not set');
if (!refreshTokenExpiresIn) throw new Error('Refresh Token expiration variable not set');

if (!frontendHost) throw new Error('FRONTEND_HOST variable not set');

if (!Number.isInteger(accessTokenExpiresIn) || accessTokenExpiresIn <= 0) {
  throw new Error('Invalid access token expiration');
}

if (!Number.isInteger(refreshTokenExpiresIn) || refreshTokenExpiresIn <= 0) {
  throw new Error('Invalid access token expiration');
}

export const env = {
  port,
  databaseUrl,
  accessTokenSecret,
  refreshTokenSecret,
  accessTokenExpiresIn,
  refreshTokenExpiresIn,
  frontendHost,
};
