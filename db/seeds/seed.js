const {
  topicData,
  articleData,
  commentData,
  userData
} = require("../data/index.js"); // This is either the test or dev data based on prior variable, cos this is the super index.js.
const bcrypt = require("bcrypt");
const { formatDates, formatComments, makeRefObj } = require("../utils/utils");

exports.seed = function(knex) {
  return knex.migrate
    .rollback() // Drop the tables.
    .then(() => knex.migrate.latest()) // Create the tables anew.
    .then(() => {
      const topicsInsertions = knex("topics").insert(topicData);

      const encryptedUserData = userData.map(user => {
        return { ...user, password: bcrypt.hashSync(user.password, 5) };
      });

      const usersInsertions = knex("users").insert(encryptedUserData);

      return Promise.all([topicsInsertions, usersInsertions]).then(() => {
        const formattedArticleData = formatDates(articleData);

        return knex("articles")
          .insert(formattedArticleData)
          .returning("*")
          .then(articleDataFromTable => {
            const articleRef = makeRefObj(
              articleDataFromTable,
              "title",
              "article_id"
            );

            const formattedComments = formatComments(commentData, articleRef);

            return knex("comments")
              .insert(formattedComments)
              .returning("*");
          });
      });
    });
};

// exports.seed = function(knex){
// return knex.migrate.rollback() // calls the down functions
// .then(() => {
// return knex.migrate.latest() // calls the up functions
// })
// .then(() => {
// return knex.insert(houseData).into('houses').returning('*')
// })
// .then(houseRows => {
// now manipulate the wizardData now you have ids, cos we need to switch house name for id
//make ref obj
//format wizardData with it
//return it
// })
// }

/* 
      NB1

      Your article data is currently in the incorrect format 
      and will violate your SQL schema. 
      
      You will need to write and test the provided formatDate 
      utility function to be able insert your article data.

      Your comment insertions will depend on information 
      from the seeded articles, so make sure to return 
      the data after it's been seeded.
      */

/* 
      NB2

      Your comment data is currently in the incorrect 
      format and will violate your SQL schema. 

      Keys need renaming, values need changing, and 
      most annoyingly, your comments currently only 
      refer to the title of the article they belong to, not the id. 
      
      You will need to write and test the provided 
      makeRefObj and formatComments utility functions 
      to be able insert your comment data.
      */
