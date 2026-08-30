import {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import ValidationError from '../errors/ValidationError.js';
import AppError from '../errors/AppError.js';

const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      issues: err.issues
    });

    return ;
  }

  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message
    });

    return ;
  }

  console.log(err);

  res.status(500).json({
    success: false,
    message: 'Internal Server Error'
  });
};

export default errorMiddleware;
