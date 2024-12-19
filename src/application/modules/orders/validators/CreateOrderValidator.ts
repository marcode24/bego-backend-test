import Joi from 'joi';
import { CreateOrderRequest } from '../DTOs/Requests/CreateOrderRequest.ts';
import mongoose from 'mongoose';
import { OrderStatus } from 'domain/entities/orders/Status.ts';

export const CreateOrderValidator = Joi.object<CreateOrderRequest>({
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
  truckId: Joi.string()
    .custom((value, helpers) =>
      !mongoose.Types.ObjectId.isValid(value) ? helpers.error('any.invalid') : value
    )
    .required()
    .messages({
      'string.base': 'Truck ID must be a string',
      'string.empty': 'Truck ID is required',
      'any.required': 'Truck ID is required',
      'any.invalid': 'Truck ID must be a valid MongoDB ObjectId',
    }),
  status: Joi.string()
    .valid(...Object.values(OrderStatus))
    .optional()
    .messages({
      'string.base': 'Status must be a string',
      'string.empty': 'Status is required',
      'any.only': 'Status must be one of {#valids}',
    }),
  pickup: Joi.string()
    .custom((value, helpers) =>
      !mongoose.Types.ObjectId.isValid(value) ? helpers.error('any.invalid') : value
    )
    .required()
    .messages({
      'string.base': 'Pickup ID must be a string',
      'string.empty': 'Pickup ID is required',
      'any.required': 'Pickup ID is required',
      'any.invalid': 'Pickup ID must be a valid MongoDB ObjectId',
    }),
  dropoff: Joi.string()
    .custom((value, helpers) =>
      !mongoose.Types.ObjectId.isValid(value) ? helpers.error('any.invalid') : value
    )
    .required()
    .messages({
      'string.base': 'Dropoff ID must be a string',
      'string.empty': 'Dropoff ID is required',
      'any.required': 'Dropoff ID is required',
      'any.invalid': 'Dropoff ID must be a valid MongoDB ObjectId',
    }),
});
