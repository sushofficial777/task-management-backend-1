const express = require("express");

const auth = require("../../middlewares/auth");
const { validate, validateView } = require("../../middlewares/validate");
const validation = require("../../validations/user/auth.validation");
const controller = require("../../controllers/user/user.controller");
const { USER_TYPE } = require("../../config/appConstants");

const router = express.Router();
router.get("/get-users-for-select",auth(USER_TYPE.USER), controller.getUsersSelect);


module.exports = router;