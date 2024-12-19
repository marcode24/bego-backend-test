import Joi from 'joi';

export const CreateLocationValidator = Joi.object({
  placeId: Joi.string().required().messages({
    'string.base': 'Place ID must be a string',
    'string.empty': 'Place ID is required',
    'any.required': 'Place ID is required',
  }),
});
