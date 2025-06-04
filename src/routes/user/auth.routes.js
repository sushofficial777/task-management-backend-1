const express = require("express");

const auth = require("../../middlewares/auth");
const { validate, validateView } = require("../../middlewares/validate");
const validation = require("../../validations/user/auth.validation");
const controller = require("../../controllers/user/auth.controller");
const { USER_TYPE } = require("../../config/appConstants");

const router = express.Router();
router.post("/signup", validate(validation.signup), controller.signup);

router.post("/login", validate(validation.login), controller.login);

router.post("/logout", auth(USER_TYPE.USER), controller.logout);

module.exports = router;
