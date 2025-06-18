import { Router } from 'express';
import {
  createSkill,
  getSkill,
  getSkills,
  joinSkill,
  getSkillsByMe,
  removeJoinedSkill,
  updateSkill,
  deleteSkill,
  getPaginatedSkills,
} from '../controller/skillController.js';
import { protect } from '../middleware/protect.js';
import { validate } from '../middleware/validate.js';
import {
  createSkillSchema,
  pagenationSchema,
  skillIdSchema,
  updateSkillSchema,
} from '../validation/skillValidation.js';

const skillRouter = Router();

skillRouter.use(protect);

skillRouter.get('/list', getSkills);
skillRouter.get(
  '/pagenated-list',
  validate(pagenationSchema, 'query'),
  getPaginatedSkills
);

skillRouter.get('/by-me', getSkillsByMe);
skillRouter.get('/skill/:skillId', validate(skillIdSchema, 'params'), getSkill);

skillRouter.post('/join', validate(skillIdSchema), joinSkill);
skillRouter.put('/update', validate(updateSkillSchema), updateSkill);
skillRouter.delete('/delete/:skillId', validate(skillIdSchema), deleteSkill);
skillRouter.post('/create', validate(createSkillSchema), createSkill);
skillRouter.delete(
  '/remove/:skillId',
  validate(skillIdSchema, 'params'),
  removeJoinedSkill
);

export default skillRouter;
