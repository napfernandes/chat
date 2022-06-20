import { Field, InputType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

export interface CreateUserInputAttributes {
  email: string;
  password: string;
}

@InputType()
export class CreateUserInput implements CreateUserInputAttributes {
  @Field()
  email: string;

  @Field()
  password: string;

  static from(attributes: Partial<CreateUserInputAttributes>): CreateUserInput {
    return plainToInstance(CreateUserInput, attributes);
  }
}
