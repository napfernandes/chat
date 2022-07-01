import { plainToInstance } from 'class-transformer';

export class UserConversationOutput {
  conversationId: string;
  createdAt?: Date;
  lastMessageAt?: Date;

  static from(attributes: UserConversationOutput): UserConversationOutput {
    return plainToInstance(UserConversationOutput, attributes);
  }
}
