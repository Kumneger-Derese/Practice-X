import { Router } from 'express';
import { protect } from '../middleware/protect.js';
import { validate } from '../middleware/validate.js';
import {
  createReview,
  getReviews,
  getReview,
  deleteReview,
  updateReview,
} from '../controller/reviewController.js';
import {
  createReviewSchema,
  skillIdSchema,
  updateReviewSchema,
  deleteReviewSchema,
} from '../validation/reviewValidation.js';

const reviewRouter = Router();

reviewRouter.use(protect);

reviewRouter.post('/create', validate(createReviewSchema), createReview);
reviewRouter.put('/update', validate(updateReviewSchema), updateReview);
reviewRouter.get(
  '/get/:skillId',
  validate(skillIdSchema, 'params'),
  getReviews
);
reviewRouter.get(
  '/get/:skillId/:reviewId',
  validate(deleteReviewSchema, 'params'),
  getReview
);

reviewRouter.delete(
  '/delete/:skillId/:reviewId',
  validate(deleteReviewSchema, 'params'),
  deleteReview
);

export default reviewRouter;
