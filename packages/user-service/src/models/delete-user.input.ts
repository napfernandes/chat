import { Field, InputType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

@InputType()
export class DeleteUserInput {
  @Field()
  idOrEmail: string;

  static from(attributes: Partial<DeleteUserInput>): DeleteUserInput {
    return plainToInstance(DeleteUserInput, attributes);
  }
}
