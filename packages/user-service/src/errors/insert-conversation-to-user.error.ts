import { HttpException, HttpStatus } from '@nestjs/common';

export class InsertConversationToUserError extends HttpException {
  constructor(conversationId: string, userId: string) {
    super(
      `A conversation ${conversationId} could not be added to user "${userId}".`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    );
  }
}
