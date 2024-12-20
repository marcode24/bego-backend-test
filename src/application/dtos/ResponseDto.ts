export class ResponseDto<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data?: T;
  totalItems?: number;
  totalPages?: number;
  pageSize?: number;
  pageNumber?: number;
  errors?: string[] = [];

  constructor(
    success: boolean,
    statusCode: number,
    message: string,
    data?: T,
    errors?: string[],
    totalItems?: number,
    totalPages?: number,
    pageSize?: number,
    pageNumber?: number
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
    this.errors = errors;
    this.totalItems = totalItems;
    this.totalPages = totalPages;
    this.pageSize = pageSize;
    this.pageNumber = pageNumber;
  }

  public static Failure<T>(message: string, statusCode: number, errors?: string[]): ResponseDto<T> {
    return new ResponseDto(false, statusCode, message, undefined, errors);
  }

  public static Success<T>(
    message: string,
    statusCode: number,
    data?: T,
    totalItems?: number,
    totalPages?: number,
    pageSize?: number,
    pageNumber?: number
  ): ResponseDto<T> {
    return new ResponseDto(
      true,
      statusCode,
      message,
      data,
      undefined,
      totalItems,
      totalPages,
      pageSize,
      pageNumber
    );
  }
}
