import express, { type Express } from 'express';
import routes from './routes/index.js';

const app: Express = express();

app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to disk0 API"
  });
});

export default app;
