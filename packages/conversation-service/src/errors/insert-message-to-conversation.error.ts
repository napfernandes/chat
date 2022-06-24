import { HttpException, HttpStatus } from '@nestjs/common';

export class InsertMessageToConversationError extends HttpException {
  constructor(conversationId: string) {
    super(
      `A message could not be added to conversation "${conversationId}".`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
