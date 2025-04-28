import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(50).messages({
    'string.base': 'Name must be a string.',
    'string.empty': 'Name cannot be empty.',
    'string.min': 'Name must be at least 2 characters long.',
    'string.max': 'Name cannot exceed 50 characters.',
  }),
  bio: Joi.string().allow('').max(500).messages({
    'string.base': 'Bio must be a string.',
    'string.max': 'Bio cannot exceed 500 characters.',
  }),
}).or('name', 'bio');
