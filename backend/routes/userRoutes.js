import { Router } from 'express';
import {
  registerUser,
  getUser,
  loginUser,
  updateUser,
} from '../controller/userController.js';
import { protect } from '../middleware/protect.js';
import { validate } from '../middleware/validate.js';
import {
  loginSchema,
  registerSchema,
  updateSchema,
} from '../validation/userValidation.js';

const userRouter = Router();

userRouter.post('/register', validate(registerSchema), registerUser);
userRouter.post('/login', validate(loginSchema), loginUser);
userRouter.put('/profile', protect, validate(updateSchema), updateUser);
userRouter.get('/profile', protect, getUser);

export default userRouter;
