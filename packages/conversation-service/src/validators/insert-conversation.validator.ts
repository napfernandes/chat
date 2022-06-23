import * as Joi from 'joi';

import { ConversationType } from '../conversation.enum';

export default Joi.object().keys({
  title: Joi.string().when('type', {
    is: ConversationType.CHAT_ROOM,
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  description: Joi.string().optional(),
  members: Joi.array().required().min(2),
  type: Joi.string().valid(...Object.values(ConversationType)),
});
