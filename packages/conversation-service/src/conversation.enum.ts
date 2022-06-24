import { registerEnumType } from '@nestjs/graphql';

export enum ConversationType {
  DIRECT_CONVERSATION = 'DirectConversation',
  CHAT_ROOM = 'ChatRoom',
}

export enum MessageActionType {
  MESSAGE_SENT = 'MessageSent',
  MESSAGE_READ = 'MessageRead',
  MESSAGE_DELETED = 'MessageDeleted',
  MESSAGE_RECEIVED = 'MessageReceived',
}

registerEnumType(ConversationType, {
  name: 'ConversationType',
});

registerEnumType(MessageActionType, {
  name: 'MessageActionType',
});
