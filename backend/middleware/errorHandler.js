import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';

//* Not found Route handler middleware
const notFound = async (req, res, next) => {
  const error = new ApiError(`Route ${req.originalUrl}  not found.`, 404);
  next(error);
};

//* Error Converter middleware
const errorConverter = async (err, req, res, next) => {
  let error = err;

  if (!(error instanceof ApiError)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? 400 : 500;
    const message =
      error.message ||
      (statusCode === 400 && 'Bad Request') ||
      (statusCode === 500 && 'Internal Server Error');

    error = new ApiError(message, statusCode, false, error.stack);
  }

  next(error);
};

//* Error handler middleware
const errorHandler = async (error, req, res, next) => {
  let { message, statusCode, stack, isOprational } = error;

  if (process.env.NODE_ENV === 'production' && !isOprational) {
    statusCode = 500;
    message = 'Internal Server Error';
  }

  const errorResponse = {
    error: true,
    code: statusCode,
    message,
    stack: process.env.NODE_ENV === 'production' ? null : stack,
  };

  if (process.env.NODE_ENV === 'development') {
    console.log(error);
  }

  res.status(statusCode).json(errorResponse);
};

export { notFound, errorConverter, errorHandler };
