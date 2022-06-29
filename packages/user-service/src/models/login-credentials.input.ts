import { Field, InputType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

@InputType()
export class LoginCredentialsInput {
  @Field()
  email: string;

  @Field()
  password: string;

  static from(attributes: Partial<LoginCredentialsInput>): LoginCredentialsInput {
    return plainToInstance(LoginCredentialsInput, attributes);
  }
}
