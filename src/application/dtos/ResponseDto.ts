export class ResponseDto<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
  errors: string[] = [];

  constructor(success: boolean, statusCode: number, message: string, data?: T, errors?: string[]) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.errors = errors;
  }
}
