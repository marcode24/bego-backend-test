import { JwtValidation } from 'application/DTOs/JwtValidation.ts';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from 'infrastructure/common/HttpStatus.ts';
import { JwtService } from 'infrastructure/services/JwtService.ts';

const jwtService = new JwtService();

export const validateJwt = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization;
  if (!token) {
    const error = JwtValidation.Failure<string>(
      'Access denied. No token provided.',
      HttpStatus.FORBIDDEN
    );
    res.status(error.statusCode).json(error);
    return;
  }

  const isValid = jwtService.verifyToken(token);
  if (!isValid) {
    const error = JwtValidation.Failure<string>('Invalid token.', HttpStatus.UNAUTHORIZED);
    res.status(error.statusCode).json(error);
    return;
  }

  next();
};
