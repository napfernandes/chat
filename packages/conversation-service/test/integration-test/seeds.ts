import { faker } from '@faker-js/faker';
import { MessageActionInput } from '../../src/models/message-action.input';
import { ConversationType, MessageActionType } from '../../src/conversation.enum';
import { InsertConversationInput } from '../../src/models/insert-conversation.input';
import { ConversationMessageInput } from '../../src/models/conversation-message.input';

export function createInsertDirectConversationInput(
  attributes?: Partial<InsertConversationInput>,
): InsertConversationInput {
  const defaultAttributes: InsertConversationInput = {
    type: ConversationType.DIRECT_CONVERSATION,
    members: [faker.database.mongodbObjectId(), faker.database.mongodbObjectId()],
  };

  return { ...defaultAttributes, ...attributes };
}

export function createInsertChatRoomConversationInput(
  attributes?: Partial<InsertConversationInput>,
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

export function createMessageActionInput(
  attributes?: Partial<MessageActionInput>,
): MessageActionInput {
  const defaultAttributes: MessageActionInput = {
    userId: faker.datatype.uuid(),
    messageId: faker.datatype.uuid(),
    actionType: MessageActionType.MESSAGE_SENT,
    conversationIdOrHash: faker.datatype.uuid(),
  };

  return { ...defaultAttributes, ...attributes };
}
