import { Schema, model } from 'mongoose';

const progressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User Id is required.'],
    },
    taskId: {
      type: Schema.Types.ObjectId,
      ref: 'Skill',
      required: [true, 'Task Id is required.'],
    },
    completedAt: {
      type: Date,
      default: Date.now(),
      required: [true, 'Completion date is required.'],
    },
  },
  { timestamps: true }
);

const ProgressModel = model('Pregress', progressSchema);
export default ProgressModel;
