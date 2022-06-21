import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from './user.service';
import { UserOutput } from './models/user.output';
import { CreateUserInput } from './models/create-user.input';
import { DeleteUserInput } from './models/delete-user.input';
import { DeleteUserOutput } from './models/delete-user.output';

@Resolver(() => UserOutput)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserOutput)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserOutput> {
    return this.userService.createUser(input);
  }

  @Mutation(() => DeleteUserOutput)
  async deleteUser(@Args('input') input: DeleteUserInput): Promise<DeleteUserOutput> {
    return this.userService.deleteUser(input);
  }

  @Query(() => [UserOutput])
  async findUsers(): Promise<UserOutput[]> {
    return this.userService.findUsers();
  }
}
