const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const MongoClient = require("mongodb").MongoClient;
const client = new MongoClient(
  "mongodb+srv://shizi:12345@cluster0.qsheq.mongodb.net?retryWrites=true&w=majority",
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

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors())

app.use("/", (req, res, next) => {
  if (!connection) {
    client.connect((err) => {
      connection = client.db("ProductsReview");
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
app.use("/review", usersRouter);
app.use("/products", productRouter);
app.use("/auth", authenticateRouter);
app.use("/super", authorizeRouter.isSuper,superRouter);

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

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listeaning to port ${port}`);
});

module.exports = app;
