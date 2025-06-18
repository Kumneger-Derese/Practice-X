import Joi from 'joi';

//* Register user validation Schema
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).trim().required().messages({
    'string.base': 'Username must be only chacters.',
    'string.min': 'Username too short.',
    'string.max': 'Username too long.',
    'string.empty': 'Username feild is must be provided.',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .lowercase()
    .required()
    .messages({
      'string.email': 'Please enter valid email.',
      'string.empty': 'Email feild is must be provided ok.',
    }),
  password: Joi.string().min(6).trim().required().messages({
    'string.min': 'Password must be 6 character long.',
    'string.empty': 'Password feild is must be provided.',
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .required()
    .min(6)
    .trim()
    .messages({
      'string.min': 'Confirm password must be 6 character long.',
      'string.empty': 'Confirm password feild is must be provided.',
      'any.only': 'Password do not match.',
    }),
});

//* Login user validation schema
const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .lowercase()
    .required()
    .messages({
      'string.email': 'Please enter valid email.',
      'string.empty': 'Email feild is must be provided.',
    }),
  password: Joi.string().min(6).trim().required().messages({
    'string.min': 'Password must be 6 character long.',
    'string.empty': 'Password feild is must be provided.',
  }),
});

//* Update user profile validation Schema
const updateSchema = Joi.object({
  username: Joi.string().min(3).max(30).trim().optional().messages({
    'string.base': 'Username must be only chacters.',
    'string.min': 'Username too short.',
    'string.max': 'Username too long.',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .lowercase()
    .optional()
    .messages({
      'string.email': 'Please enter valid email.',
      'string.empty': 'Email feild is must be provided.',
    }),
  password: Joi.string().min(6).allow('').optional().messages({
    'string.min': 'Password must be 6 character long.',
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref('password'))
    .min(6)
    .allow(' ')
    .optional()
    .messages({
      'string.min': 'Confirm password must be 6 character long.',
      'string.empty': 'Confirm password feild is must be provided.',
      'any.only': 'Password do not match.',
    }),
});

export { registerSchema, loginSchema, updateSchema };
