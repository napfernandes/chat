import { Field, ObjectType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class DeleteUserOutput {
  @Field()
  deleted: boolean;

  static from(attributes: Partial<DeleteUserOutput>): DeleteUserOutput {
    return plainToInstance(DeleteUserOutput, attributes);
  }
}
