import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ConversationService } from './conversation.service';
import { ConversationResolver } from './conversation.resolver';
import { ConversationRepository } from './conversation.repository';
import { ValidatorService } from './common/services/validator.service';
import { Conversation, ConversationSchema } from './conversation.schema';
import { QueueModule } from '@napfernandes/queue';
import { PubsubModule } from '@napfernandes/pubsub';

@Module({
  imports: [
    QueueModule,
    PubsubModule,
    MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }]),
  ],
  providers: [ConversationResolver, ConversationService, ConversationRepository, ValidatorService],
})
export class ConversationModule {}
