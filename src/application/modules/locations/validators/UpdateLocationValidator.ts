import Joi from 'joi';

export const UpdateLocationValidator = Joi.object({
  placeId: Joi.string().optional().messages({
    'string.base': 'Place ID must be a string',
    'string.empty': 'Place ID is required',
    'any.required': 'Place ID is required',
  }),
});
