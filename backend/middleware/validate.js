import ApiError from '../utils/ApiError.js';

const validate =
  (schema, property = 'body') =>
  (req, res, next) => {
    const { error } = schema.validate(req[property]);

    if (error) {
      const errorMessage = error.details.map((detail) => detail.message);
      return next(new ApiError(errorMessage, 400));
    }

    next();
  };

export { validate };
