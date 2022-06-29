import { plainToInstance } from 'class-transformer';

export interface ListQueueOutputAttributes {
  url: string;
  name?: string;
}

export class ListQueueOutput implements ListQueueOutputAttributes {
  url: string;
  name?: string;

  static from(attributes: Partial<ListQueueOutputAttributes>): ListQueueOutput {
    return plainToInstance(ListQueueOutput, attributes);
  }
}
