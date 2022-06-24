import { HttpStatus } from '@nestjs/common';
import { MessageActionType } from '../../src/conversation.enum';

import { ConversationService } from '../../src/conversation.service';
import { createConversationTestModule } from './helpers/create-conversation-test-module';
import {
  createInsertDirectConversationInput,
  createConversationMessageInput,
  createMessageActionInput,
} from './seeds';

describe('Send action to message', () => {
  let conversationService: ConversationService;

  beforeAll(async () => {
    const testingModule = await createConversationTestModule();

    conversationService = testingModule.get<ConversationService>(ConversationService);
  });

  describe('when inputs are not valid', () => {
    describe('when userId is null', () => {
      it('should throw a validation error', async () => {
        const input = createMessageActionInput({ userId: null });

        await expect(conversationService.sendActionToMessage(input)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `"userId" must be a string`,
        });
      });
    });

    describe('when messageId is null', () => {
      it('should throw a validation error', async () => {
        const input = createMessageActionInput({ messageId: null });

        await expect(conversationService.sendActionToMessage(input)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `"messageId" must be a string`,
        });
      });
    });

    describe('when actionType is null', () => {
      it('should throw a validation error', async () => {
        const input = createMessageActionInput({ actionType: null });

        await expect(conversationService.sendActionToMessage(input)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `"actionType" must be one of [${Object.values(MessageActionType).join(', ')}]`,
        });
      });
    });

    describe('when conversationIdOrHash is null', () => {
      it('should throw a validation error', async () => {
        const input = createMessageActionInput({ conversationIdOrHash: null });

        await expect(conversationService.sendActionToMessage(input)).rejects.toMatchObject({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          message: `"conversationIdOrHash" must be a string`,
        });
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
