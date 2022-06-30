import { SQS } from 'aws-sdk';
import { Consumer } from 'sqs-consumer';
import { Injectable } from '@nestjs/common';

import { QueueService } from '@napfernandes/queue';
import { BaseSubscription } from './base-subscription';

export interface SubscriptionMessage<T> {
  messageId?: string;
  body?: T;
}

@Injectable()
export class SubscriptionService {
  constructor(private readonly queueService: QueueService) {}

  async on<T>(subscription: BaseSubscription<T>): Promise<void> {
    const queue = await this.queueService.getOrCreateQueue(subscription.topicName);
    const consumer = Consumer.create({
      queueUrl: queue.url,
      sqs: this.queueService.Instance,
      handleMessage: async (message: SQS.Message) => {
        const subscriptionMessage: SubscriptionMessage<T> = {
          messageId: message.MessageId,
          body: JSON.parse(message.Body) as T,
        };

        subscription.onSubscribe(subscriptionMessage);
      },
    });

    console.info(`Subscription started for ${subscription.topicName}.`);

    consumer.on('error', (error) => console.error(error));
    consumer.on('processing_error', (processingError) => console.error(processingError));

    consumer.start();
  }
}
