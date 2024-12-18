import CreateUser from 'application/modules/users/CreateUser.ts';
import { CreateUserRequest } from 'application/modules/users/DTOs/Requests/CreateUserRequest.ts';

import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';

@injectable()
export class UserController {
  constructor(@inject('CreateUser') private readonly createUser: CreateUser) {}

  async create(request: Request, response: Response): Promise<void> {
    const createUserRequest: CreateUserRequest = { ...request.body };
    const result = await this.createUser.execute(createUserRequest);
    response.status(result.statusCode).json(result);
  }
}
