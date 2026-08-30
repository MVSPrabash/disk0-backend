import AppError from './AppError.js';

class ValidationError extends AppError {
  public issues: unknown;
  
  constructor (
    issues: unknown,
    message: string = "Validation Error"
  ) {
    super(message, 400);

    this.issues = issues;
  }
}

export default ValidationError;