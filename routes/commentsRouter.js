const commentsRouter = require("express").Router(); // still using express, right?
const {
  patchCommentDetails,
  dropCommentByID,
  getCommentByID
} = require("../controllers/comments.controller");
const { handle405s } = require("../errors/errors");
const { authorizeUser } = require("../controllers/authorizeUser.controller");

commentsRouter
  .route("/:comment_id")
  .delete(authorizeUser, dropCommentByID)
  .patch(authorizeUser, patchCommentDetails)
  .get(getCommentByID)
  .all(handle405s);

module.exports = commentsRouter;
