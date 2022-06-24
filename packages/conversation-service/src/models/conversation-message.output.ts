import { Field, ObjectType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

export interface ConversationMessageOutputAttributes {
  messageId: string;
}

@ObjectType()
export class ConversationMessageOutput implements ConversationMessageOutputAttributes {
  @Field()
  messageId: string;

  static from(attributes: Partial<ConversationMessageOutputAttributes>): ConversationMessageOutput {
    return plainToInstance(ConversationMessageOutput, attributes);
  }
}
