import { Field, InputType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

@InputType()
export class ConversationMessageInput {
  @Field()
  userId: string;

  @Field()
  message: string;

  @Field()
  conversationIdOrHash: string;

  static from(attributes: Partial<ConversationMessageInput>): ConversationMessageInput {
    return plainToInstance(ConversationMessageInput, attributes);
  }
}
