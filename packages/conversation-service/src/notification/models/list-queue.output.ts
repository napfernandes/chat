import { plainToInstance } from 'class-transformer';

export class ListQueueOutput {
  url: string;
  name?: string;

  static from(attributes: Partial<ListQueueOutput>): ListQueueOutput {
    return plainToInstance(ListQueueOutput, attributes);
  }
}
