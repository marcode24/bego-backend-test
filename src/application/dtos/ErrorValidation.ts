import { ResponseDto } from './ResponseDto.js';

export class ErrorValidation extends ResponseDto<string> {
  constructor(errors: string[]) {
    super(false, 400, 'Validation error', undefined, errors);
  }
}
