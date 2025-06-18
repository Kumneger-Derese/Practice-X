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
});

export { createSkillSchema };
