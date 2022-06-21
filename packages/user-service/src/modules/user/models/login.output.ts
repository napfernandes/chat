import { Field, ObjectType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

interface LoginOutputAttributes {
  token: string;
}

@ObjectType()
export class LoginOutput implements LoginOutputAttributes {
  @Field()
  token: string;

  static from(attributes: Partial<LoginOutputAttributes>): LoginOutput {
    return plainToInstance(LoginOutput, attributes);
  }
}
