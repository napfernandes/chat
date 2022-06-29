import { plainToInstance } from 'class-transformer';

interface TagInput {
  key: string;
  value: string;
}

export interface CreateTopicInputAttributes {
  name: string;
  tags?: TagInput[];
}

export class CreateTopicInput implements CreateTopicInputAttributes {
  name: string;
  tags?: TagInput[] = [];

  static from(attributes: Partial<CreateTopicInputAttributes>): CreateTopicInput {
    return plainToInstance(CreateTopicInput, attributes);
  }
}
