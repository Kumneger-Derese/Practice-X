/**
 * Wraps an asynchronous route handler function to automatically catch
 * any errors (promise rejections) and pass them to the next() middleware.
 * @param {Function} fn - The asynchronous route handler function (req, res, next) => Promise<void>
 * @returns {Function} A new route handler function that Express can use.
 */

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => next(error));
};

export { asyncHandler };
