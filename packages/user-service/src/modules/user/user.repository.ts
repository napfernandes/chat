import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly UserModel: Model<User>) {}

  async getUserByEmail(email: string): Promise<User | null> {
    const userByEmail = await this.UserModel.findOne({ email });

    return userByEmail ? userByEmail.toObject() : null;
  }
}
