import { plainToInstance } from 'class-transformer';

export class ConversationToUserInput {
  userId: string;
  conversationId: string;
  createdAt?: Date;
  lastMessageAt?: Date;

  static from(attributes: ConversationToUserInput): ConversationToUserInput {
    return plainToInstance(ConversationToUserInput, attributes);
  }
}
