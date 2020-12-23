const connection = require("../db/connection.js");

exports.fetchTopics = () => {
  return connection("topics").select("*");
};

exports.createNewTopic = ({ description, slug, ...unnecessaryKeys }) => {
  if (Object.keys(unnecessaryKeys).length) {
    return Promise.reject({ status: 400, customStatus: "400a" });
  }

  return connection
    .insert({
      description: description,
      slug: slug
    })
    .into("topics")
    .returning("*")
    .then(topicArr => {
      return topicArr[0];
    });
};

exports.updateTopic = ({ slug, description }) => {
  return connection("topics")
    .select("*")
    .where("slug", slug)
    .update("description", description)
    .returning("*")
    .orderBy("slug", "asc")
    .then(topicArr => {
      if (topicArr.length !== 1) {
        return Promise.reject({ status: 404, customStatus: "404a" });
      } else return topicArr[0];
    });
};
