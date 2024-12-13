const express = require("express");

const auth = require("../../middlewares/auth");
const { validate, validateView } = require("../../middlewares/validate");
const validation = require("../../validations/user/auth.validation");
const controller = require("../../controllers/user/auth.controller");
const { USER_TYPE } = require("../../config/appConstants");

const router = express.Router();
router.post("/signup", validate(validation.signup), controller.signup);

router.post("/login", validate(validation.login), controller.login);

router.post(
  "/forgot-password",
  validate(validation.forgotPassword),
  controller.forgotPassword
);

router.post(
  "/forgot-password-token-verification",
  validate(validation.forgotPageTokenVerification),
  controller.forgotPageTokenVerification
);

router.put(
  "/change-password",
  auth(USER_TYPE.USER),
  validate(validation.changePassword),
  controller.changePassword
);

router.post(
  "/reset-forgot-password",
  validate(validation.resetForgotPassword),
  controller.resetForgotPassword
);

router.post("/logout", auth(USER_TYPE.USER), controller.logout);

module.exports = router;
