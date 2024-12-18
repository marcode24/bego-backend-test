import { inject, injectable } from 'tsyringe';
import { LoginUserRequest } from 'application/modules/auth/DTOs/Requests/LoginUserRequest.ts';
import { Request, Response } from 'express';

import LoginUser from 'application/modules/auth/LoginUser.ts';

@injectable()
export class AuthController {
  constructor(@inject('LoginUser') private readonly loginUser: LoginUser) {}

  async login(request: Request, response: Response): Promise<void> {
    const loginRequest: LoginUserRequest = { ...request.body };
    const result = await this.loginUser.execute(loginRequest);
    response.status(result.statusCode).json(result);
  }
}
