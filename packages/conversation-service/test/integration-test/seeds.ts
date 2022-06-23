import { faker } from '@faker-js/faker';
import { ConversationMessageInput } from 'src/models/conversation-message.input';
import { ConversationType } from '../../src/conversation.enum';
import {
  InsertConversationInput,
  InsertConversationInputAttributes,
} from '../../src/models/insert-conversation.input';

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

export function createConversationMessageInput(
  attributes?: Partial<ConversationMessageInput>,
): ConversationMessageInput {
  const defaultAttributes: ConversationMessageInput = {
    message: faker.lorem.text(),
    userId: faker.datatype.uuid(),
    conversationIdOrHash: faker.datatype.uuid(),
  };

  return { ...defaultAttributes, ...attributes };
}
