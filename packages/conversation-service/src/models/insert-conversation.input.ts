import { Field, InputType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

import { ConversationType } from '../conversation.enum';

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

  static from(attributes: Partial<InsertConversationInput>): InsertConversationInput {
    return plainToInstance(InsertConversationInput, attributes);
  }
}
