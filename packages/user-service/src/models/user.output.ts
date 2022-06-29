import { Field, ObjectType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

@ObjectType()
export class UserOutput {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  updatedAt?: Date;

  static from(attributes: Partial<UserOutput>): UserOutput {
    return plainToInstance(UserOutput, attributes);
  }
}
