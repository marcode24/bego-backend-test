import Joi from 'joi';
import { GetLocationsRequest } from '../DTOs/Requests/GetLocationsRequest.ts';

export const GeetLocationsValidator = Joi.object<GetLocationsRequest>({
  all: Joi.boolean().optional().messages({
    'boolean.base': 'The "all" field must be a boolean value',
    'any.required': 'The "all" field is required',
  }),
  page: Joi.number().optional().min(1).messages({
    'number.base': 'The "page" field must be a number',
    'number.min': 'The value of "page" must be greater than or equal to 1',
    'any.required': 'The "page" field is required',
  }),
  limit: Joi.number().optional().min(1).max(100).messages({
    'number.base': 'The "limit" field must be a number',
    'number.min': 'The value of "limit" must be greater than or equal to 1',
    'number.max': 'The value of "limit" cannot be greater than 100',
    'any.required': 'The "limit" field is required',
  }),
});
