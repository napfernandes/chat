import { Field, InputType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

import { ConversationType } from '../conversation.enum';

export interface InsertConversationInputAttributes {
  members: string[];
  type: ConversationType;
  title?: string;
  description?: string;
}

@InputType()
export class InsertConversationInput {
  @Field(() => [String])
  members: string[];

  @Field(() => ConversationType)
  type: ConversationType;

  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  static from(attributes: Partial<InsertConversationInputAttributes>): InsertConversationInput {
    return plainToInstance(InsertConversationInput, attributes);
  }
}
