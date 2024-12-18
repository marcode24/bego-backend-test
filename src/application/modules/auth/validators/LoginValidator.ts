import Joi from 'joi';

export const loginValidationSchema = Joi.object({
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
