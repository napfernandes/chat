import { Field, InputType } from '@nestjs/graphql';

interface DeleteUserInputAttributes {
  idOrEmail: string;
}

@InputType()
export class DeleteUserInput implements DeleteUserInputAttributes {
  @Field()
  idOrEmail: string;
}
