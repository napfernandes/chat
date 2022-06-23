import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidCredentialsError extends HttpException {
  constructor() {
    super(`Invalid (email/password) credentials.`, HttpStatus.BAD_REQUEST);
  }
}
