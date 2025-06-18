import { model, Schema } from 'mongoose';

const practiceTaskSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'practice task title required.'],
    },
    content: {
      type: Schema.Types.Mixed,
      required: [true, 'practice task content is required.'],
    },

    type: {
      type: String,
      enum: ['text', 'video'],
      default: 'text',
    },
    completedAt: {
      type: Date,
    },
    skillId: {
      type: Schema.Types.ObjectId,
      ref: 'Skill',
      required: [true, 'practice task skill category is required.'],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'practice task creator  is required.'],
    },
  },
  { timestamps: true }
);

const PracticeTaskModel = model('PracticeTask', practiceTaskSchema);
export default PracticeTaskModel;
