const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleByID,
  patchArticleVotes,
  postNewCommentOnArticle,
  getCommentsByArticle,
  postNewArticle,
  dropArticleByID,
  patchArticleDetails,
  getArticleVotesJunctionTable
} = require("../controllers/articles.controller");
const { handle405s } = require("../errors/errors");
const { authorizeUser } = require("../controllers/authorizeUser.controller");

articlesRouter
  .route("/")
  .get(getArticles)
  .post(authorizeUser, postNewArticle)
  .all(handle405s);

articlesRouter
  .route("/votes")
  .get(getArticleVotesJunctionTable)
  .all(handle405s);

articlesRouter
  .route("/:article_id")
  .get(getArticleByID)
  .patch(authorizeUser, patchArticleDetails)
  .delete(authorizeUser, dropArticleByID)
  .all(handle405s);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsByArticle)
  .post(authorizeUser, postNewCommentOnArticle)
  .all(handle405s);

module.exports = articlesRouter;
