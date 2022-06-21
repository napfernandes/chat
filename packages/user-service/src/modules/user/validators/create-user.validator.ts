import * as Joi from 'joi';

export default Joi.object().keys({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
