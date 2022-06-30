import { SQS } from 'aws-sdk';
import { Consumer } from 'sqs-consumer';
import { Injectable } from '@nestjs/common';

import { QueueService } from '@napfernandes/queue';

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
    const consumer = Consumer.create({
      queueUrl: queue.url,
      sqs: this.queueService.Instance,
      handleMessage: async (message: SQS.Message) => {
        const subscriptionMessage: SubscriptionMessage<T> = {
          messageId: message.MessageId,
          body: JSON.parse(message.Body) as T,
        };

        handlerFunction(subscriptionMessage);
      },
    });

    console.info(`Subscription started for ${topicName}.`);

    consumer.on('error', (error) => console.error(error));
    consumer.on('processing_error', (processingError) => console.error(processingError));

    consumer.start();
  }
}
