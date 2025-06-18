import ApiError from '../utils/ApiError.js';
import SkillModel from '../model/skillModel.js';
import ReviewModel from '../model/reviewModel.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import mongoose from 'mongoose';

//* Create Review
const createReview = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { skillId, comment, rating } = req.body;

  //* check if the skillId is valid
  if (!mongoose.isValidObjectId(skillId)) {
    return next(new ApiError('Skill id is not valid id', 400));
  }

  const skill = await SkillModel.findById({ _id: skillId });

  //* check if the skill exists
  if (!skill) {
    return next(new ApiError('Skill not found.', 404));
  }

  //* check if the skill belongs to the same user
  if (skill.createdBy.toString() === userId.toString()) {
    return next(new ApiError('You cannot review your own skill set.', 400));
  }

  //* check if the skill already reviwed
  const existingReview = await ReviewModel.findOne({ userId, skillId });

  if (existingReview) {
    return next(new ApiError('You already reviwed this skill', 400));
  }

  //* Finally create unique review
  const review = await ReviewModel.create({ skillId, userId, rating, comment });

  if (!review) {
    return next(new ApiError('Review not created.', 404));
  }

  res.status(201).json(review);
});

//* Get all Reviews
const getReviews = asyncHandler(async (req, res, next) => {
  const { skillId } = req.params;

  //* check if the skillId is valid
  if (!mongoose.isValidObjectId(skillId)) {
    return next(new ApiError('Skill id is not valid id', 400));
  }

  const reviews = await ReviewModel.find({ skillId }).populate({
    path: 'userId',
    select: 'username email',
  });

  if (!reviews) {
    return next(new ApiError('Reviews not found', 404));
  }

  res.status(200).json(reviews);
});

//* Get one Reviews
const getReview = asyncHandler(async (req, res, next) => {
  const { skillId, reviewId } = req.params;
  const userId = req.user._id;

  //* check if the skillId is valid
  if (
    !mongoose.isValidObjectId(skillId) ||
    !mongoose.isValidObjectId(reviewId)
  ) {
    return next(new ApiError('Skill id or ReviewId is not valid id', 400));
  }

  const review = await ReviewModel.findOne({
    _id: reviewId,
    skillId,
    userId,
  }).populate({
    path: 'userId',
    select: 'username email',
  });

  if (!review) {
    return next(new ApiError('Review not found', 404));
  }

  res.status(200).json(review);
});

//* Update Review
const updateReview = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { skillId, reviewId, comment, rating } = req.body;

  //* check if the skillId is valid
  if (!mongoose.isValidObjectId(skillId)) {
    return next(new ApiError('Skill id is not valid id', 400));
  }

  const review = await ReviewModel.findOneAndUpdate(
    { _id: reviewId, skillId, userId },
    { comment, rating },
    { new: true }
  );

  if (!review) {
    return next(new ApiError('Review not updated', 400));
  }

  res.status(200).json(review);
});

//* Delete Review
const deleteReview = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { skillId, reviewId } = req.params;

  //* check if the skillId is valid
  if (
    !mongoose.isValidObjectId(skillId) ||
    !mongoose.isValidObjectId(reviewId)
  ) {
    return next(new ApiError('Skill id or reviewId is not valid id', 400));
  }

  await ReviewModel.findOneAndDelete({
    _id: reviewId,
    skillId,
    userId,
  });
  res.status(200).json({ message: 'Review removed successfully.' });
});

export { createReview, getReviews, getReview, updateReview, deleteReview };
