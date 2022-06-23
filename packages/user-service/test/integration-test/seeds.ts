import { faker } from '@faker-js/faker';

import {
  LoginCredentialsInput,
  LoginCredentialsInputAttributes,
} from '../../src/models/login-credentials.input';
import { CreateUserInput, CreateUserInputAttributes } from '../../src/models/create-user.input';

export function createUserInput(attributes?: Partial<CreateUserInputAttributes>): CreateUserInput {
  const defaultAttributes: CreateUserInput = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return { ...defaultAttributes, ...attributes };
}

export function createLoginCredentialsInput(
  attributes?: Partial<LoginCredentialsInputAttributes>,
): LoginCredentialsInput {
  const defaultAttributes: LoginCredentialsInput = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  return { ...defaultAttributes, ...attributes };
}
