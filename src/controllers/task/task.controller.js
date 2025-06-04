
const {
    SUCCESS_MESSAGES,
    ERROR_MESSAGES,
    STATUS_CODES,
    SCHEDULER_REGARDS,
    TASK_SCHEDULER_TYPES,
} = require("../../config/appConstants");
const { catchAsync } = require("../../utils/universalFunction");
const { successResponse, errorResponse } = require("../../utils/response");
const Task = require('../../models/task.model');
const { scheduleTaskNotifications } = require('../../services/task/task.service');
// Create a new task
exports.createTask = catchAsync(async (req, res) => {

    const task = new Task({
        ...req.body,
        assignee: req.body.assignee === "null"
            ? { id: req.token.user._id, name: req.token.user.name }
            : req.body.assignee,
    });

    const savedTask = await task.save();


    //  notifications 1 : start
    await scheduleTaskNotifications(savedTask, TASK_SCHEDULER_TYPES.TASK_CREATED);

    //  notifications 2 : remonder
    await scheduleTaskNotifications(savedTask, TASK_SCHEDULER_TYPES.TASK_REMINDER);

    if (task.completed && task.stage === "2") {
        notificationSchedules = [
          { time: new Date(Date.now() + 2 * 1000), type: SCHEDULER_TYPES.TASK_COMPLETED  },
        ];
      } else if (!task.completed && task.stage === "1") {
        notificationSchedules = [
          { time: new Date(Date.now() + 2 * 1000), type: SCHEDULER_TYPES.TASK_STARTED },
        ];
      }

    return successResponse(
        req,
        res,
        STATUS_CODES.SUCCESS,
        SUCCESS_MESSAGES.SUCCESS,
        savedTask
    );
});

// Get all tasks
exports.getAllTasks = catchAsync(async (req, res) => {
    const tasks = await Task.find({ "assignee.id": req.token.user._id })
        .populate("assignee.id", "name profileImageUrl");
    return successResponse(
        req,
        res,
        STATUS_CODES.SUCCESS,
        SUCCESS_MESSAGES.SUCCESS,
        tasks
    );
});

// Get a single task by ID
exports.getTaskById = catchAsync(async (req, res) => {
    const task = await Task.findById(req.params.id);
    if (!task) {
        return errorResponse(
            req,
            res,
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.NOT_FOUND
        );
    }
    return successResponse(
        req,
        res,
        STATUS_CODES.SUCCESS,
        SUCCESS_MESSAGES.SUCCESS,
        task
    );
});

// Update a task
exports.updateTask = catchAsync(async (req, res) => {
    const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!task) {
        return errorResponse(
            req,
            res,
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.NOT_FOUND
        );
    }

   if (req.body.isNotification) {
    
    //  notifications 1 : started
    if (!task.completed && task.stage === "1") {
        await scheduleTaskNotifications(task, TASK_SCHEDULER_TYPES.TASK_STARTED);
     }
 
     //  notifications 2 : completed
    if (task.completed && task.stage === "2") {
        await scheduleTaskNotifications(task, TASK_SCHEDULER_TYPES.TASK_COMPLETED);
    }
   }

    return successResponse(
        req,
        res,
        STATUS_CODES.SUCCESS,
        SUCCESS_MESSAGES.SUCCESS,
        task
    );
});

// Delete a task
exports.deleteTask = catchAsync(async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) {
        return errorResponse(
            req,
            res,
            STATUS_CODES.NOT_FOUND,
            ERROR_MESSAGES.NOT_FOUND
        );
    }
    return successResponse(
        req,
        res,
        STATUS_CODES.SUCCESS,
        SUCCESS_MESSAGES.SUCCESS,
        { message: 'Task deleted successfully' }
    );
});

