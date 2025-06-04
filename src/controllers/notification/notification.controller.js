
const Notification = require('../../models/notification.model');
const { catchAsync } = require("../../utils/universalFunction");
const { successResponse } = require("../../utils/response");
const {
  SUCCESS_MESSAGES,
  STATUS_CODES,
} = require("../../config/appConstants");

exports.getUnreadNotifications = catchAsync(async (req, res) => {
  const notifications = await Notification.find({
    userId: req.token.user._id,
    read: false
  }).populate({
    path: 'userId',
    select: 'name profileImageUrl'
  })
    .populate({
      path: 'taskId',
      select: 'title description'
    })
    .sort({ createdAt: -1 })
    .limit(50);

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    notifications
  );
});

exports.getAllNotifications = catchAsync(async (req, res) => {
  const notifications = await Notification.find({
    userId: req.token.user._id,
  }).populate({
    path: 'userId',
    select: 'name profileImageUrl'
  })
    .populate({
      path: 'taskId',
      select: 'title description'
    })
    .sort({ createdAt: -1 })
    .limit(50);

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    notifications
  );
});

exports.markNotificationRead = catchAsync(async (req, res) => {
  
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, userId: req.token.user._id },
    { read: true },
    { new: true }
  );

  if (!notification) {
    throw new Error('Notification not found');
  }

  return successResponse(
    req,
    res,
    STATUS_CODES.SUCCESS,
    SUCCESS_MESSAGES.SUCCESS,
    notification
  );
});