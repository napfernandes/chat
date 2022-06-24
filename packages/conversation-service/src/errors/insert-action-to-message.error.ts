import { HttpException, HttpStatus } from '@nestjs/common';

export class InsertActionToMessageError extends HttpException {
  constructor(messageId: string) {
    super(
      `An action could not be added to message "${messageId}".`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
