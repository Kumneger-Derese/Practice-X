import { Router } from 'express';
import { protect } from '../middleware/protect.js';
import { validate } from '../middleware/validate.js';
import {
  getSkillProgress,
  trackProgress,
} from '../controller/progressController.js';
import {
  skillIdSchema,
  taskIdSchema,
} from '../validation/progressValidation.js';

const progressRouter = Router();

progressRouter.use(protect);

progressRouter.post('/track', validate(taskIdSchema), trackProgress);
progressRouter.get(
  '/:skillId',
  validate(skillIdSchema, 'params'),
  getSkillProgress
);

export default progressRouter;
