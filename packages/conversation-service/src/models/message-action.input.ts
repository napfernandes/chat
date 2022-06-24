import { Field, InputType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

import { MessageActionType } from '../conversation.enum';

export interface MessageActionInputAttributes {
  userId: string;
  messageId: string;
  conversationIdOrHash: string;
  actionType: MessageActionType;
}

@InputType()
export class MessageActionInput implements MessageActionInputAttributes {
  @Field()
  userId: string;

  @Field()
  messageId: string;

  @Field()
  conversationIdOrHash: string;

  @Field(() => MessageActionType)
  actionType: MessageActionType;

  static from(attributes: Partial<MessageActionInputAttributes>): MessageActionInput {
    return plainToInstance(MessageActionInput, attributes);
  }
}
