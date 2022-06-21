import { HttpStatus } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { createLoginCredentialsInput, createUserInput } from './seeds';
import { UserService } from '../../../../src/modules/user/user.service';
import { User, UserSchema } from '../../../../src/modules/user/user.schema';
import { TokenService } from '../../../../src/common/services/token.service';
import { CryptoService } from '../../../../src/common/services/crypto.service';
import { ValidatorService } from '../../../../src/common/services/validator.service';
import { UserRepository } from '../../../../src/modules/user/user.repository';
import { LoginCredentialsInput } from '../../../../src/modules/user/models/login-credentials.input';

describe('Login User', () => {
  let userService: UserService;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [
        global.MongooseTestModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService, CryptoService, ValidatorService, TokenService, UserRepository],
    }).compile();

    userService = testingModule.get<UserService>(UserService);
  });

  describe('when inputs are not valid', () => {
    describe('when the email is null', () => {
      it('should throw a validation error', async () => {
        const credentials = createLoginCredentialsInput({ email: null });

        await expect(userService.loginByCredentials(credentials)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: '"email" must be a string',
        });
      });
    });

    describe('when the email is not a valid one', () => {
      it('should throw a validation error', async () => {
        const credentials = createLoginCredentialsInput({ email: 'invalid-email' });

        await expect(userService.loginByCredentials(credentials)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: '"email" must be a valid email',
        });
      });
    });

    describe('when the password is null', () => {
      it('should throw a validation error', async () => {
        const credentials = createLoginCredentialsInput({ password: null });

        await expect(userService.loginByCredentials(credentials)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: '"password" must be a string',
        });
      });
    });
  });

  describe('when all inputs are correct', () => {
    describe('when the password does not match', () => {
      it('should throw a validation error', async () => {
        const userOutput = await userService.createUser(createUserInput());
        const credentials: LoginCredentialsInput = {
          email: userOutput.email,
          password: `different-password`,
        };

        await expect(userService.loginByCredentials(credentials)).rejects.toMatchObject({
          status: HttpStatus.BAD_REQUEST,
          message: 'Invalid (email/password) credentials.',
        });
      });
    });

    it('should be able to log in successfully', async () => {
      const userOutput = await userService.createUser(createUserInput());
      const credentials: LoginCredentialsInput = {
        email: userOutput.email,
        password: userOutput.password,
      };
      const loginOutput = await userService.loginByCredentials(credentials);

      expect(loginOutput.token).not.toBeNull;
    });
  });
});
