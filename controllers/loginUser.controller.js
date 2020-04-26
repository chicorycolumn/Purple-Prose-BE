const { login } = require("../models/login.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../knexfile");
const connection = require("../db/connection");
const bcrypt = require("bcrypt");

exports.loginUser = (req, res, next) => {
  // Generates the token for user.
  const { username, password } = req.body;

  login(username, password).then(([user, passwordIsValid, userExists]) => {
    if (!userExists) {
      res.status(200).send({ loginError: "No such user" });
      next({ status: 401, msg: "Invalid username or password, my friend." });
    } else if (!user || !passwordIsValid) {
      res.status(200).send({ loginError: "Invalid password" });
      next({ status: 401, msg: "Invalid username or password, my friend." });
    } else {
      const token = jwt.sign(
        {
          user_id: user.user_id,
          username: user.username,
          iat: Date.now(),
        },

        JWT_SECRET
      );
      res.send({ token, username, loginError: null });
      //res.send({ msg: "Successful login, my friend."});
    }
  });
};
