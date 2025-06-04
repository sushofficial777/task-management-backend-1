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
  SAME_PASSWORD: "New password cannot be the same as the current password",
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
  DEMO_ALREADY_REQUESTED: "Demo already requested with this email or phone number",
  DEMO_REQUEST_SUCCESS: "Booking Demo request sent successfully",
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

exports.SCHEDULER_TYPES = {
  TASK_JOB: "task",
}

exports.TASK_SCHEDULER_TYPES = {
  TASK_REMINDER: "remind_task_notification",
  TASK_CREATED: "task_created",
  TASK_STARTED: "task_started",
  TASK_COMPLETED: "task_completed",
}

exports.SCHEDULER_REGARDS = {
  TASK_INITIALIZER: "remind_task_notification",
  TASK_UPDATE: "task_update",
}

exports.NOTIFICATION_TYPES = {
  // Task Status Updates
  TASK_CREATED: "Task Created",
  TASK_UPDATED: "Task Updated",
  TASK_COMPLETED: "Task Completed",
  TASK_DELETED: "Task Deleted",
  TASK_REASSIGNED: "Task Reassigned",

  // Task Stage Changes
  STAGE_NOT_STARTED: "Not Started",
  STAGE_IN_PROGRESS: "In Progress",
  STAGE_COMPLETED: "Completed",

  // Due Date Reminders
  DUE_DATE_24H_REMINDER: "24 Hour Reminder",
  DUE_DATE_1H_REMINDER: "1 Hour Reminder",
  DUE_DATE: "Due Date",
  DUE_DATE_PASSED: "Due Date Passed",

  // Priority Changes
  PRIORITY_CHANGED_HIGH: "Priority Changed High",
  PRIORITY_CHANGED_MEDIUM: "Priority Changed Medium",
  PRIORITY_CHANGED_LOW: "Priority Changed Low",

  // Team and Assignee Updates
  TEAM_ASSIGNED: "Team Assigned",
  TEAM_REMOVED: "Team Removed",
  ASSIGNEE_ADDED: "Assignee Added",
  ASSIGNEE_REMOVED: "Assignee Removed",

  // Task Comments
  COMMENT_ADDED: "Comment Added",
  COMMENT_MENTIONED: "Comment Mentioned"
};

exports.DATE_FORMAT = "YYYY-MM-DD";
