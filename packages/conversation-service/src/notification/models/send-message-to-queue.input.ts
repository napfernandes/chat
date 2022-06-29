import { plainToInstance } from 'class-transformer';

export interface SendMessageToQueueInputAttributes<T> {
  messageBody: T;
  queueName: string;
  messageGroupId?: string;
  messageDeduplicationId?: string;
}

export class SendMessageToQueueInput<T> implements SendMessageToQueueInputAttributes<T> {
  messageBody: T;
  queueName: string;
  messageGroupId?: string;
  messageDeduplicationId?: string;

  static from<T>(
    attributes: Partial<SendMessageToQueueInputAttributes<T>>,
  ): SendMessageToQueueInput<T> {
    return plainToInstance(SendMessageToQueueInput<T>, attributes);
  }
}
