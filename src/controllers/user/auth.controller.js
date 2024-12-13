const { tokenService, authService } = require("../../services");
const {
  SUCCESS_MESSAGES,
  ERROR_MESSAGES,
  STATUS_CODES,
  USER_TYPE,
} = require("../../config/appConstants");
const { catchAsync } = require("../../utils/universalFunction");
const { successResponse, errorResponse } = require("../../utils/response");
const { forgotPasswordEmail } = require("../../libs/sendMail");
const config = require("../../config/config");

exports.signup = catchAsync(async (req, res) => {

  let user = await authService.signup(req.body);
  console.log(req.body,"req.body");
  const accessToken = await tokenService.generateAuthToken(
    user,
    USER_TYPE.USER,
    req.body.device_token,
    req.body.device_type,
    req.body.device_id
  );

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    {
      session_id: accessToken.token,
      profile: {
        user_id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        phone: user.phone,
        amount: "0",
        push_notifications: 1,
        newsLetters: 0,
        email_notifications: 0,
        app_version: "",
      },
    }
  );
});

exports.login = catchAsync(async (req, res) => {
  let user = await authService.login(req.body);

  const accessToken = await tokenService.generateAuthToken(
    user,
    USER_TYPE.USER,
    req.body.device_token,
    req.body.device_type,
    req.body.device_id
  );

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    {
      session_id: accessToken.token,
      profile: {
        user_id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        phone: user.phone,
        push_notifications: 0,
        newsLetters: 0,
        email_notifications: 0,
        app_version: "",
      },
    }
  );
});

exports.forgotPassword = catchAsync(async (req, res) => {
  console.log( req.body.email,"req.body");
  
  const data = await tokenService.generateResetPasswordToken(
    req.body.email,
    USER_TYPE.USER
  );

  forgotPasswordEmail(req.body.email, data.resetPasswordToken, "User");
  return res
    .status(STATUS_CODES.SUCCESS)
    .json({ message: SUCCESS_MESSAGES.SUCCESS });
});

exports.forgotPageTokenVerification = catchAsync(async (req, res) => {
  try {
    const tokenData = await tokenService.verifyResetPasswordToken(
      req.body.token
    );
   
      return successResponse(
        req,
        res,
        STATUS_CODES.SUCCESS,
        SUCCESS_MESSAGES.TOKEN_VERIFIED
      )
   
  } catch (error) {
    return errorResponse(
      error,
      req,
      res,
      STATUS_CODES.ERROR,
      ERROR_MESSAGES.INVALID_TOKEN
    );
  }
});

exports.resetForgotPassword = catchAsync(async (req, res) => {
  try {
    const token = req.body.token;
    
    const tokenData = await tokenService.verifyResetPasswordToken(token);
    if (!tokenData) {
      return errorResponse(
        req,
        res,
        STATUS_CODES.ERROR,
        ERROR_MESSAGES.INVALID_TOKEN
      );
    };

    await authService.resetPassword(tokenData, req.body.newPassword);
    return successResponse(
      req,
      res,
      STATUS_CODES.SUCCESS,
      SUCCESS_MESSAGES.SUCCESS
    );
  } catch (error) {
    console.log(error);
    return errorResponse(
      error,
      req,
      res,
      STATUS_CODES.ERROR,
      ERROR_MESSAGES.INVALID_TOKEN
    );
  }
});

exports.changePassword = catchAsync(async (req, res) => {
  await authService.changePassword(req.token.user._id, req.body);
  return res
    .status(STATUS_CODES.SUCCESS)
    .json({ message: SUCCESS_MESSAGES.SUCCESS });
});

exports.logout = catchAsync(async (req, res) => {
  await tokenService.logout(req.token._id);
  return res
    .status(STATUS_CODES.SUCCESS)
    .json({ message: SUCCESS_MESSAGES.SUCCESS });
});
