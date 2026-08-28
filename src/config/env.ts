import 'dotenv/config'

const port = process.env.PORT;
const databaseUrl = process.env.DATABASE_URL;

if (!port) throw new Error('PORT not set');
if (!databaseUrl) throw new Error('DATABASE_URL not set');

export const env = {
  port,
  databaseUrl,
};
