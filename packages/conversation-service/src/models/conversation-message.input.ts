import { Field, InputType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

export interface ConversationMessageInputAttributes {
  userId: string;
  message: string;
  conversationIdOrHash: string;
}

@InputType()
export class ConversationMessageInput implements ConversationMessageInputAttributes {
  @Field()
  userId: string;

  @Field()
  message: string;

  @Field()
  conversationIdOrHash: string;

  static from(attributes: Partial<ConversationMessageInputAttributes>): ConversationMessageInput {
    return plainToInstance(ConversationMessageInput, attributes);
  }
}
