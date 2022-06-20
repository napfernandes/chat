import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { createUserInput } from './seeds';
import { UserService } from '../../../../src/modules/user/user.service';
import { User, UserSchema } from '../../../../src/modules/user/user.schema';
import { CryptoService } from '../../../../src/common/services/crypto.service';

describe('Create User', () => {
  let userService: UserService;
  let cryptoService: CryptoService;

  beforeAll(async () => {
    const testingModule: TestingModule = await Test.createTestingModule({
      imports: [
        global.MongooseTestModule,
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
      ],
      providers: [UserService, CryptoService],
    }).compile();

    userService = testingModule.get<UserService>(UserService);
    cryptoService = testingModule.get<CryptoService>(CryptoService);
  });

  describe('when all inputs are correct', () => {
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
