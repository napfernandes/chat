import { Field, InputType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

export interface LoginCredentialsInputAttributes {
  email: string;
  password: string;
}

@InputType()
export class LoginCredentialsInput implements LoginCredentialsInputAttributes {
  @Field()
  email: string;

  @Field()
  password: string;

  static from(attributes: Partial<LoginCredentialsInputAttributes>): LoginCredentialsInput {
    return plainToInstance(LoginCredentialsInput, attributes);
  }
}
