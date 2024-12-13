const express = require("express");
const userAuth = require("./user/auth.routes");

const adminAuth = require("./admin/auth.routes");

const staticRoutes = require("./static.routes");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/api",
    route: userAuth,
  },
  {
    path: "/admin/auth",
    route: adminAuth,
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
