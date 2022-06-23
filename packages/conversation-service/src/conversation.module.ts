import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { ValidatorService } from './common/services/validator.service';
import { Conversation, ConversationSchema } from './conversation.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }])],
  providers: [ConversationResolver, ConversationService, ValidatorService],
})
export class ConversationModule {}
