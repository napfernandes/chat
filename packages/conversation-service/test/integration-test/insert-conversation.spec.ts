import { HttpStatus } from '@nestjs/common';

import {
  createInsertDirectConversationInput,
  createInsertChatRoomConversationInput,
} from './seeds';
import { ConversationType } from '../../src/conversation.enum';
import { ConversationService } from '../../src/conversation.service';
import { createConversationTestModule } from './helpers/create-conversation-test-module';

describe('Insert conversation', () => {
  let conversationService: ConversationService;

  beforeAll(async () => {
    const testingModule = await createConversationTestModule();

    conversationService = testingModule.get<ConversationService>(ConversationService);
  });

  describe('when inputs are not valid', () => {
    describe('when conversation type is null', () => {
      it('should throw a validation error', async () => {
        const input = createInsertDirectConversationInput({ type: null });

        await expect(conversationService.insertConversation(input)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `"type" must be one of [${Object.values(ConversationType).join(', ')}]`,
        });
      });
    });

    describe('when members are an empty array', () => {
      it('should throw a validation error', async () => {
        const input = createInsertDirectConversationInput({ members: [] });

        await expect(conversationService.insertConversation(input)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: '"members" must contain at least 2 items',
        });
      });
    });

    describe('when the conversation is a chat room', () => {
      describe('when title is null', () => {
        it('should throw a validation error', async () => {
          const input = createInsertChatRoomConversationInput({ title: null });

          await expect(conversationService.insertConversation(input)).rejects.toMatchObject({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            message: '"title" must be a string',
          });
        });
      });
    });
  });

  describe('when all inputs are correct', () => {
    it('should create a direct conversation successfully', async () => {
      const input = createInsertDirectConversationInput();

      const conversationOutput = await conversationService.insertConversation(input);

      expect(conversationOutput).toBeInstanceOf(Object);
      expect(conversationOutput.title).toBeUndefined();
      expect(conversationOutput.description).toBeUndefined();
      expect(conversationOutput.createdAt).toBeInstanceOf(Date);
      expect(conversationOutput.members).toHaveLength(input.members.length);
    });

    it('should create a chat room successfully', async () => {
      const input = createInsertChatRoomConversationInput();
      const conversationOutput = await conversationService.insertConversation(input);

      expect(conversationOutput).toBeInstanceOf(Object);
      expect(conversationOutput.title).not.toBeUndefined();
      expect(conversationOutput.description).not.toBeUndefined();
      expect(conversationOutput.createdAt).toBeInstanceOf(Date);
      expect(conversationOutput.members).toHaveLength(input.members.length);
    });
  });
});
