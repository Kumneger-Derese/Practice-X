import Joi from 'joi';

//* Register validation Schema
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).trim().required().messages({
    'string.base': 'Username must be only chacters.',
    'string.min': 'Username too short.',
    'string.max': 'Username too long.',
    'string.empty': 'Username feild is must be provided.',
  }),
  email: Joi.string().email().trim().lowercase().required().messages({
    'string.email': 'Email must be valid.',
    'string.empty': 'Email feild is must be provided.',
  }),
  password: Joi.string().min(6).trim().required().messages({
    'string.min': 'Password must be 6 character long.',
    'string.empty': 'Password feild is must be provided.',
  }),
});

//* Login validation Schema
const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required().messages({
    'string.email': 'Email must be valid email.',
    'string.empty': 'Email feild is must be provided.',
  }),
  password: Joi.string().min(6).trim().required().messages({
    'string.min': 'Password must be 6 charcter long.',
    'string.empty': 'Password feild is must be provided.',
  }),
});

//* update profile validation Schema
const updateSchema = Joi.object({
  username: Joi.string().min(3).max(30).trim().allow('').optional().messages({
    'string.base': 'Username must be only chacters.',
    'string.min': 'Username too short.',
    'string.max': 'Username too long.',
  }),
  email: Joi.string().email().trim().lowercase().allow('').optional().messages({
    'string.email': 'Email must be valid email.',
  }),
  password: Joi.string().min(6).trim().allow('').optional().messages({
    'string.min': 'Password must be 6 charcter long.',
  }),
})
  .min(1)
  .messages({
    'object.min': 'At least provide one feild in order to update user profile.',
  });

export { registerSchema, loginSchema, updateSchema };
