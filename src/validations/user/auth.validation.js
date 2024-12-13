const Joi = require("joi");
const { JOI, USER_TYPE, DEVICE_TYPE } = require("../../config/appConstants");

exports.signup = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: JOI.EMAIL,
    password: JOI.PASSWORD,
    phone: JOI.PHONENUMBER,
    device_id: Joi.string().allow(""),
    device_type: Joi.string().valid(...Object.values(DEVICE_TYPE)),
    device_token: Joi.string().allow(""),
  }),
};

exports.login = {
  body: Joi.object().keys({
    email: JOI.EMAIL,
    password: JOI.PASSWORD,
    device_id: Joi.string().allow(""),
    device_type: Joi.string().valid(...Object.values(DEVICE_TYPE)),
    device_token: Joi.string().allow(""),
  }),
};

exports.forgotPassword = {
  body: Joi.object().keys({
    email: JOI.EMAIL,
  }),
};

exports.forgotPage = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

exports.resetForgotPassword = {
  body: Joi.object().keys({
    token: Joi.string().required(),
    newPassword: Joi.string().min(6).required(),
    confirmPassword: Joi.any()
      .valid(Joi.ref("newPassword"))
      .required()
      .messages({ "any.only": "Password does not match" }),
  }),
};
exports.changePassword = {
  body: Joi.object().keys({
    old_password: JOI.PASSWORD,
    new_password: JOI.PASSWORD,
  }),
};

