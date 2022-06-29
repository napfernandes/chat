import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';

import { SQS } from '../__mocks__/aws-sdk';
import { QueueService } from '../../../src/notification/queue.service';
import { ConversationService } from '../../../src/conversation.service';
import { ConversationRepository } from '../../../src/conversation.repository';
import { ValidatorService } from '../../../src/common/services/validator.service';
import { Conversation, ConversationSchema } from '../../../src/conversation.schema';

export async function createConversationTestModule(): Promise<TestingModule> {
  const testingModule: TestingModule = await Test.createTestingModule({
    imports: [
      global.MongooseTestModule,
      MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }]),
    ],
    providers: [
      QueueService,
      ValidatorService,
      ConversationService,
      ConversationRepository,
      {
        provide: 'Queue',
        useValue: SQS,
      },
    ],
  }).compile();

  return testingModule;
}
