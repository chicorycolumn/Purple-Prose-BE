const commentsRouter = require("express").Router();
const {
  patchCommentDetails,
  dropCommentByID,
  getCommentByID,
  getCommentVotesJunctionTable,
} = require("../controllers/comments.controller");
const { handle405s } = require("../errors/errors");
const { authorizeUser } = require("../controllers/authorizeUser.controller");

commentsRouter
  .route("/votes")
  .get(getCommentVotesJunctionTable)
  .all(handle405s);

commentsRouter
  .route("/:comment_id")
  .delete(authorizeUser, dropCommentByID)
  .patch(authorizeUser, patchCommentDetails)
  .get(getCommentByID)
  .all(handle405s);

module.exports = commentsRouter;
