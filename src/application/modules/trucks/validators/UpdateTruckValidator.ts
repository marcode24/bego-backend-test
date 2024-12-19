import Joi from 'joi';
import mongoose from 'mongoose';

export const UpdateTruckValidator = Joi.object({
  userId: Joi.string()
    .custom((value, helpers) =>
      !mongoose.Types.ObjectId.isValid(value) ? helpers.error('any.invalid') : value
    )
    .optional()
    .messages({
      'string.base': 'User ID must be a string',
      'string.empty': 'User ID cannot be empty',
      'any.invalid': 'User ID must be a valid MongoDB ObjectId',
    }),
  year: Joi.string()
    .pattern(/^\d{4}$/)
    .custom((value, helpers) => {
      const year = parseInt(value, 10);
      if (year < 1900) {
        return helpers.error('any.invalid', { value });
      }
      return value;
    })
    .optional()
    .messages({
      'string.base': 'Year must be a string',
      'string.empty': 'Year cannot be empty',
      'string.pattern.base': 'Year must be a valid 4-digit year',
      'any.invalid': 'Year must be greater than 1900',
    }),
  color: Joi.string().optional().messages({
    'string.base': 'Color must be a string',
    'string.empty': 'Color cannot be empty',
  }),
  plates: Joi.string()
    .pattern(/^[A-Za-z0-9]{6,7}$/)
    .optional()
    .messages({
      'string.base': 'Plates must be a string',
      'string.empty': 'Plates cannot be empty',
      'string.pattern.base': 'Plates must be 6-7 alphanumeric characters',
    }),
});
