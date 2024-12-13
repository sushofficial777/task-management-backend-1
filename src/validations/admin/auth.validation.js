const Joi = require("joi");
const { JOI } = require("../../config/appConstants");

exports.adminLogin = {
  body: Joi.object().keys({
    email: Joi.string().email().lowercase().trim().required(),
    password: JOI.PASSWORD,
  }),
};

exports.logout = {
  body: Joi.object().keys({}),
};

exports.changePassword = {
  body: Joi.object().keys({
    newPassword: JOI.PASSWORD,
    oldPassword: JOI.PASSWORD,
  }),
};

exports.changeLeagueStatus = {
  body: Joi.object().keys({
    leagueId: JOI.OBJECTID,
    status: Joi.boolean().required(),
  }),
};


