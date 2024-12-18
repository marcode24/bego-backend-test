import { ResponseDto } from 'application/DTOs/ResponseDto.ts';

export class LoginUserResponse<T> extends ResponseDto<T> {
  constructor(success: boolean, statusCode: number, message: string, data: T) {
    super(success, statusCode, message, data);
  }

  public static Success<T>(data: T): LoginUserResponse<T> {
    return new LoginUserResponse(true, 200, 'User logged in', data);
  }

  public static UserOrPasswordIncorrect<T>(): LoginUserResponse<T> {
    return new LoginUserResponse(false, 401, 'User or password incorrect', undefined);
  }

  public static Failure<T>(message: string): LoginUserResponse<T> {
    return new LoginUserResponse(false, 500, message, undefined);
  }
}
