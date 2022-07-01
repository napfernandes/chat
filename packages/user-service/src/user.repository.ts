import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { UpdateResult } from 'mongodb';
import { User, UserConversation } from './user.schema';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private readonly UserModel: Model<User>) {}

  async getUserByEmail(email: string): Promise<User> {
    return this.UserModel.findOne({ email });
  }

  async insertConversationToUser(
    userId: string,
    conversation: UserConversation,
  ): Promise<UpdateResult> {
    const now = new Date();
    if (!conversation.createdAt) {
      conversation.createdAt = now;
    }

    if (!conversation.lastMessageAt) {
      conversation.lastMessageAt = now;
    }

    return this.UserModel.updateOne({ _id: userId }, { $push: { conversations: conversation } });
  }
}
