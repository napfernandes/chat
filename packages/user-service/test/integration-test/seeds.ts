import { faker } from '@faker-js/faker';

import { CreateUserInput } from '../../src/models/create-user.input';
import { LoginCredentialsInput } from '../../src/models/login-credentials.input';

export function createUserInput(attributes?: Partial<CreateUserInput>): CreateUserInput {
  const defaultAttributes: CreateUserInput = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return { ...defaultAttributes, ...attributes };
}

export function createLoginCredentialsInput(
  attributes?: Partial<LoginCredentialsInput>,
): LoginCredentialsInput {
  const defaultAttributes: LoginCredentialsInput = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return { ...defaultAttributes, ...attributes };
}
