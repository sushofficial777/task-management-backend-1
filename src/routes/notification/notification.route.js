const express = require("express");

const auth = require("../../middlewares/auth");
const { validate, validateView } = require("../../middlewares/validate");
const validation = require("../../validations/user/auth.validation");
const controller = require("../../controllers/notification/notification.controller");
const { USER_TYPE } = require("../../config/appConstants");

const router = express.Router();
router.get("/get-unread-notifications", auth(USER_TYPE.USER), controller.getUnreadNotifications);
router.get("/get-all-notifications", auth(USER_TYPE.USER), controller.getAllNotifications);
router.get("/mark-as-read/:id", auth(USER_TYPE.USER), controller.markNotificationRead);


module.exports = router;