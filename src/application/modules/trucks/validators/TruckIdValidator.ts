import Joi from 'joi';
import mongoose from 'mongoose';

export const truckIdValidator = Joi.object({
  id: Joi.string()
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
});
