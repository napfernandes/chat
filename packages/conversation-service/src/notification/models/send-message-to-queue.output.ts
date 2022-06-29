import { plainToInstance } from 'class-transformer';

export interface SendMessageToQueueOutputAttributes {
  messageId?: string;
  sequenceNumber?: string;
}

export class SendMessageToQueueOutput implements SendMessageToQueueOutputAttributes {
  messageId?: string;
  sequenceNumber?: string;

  static from(attributes: Partial<SendMessageToQueueOutputAttributes>): SendMessageToQueueOutput {
    return plainToInstance(SendMessageToQueueOutput, attributes);
  }
}
