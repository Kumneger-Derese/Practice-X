import Joi from 'joi';

const idSchema = Joi.string().length(24).trim().required().messages({
  'string.base': '{#key}  feild  must be a string.',
  'string.empty': '{#key}  is must not empty.',
  'string.length': '{#key}  must be {#limit} charcter long.',
  'any.required': '{#key}  is required.',
});

const createReviewSchema = Joi.object({
  comment: Joi.string().max(500).trim().required().messages({
    'string.base': '{#key} must be string',
    'string.empty': '{{#key}} must not be empty',
    'string.length': '{{#key}} maximum 500 charcter long.',
    'any.required': '{#key} is required.',
  }),
  rating: Joi.number().min(1).max(5).optional().messages({
    'number.base': '{#key} must be number',
    'number.empty': '{#key} must not be empty',
    'number.min': '{#key} must be at least 1',
    'number.max': '{#key} must be at maximum 5',
  }),
  skillId: idSchema,
});

const updateReviewSchema = Joi.object({
  skillId: idSchema,
  reviewId: idSchema,
  comment: Joi.string().max(500).trim().optional().messages({
    'string.base': '{#key} must be string',
    'string.empty': '{{#key}} must not be empty',
    'string.length': '{{#key}} maximum 500 charcter long.',
  }),
  rating: Joi.number().min(1).max(5).optional().messages({
    'number.base': '{#key} must be number',
    'number.empty': '{#key} must not be empty',
    'number.min': '{#key} must be at least 1',
    'number.max': '{#key} must be at maximum 5',
  }),
});

const skillIdSchema = Joi.object({
  skillId: idSchema,
  reviewId: idSchema,
}).unknown();

export { createReviewSchema, skillIdSchema, updateReviewSchema };
