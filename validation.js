const Joi = require("@hapi/joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(5).required(),
    phoneNumber: Joi.string().min(6).required(),
    lastName: Joi.string().min(6).required(),
    userName: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const validation = schema.validate(data);
  return validation;
};

const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  const validation = schema.validate(data);
  return validation;
};

module.exports.loginValidation = loginValidation;
module.exports.registerValidation = registerValidation;
