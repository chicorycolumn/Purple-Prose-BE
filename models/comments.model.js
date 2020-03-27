const connection = require("../db/connection.js");

exports.fetchCommentByID = ({ comment_id }) => {
  return connection("comments")
    .select("*")
    .where({ comment_id: comment_id })
    .then(commentArr => {
      if (commentArr.length === 0) {
        return Promise.reject({ status: 404, customStatus: "404a" });
      } else {
        return commentArr[0];
      }
    });
};

exports.addVoteToCommentByUser = (
  { comment_id },
  { inc_votes = 0, voting_user }
) => {
  console.log("modellll");
  // Checking if trying to submit invalid vote.
  if (inc_votes !== 1 && inc_votes !== -1 && inc_votes !== 0) {
    return Promise.reject({ status: 400, customStatus: "400d" });
  }
  console.log("here?");
  return connection
    .select("*")
    .from("users_comments_table") //MAKE THIS TABLE.
    .where("voting_user", voting_user)
    .andWhere("comment_id", comment_id)
    .then(rows => {
      if (rows.length) {
        //Checking if same user trying to upvote or downvote s/th that is already upvoted/downvoted.
        if (
          (rows[0].inc_votes === 1 && inc_votes === 1) ||
          (rows[0].inc_votes === -1 && inc_votes === -1)
        ) {
          return Promise.reject({ status: 400 });
        } else {
          //Increment the votes.
          return connection("users_comments_table")
            .where("voting_user", voting_user)
            .andWhere("comment_id", comment_id)
            .increment("inc_votes", inc_votes)
            .returning("*")
            .then(rows => {
              return rows[0];
            });
        }
      }
      // Adding a new vote to article from this specific user.
      return connection
        .insert({
          voting_user: voting_user,
          comment_id: comment_id,
          inc_votes: inc_votes
        })
        .into("users_comments_table")
        .returning("*")
        .then(resArr => {
          return resArr[0];
        });
    });
};

exports.updateCommentDetails = (
  { comment_id },
  { inc_votes, voting_user, body, ...badKeys },
  queries
) => {
  if (Object.keys(badKeys).length > 0) {
    return Promise.reject({ status: 400, customStatus: "400a" });
  } else if (inc_votes !== undefined && voting_user !== undefined) {
    return this.addVoteToCommentByUser(
      { comment_id },
      { inc_votes, voting_user }
    );
  } else
    return connection("comments")
      .where({ comment_id: comment_id })
      .modify(queryBuilder => {
        if (inc_votes !== undefined) {
          queryBuilder = queryBuilder.increment("votes", inc_votes);
        }
      })
      .modify(queryBuilder => {
        if (body !== undefined) {
          queryBuilder = queryBuilder.update({
            body: body
          });
        }
      })
      .returning("*")
      .then(comments => {
        if (comments.length === 0) {
          return Promise.reject({ status: 404, customStatus: "404a" });
        } else return comments[0];
      });
};

exports.deleteCommentByID = ({ comment_id }) => {
  return connection("comments")
    .where({ comment_id: comment_id })
    .del()
    .then(numberRowsDeleted => {
      if (numberRowsDeleted === 0) {
        return Promise.reject({ status: 404, customStatus: "404a" });
      } else return numberRowsDeleted;
    });
};
