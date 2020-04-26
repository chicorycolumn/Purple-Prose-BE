const {
  fetchArticleData,
  createNewCommentOnArticle,
  fetchCommentsByArticle,
  createNewArticle,
  deleteArticleByID,
  updateArticleDetails,
  fetchArticleVotesJunctionTable,
} = require("../models/articles.model");

exports.getArticleVotesJunctionTable = (req, res, next) => {
  fetchArticleVotesJunctionTable(req.query)
    .then((article_votes_junction) => {
      res.send({ article_votes_junction });
    })
    .catch((err) => next(err));
};

exports.getArticles = (req, res, next) => {
  fetchArticleData(req.params, req.query)
    .then((alreadyFormattedArticles) => {
      res.send(alreadyFormattedArticles);
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchArticleDetails = (req, res, next) => {
  updateArticleDetails(req.params, req.body, req.query)
    .then((article) => {
      res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleByID = (req, res, next) => {
  fetchArticleData(req.params, req.query)
    .then((article) => {
      res.send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.postNewCommentOnArticle = (req, res, next) => {
  createNewCommentOnArticle(req.params, req.body)
    .then((comment) => res.status(201).send({ comment }))
    .catch((err) => next(err));
};

exports.getCommentsByArticle = (req, res, next) => {
  fetchCommentsByArticle(req.params, req.query)
    .then((alreadyFormattedComments) => res.send(alreadyFormattedComments))
    .catch((err) => next(err));
};

exports.postNewArticle = (req, res, next) => {
  createNewArticle(req.body)
    .then((article) => res.status(201).send({ article }))
    .catch((err) => {
      next(err);
    });
};

exports.dropArticleByID = (req, res, next) => {
  deleteArticleByID(req.params)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => next(err));
};
