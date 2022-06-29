import { Field, ObjectType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class LoginOutput {
  @Field()
  token: string;

  static from(attributes: Partial<LoginOutput>): LoginOutput {
    return plainToInstance(LoginOutput, attributes);
  }
}
