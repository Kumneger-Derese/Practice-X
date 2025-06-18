import { Schema, model } from 'mongoose';

const reviewSchema = new Schema(
  {
    skillId: {
      type: Schema.Types.ObjectId,
      ref: 'Skill',
      required: [true, 'Skill to review is required.'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User to review is required.'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5'],
    },
    comment: {
      type: String,
      maxLength: [500, 'comment cannot be more than 1000 characters'],
    },
  },
  { timestamps: true }
);

const ReviewModel = model('Review', reviewSchema);
export default ReviewModel;
