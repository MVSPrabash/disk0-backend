import AppError from './AppError.js';

class ConflictError extends AppError {
  constructor (message: string = "Resource Already Exists") {
    super(message, 409);
  }
};

export default ConflictError;