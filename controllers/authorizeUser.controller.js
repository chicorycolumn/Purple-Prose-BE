const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../knexfile");
const connection = require("../db/connection"); // Improve with MVC. Make models.
const bcrypt = require("bcrypt");

exports.authorizeUser = (req, res, next) => {
  // Try to authorize it, and catch any errors that happen.

  if (!req.headers.authorization) {
    next();
  } else {
    try {
      // checks the user's token
      const { authorization } = req.headers;
      const token = authorization.split(" ")[1];
      jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
          console.log(">>>not logged in<<<");
          next();
          //next({ status: 401, msg: "I am afraid you are not allowed here." });
        } else {
          req.user = payload;
          res.send({ validatedUser: req.user });
          next();
        }
      });
    } catch (err) {
      next({ status: 401, msg: "I am afraid you are not allowed here." });
    }
  }
};
