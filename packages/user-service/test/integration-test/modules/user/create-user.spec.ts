import { HttpStatus } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { createUserInput } from './seeds';
import { UserService } from '../../../../src/modules/user/user.service';
import { User, UserSchema } from '../../../../src/modules/user/user.schema';
import { TokenService } from '../../../../src/common/services/token.service';
import { CryptoService } from '../../../../src/common/services/crypto.service';
import { ValidatorService } from '../../../../src/common/services/validator.service';
import { UserRepository } from '../../../../src/modules/user/user.repository';

describe('Create User', () => {
  let userService: UserService;
  let cryptoService: CryptoService;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [
        global.MongooseTestModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService, CryptoService, ValidatorService, TokenService, UserRepository],
    }).compile();

    userService = testingModule.get<UserService>(UserService);
    cryptoService = testingModule.get<CryptoService>(CryptoService);
  });

  describe('when inputs are not valid', () => {
    describe('when the email is null', () => {
      it('should throw a validation error', async () => {
        const userInput = createUserInput({ email: null });

        await expect(userService.createUser(userInput)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: '"email" must be a string',
        });
      });
    });

    describe('when the email is not a valid one', () => {
      it('should throw a validation error', async () => {
        const userInput = createUserInput({ email: 'invalid-email' });

        await expect(userService.createUser(userInput)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: '"email" must be a valid email',
        });
      });
    });

    describe('when the password is null', () => {
      it('should throw a validation error', async () => {
        const userInput = createUserInput({ password: null });

        await expect(userService.createUser(userInput)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: '"password" must be a string',
        });
      });
    });
  });

  describe('when all inputs are correct', () => {
    describe('when the user already exists', () => {
      it('should throw an error', async () => {
        const userInput = createUserInput();

        await userService.createUser(userInput);
        await expect(userService.createUser(userInput)).rejects.toMatchObject({
          status: HttpStatus.BAD_REQUEST,
          message: `User ${userInput.email} already exists.`,
        });
      });
    });

    it('should create an user successfully.', async () => {
      const hashStringSpy = jest.spyOn(cryptoService, 'hashString');
      const createRandomStringSpy = jest.spyOn(cryptoService, 'createRandomString');

      const userInput = createUserInput();
      const userOutput = await userService.createUser(userInput);

      expect(userOutput).toHaveProperty('id');
      expect(userOutput).toHaveProperty('salt');

      expect(userOutput.id).not.toBeNull;
      expect(userOutput.password).not.toEqual(userInput.password);
      expect(userOutput.createdAt).not.toBeNull;
      expect(userOutput.updatedAt).toBeNull;

      expect(hashStringSpy).toHaveBeenCalled();
      expect(createRandomStringSpy).toHaveBeenCalled();

      expect(true).toBe(true);
    });
  });
});
