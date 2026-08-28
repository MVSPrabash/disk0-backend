import app from './app.js';
import { env } from './config/env.js';
import pool from './config/db.js';

const port = env.port;

async function startServer() {
  try {
    await pool.query('SELECT 1');

    console.log("Database connection successful");

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  } catch(err) {
    console.error('Database connection failed : ', err);
    process.exit(1);
  }
};

startServer();
