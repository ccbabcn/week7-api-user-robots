const { Joi } = require("express-validation");

const credentialsSchema = {
  body: Joi.Object({
    userName: Joi.string().require(),
  }),
};

module.exports = credentialsSchema;
