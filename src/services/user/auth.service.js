const { ERROR_MESSAGES, STATUS_CODES } = require("../../config/appConstants");
const { User, Token } = require("../../models");
const { OperationalError } = require("../../utils/errors");

exports.login = async (data) => {
  const account = await User.findOne({ email: data.email }, {});
  if (!account) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.EMAIL_NOT_FOUND
    );
  }
  if (!(await account.isPasswordMatch(data.password))) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.WRONG_PASSWORD
    );
  }
  return account;
};

exports.signup = async (data) => {
  if (await User.findOne({ email: data.email })) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.EMAIL_ALREADY_EXIST
    );
  }

  const user = await User.create(data);

  console.log(data,"data");
  return user;
};

exports.resetPassword = async (tokenData, newPassword) => {
  const user = await User.findOne({ _id: tokenData.user });
  
  // Check if new password matches current password
  if (await user.isPasswordMatch(newPassword)) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.SAME_PASSWORD
    );
  }
  
  user.password = newPassword;
  await user.save();
  await Token.findByIdAndUpdate(tokenData._id, { isDeleted: true });
};

exports.changePassword = async (userId, data) => {
  const user = await User.findById(userId);
  if (!(await user.isPasswordMatch(data.old_password))) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.WRONG_PASSWORD
    );
  }
  let updatedPassword = { password: data.new_password };
  Object.assign(user, updatedPassword);
  await user.save();
  return user;
};
