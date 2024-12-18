import { ResponseDto } from 'application/DTOs/ResponseDto.ts';

export class CreateTruckResponse<T> extends ResponseDto<T> {
  constructor(success: boolean, statusCode: number, message: string, data: T) {
    super(success, statusCode, message, data);
  }

  public static Success<T>(data: T): CreateTruckResponse<T> {
    return new CreateTruckResponse(true, 201, 'Truck created', data);
  }

  public static TruckAlreadyExists<T>(): CreateTruckResponse<T> {
    return new CreateTruckResponse(false, 400, 'Truck already exists', undefined);
  }

  public static Failure<T>(message: string): CreateTruckResponse<T> {
    return new CreateTruckResponse(false, 500, message, undefined);
  }

  public static UserNotFound<T>(): CreateTruckResponse<T> {
    return new CreateTruckResponse(false, 404, 'User not found', undefined);
  }
}
