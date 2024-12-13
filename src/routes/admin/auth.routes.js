const express = require("express");
const { validate } = require("../../middlewares/validate");
const auth = require("../../middlewares/auth");
const controller = require("../../controllers/admin/auth.controller");
const validation = require("../../validations/admin/auth.validation");
const { USER_TYPE } = require("../../config/appConstants");

const router = express.Router();

router.post("/login", validate(validation.adminLogin), controller.adminLogin);

router.post("/logout", auth(USER_TYPE.ADMIN), controller.logout);

router.put(
  "/changePassword",
  auth(USER_TYPE.ADMIN),
  validate(validation.changePassword),
  controller.changePassword
);

router.post("/house", validate(validation.addHouse), controller.addHouse);

router.get("/house", controller.getHouses);

module.exports = router;