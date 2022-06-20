import { Field, ObjectType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

interface DeleteUserOutputAttributes {
  deleted: boolean;
}

@ObjectType()
export class DeleteUserOutput implements DeleteUserOutputAttributes {
  @Field()
  deleted: boolean;

  static from(attributes: Partial<DeleteUserOutputAttributes>): DeleteUserOutput {
    return plainToInstance(DeleteUserOutput, attributes);
  }

  static fromArray(attributesArray: DeleteUserOutputAttributes[]): DeleteUserOutput[] {
    return attributesArray.map(DeleteUserOutput.from);
  }
}
