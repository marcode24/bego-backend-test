import Joi from 'joi';

export const userValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name must be a string',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least {#limit} characters',
    'string.max': 'Name must be at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.empty': 'Email is required',
    'string.email': 'Email must be a valid email',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(6).max(30).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least {#limit} characters',
    'string.max': 'Password must be at most {#limit} characters',
    'any.required': 'Password is required',
  }),
});
