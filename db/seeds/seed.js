const {
  topicData,
  articleData,
  commentData,
  userData,
} = require("../data/index.js"); // This is either the test or dev data based on prior variable, cos this is the super index.js.
const bcrypt = require("bcrypt");
const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function (knex) {
  return knex.migrate
    .rollback() // Drop the tables.
    .then(() => knex.migrate.latest()) // Create the tables anew.
    .then(() => {
      const topicsInsertions = knex("topics").insert(topicData);

      const encryptedUserData = userData.map((user) => {
        return { ...user, password: bcrypt.hashSync(user.password, 5) };
      });

      const usersInsertions = knex("users").insert(encryptedUserData);

      return Promise.all([topicsInsertions, usersInsertions]).then(() => {
        const formattedArticleData = formatDates(articleData);

        return knex("articles")
          .insert(formattedArticleData)
          .returning("*")
          .then((articleDataFromTable) => {
            const articleRef = makeRefObj(
              articleDataFromTable,
              "title",
              "article_id"
            );

            const formattedComments = formatComments(commentData, articleRef);

            return knex("comments").insert(formattedComments).returning("*");
          });
      });
    });
};
