import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import UserModel from '../model/userModel.js';
import { asyncHandler } from './asyncHandler.js';

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return next(new ApiError('Not Authorized, no token', 401));
  }

  const token = authHeader.split(' ')[1];

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      return next(new ApiError('Not Authorized, token failed', 401));
    }
  }
});

export { protect };
