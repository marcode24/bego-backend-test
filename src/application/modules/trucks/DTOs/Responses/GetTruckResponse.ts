import { ResponseDto } from 'application/DTOs/ResponseDto.ts';

export class GetTruckResponse<T> extends ResponseDto<T> {
  constructor(success: boolean, statusCode: number, message: string, data: T) {
    super(success, statusCode, message, data);
  }
}
