import { Field, ObjectType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class MessageActionOutput {
  @Field()
  acknowledged: boolean;

  static from(attributes: Partial<MessageActionOutput>): MessageActionOutput {
    return plainToInstance(MessageActionOutput, attributes);
  }
}
