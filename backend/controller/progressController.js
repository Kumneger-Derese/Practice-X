import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';
import UserModel from '../model/userModel.js';
import ProgressModel from '../model/progressModel.js';
import PracticeTaskModel from '../model/taskModel.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

//* Tracks the user who completes the task
const trackProgress = asyncHandler(async (req, res, next) => {
  const { taskId } = req.body;
  const userId = req.user._id;

  if (!mongoose.isValidObjectId(taskId) || !mongoose.isValidObjectId(userId)) {
    return next(new ApiError('Invalid object id.', 401));
  }

  const task = await PracticeTaskModel.findById({ _id: taskId });

  //check if task is created by loggedin user
  if (userId.toString() === task.createdBy.toString()) {
    return next(
      new ApiError(
        'You are the creator of the task so, you can not complete the task.',
        400
      )
    );
  }

  const isAlreadyTracked = await ProgressModel.findOne({ userId, taskId });

  if (isAlreadyTracked) {
    await isAlreadyTracked.deleteOne();

    return res.status(201).json({
      message: 'Progress untracked successfully.',
      isTracked: false,
    });
  }

  const completedAt = new Date();
  const progress = await ProgressModel.create({ userId, taskId, completedAt });

  if (!progress) {
    return next(new ApiError('Progress not tracked.', 404));
  }

  res.status(201).json({
    message: 'Progress tracked successfully.',
    isTracked: true,
    progress,
  });
});

//* Get User and skill progress info
const getSkillProgress = asyncHandler(async (req, res, next) => {
  const { skillId } = req.params;

  const userId = req.user._id;
  const user = await UserModel.findById({ _id: userId });

  // get tasks under this skill
  const skillTasks = await PracticeTaskModel.find({ skillId }).select('_id');
  const taskIds = skillTasks.map((taskId) => taskId._id);

  if (taskIds.length === 0) {
    return next(new ApiError('No tasks found for this skill', 404));
  }

  // count completed tasks by the user
  const completedCount = await ProgressModel.countDocuments({
    userId,
    taskId: { $in: taskIds },
  });

  // count completed tasks by the user
  const completedProgTasks = await ProgressModel.find({
    userId,
    taskId: { $in: taskIds },
  });

  const completedTaskIds = completedProgTasks.map((task) => task.taskId);

  //calculate percentage
  const total = taskIds.length;
  const percentage = Math.round((completedCount / total) * 100);

  // if percent is 100 skill is completed else incompleted
  if (percentage === 100 && !user.completedSkills.includes(skillId)) {
    user.completedSkills.push(skillId);
    await user.save();
  } else if (percentage < 100 && user.completedSkills.includes(skillId)) {
    user.completedSkills.pull(skillId);
    await user.save();
  }

  //response
  res.status(200).json({
    skillId,
    totalTasks: total,
    completedTasks: completedCount,
    completedTaskIds,
    percentage,
  });
});

export { trackProgress, getSkillProgress };
