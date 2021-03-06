import { Field, ObjectType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

import { ConversationType, MessageActionType } from '../conversation.enum';

@ObjectType()
class MessageForActionOutput {
  @Field()
  userId: string;

  @Field(() => MessageActionType)
  actionType: MessageActionType;

  @Field()
  createdAt: Date;
}

@ObjectType()
class ConversationForMessageOutput {
  @Field({ nullable: true })
  id?: string;

  @Field()
  userId: string;

  @Field()
  message: string;

  @Field(() => [MessageForActionOutput], { nullable: true })
  actions?: MessageForActionOutput[];
}

@ObjectType()
export class ConversationOutput {
  @Field()
  id: string;

  @Field()
  hash: string;

  @Field(() => [String])
  members: string[];

  @Field(() => ConversationType)
  type: ConversationType;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  @Field(() => [ConversationForMessageOutput], { nullable: true })
  messages?: ConversationForMessageOutput[];

  static from(attributes: Partial<ConversationOutput>): ConversationOutput {
    return plainToInstance(ConversationOutput, attributes);
  }
}
