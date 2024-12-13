const passport = require("passport");
const {
  USER_TYPE,
  ERROR_MESSAGES,
  STATUS_CODES,
} = require("../config/appConstants");
const { AuthFailedError, OperationalError } = require("../utils/errors");

const verifyCallback =
  (req, resolve, reject, role) => async (err, token, info) => {
    if (err || info || !token) {
      if (req.url == "/profile") {
        return reject(new OperationalError(400, ERROR_MESSAGES.SERVER_ERROR));
      }
      return reject(new AuthFailedError());
    }

    if (role && token.role != role && role != USER_TYPE.NONE) {
      if (req.url == "/profile") {
        return reject(new OperationalError(400, ERROR_MESSAGES.SERVER_ERROR));
      }
      return reject(
        new AuthFailedError(
          ERROR_MESSAGES.UNAUTHORIZED,
          STATUS_CODES.AUTH_FAILED
        )
      );
    }

    if (token.role === USER_TYPE.ADMIN && !token.admin) {
      return reject(new AuthFailedError());
    }

    if (token.role === USER_TYPE.TIPPER && !token.tipper) {
      return reject(new AuthFailedError());
    }

    if (token.role === USER_TYPE.USER && !token.user) {
      return reject(new AuthFailedError());
    }

    if (
      req.url != "/resendOtp" &&
      req.url != "/verifyOtp" &&
      req.url != "/verifyPhoneNumber"
    ) {
      if (token.otp) {
        return reject(
          new AuthFailedError(
            ERROR_MESSAGES.ACCOUNT_NOT_VERIFIED,
            STATUS_CODES.ACTION_FAILED
          )
        );
      }
    }

    if (
      req.url != "/verifyOtp" &&
      req.url != "/verifyPhoneNumber" &&
      req.url != "/resendOtp"
    ) {
      // if (token.role === USER_TYPE.TIPPER && !token.tipper.isVerified) {
      //   return reject(
      //     new AuthFailedError(
      //       ERROR_MESSAGES.ACCOUNT_NOT_VERIFIED,
      //       STATUS_CODES.ACTION_FAILED
      //     )
      //   );
      // }
      // if (token.role === USER_TYPE.USER && !token.user.isVerified) {
      //   return reject(
      //     new AuthFailedError(
      //       ERROR_MESSAGES.ACCOUNT_NOT_VERIFIED,
      //       STATUS_CODES.ACTION_FAILED
      //     )
      //   );
      // }
    }

    req.token = token;
    return resolve();
  };

const auth = (role) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    if (role === USER_TYPE.NONE && !req.headers.authorization) {
      resolve();
    }

    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject, role)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};

module.exports = auth;
