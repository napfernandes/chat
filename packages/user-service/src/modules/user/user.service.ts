import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './user.schema';
import { UserOutput } from './models/user.output';
import { CreateUserInput } from './models/create-user.input';
import { DeleteUserInput } from './models/delete-user.input';
import { DeleteUserOutput } from './models/delete-user.output';
import { UserNotFoundError } from './errors/user-not-found.error';
import { CryptoService } from '../../common/services/crypto.service';
import CreateUserValidator from './validators/create-user.validator';
import { ValidatorService } from '../../common/services/validator.service';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';

@Injectable()
export class UserService {
  constructor(
    private readonly cryptoService: CryptoService,
    private readonly validatorService: ValidatorService,
    @InjectModel(User.name) private readonly UserModel: Model<User>,
  ) {}

  async createUser(createUserInput: CreateUserInput): Promise<UserOutput> {
    await this.validatorService.validate(CreateUserValidator, createUserInput);
    const existingUser = await this.getUserByEmail(createUserInput.email);

    if (existingUser) {
      throw new UserAlreadyExistsError(createUserInput.email);
    }

    const userToCreate = new this.UserModel({ ...createUserInput });
    const saltForPassword = this.cryptoService.createRandomString();

    userToCreate.salt = saltForPassword;
    userToCreate.password = this.cryptoService.hashString(userToCreate.password, saltForPassword);

    await userToCreate.save();

    return UserOutput.from(userToCreate.toJSON());
  }

  async getUserByEmail(email: string): Promise<UserOutput | null> {
    const userFound = await this.UserModel.findOne({ email });

    if (!userFound) return null;

    return UserOutput.from(userFound.toJSON());
  }

  async findUsers(): Promise<UserOutput[]> {
    const users = await this.UserModel.find().exec();

    return users.map((user) => UserOutput.from(user.toJSON()));
  }

  async deleteUser(input: DeleteUserInput): Promise<DeleteUserOutput> {
    const userFound = await this.UserModel.findOne({
      $or: [{ email: input.idOrEmail }, { _id: new ObjectId(input.idOrEmail) }],
    }).exec();

    if (!userFound) {
      throw new UserNotFoundError(input.idOrEmail);
    }

    await userFound.remove();

    return { deleted: true };
  }
}
