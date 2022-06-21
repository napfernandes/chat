import { HttpException, HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsError extends HttpException {
  constructor(email: string) {
    super(`User ${email} already exists.`, HttpStatus.BAD_REQUEST);
  }
}
