import { ErrorValidation } from 'application/dtos/ErrorValidation.ts';
import { userValidationSchema } from 'application/validators/UserValidator.ts';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = userValidationSchema.validate(req.body);
  if (error) {
    const messages = error.details.map((detail) => detail.message);
    const validationError = new ErrorValidation(messages);
    res.status(validationError.statusCode).json({
      statusCode: validationError.statusCode,
      messages: validationError.errors,
    });
    return;
  }

  next();
};
