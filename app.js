var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var session = require("express-session");
var passport = require("passport");
var MongoStore = require("connect-mongo");

var app = express();

require("./modules/passport");

require("dotenv").config();

// mongoose.connect("mongodb://localhost/github-oauth", (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Connected to Mongo");
//   }
// });

mongoose
  .connect("mongodb://localhost/github-oauth")
  .then(() => {
    console.log("Connected to Mongo");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
mongoose.set("strictQuery", false);

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost/github-oauth",
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use("/", indexRouter);
app.use("/users", usersRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
