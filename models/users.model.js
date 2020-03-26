const connection = require("../db/connection.js");
const { doesValueExistInTable } = require("../db/utils/utils");
const bcrypt = require("bcrypt");

exports.updateUserDetails = (
  { username },
  { name, password, ...badKeys },
  queries
) => {
  if (Object.keys(badKeys).length > 0) {
    return Promise.reject({ status: 400, customStatus: "400a" });
  } else
    return (
      connection("users")
        .where({ username: username })
        .modify(queryBuilder => {
          if (password !== undefined) {
            queryBuilder = queryBuilder.update({
              password: password
            });
          }
        })
        // .modify(queryBuilder => {
        //   if (name !== undefined) {
        //     queryBuilder = queryBuilder.update({
        //       name: name
        //     });
        //   }
        // })
        .returning("*")
        .then(userArr => {
          if (userArr.length === 0) {
            return Promise.reject({ status: 404, customStatus: "404a" });
          } else return userArr[0];
        })
    );
};

exports.fetchUsers = ({ username }) => {
  return doesValueExistInTable(username, "username", "users").then(res => {
    if (!res && username !== undefined) {
      return Promise.reject({ status: 404, customStatus: "404a" });
    } else
      return connection("users")
        .select("*")
        .modify(queryBuilder => {
          if (username !== undefined) {
            queryBuilder = queryBuilder
              .where({ username: username })
              .then(userArray => {
                if (userArray.length === 0) {
                } else {
                  return userArray[0];
                }
              });
          }
        });
  });
};

// const encryptedUserData = userData.map(user => {
//   return { ...user, password: bcrypt.hashSync(user.password, 5) };
// });

// const usersInsertions = knex("users").insert(encryptedUserData);

exports.createNewUser = ({ username, password, ...unnecessaryKeys }) => {
  if (Object.keys(unnecessaryKeys).length) {
    return Promise.reject({ status: 400, customStatus: "400a" });
  }

  console.log(`in model with username and password: ${username}, ${password}`);

  return doesValueExistInTable(username, "username", "users").then(res => {
    if (res) {
      return { err: "Username already taken", user: null };
    } else {
      encryptedPassword = bcrypt.hashSync(password, 5);

      return connection
        .insert({
          username: username,
          password: encryptedPassword
        })
        .into("users")
        .returning("*")
        .then(userArr => {
          console.log("success!");
          return { err: null, user: userArr[0] };
        });
    }
  });
};
