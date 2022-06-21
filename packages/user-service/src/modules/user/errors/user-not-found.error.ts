import { HttpException, HttpStatus } from '@nestjs/common';

export class UserNotFoundError extends HttpException {
  constructor(userIdOrEmail: string) {
    super(`User ${userIdOrEmail} does not exist.`, HttpStatus.NOT_FOUND);
  }
}
