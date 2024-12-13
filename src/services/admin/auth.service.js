const { User, Admin } = require("../../models");
const { STATUS_CODES, ERROR_MESSAGES } = require("../../config/appConstants");
const { OperationalError } = require("../../utils/errors");

exports.adminLogin = async (email, password) => {
  const admin = await Admin.findOne({ email });

  if (!admin) {
    throw new OperationalError(
      STATUS_CODES.NOT_FOUND,
      ERROR_MESSAGES.EMAIL_NOT_FOUND
    );
  }
  if (!(await admin.isPasswordMatch(password))) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.WRONG_PASSWORD
    );
  }
  return admin.toObject();
};

exports.changePassword = async (adminId, data) => {
  const admin = await Admin.findById(adminId);
  if (!(await admin.isPasswordMatch(data.oldPassword))) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.WRONG_PASSWORD
    );
  }
  let updatedPassword = { password: data.newPassword };
  Object.assign(admin, updatedPassword);
  await admin.save();
  return admin;
};

exports.addHouse = async (data) => {
  await House.create(data);
};

exports.getHouses = async (data) => {
  return House.find({});
};
