import * as Joi from 'joi';

export default Joi.object().keys({
  userId: Joi.string().required(),
  message: Joi.string().required(),
  conversationIdOrHash: Joi.string().required(),
});
