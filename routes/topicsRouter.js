const topicsRouter = require("express").Router(); // still using express, right?
const { getTopics, postNewTopic } = require("../controllers/topics.controller");
const { handle405s } = require("../errors/errors");
const { authorizeUser } = require("../controllers/authorizeUser.controller");

topicsRouter
  .route("/")
  .get(getTopics)
  .post(authorizeUser, postNewTopic)
  .all(handle405s);

module.exports = topicsRouter;
