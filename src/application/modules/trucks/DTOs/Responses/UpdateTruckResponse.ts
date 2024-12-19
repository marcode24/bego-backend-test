import { ResponseDto } from 'application/DTOs/ResponseDto.ts';

export class UpdateTruckResponse<T> extends ResponseDto<T> {
  constructor(success: boolean, statusCode: number, message: string, data: T) {
    super(success, statusCode, message, data);
  }
}
