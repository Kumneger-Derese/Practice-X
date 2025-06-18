import { Schema, model } from 'mongoose';

const skillSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Skill title is required'],
    },
    description: {
      type: String,
      required: [true, 'Skill description is required'],
    },
    category: {
      type: String,
      required: true,
    },
    tasks: [
      {
        type: Schema.Types.ObjectId,
        required: [true, 'Skill tasks is required'],
        ref: 'PracticeTask',
      },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Skill creator is required'],
    },
  },
  { timestamps: true }
);

const SkillModel = model('Skill', skillSchema);
export default SkillModel;
