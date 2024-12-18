import { IUserRepository } from 'domain/repositories/IUserRepository.ts';
import { inject, injectable } from 'tsyringe';
import { LoginUserResponse } from './DTOs/Responses/LoginUserReponse.ts';
import { LoginUserRequest } from './DTOs/Requests/LoginUserRequest.ts';
import { IJwtService } from 'domain/services/IJwtService.ts';
import { User } from 'domain/entities/users/User.ts';

@injectable()
export default class LoginUser {
  constructor(
    @inject('IUserRepository') private readonly userRepository: IUserRepository,
    @inject('IJwtService') private readonly jwtService: IJwtService
  ) {}

  public async execute(data: LoginUserRequest): Promise<LoginUserResponse<string>> {
    const user = await this.userRepository.findByEmail(data.email);
    if (!user) {
      return LoginUserResponse.UserOrPasswordIncorrect();
    }

    const passwordMatch = await User.comparePassword(data.password, user.password);
    if (!passwordMatch) {
      return LoginUserResponse.UserOrPasswordIncorrect();
    }

    const token = this.jwtService.generateToken({ email: user.email });
    return LoginUserResponse.Success(token);
  }
}
