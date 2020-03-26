var express = require("express");
var cors = require("cors");
var app = express();

app.use(cors());

app.use(express.json());
const apiRouter = require("./routes/apiRouter");
const {
  handleCustomErrors,
  pSQLErrorsHandler,
  handle404s
} = require("./errors/errors");

app.use("/api", apiRouter);
app.use("/*", handle404s);
app.use(pSQLErrorsHandler);
app.use(handleCustomErrors);

module.exports = app;
