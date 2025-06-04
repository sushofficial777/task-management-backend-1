const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const passport = require("passport");
const compression = require("compression");
const path = require("path");

const {
  generateMassageService,
} = require("./services/ai/ai.message.service");

const genContent = async (prompt) => {
  const dataByAi = await generateMassageService(prompt);
  console.log(dataByAi);
  return dataByAi;
};

genContent("hello")

const { jwtStrategy } = require("./config/passport");
const routes = require("./routes");
const { errorHandler } = require("./middlewares/common");
const { authLimiter } = require("./middlewares/common");
const i18n = require("./middlewares/i18n");
const {
  requestHandler,
  routeNotFoundHandler,
} = require("./middlewares/common");

const app = express();

require('./jobs/agenda');

app.set("view engine", "hbs");
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, "../public")));

app.use(i18n.init);

app.use((req, res, next) => {
  console.log(req.url);
  requestHandler(req, res, next);
});

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors

app.use(cors({ origin: ["http://localhost:3000","http//:172.20.10.3:3000"], credentials: true }));

// jwt authentication
app.use(passport.initialize());
passport.use("jwt", jwtStrategy);

// limit repeated failed requests to auth endpoints
app.use("/user/auth", authLimiter);

// v1 api routes
app.use("/", routes);

//send back a 404 error for any unknown api request
app.use((req, res, next) => {
  routeNotFoundHandler(req, res, next);
});

// handle error

app.use(errorHandler);

module.exports = app;
