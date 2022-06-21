import { Field, InputType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

export interface LoginTokenInputAttributes {
  email: string;
  userId: string;
}

@InputType()
export class LoginTokenInput implements LoginTokenInputAttributes {
  @Field()
  email: string;

  @Field()
  userId: string;

  static from(attributes: Partial<LoginTokenInputAttributes>): LoginTokenInput {
    return plainToInstance(LoginTokenInput, attributes);
  }
}
