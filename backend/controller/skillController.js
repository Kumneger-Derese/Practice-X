import mongoose from 'mongoose';
import ApiError from '../utils/ApiError.js';
import UserModel from '../model/userModel.js';
import PracticeTaskModel from '../model/taskModel.js';
import SkillModel from '../model/skillModel.js';
import ProgressModel from '../model/progressModel.js';
import { asyncHandler } from '../middleware/asyncHandler.js';

//Create skill
const createSkill = asyncHandler(async (req, res, next) => {
  const createdBy = req.user._id;
  const { title, category, description } = req.body;

  const createdSkill = await SkillModel.create({
    title,
    category,
    description,
    createdBy,
  });

  if (!createdSkill) {
    return next(new ApiError('Skill not created.', 400));
  }

  const skill = await SkillModel.findOne({
    title: createSkill?.title,
    category: createSkill?.category,
    createdBy,
  });

  if (skill) {
    return next(new ApiError('You created this skill already.', 401));
  }

  res.status(201).json(createdSkill);
});

//* update skill
const updateSkill = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { skillId, title, description, category } = req.body;

  if (!mongoose.isValidObjectId(skillId)) {
    return next(new ApiError('Skill id is not valid Id.', 400));
  }

  const skill = await SkillModel.findOne({ _id: skillId, createdBy: userId });

  if (!skill) {
    return next(new ApiError('This skill not found in your list.', 404));
  }

  if (title) skill.title = title || skill.title;
  if (category) skill.category = category || skill.category;
  if (description) skill.description = description || skill.description;

  await skill.save();
  res.status(200).json({ message: 'Skill Updated successfully' });
});

//* Delete skill
const deleteSkill = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;
  const { skillId } = req.params;

  // validare skillId
  if (!mongoose.isValidObjectId(skillId)) {
    return next(new ApiError('Skill id is invalid', 400));
  }

  //Find and check skill
  const skill = await SkillModel.findOne({ _id: skillId, createdBy: userId });

  if (!skill) return next(new ApiError('Skill not found.', 404));

  //return skill tasks id
  const skillTasksId = skill.tasks.map((task) => task._id);

  //find user joined the skill
  const usersJoinedSkill = await UserModel.find({
    joinedSkills: { $in: skillId },
  });

  //id of joined user to delete progress
  const joinedUsersId = usersJoinedSkill.map((user) => user._id);

  //remove skill from each users joinedSkill array
  usersJoinedSkill.forEach(async (user) => {
    user.joinedSkills.pull(skillId);
    await user.save();
  });

  //find joined users progress and delete
  const joinedUsersProgress = await ProgressModel.find({
    userId: { $in: joinedUsersId },
    taskId: { $in: skillTasksId },
  });

  // array of tracked progress Id
  const progressTaskId = joinedUsersProgress.map((progress) => progress._id);

  // delete progress for joined users
  await ProgressModel.deleteMany({
    _id: { $in: progressTaskId },
  });

  //remove skill tasks from TaskModel
  await PracticeTaskModel.deleteMany({
    _id: { $in: skillTasksId },
  });

  await skill.deleteOne();

  res.status(200).json({
    message: 'Skill Deleted successfully.',
  });
});

//Joins kill
const joinSkill = asyncHandler(async (req, res, next) => {
  const { skillId } = req.body;
  const userId = req.user._id;

  const user = await UserModel.findOne({ _id: userId });

  if (!user) {
    return next(new ApiError('User not found', 404));
  }

  const skill = await SkillModel.findById({ _id: skillId });

  if (!skill) {
    return next(new ApiError('Skill not found', 404));
  }

  if (userId.toString() === skill.createdBy.toString()) {
    return next(new ApiError('You cannot join your skill set.', 400));
  }

  if (user.joinedSkills.includes(skillId)) {
    return next(new ApiError('Already joined this Skill.', 400));
  }

  user.joinedSkills.push(skillId);

  await user.save();
  res
    .status(201)
    .json({ message: `You joined ${skill?.title} skill succesfully.` });
});

