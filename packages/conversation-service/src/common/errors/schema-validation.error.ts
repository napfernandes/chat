import { HttpException, HttpStatus } from '@nestjs/common';

export class SchemaValidationError extends HttpException {
  constructor(errorMessage: string) {
    super(errorMessage, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
