import { Field, InputType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

import { MessageActionType } from '../conversation.enum';

@InputType()
export class MessageActionInput {
  @Field()
  userId: string;

  @Field()
  messageId: string;

  @Field()
  conversationIdOrHash: string;

  @Field(() => MessageActionType)
  actionType: MessageActionType;

  static from(attributes: Partial<MessageActionInput>): MessageActionInput {
    return plainToInstance(MessageActionInput, attributes);
  }
}
