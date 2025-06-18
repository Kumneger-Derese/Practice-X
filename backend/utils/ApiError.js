class ApiError extends Error {
  constructor(message, statusCode, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    if (stack) {
      this.stack = stack;
    } else {
      // Capture the stack trace, excluding the constructor call from it.
      // This ensures the stack trace points to where the ApiError was created.
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
