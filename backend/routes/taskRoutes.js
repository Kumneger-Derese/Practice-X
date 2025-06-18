import { Router } from 'express';
import {
  createPracticeTask,
  deletePracticeTask,
  updatePracticeTask,
  getPracticeTask,
  getMyPracticeTask,
} from '../controller/taskController.js';
import { protect } from '../middleware/protect.js';
import { validate } from '../middleware/validate.js';
import {
  createTaskSchema,
  deleteSchema,
  taskIdSchema,
  updateTaskSchema,
} from '../validation/taskValidation.js';

const taskRouter = Router();

taskRouter.use(protect);

taskRouter.get(
  '/get/:taskId',
  validate(taskIdSchema, 'params'),
  getPracticeTask
);

taskRouter.get(
  '/my-task/:taskId',
  validate(taskIdSchema, 'params'),
  getMyPracticeTask
);

taskRouter.post('/create', validate(createTaskSchema), createPracticeTask);
taskRouter.put('/update', validate(updateTaskSchema), updatePracticeTask);
taskRouter.delete(
  '/delete/:skillId/:taskId',
  validate(deleteSchema, 'params'),
  deletePracticeTask
);

export default taskRouter;
