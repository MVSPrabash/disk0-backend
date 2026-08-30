import express, { type Express } from 'express';
import routes from './routes/index.js';
import errorMiddleware from './middleware/error.middleware.js';
import NotFoundError from './errors/NotFoundError.js';

const app: Express = express();

app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({
    message: "Welcome to disk0 API"
  });
});

app.use((req, res, next) => {
  next(new NotFoundError());
});

app.use(errorMiddleware);

export default app;
