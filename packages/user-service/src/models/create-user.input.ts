import { Field, InputType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;

  @Field()
  password: string;

  static from(attributes: Partial<CreateUserInput>): CreateUserInput {
    return plainToInstance(CreateUserInput, attributes);
  }
}
