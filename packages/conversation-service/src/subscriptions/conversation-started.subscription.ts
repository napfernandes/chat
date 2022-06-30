import { Injectable } from '@nestjs/common';

import { BaseSubscription } from '@napfernandes/pubsub';
import { SubscriptionMessage } from '@napfernandes/pubsub';
import { ConversationOutput } from '../models/conversation.output';
import { ConversationActionType } from '../conversation-action-type.enum';

@Injectable()
export class ConversationStartedSubscription extends BaseSubscription<ConversationOutput> {
  get topicName(): string {
    return ConversationActionType.CONVERSATION_STARTED;
  }

  async onSubscribe(message: SubscriptionMessage<ConversationOutput>): Promise<void> {
    console.log(`RECEIVED MESSAGE FOR ${ConversationActionType.CONVERSATION_STARTED}...`);
    console.log(message);
  }
}
