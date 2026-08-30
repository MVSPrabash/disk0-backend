import AppError from './AppError.js';

class NotFoundError extends AppError {
  constructor(message: string = "Not Found") {
    super(message, 404);
  }
};

export default NotFoundError;