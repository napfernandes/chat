import { plainToInstance } from 'class-transformer';

interface TagInput {
  key: string;
  value: string;
}

export class CreateTopicInput {
  name: string;
  tags?: TagInput[] = [];

  static from(attributes: CreateTopicInput): CreateTopicInput {
    return plainToInstance(CreateTopicInput, attributes);
  }
}
