import Joi from 'joi';
import mongoose from 'mongoose';

export const CreateTruckValidator = Joi.object({
  userId: Joi.string()
    .custom((value, helpers) =>
      !mongoose.Types.ObjectId.isValid(value) ? helpers.error('any.invalid') : value
    )
    .required()
    .messages({
      'string.base': 'User ID must be a string',
      'string.empty': 'User ID is required',
      'any.required': 'User ID is required',
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
    .required()
    .messages({
      'string.base': 'Year must be a string',
      'string.empty': 'Year is required',
      'string.pattern.base': 'Year must be a valid 4-digit year',
      'any.invalid': 'Year must be greater than 1900',
      'any.required': 'Year is required',
    }),
  color: Joi.string().required().messages({
    'string.base': 'Color must be a string',
    'string.empty': 'Color is required',
    'any.required': 'Color is required',
  }),
  plates: Joi.string()
    .pattern(/^[A-Za-z0-9]{6,7}$/)
    .required()
    .messages({
      'string.base': 'Plates must be a string',
      'string.empty': 'Plates is required',
      'string.pattern.base': 'Plates must be 6-7 alphanumeric characters',
      'any.required': 'Plates is required',
    }),
});
