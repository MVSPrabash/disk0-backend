import AppError from './AppError.js';

class ConflictError extends AppError {
  constructor (message: string = "Conflict: Resource Already Exists") {
    super(message, 409);
  }
};

export default ConflictError;