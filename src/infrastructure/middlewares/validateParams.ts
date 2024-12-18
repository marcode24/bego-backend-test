import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { ErrorValidation } from 'application/DTOs/ErrorValidation.ts';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';

export const validateParams =
  (schema: Schema) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const { error } = schema.validate(req.params, { abortEarly: false });
    if (error) {
      const messages = error.details.map((detail) => detail.message);
      const validationError = ErrorValidation.Failure<string>(
        'Validation error',
        HttpStatus.BAD_REQUEST,
        messages
      );
      res.status(validationError.statusCode).json(validationError);
      return;
    }

    next();
  };
