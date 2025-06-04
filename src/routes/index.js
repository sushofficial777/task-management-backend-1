const express = require("express");
const userAuth = require("./user/auth.routes");
const userRoute = require("./user/user.route");
const taskRoute = require("./task/task.route");
const notificationRoute = require("./notification/notification.route");

const staticRoutes = require("./static.routes");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/api",
    route: userAuth,
  },
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/notification",
    route: notificationRoute,
  },
  {
    path: "/api/task",
    route: taskRoute,
  },
  {
    path: "/",
    route: staticRoutes,
  },

];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
