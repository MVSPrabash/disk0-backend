class AppError extends Error {
  public statusCode: number;

  constructor(
    message: string = "Internal Server Error",
    statusCode: number = 500
  ) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
};

export default AppError;