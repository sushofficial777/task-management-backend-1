const Joi = require("joi");
const { JOI } = require("../../config/appConstants");

exports.bookDemo = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: JOI.EMAIL,
    state: Joi.string().required(),
    phone: JOI.PHONENUMBER,
  }),
};



