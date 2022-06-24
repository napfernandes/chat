import { Field, ObjectType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

export interface MessageActionOutputAttributes {
  acknowledged: boolean;
}

@ObjectType()
export class MessageActionOutput implements MessageActionOutputAttributes {
  @Field()
  acknowledged: boolean;

  static from(attributes: Partial<MessageActionOutputAttributes>): MessageActionOutput {
    return plainToInstance(MessageActionOutput, attributes);
  }
}