const removeJoinedSkill = asyncHandler(async (req, res, next) => {
  const { skillId } = req.params;
  const userId = req.user._id;

  if (!mongoose.isValidObjectId(skillId)) {
    return next(new ApiError('Skill id is not valid Id.', 400));
  }

  const user = await UserModel.findOne({ _id: userId });
  const skill = await SkillModel.findById({ _id: skillId });

  if (!user) {
    return next(new ApiError('User not found', 404));
  }

  if (!skill) {
    return next(new ApiError('Skill not found', 404));
  }

  //Creator cannot unenroll
  if (userId.toString() === skill.createdBy.toString()) {
    return next(
      new ApiError('You cannot un ernrolled from your skill set.', 400)
    );
  }

  // delete task progress with skill joined
  const taskIds = skill.tasks.map((task) => task._id);
  const taskCompleted = await ProgressModel.find({
    userId,
    taskId: { $in: taskIds },
  });

  // Array of ids that their progress is tracked
  const taskCompletedIds = taskCompleted.map((taskComp) => taskComp._id);

  //only joined user can unenroll
  if (user.joinedSkills.includes(skillId)) {
    user.joinedSkills.pull(skillId);

    // if skill to be unjoined is completed its data also removed
    user.completedSkills.pull(skillId);

    // if user unjoin from skill thir progress all removed
    await ProgressModel.deleteMany({ _id: { $in: taskCompletedIds } });
  }

  await user.save();
  res
    .status(201)
    .json({ message: `Skill Unenrolled from ${skill.title} successfully.` });
});

const getSkills = asyncHandler(async (req, res, next) => {
  const skills = await SkillModel.find({})
    .populate('createdBy', 'email username')
    .populate({
      path: 'tasks',
      select: '-createdAt -__v -updatedAt',
      populate: {
        path: 'createdBy',
        model: 'User',
        select: 'username email',
      },
    });
  res.status(200).json(skills);
});

const getPaginatedSkills = asyncHandler(async (req, res, next) => {
  const { q = '', category = '', page = 1, limit = 10 } = req.query;

  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const skip = (pageNum - 1) * limitNum;

  const query = {};

  if (category) {
    query.$or = [{ category }];
  }

  if (q) {
    query.$or = [{ title: { $regex: q, $options: 'i' } }, { category }];
  }

  const skills = await SkillModel.find({ $or: [query] })
    .skip(skip)
    .limit(limitNum)
    .populate('createdBy', 'username')
    .select('-createdAt -updatedAt -tasks -__v');

  const totalDoc = await SkillModel.countDocuments(query);

  if (!skills) {
    return next(new ApiError('No skills found.', 404));
  }

  const totalPage = Math.ceil(totalDoc / limitNum);

  res.status(200).json({
    data: skills,
    currentPage: page,
    totalPage,
  });
});

const getSkill = asyncHandler(async (req, res, next) => {
  const { skillId } = req.params;

  if (!mongoose.isValidObjectId(skillId)) {
    return next(new ApiError('Skill id is not valid Id.', 400));
  }

  const skill = await SkillModel.findOne({ _id: skillId })
    .populate('createdBy', 'email username')
    .populate({
      path: 'tasks',
      select: '-createdAt -__v -updatedAt',
      populate: {
        path: 'createdBy',
        model: 'User',
        select: 'username email',
      },
    });

  res.status(200).json(skill);
});

const getSkillsByMe = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const skillsByMe = await SkillModel.find({ createdBy: userId });

  if (!skillsByMe) {
    return next(
      new ApiError('You have not created skill to practice yet.', 404)
    );
  }

  res.status(200).json(skillsByMe);
});

export {
  createSkill,
  getSkill,
  getSkills,
  getPaginatedSkills,
  joinSkill,
  removeJoinedSkill,
  getSkillsByMe,
  updateSkill,
  deleteSkill,
};
