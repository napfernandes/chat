import { SQS } from 'aws-sdk';
import { Consumer } from 'sqs-consumer';
import { Injectable } from '@nestjs/common';

import { QueueService } from './queue.service';

export interface SubscriptionMessage<T> {
  messageId?: string;
  body?: T;
}

type SubscriptionHandlerFunction<T> = (message: SubscriptionMessage<T>) => Promise<void>;

@Injectable()
export class SubscriptionService {
  constructor(private readonly queueService: QueueService) {}

  async on<T>(topicName: string, handlerFunction: SubscriptionHandlerFunction<T>): Promise<void> {
    const queue = await this.queueService.getOrCreateQueue(topicName);

    console.log(`Consuming ${queue.name}/${queue.url}...`);
    const consumer = Consumer.create({
      queueUrl: queue.url,
      sqs: this.queueService.Instance,
      handleMessage: async (message: SQS.Message) => {
        const subscriptionMessage: SubscriptionMessage<T> = {
          messageId: message.MessageId,
          body: JSON.parse(message.Body) as T,
        };

        console.log(`HANDLING ${queue.url}...`);

        handlerFunction(subscriptionMessage);
      },
    });

    consumer.on('error', (err) => {
      console.log(`ON ERROR for ${queue.url}`);
      console.error(err);
    });

    consumer.on('processing_error', (err) => {
      console.log(`ON processing_error for ${queue.url}`);
      console.error(err);
    });

    consumer.start();
  }
}
