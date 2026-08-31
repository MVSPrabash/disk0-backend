import express, { type Express } from 'express';
import routes from './routes/index.js';
import errorMiddleware from './middleware/error.middleware.js';
import NotFoundError from './errors/NotFoundError.js';
import { env } from './config/env.js';
import cors from 'cors';

const app: Express = express();

const allowedOrigins = [ env.frontendHost ];

const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);  // No origin
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

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
