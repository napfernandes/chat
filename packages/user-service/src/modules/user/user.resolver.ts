import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { UserService } from './user.service';
import { UserOutput } from './models/user.output';
import { LoginOutput } from './models/login.output';
import { CreateUserInput } from './models/create-user.input';
import { DeleteUserInput } from './models/delete-user.input';
import { DeleteUserOutput } from './models/delete-user.output';
import { LoginCredentialsInput } from './models/login-credentials.input';

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

  @Mutation(() => LoginOutput)
  async login(@Args('input') input: LoginCredentialsInput): Promise<LoginOutput> {
    return this.userService.loginByCredentials(input);
  }

  @Query(() => [UserOutput])
  async findUsers(): Promise<UserOutput[]> {
    return this.userService.findUsers();
  }
}
