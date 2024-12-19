import { ResponseDto } from 'application/DTOs/ResponseDto.ts';

export class CreateUserResponse<T> extends ResponseDto<T> {
  constructor(success: boolean, statusCode: number, message: string, data: T) {
    super(success, statusCode, message, data);
  }

  public static Success<T>(data: T): CreateUserResponse<T> {
    return new CreateUserResponse(true, 201, 'User created', data);
  }

  public static UserAlreadyExists<T>(): CreateUserResponse<T> {
    return new CreateUserResponse(false, 400, 'User already exists', undefined);
  }

  public static Failure<T>(message: string): CreateUserResponse<T> {
    return new CreateUserResponse(false, 500, message, undefined);
  }
}
