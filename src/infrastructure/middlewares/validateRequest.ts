import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { ErrorValidation } from 'application/dtos/ErrorValidation.ts';

export const validateRequest =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.body, { abortEarly: false });
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
