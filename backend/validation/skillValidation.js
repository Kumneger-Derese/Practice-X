import Joi from 'joi';

const createSkillSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.base': 'Title feild  must be a string.',
    'string.empty': 'Title feild is should not be empty.',
    'any.required': 'Title feild is required.',
  }),
  description: Joi.string().trim().required().messages({
    'string.base': 'Description feild  must be a string.',
    'string.empty': 'Description feild should not be empty.',
    'any.required': 'Description feild is required.',
  }),
  category: Joi.string().trim().required().messages({
    'string.base': 'Category feild  must be a string.',
    'string.empty': 'Category feild is should not be empty.',
    'any.required': 'Category feild is required.',
  }),
}).unknown(true);

const updateSkillSchema = Joi.object({
  skillId: Joi.string().alphanum().length(24).trim().required().messages({
    'string.base': 'Skill ID feild  must be a string.',
    'string.empty': 'Skill Id is must not empty.',
    'string.length': 'Skill Id must be 24 charcter long.',
    'any.required': 'Skill Id is required.',
  }),
  title: Joi.string().trim().optional().messages({
    'string.base': 'Title feild  must be a string.',
    'string.empty': 'Title feild is should not be empty.',
  }),
  description: Joi.string().trim().optional().messages({
    'string.base': 'Description feild  must be a string.',
    'string.empty': 'Description feild should not be empty.',
  }),
  category: Joi.string().trim().optional().messages({
    'string.base': 'Category feild  must be a string.',
    'string.empty': 'Category feild is should not be empty.',
  }),
});

const skillIdSchema = Joi.object({
  skillId: Joi.string().alphanum().length(24).trim().required().messages({
    'string.base': 'Skill ID feild  must be a string.',
    'string.empty': 'Skill Id is must not empty.',
    'string.length': 'Skill Id must be 24 charcter long.',
    'any.required': 'Skill Id is required.',
  }),
});

const pagenationSchema = Joi.object({
  q: Joi.string()
    .allow('')
    .trim()
    .messages({ 'string.base': 'Query string must be string' }),
  category: Joi.string()
    .allow('')
    .trim()
    .lowercase()
    .messages({ 'string.base': 'Category string must be string' }),
  page: Joi.number()
    .min(1)
    .integer()
    .default(1)
    .messages({ 'number.base': 'Page string must be number' }),
  limit: Joi.number()
    .min(1)
    .integer()
    .default(10)
    .messages({ 'number.base': 'Limit string must be number' }),
});

export {
  createSkillSchema,
  skillIdSchema,
  updateSkillSchema,
  pagenationSchema,
};
