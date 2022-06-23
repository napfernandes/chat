import { registerEnumType } from '@nestjs/graphql';

export enum ConversationType {
  DIRECT_CONVERSATION = 'DirectConversation',
  CHAT_ROOM = 'ChatRoom',
}

export enum ConversationActionType {
  MESSAGE_READ = 'MessageRead',
  MESSAGED_RECEIVED = 'MessageReceived',
  MESSAGE_DELETED = 'MessageDeleted',
}

registerEnumType(ConversationType, {
  name: 'ConversationType',
});

registerEnumType(ConversationActionType, {
  name: 'ConversationActionType',
});
