import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { Conversation, ConversationSchema } from './conversation.schema';
import { ValidatorService } from '../../common/services/validator.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }])],
  providers: [ConversationResolver, ConversationService, ValidatorService],
})
export class ConversationModule {}
