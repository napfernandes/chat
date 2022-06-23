import { faker } from '@faker-js/faker';
import { ConversationType } from '../../src/modules/conversation/conversation.enum';
import {
  InsertConversationInput,
  InsertConversationInputAttributes,
} from '../../src/modules/conversation/models/insert-conversation.input';

export function createInsertDirectConversationInput(
  attributes?: Partial<InsertConversationInputAttributes>,
): InsertConversationInput {
  const defaultAttributes: InsertConversationInput = {
    type: ConversationType.DIRECT_CONVERSATION,
    members: [faker.database.mongodbObjectId(), faker.database.mongodbObjectId()],
  };

  return { ...defaultAttributes, ...attributes };
}

export function createInsertChatRoomConversationInput(
  attributes?: Partial<InsertConversationInputAttributes>,
): InsertConversationInput {
  const defaultAttributes: InsertConversationInput = {
    type: ConversationType.CHAT_ROOM,
    members: [
      faker.database.mongodbObjectId(),
      faker.database.mongodbObjectId(),
      faker.database.mongodbObjectId(),
      faker.database.mongodbObjectId(),
    ],
    title: faker.definitions.title,
    description: faker.lorem.lines(1),
  };

  return { ...defaultAttributes, ...attributes };
}
