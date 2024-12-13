const jwt = require("jsonwebtoken");
const moment = require("moment");
var ObjectID = require("mongodb").ObjectID;

const config = require("../config/config");
const {
  TOKEN_TYPE,
  USER_TYPE,
  STATUS_CODES,
  ERROR_MESSAGES,
} = require("../config/appConstants");
const { Token, User } = require("../models");
const { OperationalError } = require("../utils/errors");

const generateToken = (data, secret = config.jwt.secret) => {
  const payload = {
    // user: data.user,
    exp: data.tokenExpires.unix(),
    type: data.tokenType,
    id: data.tokenId,
    role: data.userType,
  };

  return jwt.sign(payload, secret);
};

const saveToken = async (data) => {
  let dataToBesaved = {
    expires: data.tokenExpires.toDate(),
    type: data.tokenType,
    _id: data.tokenId,
    device: {
      type: data.deviceType,
      token: data.deviceToken,
      id: data.deviceId,
    },
    role: data.userType,
    token: data.token,
  };

  if (data.userType === USER_TYPE.ADMIN) {
    dataToBesaved.admin = data.user._id;
  } else {
    dataToBesaved.user = data.user._id;
  }
  
  if (data.deviceId) {
    await Token.deleteOne({ "device.id": data.deviceId }, { isDeleted: true });
  }

  const tokenDoc = await Token.create(dataToBesaved);
  return tokenDoc;
};

const generateAuthToken = async (
  user,
  userType,
  deviceToken,
  deviceType,
  deviceId
) => {
  const tokenExpires = moment().add(config.jwt.accessExpirationMinutes, "days");
  var tokenId = new ObjectID();

  const accessToken = generateToken({
    // user: user._id,
    tokenExpires,
    tokenType: TOKEN_TYPE.ACCESS,
    userType,
    tokenId,
  });

  await saveToken({
    token: accessToken,
    tokenExpires,
    tokenId,
    deviceToken,
    deviceType,
    tokenType: TOKEN_TYPE.ACCESS,
    userType,
    user,
    deviceId,
  });
  return {
    token: accessToken,
    expires: tokenExpires.toDate(),
  };
};

const verifyToken = async (token) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await Token.findOne({
    token,
    type: payload.type,
    user: payload.userId,
  });
  if (!tokenDoc) {
    throw new Error("Token not found");
  }
  return tokenDoc;
};

const refreshAuth = async (user, userType, tokenId, device) => {
  await Token.findByIdAndUpdate(tokenId, { isDeleted: true });
  return generateAuthToken(user, userType, device.token, device.type);
};

const logout = async (tokenId) => {
  const updatedToken = await Token.findByIdAndUpdate(tokenId, {
    isDeleted: true,
  });

  return updatedToken;
};

const generateResetPasswordToken = async (email, userType) => {
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new OperationalError(
      STATUS_CODES.ACTION_FAILED,
      ERROR_MESSAGES.ACCOUNT_NOT_FOUND
    );
  }
  var tokenId = new ObjectID();

  const tokenExpires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    "day"
  );

  const resetPasswordToken = generateToken({
    user: user.id,
    tokenId,
    tokenExpires,
    tokenType: TOKEN_TYPE.RESET_PASSWORD,
  });

  await saveToken({
    token: resetPasswordToken,
    tokenId,
    resetPasswordToken,
    user,
    tokenExpires,
    tokenType: TOKEN_TYPE.RESET_PASSWORD,
    userType,
  });

  return { resetPasswordToken, user };
};

const verifyResetPasswordToken = async (token) => {
  try {
    const payload = jwt.verify(token, config.jwt.secret);
    console.log(payload,"payload");
    const tokenData = await Token.findOne({
      _id: payload.id,
      isDeleted: false,
      expires: { $gte: new Date() },
    });
    return tokenData;
  } catch (error) {
    throw error;
  }
};

const getDeviceToken = async (userIds, deviceType) => {
  const deviceTokens = await Token.find({
    $or: [{ user: { $in: userIds } }, { tipper: { $in: userIds } }],
    "device.type": deviceType,
  }).distinct("device.token");

  return deviceTokens;
};

const createCheckoutToken = async (userType, userId) => {
  var tokenId = new ObjectID();
  const tokenExpires = moment().add(
    config.jwt.resetPasswordExpirationMinutes,
    "day"
  );
  const token = generateToken({
    userId,
    tokenId,
    tokenExpires,
    tokenType: TOKEN_TYPE.CHECKOUT,
  });
  const data = {
    token,
    _id: tokenId,
    expires: tokenExpires,
    type: TOKEN_TYPE.CHECKOUT,
    role: userType,
  };

  if (userType == USER_TYPE.TIPPER) {
    data.tipper = userId;
  } else {
    data.user = userId;
  }

  return Token.create(data);
};

const verifyCheckOutToken = async (token) => {
  const tokenData = jwt.verify(
    token,
    config.jwt.secret,
    function async(err, decoded) {
      if (err) {
        throw new OperationalError(
          STATUS_CODES.AUTH_FAILED,
          ERROR_MESSAGES.SERVER_ERROR
        );
      }
      return decoded;
    }
  );

  if (
    !(await Token.findOneAndUpdate(
      {
        _id: tokenData.id,
        type: tokenData.type,
        isDeleted: false,
      },
      { isDeleted: true }
    ))
  ) {
    throw new OperationalError(
      STATUS_CODES.AUTH_FAILED,
      ERROR_MESSAGES.SERVER_ERROR
    );
  }
};

const updateToken = async (data) => {
  await Token.updateOne(
    { "device.id": data.deviceId, isDeleted: false },
    {
      $setOnInsert: {
        type: TOKEN_TYPE.ACCESS,
        expires: moment()
          .add(config.jwt.accessExpirationMinutes, "days")
          .unix(),
        role: USER_TYPE.NONE,
      },
      device: {
        type: data.deviceType,
        token: data.deviceToken,
        id: data.deviceId,
      },
    },
    { upsert: true, lean: true, new: true, setDefaultsOnInsert: true }
  );
};

module.exports = {
  updateToken,
  generateAuthToken,
  saveToken,
  refreshAuth,
  logout,
  verifyToken,
  generateResetPasswordToken,
  verifyResetPasswordToken,
  getDeviceToken,
  createCheckoutToken,
  verifyCheckOutToken,
};
