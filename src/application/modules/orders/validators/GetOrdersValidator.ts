import Joi from 'joi';
import { GetOrdersRequest } from '../DTOs/Requests/GetOrdersRequest.ts';
import { OrderStatus } from 'domain/entities/orders/Status.ts';

export const GeetOrderValidator = Joi.object<GetOrdersRequest>({
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
  status: Joi.string()
    .valid(...Object.values(OrderStatus))
    .optional()
    .messages({
      'string.base': 'Status must be a string',
      'string.empty': 'Status is required',
      'any.only': 'Status must be one of {#valids}',
    }),
});
