import { plainToInstance } from 'class-transformer';

export class SendMessageToQueueOutput implements SendMessageToQueueOutput {
  messageId?: string;
  sequenceNumber?: string;

  static from(attributes: SendMessageToQueueOutput): SendMessageToQueueOutput {
    return plainToInstance(SendMessageToQueueOutput, attributes);
  }
}
