const express = require("express");
const auth = require("../../middlewares/auth");
const { validate } = require("../../middlewares/validate");
const controller = require("../../controllers/task/task.controller");
const { USER_TYPE } = require("../../config/appConstants");
const validation = require("../../validations/task/task.validation");

const router = express.Router();

// Create a new task (authenticated + validated)
router.post(
  "/",
  auth(USER_TYPE.USER),
  validate(validation.createTask),
  controller.createTask
);

// Get all tasks (authenticated)
router.get(
  "/",
  auth(USER_TYPE.USER),
  controller.getAllTasks
);

// Get a single task by ID (authenticated + validated)
router.get(
  "/:id",
  auth(USER_TYPE.USER),
  validate(validation.getTask),
  controller.getTaskById
);

// Update a task (authenticated + validated)
router.put(
  "/:id",
  auth(USER_TYPE.USER),
  validate(validation.updateTask),
  controller.updateTask
);

// Delete a task (authenticated + validated)
router.delete(
  "/:id",
  auth(USER_TYPE.USER),
  validate(validation.getTask),
  controller.deleteTask
);

module.exports = router;