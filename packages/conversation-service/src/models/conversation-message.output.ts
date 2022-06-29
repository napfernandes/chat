import { Field, ObjectType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class ConversationMessageOutput {
  @Field()
  messageId: string;

  static from(attributes: Partial<ConversationMessageOutput>): ConversationMessageOutput {
    return plainToInstance(ConversationMessageOutput, attributes);
  }
}
