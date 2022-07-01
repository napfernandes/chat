import { plainToInstance } from 'class-transformer';

export class ConversationOutput {
  id: string;
  createdAt: Date;
  members: string[];

  static from(attributes: ConversationOutput): ConversationOutput {
    return plainToInstance(ConversationOutput, attributes);
  }
}
