import { plainToInstance } from 'class-transformer';

export class SendMessageToQueueOutput implements SendMessageToQueueOutput {
  messageId?: string;
  sequenceNumber?: string;

  static from(attributes: Partial<SendMessageToQueueOutput>): SendMessageToQueueOutput {
    return plainToInstance(SendMessageToQueueOutput, attributes);
  }
}
