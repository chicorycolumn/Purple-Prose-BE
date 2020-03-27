const {
  updateCommentDetails,
  deleteCommentByID,
  fetchCommentByID,
  fetchCommentVotesJunctionTable
} = require("../models/comments.model");

exports.getCommentVotesJunctionTable = (req, res, next) => {
  console.log("controllerrrrr");
  fetchCommentVotesJunctionTable(req.query)
    .then(comment_votes_junction => {
      res.send({ comment_votes_junction });
    })
    .catch(err => next(err));
};

exports.patchCommentDetails = (req, res, next) => {
  console.log("controllerrr");
  updateCommentDetails(req.params, req.body, req.query)
    .then(comment => res.send({ comment }))
    .catch(err => next(err));
};

exports.getCommentByID = (req, res, next) => {
  fetchCommentByID(req.params)
    .then(comment => res.send({ comment }))
    .catch(err => next(err));
};

exports.dropCommentByID = (req, res, next) => {
  deleteCommentByID(req.params)
    .then(() => {
      res.status(204).send();
    })
    .catch(err => next(err));
};
