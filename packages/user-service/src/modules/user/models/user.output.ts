import { Field, ObjectType } from '@nestjs/graphql';
import { plainToInstance } from 'class-transformer';

interface UserOutputAttributes {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
}

@ObjectType()
export class UserOutput implements UserOutputAttributes {
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

  static from(attributes: Partial<UserOutputAttributes>): UserOutput {
    return plainToInstance(UserOutput, attributes);
  }
}
