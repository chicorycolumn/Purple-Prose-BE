const connection = require("../db/connection.js");
const bcrypt = require("bcrypt");

exports.login = (username, password) => {
  console.log(username, password);
  return connection("users")
    .select("*")
    .where({ username })
    .first()
    .then(user => {
      console.log(user);
      return Promise.all([user, bcrypt.compare(password, user.password)]);
      // return Promise.all([user, password === user.password]);
    });
};
