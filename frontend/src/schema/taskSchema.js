import Joi from 'joi';

const createTaskSchema = Joi.object({
  title: Joi.string().trim().required().messages({
    'string.base': 'Task title field must be a string.',
    'string.empty': 'Task title field should not be empty.',
    'any.required': 'Task title is required.',
  }),

  type: Joi.string()
    .valid('text', 'video')
    .default('text')
    .required()
    .messages({
      'string.empty': 'Type field should not be empty.',
      'any.only': 'Type must be either text or video.',
      'any.required': 'Task type is required.',
    }),

  content: Joi.alternatives().conditional('type', [
    {
      is: 'text',
      then: Joi.string().trim().required().messages({
        'string.empty': 'Text content should not empty.',
        'any.required': 'Text content is required.',
      }),
    },
    {
      is: 'video',
      then: Joi.object({
        public_id: Joi.string().required().messages({
          'string.required': 'Video content required.',
          'any.required': 'Video content required.',
        }),
        secure_url: Joi.string().uri().required(),
        thumbnail_url: Joi.string().uri().required(),
        duration: Joi.number().required(),
        width: Joi.number().required(),
        height: Joi.number().required(),
      }).required(),
    },
  ]),

  skillId: Joi.string().alphanum().length(24).trim().required().messages({
    'string.base': 'Skill Id field must be a string.',
    'string.empty': 'Skill Id must not be empty.',
    'string.length': 'Skill Id must be 24 characters long.',
    'any.required': 'Skill Id is required.',
  }),
});

const updateTaskSchema = Joi.object({
  title: Joi.string().trim().optional().messages({
    'string.base': 'Task title feild  must be a string.',
    'string.empty': 'Task title feild is should not be empty.',
  }),

  type: Joi.string()
    .valid('text', 'video')
    .default('text')
    .optional()
    .messages({
      'string.empty': 'type feild should not be empty.',
      'string.valid': 'The type value should be text or video',
      'any.only': `Type {#value} is invalid type. Type must be either text or video.`,
    }),

  content: Joi.alternatives().conditional('type', [
    {
      is: 'text',
      then: Joi.string().trim().optional().messages({
        'string.empty': 'Text content is required.',
        'any.required': 'Text content is required.',
      }),
    },
    {
      is: 'video',
      then: Joi.object({
        public_id: Joi.string().required(),
        secure_url: Joi.string().uri().required(),
        thumbnail_url: Joi.string().uri().required(),
        duration: Joi.number().required(),
        width: Joi.number().required(),
        height: Joi.number().required(),
      }).optional(),
    },
  ]),
  taskId: Joi.string().alphanum().length(24).trim().required().messages({
    'string.base': 'Task ID feild  must be a string.',
    'string.empty': 'Task Id is must not empty.',
    'string.length': 'Task Id must be 24 charcter long.',
    'any.required': 'Task Id is required.',
  }),
  skillId: Joi.string().alphanum().length(24).trim().required().messages({
    'string.base': 'Skill ID feild  must be a string.',
    'string.empty': 'Skill Id is must not empty.',
    'string.length': 'Skill Id must be 24 charcter long.',
    'any.required': 'Skill Id is required.',
  }),
});

export { createTaskSchema, updateTaskSchema };
