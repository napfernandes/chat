import { Model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './user.schema';
import { UserOutput } from './models/user.output';
import { UserRepository } from './user.repository';
import { LoginOutput } from './models/login.output';
import { CreateUserInput } from './models/create-user.input';
import { DeleteUserInput } from './models/delete-user.input';
import { DeleteUserOutput } from './models/delete-user.output';
import { TokenService } from './common/services/token.service';
import { CryptoService } from './common/services/crypto.service';
import { UserNotFoundError } from './errors/user-not-found.error';
import CreateUserValidator from './validators/create-user.validator';
import { ValidatorService } from './common/services/validator.service';
import { LoginCredentialsInput } from './models/login-credentials.input';
import { UserConversationOutput } from './models/user-conversation.output';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { InvalidCredentialsError } from './errors/invalid-credentials.error';
import { ConversationToUserInput } from './models/conversation-to-user.input';
import loginByCredentialsValidator from './validators/login-by-credentials.validator';
import { InsertConversationToUserError } from './errors/insert-conversation-to-user.error';

@Injectable()
export class UserService {
  constructor(
    private readonly tokenService: TokenService,
    private readonly cryptoService: CryptoService,
    private readonly userRepository: UserRepository,
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

  async loginByCredentials(credentials: LoginCredentialsInput): Promise<LoginOutput> {
    await this.validatorService.validate(loginByCredentialsValidator, credentials);

    const userByEmail = await this.userRepository.getUserByEmail(credentials.email);

    if (!userByEmail) {
      throw new InvalidCredentialsError();
    }

    const hashedPassword = this.cryptoService.hashString(credentials.password, userByEmail.salt);

    if (userByEmail.password !== hashedPassword) {
      throw new InvalidCredentialsError();
    }

    const loginTokenInput = { email: userByEmail.email, userId: userByEmail.id };
    const loginToken = this.tokenService.generateLoginToken(loginTokenInput);

    return LoginOutput.from({ token: loginToken });
  }

  async getUserByEmail(email: string): Promise<UserOutput | null> {
    const userFound = await this.userRepository.getUserByEmail(email);

    if (!userFound) return null;

    return UserOutput.from(userFound);
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

  async insertConversationToUser(input: ConversationToUserInput): Promise<UserConversationOutput> {
    const { userId, ...conversation } = input;
    const updateResult = await this.userRepository.insertConversationToUser(userId, conversation);

    if (!updateResult.acknowledged || updateResult.modifiedCount === 0) {
      throw new InsertConversationToUserError(conversation.conversationId, userId);
    }

    return UserConversationOutput.from(conversation);
  }
}
