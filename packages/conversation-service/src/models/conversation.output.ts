import { Field, ObjectType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

import { ConversationActionType, ConversationType } from '../conversation.enum';

interface ConversationOutputAttributes {
  id: string;
  hash: string;
  members: string[];
  type: ConversationType;
  title?: string;
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
}

@ObjectType()
class ConversationActionOutput {
  @Field()
  userId: string;

  @Field(() => ConversationActionType)
  actionType: ConversationActionType;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class ConversationOutput implements ConversationOutputAttributes {
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

  @Field(() => [ConversationActionOutput], { nullable: true })
  actions?: ConversationActionOutput[];

  static from(attributes: Partial<ConversationOutputAttributes>): ConversationOutput {
    return plainToInstance(ConversationOutput, attributes);
  }
}