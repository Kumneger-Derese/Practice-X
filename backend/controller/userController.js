import ApiError from '../utils/ApiError.js';
import UserModel from '../model/userModel.js';
import { asyncHandler } from '../middleware/asyncHandler.js';
import { generateToken } from '../utils/generateToken.js';
import PracticeTaskModel from '../model/taskModel.js';
import ProgressModel from '../model/progressModel.js';
import SkillModel from '../model/skillModel.js';

//* Register User
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const userExist = await UserModel.findOne({ email });

  if (userExist) {
    return next(new ApiError('User already registered.', 400));
  }

  const user = await UserModel.create({ username, email, password });

  if (user) {
    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      joinedSkills: user.joinedSkills,
      token,
    });
  } else {
    return next(new ApiError('Invalid user data', 400));
  }
});

//* Login User
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      joinedSkills: user.joinedSkills,
      token,
    });
  } else {
    return next(new ApiError('Invalid Email or Password', 401));
  }
});

//* Get user profile
const getUser = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const user = await UserModel.findOne({ _id: userId })
    .populate({
      path: 'joinedSkills',
      select: 'title createdBy category description',
      populate: {
        path: 'createdBy',
        select: 'username',
      },
    })
    .select('-password');

  if (!user) {
    return next(new ApiError('User not found', 404));
  }
  const joinedSkillIds = req.user.joinedSkills;

  //by using array of skill id and returns array of their tasks
  const joinedSkillTasks = await PracticeTaskModel.find({
    skillId: { $in: joinedSkillIds },
  });
  const totalJoinedTask = joinedSkillTasks.length;

  //from all tasks joined by user return completed one
  const joinedSkillsTasksIds = joinedSkillTasks.map((task) => task._id);

  const totalCompletedTask = await ProgressModel.countDocuments({
    userId,
    taskId: { $in: joinedSkillsTasksIds },
  });

  res.status(200).json({ user, totalJoinedTask, totalCompletedTask });
});

//* Update user profile
const updateUser = asyncHandler(async (req, res, next) => {
  const userId = req.user._id;

  const user = await UserModel.findById({ _id: userId }).populate({
    path: 'joinedSkills',
    select: 'title createdBy',
    populate: {
      path: 'createdBy',
      select: 'username email',
    },
  });

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
  }

  if (!user) {
    return next(new ApiError('User to update not found', 404));
  }

  const token = generateToken(userId);
  const updatedUser = await user.save();
  res.status(200).json({
    _id: updatedUser._id,
    username: updatedUser.username,
    email: updatedUser.email,
    joinedSkills: updatedUser.joinedSkills,
    token,
  });
});

export { registerUser, loginUser, updateUser, getUser };
