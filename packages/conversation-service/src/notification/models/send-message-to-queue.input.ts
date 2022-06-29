import { plainToInstance } from 'class-transformer';

export class SendMessageToQueueInput<T> {
  messageBody: T;
  queueName: string;
  messageGroupId?: string;
  messageDeduplicationId?: string;

  static from<T>(attributes: Partial<SendMessageToQueueInput<T>>): SendMessageToQueueInput<T> {
    return plainToInstance(SendMessageToQueueInput<T>, attributes);
  }
}
