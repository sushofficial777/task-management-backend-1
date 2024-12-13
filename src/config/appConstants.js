const Joi = require("joi");
const { objectId } = require("../validations/custom.validation");

exports.TOKEN_TYPE = {
  ACCESS: "access",
  RESET_PASSWORD: "resetPassword",
};

exports.USER_TYPE = {
  ADMIN: "admin",
  USER: "user",
  NONE: "none",
};

exports.DEVICE_TYPE = {
  IPHONE: "IPhone",
  ANDROID: "Android",
  WEB: "Web",
};

exports.STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

exports.ENVIRONMENT = {
  PRODUCTION: "production",
  DEVELOPMENT: "development",
};

exports.JOI = {
  EMAIL: Joi.string().email().lowercase().trim().required(),
  PASSWORD: Joi.string().min(6).required(),
  PHONENUMBER: Joi.string()
    .max(15)
    .min(10)
    .message("Please enter a valid phone number"),
  LIMIT: Joi.number().default(10).min(5),
  PAGE: Joi.number().default(0),
  OBJECTID: Joi.string().custom(objectId).required(),
  DEVICE_TYPE: Joi.string()
    .valid(...Object.values(exports.DEVICE_TYPE))
    .required(),
};

exports.SUCCESS_MESSAGES = {
  SUCCESS: "Success",
  LOGOUT: "User successfully logged out",
};

exports.ERROR_MESSAGES = {
  NOT_FOUND: "Not found",
  VALIDATION_FAILED: "Validation Failed, Kindly check your parameters",
  SERVER_ERROR: "Something went wrong, Please try again",
  AUTHENTICATION_FAILED: "Please authenticate",
  UNAUTHORIZED: "You are not authorized to perform this action",
  ACCOUNT_NOT_EXIST: "Account does not exist",
  WRONG_PASSWORD: "Password is Incorrect",
  ACCOUNT_DELETED: "Your account has been deleted by Admin",
  ACCOUNT_BLOCKED: "Your account has been blocked by Admin",
  USER_NOT_FOUND: "User not found",
  PHONE_NUMBER_ALREADY_EXIST: "Account already exist with this number",
  ACCOUNT_NOT_VERIFIED: "Please verify your account first",
  INVALID_OTP: "Invalid OTP",
  ACCOUNT_ALREADY_VERIFIED: "Your account already verified",
  EMAIL_NOT_FOUND: "Email not found",
  ACCOUNT_NOT_FOUND: "Account not found with this Email",
  USER_NAME_ALREADY_EXIST: "User name already exist",
  EMAIL_ALREADY_EXIST: "Email already exist",
  ACCOUNT_ALREADY_EXIST: "Account already exist",
  TOKEN_EXPIRED: "Token expired",
  TOKEN_NOT_FOUND: "Token not found",
  TOKEN_NOT_VERIFIED: "Token not verified",
  TOKEN_VERIFIED: "Token verified",
  INVALID_TOKEN: "Invalid token",
};

exports.DEMO_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
  COMPLETED: "completed",
};

exports.STATUS_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  ACTION_PENDING: 202,
  ACTION_COMPLETE: 204,

  VALIDATION_FAILED: 400,
  ACTION_FAILED: 400,
  AUTH_FAILED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE: 422,
  TOO_MANY_REQUESTS: 429,

  ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
};

exports.DATE_FORMAT = "YYYY-MM-DD";
