
const { User, Token } = require("../../models");
const { OperationalError } = require("../../utils/errors");


exports.getUsersForSelectService = async (tokenData, newPassword) => {
    const users = await User.find();
    return users;
  };