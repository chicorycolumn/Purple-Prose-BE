const { login } = require("../models/login.model");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../knexfile");
const connection = require("../db/connection"); // Improve with MVC. Make models.
const bcrypt = require("bcrypt");

exports.loginUser = (req, res, next) => {
  // Generates the token for user.
  console.log(req.body);
  const { username, password } = req.body;

  login(username, password).then(([user, passwordIsValid]) => {
    if (!user || !passwordIsValid) {
      next({ status: 401, msg: "Invalid username or password, my friend." });
    } else {
      const token = jwt.sign(
        {
          user_id: user.user_id,
          username: user.username,
          iat: Date.now()
        },

        JWT_SECRET
      );
      res.send({ token });
      //res.send({ msg: "Successful login, my friend." });
    }
  });
};