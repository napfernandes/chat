import * as Joi from 'joi';

import { MessageActionType } from '../conversation.enum';

export default Joi.object().keys({
  userId: Joi.string().required(),
  messageId: Joi.string().required(),
  conversationIdOrHash: Joi.string().required(),
  actionType: Joi.string().valid(...Object.values(MessageActionType)),
});
