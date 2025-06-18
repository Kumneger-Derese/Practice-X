import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';
import SkillModel from '../model/skillModel.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import PracticeTaskModel from '../model/taskModel.js';
import { sanitizeHtml } from '../utils/sanitizeHtml.js';

//* Create Practice task
const createPracticeTask = asyncHandler(async (req, res, next) => {
  const createdBy = req.user._id;
  const { title, content, type, skillId } = req.body;

  const sanitizedContent = sanitizeHtml(content);

  if (!mongoose.isValidObjectId(skillId)) {
    return next(new ApiError('SkillId is not valid id.', 400));
  }

  const task = await PracticeTaskModel.create({
    title,
    content: sanitizedContent,
    type,
    skillId,
    createdBy,
  });

  const skill = await SkillModel.findOne({ _id: skillId, createdBy });

  if (!skill) {
    return next(new ApiError('Skill not found.', 400));
  }

  skill.tasks.push(task._id);

  await skill.save();
  res.status(201).json(task);
});

//* Get task of skill I joined
const getPracticeTask = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;

  if (!mongoose.isValidObjectId(taskId)) {
    return next(new ApiError('TaskId is not valid.', 400));
  }

  const task = await PracticeTaskModel.findOne({ _id: taskId }).populate(
    'skillId',
    'title'
  );

  if (!task) {
    return next(new ApiError('Task not found.', 404));
  }

  res.status(200).json(task);
});

//Todo: Get one task created by me
const getMyPracticeTask = asyncHandler(async (req, res, next) => {
  const { taskId } = req.params;
  const userId = req.user._id;

  if (!mongoose.isValidObjectId(taskId)) {
    return next(new ApiError('TaskId is not valid.', 400));
  }

  const task = await PracticeTaskModel.findOne({ _id: taskId });

  if (!task) {
    return next(new ApiError('Task not found.', 404));
  }

  res.status(200).json(task);
});

//* Delete single task
const deletePracticeTask = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { skillId, taskId } = req.params;

  if (!mongoose.isValidObjectId(skillId)) {
    return next(new ApiError('SkillId is not valid id.', 400));
  }

  if (!mongoose.isValidObjectId(taskId)) {
    return next(new ApiError('TaskId is not valid id.', 400));
  }

  const skill = await SkillModel.findOne({
    _id: skillId,
    createdBy: userId,
  });

  if (!skill) {
    return next(new ApiError('Skill not found.', 404));
  }

  //remove task reference from skill
  skill.tasks.pull(taskId);

  //remove task itself
  const task = await PracticeTaskModel.findOneAndDelete({
    _id: taskId,
    skillId,
    createdBy: userId,
  });

  if (!task) {
    return next(new ApiError('Task not found or already deleted.', 404));
  }

  await skill.save();
  res.status(200).json({ message: `Task about ${task?.title} is deleted.` });
});

//*Update task
const updatePracticeTask = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { taskId, skillId, title, content, type } = req.body;

  const sanitizedContent = sanitizeHtml(content);

  const task = await PracticeTaskModel.findOne({
    _id: taskId,
    skillId,
    createdBy: userId,
  });

  if (!task) {
    return next(new ApiError('This task not found in your skill list.', 404));
  }

  if (title) task.title = title || task.title;
  if (content) task.content = sanitizedContent || task.content;
  if (type) task.type = type || task.type;

  await task.save();
  res.status(200).json({ message: 'Task Updated successfully' });
});

export {
  createPracticeTask,
  getPracticeTask,
  getMyPracticeTask,
  updatePracticeTask,
  deletePracticeTask,
};
