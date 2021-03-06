const createError = require("http-errors");
const express = require("express");
const path = require("path");
const logger = require("morgan");
require('dotenv').config()

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(
  process.env.DB_ConnectionString,
  { useUnifiedTopology: true }
);
let connection;

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/review");
const productRouter = require("./routes/products");
const authenticateRouter = require("./routes/auth");
const authorizeRouter = require("./MiddleWares/authorization");
const superRouter = require("./routes/super");
const cors = require("cors");
const {getReturnObject} = require("./MiddleWares/returnObject")
const fs = require("fs")

// Setup process.env from .env File
// require('dotenv').config();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())

// Log All Requests Date/Method/Path/IP
let logIt = fs.createWriteStream("./access.log",{flags:"a"});
app.use(logger('* [:date[clf]] :method :url HTTP/:http-version :referrer', {stream: logIt}));

app.use("/", (req, res, next) => {
  if (!connection) {
    client.connect((err) => {
      connection = client.db(process.env.DB_Name);
      req.db = connection;
      next();
    });
  } else {
    req.db = connection;
    next();
  }
});
app.use(authorizeRouter.givePermission);

app.use("/", indexRouter);
app.use("/reviews", usersRouter);
app.use("/products", productRouter);
app.use("/auth", authenticateRouter);
app.use("/super", authorizeRouter.isSuper,superRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404, "URL Not Found"));
});

// error handler
app.use(function (err, req, res, next) {

  res.status(err.status || 500).json(getReturnObject(err.message || err, null));

});

module.exports = app;
