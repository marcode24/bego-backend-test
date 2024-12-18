import { IUserRepository } from 'domain/repositories/IUserRepository.ts';
import { User } from 'domain/entities/users/User.ts';
import { inject, injectable } from 'tsyringe';
import { CreateUserRequest } from './DTOs/Requests/CreateUserRequest.ts';
import { CreateUserResponse } from './DTOs/Responses/CreateUserResponse.ts';

@injectable()
export default class CreateUser {
  constructor(@inject('IUserRepository') private readonly userRepository: IUserRepository) {}

  public async execute(data: CreateUserRequest): Promise<CreateUserResponse<User | string>> {
    const userExists = await this.userRepository.findByEmail(data.email);
    if (userExists) {
      return CreateUserResponse.UserAlreadyExists();
    }

    const user = User.create(data.name, data.email, data.password);
    await user.setPassword(data.password);
    const newUser = await this.userRepository.create(user);

    // const token = this.jwtService.generateToken({ email: newUser.email });
    return CreateUserResponse.Success(newUser.email);
  }
}
