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

exports.signup = catchAsync(async (req, res) => {
  console.log(req.body,"req.body");
  let user = await authService.signup(req.body);
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
        image : user.profileImageUrl,
        role: user.role
      },
    }
  );
});



exports.logout = catchAsync(async (req, res) => {
  await tokenService.logout(req.token._id);
  return res
    .status(STATUS_CODES.SUCCESS)
    .json({ message: SUCCESS_MESSAGES.SUCCESS });
});
