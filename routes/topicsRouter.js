const topicsRouter = require("express").Router();
const {
  getTopics,
  postNewTopic,
  patchTopic,
} = require("../controllers/topics.controller");
const { handle405s } = require("../errors/errors");
const { authorizeUser } = require("../controllers/authorizeUser.controller");

topicsRouter
  .route("/")
  .get(getTopics)
  .post(authorizeUser, postNewTopic)
  .patch(authorizeUser, patchTopic)
  .all(handle405s);

module.exports = topicsRouter;
