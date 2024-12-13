const { adminService, tokenService } = require("../../services");
const {
  USER_TYPE,
  STATUS_CODES,
  SUCCESS_MESSAGES,
} = require("../../config/appConstants");
const { catchAsync } = require("../../utils/universalFunction");
const { successResponse } = require("../../utils/response");

exports.adminLogin = catchAsync(async (req, res) => {
  let { email, password } = req.body;
  const admin = await adminService.adminLogin(email, password);
  delete admin.password;
  const token = await tokenService.generateAuthToken(admin, USER_TYPE.ADMIN);
  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.DEFAULT,
    { ...token, ...admin }
  );
});

exports.logout = catchAsync(async (req, res) => {
  await tokenService.logout(req.token._id);

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.DEFAULT
  );
});

exports.changePassword = catchAsync(async (req, res) => {
  await adminService.changePassword(req.token.admin._id, req.body);
  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.DEFAULT
  );
});

exports.addHouse = catchAsync(async (req, res) => {
  await adminService.addHouse(req.body);
  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS
  );
});

exports.getHouses = catchAsync(async (req, res) => {
  const data = await adminService.getHouses();
  return res
    .status(STATUS_CODES.SUCCESS)
    .json({ message: SUCCESS_MESSAGES.SUCCESS, data });
});
