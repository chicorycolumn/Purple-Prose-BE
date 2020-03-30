const {
  fetchTopics,
  createNewTopic,
  updateTopic
} = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
  console.log("Hello from getTopics");
  fetchTopics()
    .then(topics => res.send({ topics }))
    .catch(err => next(err));
};

exports.postNewTopic = (req, res, next) => {
  createNewTopic(req.body)
    .then(topic => res.status(201).send({ topic }))
    .catch(err => {
      next(err);
    });
};

exports.patchTopic = (req, res, next) => {
  updateTopic(req.body)
    .then(topic => res.status(201).send({ topic }))
    .catch(err => {
      next(err);
    });
};
