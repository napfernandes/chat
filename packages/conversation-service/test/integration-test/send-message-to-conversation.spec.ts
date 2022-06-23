import { HttpStatus } from '@nestjs/common';

import { ConversationService } from '../../src/conversation.service';
import { createConversationTestModule } from './helpers/create-conversation-test-module';
import { createInsertDirectConversationInput, createConversationMessageInput } from './seeds';

describe('Send message to conversation', () => {
  let conversationService: ConversationService;

  beforeAll(async () => {
    const testingModule = await createConversationTestModule();

    conversationService = testingModule.get<ConversationService>(ConversationService);
  });

  describe('when inputs are not valid', () => {
    describe('when userId is null', () => {
      it('should throw a validation error', async () => {
        const input = createConversationMessageInput({ userId: null });

        await expect(conversationService.sendMessageToConversation(input)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `"userId" must be a string`,
        });
      });
    });

    describe('when message is null', () => {
      it('should throw a validation error', async () => {
        const input = createConversationMessageInput({ message: null });

        await expect(conversationService.sendMessageToConversation(input)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `"message" must be a string`,
        });
      });
    });

    describe('when conversationIdOrHash is null', () => {
      it('should throw a validation error', async () => {
        const input = createConversationMessageInput({ conversationIdOrHash: null });

        await expect(conversationService.sendMessageToConversation(input)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `"conversationIdOrHash" must be a string`,
        });
      });
    });

    describe('when all inputs are correct', () => {
      it('should send a message to a given conversation successfully', async () => {
        const conversationInput = createInsertDirectConversationInput();
        const conversationMessageInput = createConversationMessageInput();

        const conversationOutput = await conversationService.insertConversation(conversationInput);
        const conversationMessageOutput = await conversationService.sendMessageToConversation({
          ...conversationMessageInput,
          conversationIdOrHash: conversationOutput.id,
        });

        expect(conversationMessageOutput).toBeInstanceOf(Object);
        expect(conversationMessageOutput.messageId).not.toBeNull();
      });
    });
  });
});
